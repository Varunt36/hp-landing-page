// src/data/data.ts
// ─── Edit all placeholder content here ───────────────────

export const EVENT = {
  title:      'Na me rahu na\nmeri arzoo rahe',
  subtitle:   'Yogi Divine Society Germany presents',
  dates:      'August 16 – 18, 2026',
  location:   'Berlin, Germany',
  organiser:  'YDS Germany',
  ctaLabel:   'Register Now',
}

export const ABOUT = {
  description: `"Na me rahu na meri arzoo rahe" is a deeply spiritual gathering organised by Yogi Divine Society Germany,
bringing together the satsang family for three days of devotion, kirtan, and divine blessings.
This event is an opportunity to immerse ourselves in the presence of saints and strengthen our spiritual journey together.`,
  cards: [
    { icon: '📅', label: 'Dates',        value: '16 – 18 August 2026' },
    { icon: '📍', label: 'Location',     value: 'Berlin, Germany' },
    { icon: '🙏', label: 'Organised by', value: 'YDS Germany' },
  ],
}

export const VENUE = {
  name:    'Placeholder Venue Name',
  address: 'Musterstraße 1, 10115 Berlin, Germany',
  mapSrc:  'https://www.openstreetmap.org/export/embed.html?bbox=13.35,52.50,13.45,52.54&layer=mapnik',
  travel: [
    { icon: '✈️', label: 'By Air',   detail: 'Berlin Brandenburg Airport (BER) — approx. 30 min by S-Bahn' },
    { icon: '🚆', label: 'By Train', detail: 'Berlin Hauptbahnhof — U-Bahn / S-Bahn connections available' },
    { icon: '🚗', label: 'By Car',   detail: 'Parking available nearby. GPS: 52.5200° N, 13.4050° E' },
  ],
}

export const FAQS = [
  { q: 'Who can attend this event?',      a: 'This event is open to all members of the satsang family. Children must be accompanied by a parent or guardian who is registered.' },
  { q: 'Is accommodation provided?',      a: 'Accommodation details will be shared with registered attendees via email. Please register early to secure your spot.' },
  { q: 'What is the registration fee?',   a: 'The registration fee per person will be displayed during the registration process. A small service fee applies for payment processing.' },
  { q: 'Can I cancel my registration?',   a: 'Please contact the YDS Germany team to discuss cancellation and refund arrangements if your travel plans change.' },
  { q: 'What language will the event be in?', a: 'The event will primarily be in Gujarati and Hindi, with some sessions in German and English.' },
]

export const TERMS = `
**1. Participation & Responsibility**
- All attendees voluntarily agree to participate in this event.
- Participants under 18 must be registered by a parent or guardian who assumes full responsibility.

**2. Health & Safety**
- Please remain mindful of your surroundings and communicate any concerns to event volunteers.
- The organising team will act in accordance with local health guidelines.

**3. Photography & Media**
- Photos and videos may be taken during the event and used for YDS Germany communications.

**4. Code of Conduct**
- All attendees are expected to maintain the spiritual atmosphere of the event with respect and devotion.
`

export const MAX_GROUP_SIZE = 4

export const PRICING = {
  perPerson: 250, // EUR
  serviceFeeRate: 0.04, // 4%
  currency: '€',
};

export const COUNTRIES = [
  { code: 'DE', label: 'Germany' },
  { code: 'AT', label: 'Austria' },
  { code: 'CH', label: 'Switzerland' },
  { code: 'UK', label: 'United Kingdom' },
  { code: 'US', label: 'United States' },
  { code: 'IN', label: 'India' },
  { code: 'NZ', label: 'New Zealand' },
]

export const FOOTER = {
  brand:   'YDS Germany',
  legal:   '© 2026 Yogi Divine Society Germany. All rights reserved.',
  email:   'info@yds-germany.de',
  closing: 'Jai Swaminarayan 🙏',
}

export const NAV_LINKS = [
  { label: 'About',  href: '#about' },
  { label: 'Venue',  href: '#venue' },
  { label: 'FAQ',    href: '#faq' },
]
