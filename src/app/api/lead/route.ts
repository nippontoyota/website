import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, model } = body;

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone are required.' },
        { status: 400 }
      );
    }

    // Google Apps Script Webhook URL (will be set in environment variables)
    // For now, if not set, we just simulate a success for UI testing
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl || scriptUrl === 'PENDING') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, message: 'Mock submission successful' });
    }

    // Forward to Google Sheets Webhook
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, model }),
    });

    const data = await response.json();

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
