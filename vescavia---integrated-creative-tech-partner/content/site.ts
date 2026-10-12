/**
 * Public, non-secret site configuration.
 * Everything in this file ships to the browser — never put API keys or tokens here.
 */
export const site = {
  /** Formspree form used by the contact form and the OrbitDesk waitlist. Public by design. */
  formEndpoint: 'https://formspree.io/f/xlgnkryp',
  email: 'thevescavia@gmail.com',
  phone: '+91 6299 586 911',
  phoneHref: 'tel:+916299586911',
  location: 'Gurgaon & Hyderabad, India',
} as const;
