import { NextResponse } from 'next/server';
import { addLead } from '@/lib/server/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Unified Lead Schema
    const { 
      leadType,     // 'SALES' | 'SERVICE' | 'TEST_DRIVE' | 'EXCHANGE' | 'BROCHURE' | 'PRICE_LIST' | 'EXIT_OFFER'
      name, 
      phone, 
      targetCar,    // The car they want to buy/test drive
      location,     // Preferred dealership
      currentCar,   // Make + Model + Year (For Exchange)
      extraInfo     // Any other notes
    } = body;

    // Basic validation
    if (!name || !phone || !leadType) {
      return NextResponse.json(
        { error: 'Name, Phone, and Lead Type are required.' },
        { status: 400 }
      );
    }

    // Record lead directly into the Nippon Admin local database
    let savedLeadId = '';
    try {
      const saved = await addLead({
        name,
        phone,
        leadType,
        targetCar: targetCar || undefined,
        location: location || undefined,
        currentCar: currentCar || undefined,
        extraInfo: extraInfo || undefined,
        notes: `Submitted via website form. Target: ${targetCar || 'Not specified'}`,
      });
      savedLeadId = saved.id;
    } catch (dbErr) {
      console.error('Failed to save lead to local database:', dbErr);
    }

    // Google Apps Script Webhook URL (if configured)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl || scriptUrl === 'PENDING') {
      return NextResponse.json({
        success: true,
        message: 'Lead received and recorded in Nippon portal successfully.',
        leadId: savedLeadId,
      });
    }

    // Forward to Google Sheets Webhook with structured data
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          leadType, 
          name, 
          phone, 
          targetCar: targetCar || '-',
          location: location || '-',
          currentCar: currentCar || '-',
          extraInfo: extraInfo || '-',
          leadId: savedLeadId,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error('Google Script returned non-JSON:', responseText);
      }

      if (data && data.result !== 'success') {
        console.warn('Google Script warning:', data.message);
      }
    } catch (webhookErr) {
      console.warn('Google Script forwarding failed, but lead was saved locally:', webhookErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead recorded successfully',
      leadId: savedLeadId,
    });

  } catch (error: unknown) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again later.' },
      { status: 500 }
    );
  }
}
