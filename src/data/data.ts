// src/data/data.ts
// ─── Edit all placeholder content here ───────────────────

export const EVENT = {
  title: 'Na me rahu na\nmeri arzoo rahe',
  subtitleEn: 'Neither do I exist, nor do my desires',
  subtitleSup: 'HariPrabodham Germany presents',
  dates: '15 · 16 · 17 Aug 2026',
  location: 'Germany',
  organiser: 'HariPrabodham Germany',
  ctaLabel: 'Register Now',
  ctaLabelSecondary: 'Know More',
};

export const ABOUT = {
  description: `"Na me rahu na meri arzoo rahe" is a deeply spiritual gathering organised by HariPrabodham Germany,
bringing together the satsang family for three days of devotion, kirtan, and divine blessings.
This event is an opportunity to immerse ourselves in the presence of saints and strengthen our spiritual journey together.`,
  cards: [
    { icon: '📅', label: 'Dates', value: '15 – 17 August 2026' },
    { icon: '📍', label: 'Location', value: 'Berlin, Germany' },
    { icon: '🙏', label: 'Organised by', value: 'HariPrabodham Germany' },
  ],
};

export const FAQS = [
  {
    q: 'Who can attend this event?',
    a: 'This event is open to all members of the satsang family. Children must be accompanied by a parent or guardian who is registered.',
  },
  {
    q: 'Is accommodation provided?',
    a: 'Accommodation details will be shared with registered attendees via email. Please register early to secure your spot.',
  },
  {
    q: 'What is the registration fee?',
    a: 'The registration fee per person will be displayed during the registration process. A small service fee applies for payment processing.',
  },
  {
    q: 'Can I cancel my registration?',
    a: 'Please contact the HariPrabodham Germany team to discuss cancellation and refund arrangements if your travel plans change.',
  },
  {
    q: 'What language will the event be in?',
    a: 'The event will primarily be in Gujarati and Hindi, with some sessions in German and English.',
  },
];

export const MAX_GROUP_SIZE = 4;

export const COUNTRIES = [
  { code: 'AU', label: 'Australia',      flag: '🇦🇺', dialCode: '+61' },
  { code: 'AT', label: 'Austria',        flag: '🇦🇹', dialCode: '+43' },
  { code: 'CA', label: 'Canada',         flag: '🇨🇦', dialCode: '+1'  },
  { code: 'DE', label: 'Germany',        flag: '🇩🇪', dialCode: '+49' },
  { code: 'IN', label: 'India',          flag: '🇮🇳', dialCode: '+91' },
  { code: 'NZ', label: 'New Zealand',    flag: '🇳🇿', dialCode: '+64' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'US', label: 'United States',  flag: '🇺🇸', dialCode: '+1'  },
];

export const FOOTER = {
  brand: 'HariPrabodham Germany',
  legal: `© ${new Date().getFullYear()} Yogi Divine Society e.V. Germany. All rights reserved.`,
  email: 'hpam@yds-germany.de',
  closing: 'Jai Swaminarayan 🙏',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Venue', href: '/venue' },
  { label: 'Explore', href: '/explore' },
  { label: 'Contact', href: '/contact' },
];
