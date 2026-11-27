export type Service = {
  id: string
  index: string
  title: string
  kicker: string
  copy: string
  from: string
  image: string
}

export type MenuItem = { name: string; price: string; note?: string }
export type MenuGroup = { title: string; items: MenuItem[] }

export type Review = {
  name: string
  meta: string
  when: string
  stars: number
  text: string
}

export const business = {
  name: 'A1 Beauty Salon',
  legalName: 'A1 Make Up Studio & Unisex Salon',
  tagline: 'Make up studio & unisex salon',
  rating: 4.9,
  reviewCount: 371,
  phone: '07978654543',
  phoneHref: '+917978654543',
  address: 'KIIT Rd, near Sani Mandir, Prasanti Vihar',
  locality: 'Patia, Bhubaneswar, Odisha 751024',
  /**
   * Opens the salon's Maps listing card (4.9★, reviews, photos, directions).
   * The maps.app.goo.gl short link this replaced times out on some networks
   * — the host is unreachable while google.com resolves fine — so this goes
   * straight to google.com/maps/search with the registered business name.
   */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=A1%20Make%20Up%20Studio%20%26%20Unisex%20Salon%2C%20KIIT%20Road%2C%20Patia%2C%20Bhubaneswar',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.3630377,85.8208723',
  /** The canonical embed URL Google redirects output=embed to — one less hop inside the iframe. */
  embedUrl:
    'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s20.3630377,85.8208723!6i17!3m1!1sen!5m1!1sen',
  whatsapp:
    'https://wa.me/917978654543?text=Hi%20A1%20Beauty%20Salon%2C%20I%27d%20like%20to%20book%20an%20appointment.',
}

/** Hours as listed on the salon's Google Business profile (Asia/Kolkata). */
export const hours = [
  { day: 'Sunday', short: 'Sun', open: 6 * 60 + 30, close: 21 * 60, label: '6:30 am – 9:00 pm' },
  { day: 'Monday', short: 'Mon', open: 7 * 60 + 30, close: 21 * 60, label: '7:30 am – 9:00 pm' },
  { day: 'Tuesday', short: 'Tue', open: 9 * 60 + 30, close: 21 * 60, label: '9:30 am – 9:00 pm' },
  { day: 'Wednesday', short: 'Wed', open: 7 * 60 + 30, close: 21 * 60, label: '7:30 am – 9:00 pm' },
  { day: 'Thursday', short: 'Thu', open: 7 * 60 + 30, close: 21 * 60, label: '7:30 am – 9:00 pm' },
  { day: 'Friday', short: 'Fri', open: 7 * 60, close: 21 * 60, label: '7:00 am – 9:00 pm' },
  { day: 'Saturday', short: 'Sat', open: 7 * 60 + 30, close: 21 * 60, label: '7:30 am – 9:00 pm' },
]

export const reviews: Review[] = [
  {
    name: 'Luchismita Aich',
    meta: '5 reviews · Google',
    when: '7 months ago',
    stars: 5,
    text:
      'Absolutely loved my haircut and hair color service! The stylist did an amazing job suggesting a style and shade that suited me perfectly. The haircut has a great finish. Definitely worth it and will be visiting again.',
  },
  {
    name: 'Bulbul Malhotra',
    meta: '2 reviews · Google',
    when: '7 months ago',
    stars: 5,
    text:
      'I really like the way she talked sweetly and my make up was totally osm 😍 and I also say to all the girls please visit one here and u really like 💗',
  },
  {
    name: 'Rishi Koiri',
    meta: '5 reviews · 1 photo · Google',
    when: '7 months ago',
    stars: 5,
    text:
      'Excellent 👌 service. Provide a priority to customer demands and fulfill accordingly.',
  },
  {
    name: 'Sunita Mohanty Rout',
    meta: '1 review · Google',
    when: '6 months ago',
    stars: 5,
    text:
      'My hairstyles was nice .I will recommended to everyone come & take ur hair services one time .best services here. Thank you 😊',
  },
  {
    name: 'S Rout',
    meta: '4 reviews · Google',
    when: 'a year ago',
    stars: 5,
    text:
      'I recently visited A1 salon and had a wonderful experience! The prices are reasonable for the quality of service. I highly recommend to anyone who looking for professional hair services 👍',
  },
]

