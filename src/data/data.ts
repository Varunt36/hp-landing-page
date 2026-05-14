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
    { icon: '📅', label: 'Dates', value: '16 – 18 August 2026' },
    { icon: '📍', label: 'Location', value: 'Berlin, Germany' },
    { icon: '🙏', label: 'Organised by', value: 'HariPrabodham Germany' },
  ],
};

export const VENUE = {
  name: 'Hotel Berlin, Berlin',
  address: 'Lützowplatz 17, 10785 Berlin, Germany',
  mapSrc:
    'https://maps.google.com/maps?q=Hotel%20Berlin%20Berlin%2C%20L%C3%BCtzowplatz%2017%2C%2010785%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed',
  phone: '+49 30 26050',
  website: 'https://www.hotel-berlin.de',
  travel: [
    {
      icon: '✈️',
      label: 'From BER Airport',
      detail:
        'Take train RE7 or RB14 to Zoologischer Garten, then bus 100 to Lützowplatz.',
      time: '~ 1 hour',
    },
    {
      icon: '🚇',
      label: 'By U-Bahn',
      detail:
        'Lines U1, U2 or U3 to U-Nollendorfplatz. Exit toward Karl-Heinrich-Ulrichs-Straße.',
      time: '~ 5 min walk',
    },
    {
      icon: '🚗',
      label: 'By Car',
      detail:
        'From A100, take exit Kurfürstendamm → An der Urania, turn left. Underground parking on site.',
      time: '200+ parking spots',
    },
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

export const TERMS = `
**1. Data Protection (Datenschutz)**
- By registering, you consent to the processing of your personal data under the EU GDPR (DSGVO) and German BDSG, solely for registration and event logistics.
- You may access, correct, or request deletion of your data, or withdraw consent at any time, by contacting the organising team.
`;

export const MAX_GROUP_SIZE = 4;

export const PRICING = {
  perPerson: 290, // EUR
  currency: '€',
};

export const COUNTRIES = [
  { code: 'DE', label: 'Germany' },
  { code: 'AT', label: 'Austria' },
  { code: 'CH', label: 'Switzerland' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'US', label: 'United States' },
  { code: 'IN', label: 'India' },
  { code: 'NZ', label: 'New Zealand' },
];

export const FOOTER = {
  brand: 'HariPrabodham Germany',
  legal: '© 2026 HariPrabodham Germany. All rights reserved.',
  email: 'info@yds-germany.de',
  closing: 'Jai Swaminarayan 🙏',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Venue', href: '/venue' },
  { label: 'Explore', href: '/explore' },
  { label: 'Contact', href: '/contact' },
];
