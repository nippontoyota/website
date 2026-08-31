"use client";

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { configurationUrl, type VehicleConfiguration } from '@/lib/vehicleConfiguration';

type ConfigurationShareProps = {
  configuration: VehicleConfiguration;
};

export default function ConfigurationShare({ configuration }: ConfigurationShareProps) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}${configurationUrl(configuration)}`;
    if (navigator.share) {
      await navigator.share({ title: 'My Toyota configuration', text: 'Take a look at this Toyota configuration.', url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" onClick={share} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white">
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? 'Link copied' : 'Share configuration'}
    </button>
  );
}