export const services: Service[] = [
  {
    id: 'hair',
    index: '01',
    title: 'Hair',
    kicker: 'Cut · Style · Spa',
    copy:
      'Precision cuts, layered finishes and a hair spa ritual that ends with the kind of blow-dry you try to recreate at home.',
    from: '₹250',
    image: '/images/hair-spa.jpg',
  },
  {
    id: 'colour',
    index: '02',
    title: 'Colour',
    kicker: 'Global · Fashion · Streaks',
    copy:
      'Root touch-ups, global shades and fashion colour matched to your skin tone — the service our reviews talk about most.',
    from: '₹800',
    image: '/images/hair-colour.jpg',
  },
  {
    id: 'chemical',
    index: '03',
    title: 'Smoothing',
    kicker: 'Keratin · Rebonding · Straightening',
    copy:
      'Salon-grade smoothing for hair that behaves in Bhubaneswar humidity. Keratin from ₹3,000, rebonding from ₹5,000.',
    from: '₹3,000',
    image: '/images/hero.jpg',
  },
  {
    id: 'bridal',
    index: '04',
    title: 'Bridal',
    kicker: 'HD & Airbrush-ready makeup',
    copy:
      'Party looks in Crylon or MAC, and full bridal HD from ₹7,000 — including draping and styling on the day.',
    from: '₹2,500',
    image: '/images/bride.jpg',
  },
  {
    id: 'skin',
    index: '05',
    title: 'Skin',
    kicker: 'Facials · Detan · Threading',
    copy:
      'Glow, aroma pearl and bridal facials, de-tan for face and body, and brows shaped in under five minutes.',
    from: '₹40',
    image: '/images/facial.jpg',
  },
  {
    id: 'men',
    index: '06',
    title: 'Men',
    kicker: 'Grooming · Clean-up · Makeup',
    copy:
      'Clean-ups, charcoal and goji masks, sharp styling and groom makeup for the men who book the next slot before leaving.',
    from: '₹400',
    image: '/images/men.jpg',
  },
]

export const marquee = [
  'Hair cuts',
  'Global colour',
  'Keratin',
  'Rebonding',
  'Hair spa',
  'Bridal HD makeup',
  'Threading',
  'Waxing',
  'De-tan',
  'Men’s grooming',
  'Nail art',
]

export const femaleMenu: MenuGroup[] = [
  {
    title: 'Hair cuts',
    items: [
      { name: 'Hair cut', price: '250' },
      { name: 'Advance cut', price: '400' },
      { name: 'Creative cut', price: '600' },
      { name: 'Kids cut', price: '150 / 250' },
    ],
  },
  {
    title: 'Hair spa & care',
    items: [
      { name: 'Normal spa', price: '700 – 900', note: 'S / M / L' },
      { name: 'Deep conditioning spa', price: '900 – 1,300', note: 'S / M / L' },
      { name: 'Keratin spa', price: '1,000 – 2,000', note: 'S / M / L' },
      { name: 'Anti-dandruff treatment', price: '800 – 1,200', note: 'S / M / L' },
      { name: 'Coconut / olive / mint oil massage', price: '250 – 350' },
    ],
  },
  {
    title: 'Colour',
    items: [
      { name: 'Root touch', price: '800 – 1,200', note: 'S / M / L' },
      { name: 'Global colour', price: '2,000 – 3,500', note: 'S / M / L' },
      { name: 'Fashion colour', price: '2,500 – 5,000', note: 'S / M / L' },
      { name: 'Per streak', price: '250' },
      { name: 'Fashion streak', price: '300' },
    ],
  },
  {
    title: 'Chemical & smoothing',
    items: [
      { name: 'Keratin treatment', price: '3,000 – 5,000', note: 'S / M / L' },
      { name: 'Smoothing', price: '3,500 – 4,500', note: 'S / M / L' },
      { name: 'Straightening', price: '4,000 – 5,000', note: 'S / M / L' },
      { name: 'Rebonding', price: '5,000 – 6,000', note: 'S / M / L' },
      { name: 'Ironing, with or without wash', price: '500 – 1,000' },
    ],
  },
  {
    title: 'Waxing & de-tan',
    items: [
      { name: 'Under arms', price: '100' },
      { name: 'Half / full arms', price: '300 / 600' },
      { name: 'Half / full legs', price: '500 / 900' },
      { name: 'Full body waxing', price: '2,200' },
      { name: 'Face / neck de-tan', price: '150' },
      { name: 'Full body de-tan', price: '2,200' },
    ],
  },
  {
    title: 'Makeup & bridal',
    items: [
      { name: 'Party makeup — Crylon', price: '2,500' },
      { name: 'Party makeup — MAC', price: '3,000' },
      { name: 'Bridal — Crylon / HD', price: '5,000 / 7,000' },
      { name: 'Bridal — MAC / HD', price: '8,000 / 10,000' },
      { name: 'Eyebrow threading', price: '40' },
      { name: 'Upper lip / forehead', price: '15 / 10' },
    ],
  },
]

export const maleMenu: MenuGroup[] = [
  {
    title: 'Clean-up & facial',
    items: [
      { name: 'Clean up', price: '500' },
      { name: 'Aroma whitening & brightening', price: '400' },
      { name: 'Fruit clean up', price: '400' },
      { name: 'Aroma pearl facial', price: '600' },
      { name: 'Glow facial — all skin', price: '700' },
      { name: 'Bridal facial', price: '800' },
    ],
  },
  {
    title: 'Add-on masks',
    items: [
      { name: '3-peel mask', price: '700' },
      { name: 'Charcoal mask', price: '800' },
      { name: 'Whitening mask', price: '700' },
      { name: 'Vegetable mask', price: '800' },
      { name: 'Green mask', price: '900' },
      { name: 'Goji mask', price: '1,000' },
    ],
  },
  {
    title: 'Grooming & groom makeup',
    items: [
      { name: 'Groom makeup — MAC', price: '2,500' },
      { name: 'Hair styling', price: '1,500' },
      { name: 'Party makeup', price: '800' },
      { name: 'Bridal glow facial', price: '1,800' },
    ],
  },
]
