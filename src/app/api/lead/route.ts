import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Unified Lead Schema
    const { 
      leadType,     // 'SALES' | 'SERVICE' | 'TEST_DRIVE' | 'EXCHANGE'
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

    // Google Apps Script Webhook URL (will be set in environment variables)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl || scriptUrl === 'PENDING') {
      // Simulate network delay for UI testing if no webhook is connected yet
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, message: 'Mock submission successful' });
    }

    // Forward to Google Sheets Webhook with structured data
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
        extraInfo: extraInfo || '-'
      }),
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Google Script returned non-JSON:', responseText);
      throw new Error('Google Script did not return valid JSON. Check script deployment permissions and code.');
    }

    if (data.result === 'success') {
      return NextResponse.json({ success: true });
    } else {
      throw new Error(data.message || 'Error from Google Script');
    }

  } catch (error: unknown) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again later.' },
      { status: 500 }
    );
  }
}
