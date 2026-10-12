/**
 * OrbitDesk — "Coming Soon" announcement content.
 *
 * This is the single place to edit the OrbitDesk copy shown in the hero badge, the flagship
 * section, the first-visit toast and the footer. Keep claims you can stand behind: this page
 * is shown to investors, so avoid numbers, dates or customer names unless they are real.
 */
export const orbitDesk = {
  name: 'OrbitDesk',
  status: 'Coming Soon',
  eyebrow: 'A Vescavia Product',
  tagline: 'Your work, in perfect orbit.',
  summary:
    "OrbitDesk is the product we're building in-house at Vescavia — designed from the ground up to bring clarity, speed and intelligence to the way you work.",
  pillars: [
    {
      id: 'unified',
      title: 'Unified by design',
      description: 'Everything that matters, gathered in one calm, connected place.',
    },
    {
      id: 'intelligent',
      title: 'Intelligence built in',
      description: 'Thoughtful automation that removes the busywork and keeps you in flow.',
    },
    {
      id: 'secure',
      title: 'Secure from day one',
      description: 'Privacy and reliability are foundations here, not afterthoughts.',
    },
  ],
  waitlist: {
    cta: 'Get early access',
    placeholder: 'you@company.com',
    note: "Join the list and we'll only email you about OrbitDesk.",
    success: "You're on the list. We'll be in touch as OrbitDesk gets closer to launch.",
    error: 'Something went wrong. Please try again in a moment.',
  },
} as const;
