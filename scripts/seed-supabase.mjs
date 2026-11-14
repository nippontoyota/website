import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jgiraqlmmlfryhlmnfak.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ruo7MgIqq0vAynsPCOj5Bg_-7Jx8TiA';

const supabase = createClient(url, key);

async function seed() {
  console.log('Seeding Supabase from local data/nippon-store.json...');
  const storePath = path.join(process.cwd(), 'data', 'nippon-store.json');
  if (!fs.existsSync(storePath)) {
    console.error('data/nippon-store.json not found!');
    return;
  }

  const raw = fs.readFileSync(storePath, 'utf-8');
  const store = JSON.parse(raw);

  // 1. Seed Config
  console.log('Upserting nippon_config...');
  const { error: configErr } = await supabase.from('nippon_config').upsert({
    id: 'main_store',
    data: {
      vehicles: store.vehicles || [],
      heroCards: store.heroCards || [],
      campaigns: store.campaigns || {},
      branches: store.branches || [],
      rtoConfig: store.rtoConfig || null,
      socialLinks: store.socialLinks || [],
    },
    updated_at: new Date().toISOString(),
  });

  if (configErr) {
    console.error('Config upsert error:', configErr);
  } else {
    console.log('Config successfully synced to Supabase!');
  }

  // 2. Seed Leads
  const leads = store.leads || [];
  console.log(`Syncing ${leads.length} leads to nippon_leads...`);
  if (leads.length > 0) {
    const formattedLeads = leads.map((l) => ({
      id: l.id,
      created_at: l.createdAt,
      name: l.name,
      phone: l.phone,
      lead_type: l.leadType,
      target_car: l.targetCar || null,
      location: l.location || null,
      current_car: l.currentCar || null,
      extra_info: l.extraInfo || null,
      status: l.status || 'NEW',
      notes: l.notes || null,
    }));

    const { error: leadsErr } = await supabase.from('nippon_leads').upsert(formattedLeads);
    if (leadsErr) {
      console.error('Leads upsert error:', leadsErr);
    } else {
      console.log(`Successfully synced ${leads.length} leads!`);
    }
  }
}

seed().catch(console.error);
