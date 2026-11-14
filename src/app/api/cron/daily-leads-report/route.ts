import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/server/db';
import { LeadRecord } from '@/lib/types/admin';

export const dynamic = 'force-dynamic';

function getTodayISTRange() {
  const now = new Date();
  // IST offset is UTC+5:30
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffsetMs);

  // Start of today in IST (00:00:00 IST)
  const istStartOfDay = new Date(istNow);
  istStartOfDay.setUTCHours(0, 0, 0, 0);

  // Convert back to UTC timestamp for comparison with ISO strings
  const startUtc = new Date(istStartOfDay.getTime() - istOffsetMs);
  return { startUtc, istNow };
}

function generateCSV(leads: LeadRecord[]): string {
  const headers = [
    'Lead ID',
    'Date (IST)',
    'Time (IST)',
    'Customer Name',
    'Phone Number',
    'Inquiry Type',
    'Target Vehicle',
    'Dealership Location',
    'Trade-in Car',
    'Status',
    'Assigned Sales Officer',
    'iCROP Status',
    'CTDMS Lead ID',
    'Customer Notes',
  ];

  const rows = leads.map((l) => {
    const d = new Date(l.createdAt);
    const istDate = d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    const istTime = d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });

    return [
      `"${l.id}"`,
      `"${istDate}"`,
      `"${istTime}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.leadType || ''}"`,
      `"${(l.targetCar || 'Not Specified').replace(/"/g, '""')}"`,
      `"${(l.location || '-').replace(/"/g, '""')}"`,
      `"${(l.currentCar || '-').replace(/"/g, '""')}"`,
      `"${l.status || 'NEW'}"`,
      `"${(l.assignedOfficer || 'Unassigned').replace(/"/g, '""')}"`,
      `"${l.icropStatus || 'PENDING'}"`,
      `"${(l.ctdmsLeadId || '-').replace(/"/g, '""')}"`,
      `"${(l.notes || l.extraInfo || '').replace(/"/g, '""')}"`,
    ].join(',');
  });

  return '\uFEFF' + [headers.join(','), ...rows].join('\n');
}

