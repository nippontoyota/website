import React from 'react';
import { SocialPlatform } from '@/lib/types/admin';

interface SocialIconProps {
  platform: SocialPlatform | string;
  className?: string;
  size?: number;
}

export const PLATFORM_CONFIG: Record<
  SocialPlatform,
  {
    name: string;
    brandColor: string;
    brandBg: string;
    placeholder: string;
    prefix: string;
  }
> = {
  instagram: {
    name: 'Instagram',
    brandColor: '#E1306C',
    brandBg: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/30',
    placeholder: 'https://www.instagram.com/nippon.toyota/',
    prefix: '@',
  },
  facebook: {
    name: 'Facebook',
    brandColor: '#1877F2',
    brandBg: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/30',
    placeholder: 'https://www.facebook.com/nipponkerala/',
    prefix: '',
  },
  youtube: {
    name: 'YouTube',
    brandColor: '#FF0000',
    brandBg: 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/30',
    placeholder: 'https://www.youtube.com/@NipponToyotaKerala',
    prefix: '@',
  },
  whatsapp: {
    name: 'WhatsApp',
    brandColor: '#25D366',
    brandBg: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30',
    placeholder: 'https://wa.me/919946101111',
    prefix: '+91 ',
  },
  x: {
    name: 'X (Twitter)',
    brandColor: '#000000',
    brandBg: 'bg-zinc-500/10 text-white border-zinc-500/30',
    placeholder: 'https://x.com/nippontoyota',
    prefix: '@',
  },
  linkedin: {
    name: 'LinkedIn',
    brandColor: '#0A66C2',
    brandBg: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/30',
    placeholder: 'https://www.linkedin.com/company/nippon-toyota/',
    prefix: '',
  },
  threads: {
    name: 'Threads',
    brandColor: '#000000',
    brandBg: 'bg-zinc-500/10 text-white border-zinc-500/30',
    placeholder: 'https://www.threads.net/@nippon.toyota',
    prefix: '@',
  },
  custom: {
    name: 'Website / Link',
    brandColor: '#eb0a1e',
    brandBg: 'bg-[#eb0a1e]/10 text-[#eb0a1e] border-[#eb0a1e]/30',
    placeholder: 'https://example.com',
    prefix: '',
  },
};

export default function SocialIcon({ platform, className = '', size = 20 }: SocialIconProps) {
  const norm = (platform || '').toLowerCase() as SocialPlatform;

  switch (norm) {
    case 'instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.4" />
        </svg>
      );

    case 'facebook':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );

    case 'youtube':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M12.031 0C5.396 0 .013 5.383.013 12.018c0 2.115.553 4.181 1.602 6l-1.7 6.208 6.353-1.666a11.96 11.96 0 0 0 5.763 1.48c6.634 0 12.018-5.383 12.018-12.02C24.049 5.383 18.665 0 12.031 0zm0 22.018a9.98 9.98 0 0 1-5.093-1.39l-.365-.217-3.78.991 1.008-3.687-.238-.378a9.97 9.97 0 0 1-1.536-5.32c0-5.524 4.496-10.02 10.02-10.02 5.525 0 10.021 4.496 10.021 10.02 0 5.525-4.496 10.021-10.037 10.021zm5.492-7.514c-.301-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.677.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.527-.075-.15-.677-1.633-.928-2.235-.244-.587-.492-.507-.677-.517-.175-.01-.376-.01-.577-.01-.2 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.509 0 1.481 1.079 2.91 1.229 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.721.23 1.378.197 1.897.12.578-.087 1.782-.728 2.033-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.577-.351z" />
        </svg>
      );

    case 'x':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case 'linkedin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );

    case 'threads':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M19.25 12.048c0 4.223-3.265 7.648-7.25 7.648-4.103 0-7.25-3.376-7.25-7.696 0-4.32 3.147-7.696 7.25-7.696 3.654 0 6.442 2.723 7.087 6.368h-2.186c-.57-2.483-2.47-4.32-4.901-4.32-2.894 0-5.163 2.443-5.163 5.648 0 3.205 2.269 5.648 5.163 5.648 2.25 0 4.143-1.488 4.823-3.6h-4.823v-2.048h7.25z" />
        </svg>
      );

    case 'custom':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}
