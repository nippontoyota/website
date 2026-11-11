import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getAdminSession } from '@/lib/server/auth';

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
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subDir);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and add short timestamp to prevent collision
    const ext = path.extname(file.name) || (folderType === 'brochures' ? '.pdf' : '.png');
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const safeName = `${baseName}-${Date.now().toString().slice(-6)}${ext}`;
    const filePath = path.join(uploadDir, safeName);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${subDir}/${safeName}`;
    return NextResponse.json({ success: true, url: publicUrl, fileName: safeName });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