function buildHTMLDigest(params: {
  dateStr: string;
  totalLeads: number;
  modelBreakdown: Record<string, number>;
  typeBreakdown: Record<string, number>;
  branchBreakdown: Record<string, number>;
  leads: LeadRecord[];
}): string {
  const { dateStr, totalLeads, modelBreakdown, typeBreakdown, branchBreakdown, leads } = params;

  const modelRows = Object.entries(modelBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([model, count]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #f4f4f5;">${model}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #ff4d5a; font-weight: bold; text-align: right;">${count}</td>
      </tr>`
    )
    .join('');

  const branchRows = Object.entries(branchBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([branch, count]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #f4f4f5;">${branch}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #38bdf8; font-weight: bold; text-align: right;">${count}</td>
      </tr>`
    )
    .join('');

  const typeRows = Object.entries(typeBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([type, count]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #f4f4f5;">${type}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #27272a; color: #a1a1aa; text-align: right;">${count}</td>
      </tr>`
    )
    .join('');

  const leadTableRows = leads
    .slice(0, 15)
    .map((l) => {
      const time = new Date(l.createdAt).toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
      });
      return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px;">${time}</td>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #fff; font-weight: 500;">${l.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #38bdf8;"><a href="tel:${l.phone}" style="color: #38bdf8; text-decoration: none;">${l.phone}</a></td>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #f4f4f5;">${l.targetCar || 'Not Specified'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">${l.location || 'General'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #e4e4e7; font-size: 11px;">${l.leadType}</td>
      </tr>`;
    })
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Nippon Toyota Daily Leads Digest</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f4f4f5;">
    <div style="max-width: 680px; margin: 0 auto; padding: 24px 16px;">
      
      <!-- HEADER -->
      <div style="background: linear-gradient(135deg, #18181b 0%, #09090b 100%); border: 1px solid #27272a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 16px;">
          <div>
            <div style="color: #eb0a1e; font-size: 12px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">Official Marketing Report</div>
            <h1 style="color: #ffffff; font-size: 22px; margin: 4px 0 0; font-weight: 800;">NIPPON TOYOTA KERALA</h1>
          </div>
          <div style="text-align: right;">
            <div style="background: #eb0a1e; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; display: inline-block;">6:00 PM CLOSE</div>
            <div style="color: #a1a1aa; font-size: 12px; margin-top: 4px;">${dateStr}</div>
          </div>
        </div>

        <!-- KPI SUMMARY CARDS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px;">
          <div style="background: rgba(235, 10, 30, 0.1); border: 1px solid rgba(235, 10, 30, 0.3); border-radius: 8px; padding: 14px; text-align: center;">
            <div style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Total Enquiries Today</div>
            <div style="color: #ff4d5a; font-size: 28px; font-weight: 800; margin-top: 4px;">${totalLeads}</div>
          </div>
          <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; padding: 14px; text-align: center;">
            <div style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Top Model</div>
            <div style="color: #38bdf8; font-size: 16px; font-weight: 700; margin-top: 8px;">${Object.keys(modelBreakdown)[0] || 'N/A'}</div>
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 14px; text-align: center;">
            <div style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Status</div>
            <div style="color: #34d399; font-size: 16px; font-weight: 700; margin-top: 8px;">Ready for iCROP</div>
          </div>
        </div>
      </div>

      <!-- BREAKDOWN GRIDS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <!-- MODEL DEMAND -->
        <div style="background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px;">
          <h3 style="color: #ffffff; font-size: 14px; margin: 0 0 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Vehicle Demand Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tbody>
              ${modelRows || '<tr><td style="color:#71717a; padding:8px;">No model inquiries today</td></tr>'}
            </tbody>
          </table>
        </div>

        <!-- BRANCH DEMAND -->
        <div style="background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px;">
          <h3 style="color: #ffffff; font-size: 14px; margin: 0 0 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Branch / Territory Split</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tbody>
              ${branchRows || '<tr><td style="color:#71717a; padding:8px;">No branch tagged</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- INQUIRY TYPES -->
      <div style="background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <h3 style="color: #ffffff; font-size: 14px; margin: 0 0 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Customer Intent Breakdown</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tbody>
            ${typeRows}
          </tbody>
        </table>
      </div>

      <!-- RECENT LEADS PREVIEW -->
      <div style="background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <h3 style="color: #ffffff; font-size: 14px; margin: 0 0 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Today's Leads Preview (First 15)</h3>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid #27272a; color: #a1a1aa;">
                <th style="padding: 8px;">Time</th>
                <th style="padding: 8px;">Customer</th>
                <th style="padding: 8px;">Phone</th>
                <th style="padding: 8px;">Model</th>
                <th style="padding: 8px;">Branch</th>
                <th style="padding: 8px;">Type</th>
              </tr>
            </thead>
            <tbody>
              ${leadTableRows || '<tr><td colspan="6" style="padding: 16px; text-align: center; color: #71717a;">No leads received today yet.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- FOOTER & ATTACHMENT NOTICE -->
      <div style="text-align: center; color: #71717a; font-size: 12px; padding: 16px; border-top: 1px solid #27272a;">
        <p style="margin: 0 0 8px;">📎 <strong>Spreadsheet Attached:</strong> The full Excel/CSV file with all today's leads is attached to this email.</p>
        <p style="margin: 0;">Automated Daily Dispatch Engine • Nippon Toyota Kerala Marketing Portal</p>
      </div>

    </div>
  </body>
  </html>
  `;
}

async function handleReportGeneration() {
  try {
    const store = await getStoreData();
    const allLeads = store.leads || [];

    const { startUtc, istNow } = getTodayISTRange();
    const dateStr = istNow.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Filter leads received today in IST (or take all if none today for preview)
    const todayLeads = allLeads.filter((l) => {
      const created = new Date(l.createdAt);
      return created >= startUtc;
    });

    // If no leads received today yet (e.g. testing early in morning), include recent leads for demonstration
    const activeLeads = todayLeads.length > 0 ? todayLeads : allLeads.slice(0, 10);

    // Compute Metrics
    const modelBreakdown: Record<string, number> = {};
    const typeBreakdown: Record<string, number> = {};
    const branchBreakdown: Record<string, number> = {};

    for (const lead of activeLeads) {
      const model = lead.targetCar || 'General / Unspecified';
      modelBreakdown[model] = (modelBreakdown[model] || 0) + 1;

      const type = lead.leadType || 'GENERIC';
      typeBreakdown[type] = (typeBreakdown[type] || 0) + 1;

      const branch = lead.location || 'Central Website';
      branchBreakdown[branch] = (branchBreakdown[branch] || 0) + 1;
    }

    const csvContent = generateCSV(activeLeads);
    const htmlDigest = buildHTMLDigest({
      dateStr,
      totalLeads: activeLeads.length,
      modelBreakdown,
      typeBreakdown,
      branchBreakdown,
      leads: activeLeads,
    });

    // Default marketing recipients
    const defaultRecipients = ['shivasajay23@gmail.com'];
    const envRecipients = process.env.MARKETING_REPORT_EMAILS
      ? process.env.MARKETING_REPORT_EMAILS.split(',').map((e) => e.trim()).filter(Boolean)
      : [];
    const recipients = Array.from(new Set([...defaultRecipients, ...envRecipients]));

    const resendApiKey = process.env.RESEND_API_KEY;
    let emailStatus = 'SIMULATED';
    let emailMessage = 'Report compiled. Configure RESEND_API_KEY to send real email.';

    if (resendApiKey) {
      try {
        const fromEmail = process.env.EMAIL_FROM || 'Nippon Toyota <onboarding@resend.dev>';
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: recipients,
            subject: `[Daily Leads Report] Nippon Toyota Kerala — ${dateStr} (6:00 PM)`,
            html: htmlDigest,
            attachments: [
              {
                filename: `Nippon-Toyota-Daily-Leads-${dateStr.replace(/\s+/g, '-')}.csv`,
                content: Buffer.from(csvContent).toString('base64'),
              },
            ],
          }),
        });

        if (emailRes.ok) {
          const resData = await emailRes.json();
          emailStatus = 'SENT';
          emailMessage = `Email successfully dispatched to ${recipients.join(', ')} (ID: ${resData.id})`;
        } else {
          const errText = await emailRes.text();
          emailStatus = 'ERROR';
          emailMessage = `Resend API error: ${errText}`;
        }
      } catch (sendErr) {
        emailStatus = 'ERROR';
        emailMessage = `Email dispatch exception: ${String(sendErr)}`;
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      date: dateStr,
      totalLeadsToday: activeLeads.length,
      recipients,
      emailStatus,
      emailMessage,
      csvPreviewRows: activeLeads.length,
    });
  } catch (error) {
    console.error('Daily leads report generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate daily leads report' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return handleReportGeneration();
}

export async function POST() {
  return handleReportGeneration();
}
