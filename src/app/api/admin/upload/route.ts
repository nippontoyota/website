import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getAdminSession } from '@/lib/server/auth';
import { getSupabaseClient } from '@/lib/server/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderType = (formData.get('type') as string) || 'vehicles'; // 'vehicles' | 'brochures'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const subDir = folderType === 'brochures' ? 'brochures' : 'vehicles';
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and add short timestamp to prevent collision
    const ext = path.extname(file.name) || (folderType === 'brochures' ? '.pdf' : '.png');
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const safeName = `${baseName}-${Date.now().toString().slice(-6)}${ext}`;
    const storagePath = `${subDir}/${safeName}`;

    // 1. Try uploading to Supabase Storage for permanent global CDN hosting
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error: sbUploadErr } = await supabase.storage
          .from('nippon-media')
          .upload(storagePath, buffer, {
            contentType: file.type || (folderType === 'brochures' ? 'application/pdf' : 'image/png'),
            upsert: true,
          });

        if (!sbUploadErr) {
          const { data: pubData } = supabase.storage
            .from('nippon-media')
            .getPublicUrl(storagePath);

          if (pubData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: pubData.publicUrl,
              fileName: safeName,
            });
          }
        } else {
          console.warn('Supabase storage upload warning (falling back):', sbUploadErr.message);
        }
      } catch (sbErr) {
        console.warn('Supabase storage exception (falling back):', sbErr);
      }
    }

    // 2. Local filesystem (if writable on disk)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', subDir);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, safeName);
      await fs.promises.writeFile(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${subDir}/${safeName}`,
        fileName: safeName,
      });
    } catch (fsErr) {
      console.warn('Local filesystem write failed (likely serverless read-only):', fsErr);

      // 3. Fallback: Base64 data URL if file is under 2.5MB
      if (buffer.length <= 2.5 * 1024 * 1024) {
        const mimeType = file.type || (folderType === 'brochures' ? 'application/pdf' : 'image/png');
        const dataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
        return NextResponse.json({
          success: true,
          url: dataUrl,
          fileName: safeName,
        });
      }

      throw new Error('File size exceeds serverless limits and cloud bucket is pending. Please compress your file under 2.5MB.');
    }
  } catch (error: unknown) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}
