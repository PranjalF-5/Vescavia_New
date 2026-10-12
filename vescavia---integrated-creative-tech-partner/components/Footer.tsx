import React from 'react';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { SectionId } from '../types';
import { orbitDesk } from '../content/orbitdesk';

const svgProps = {
  viewBox: '0 0 24 24',
  width: 15,
  height: 15,
  stroke: 'currentColor',
  strokeWidth: 2,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vescavia-586158395/',
    icon: <Linkedin size={15} aria-hidden="true" />,
  },
  {
    label: 'X',
    href: 'https://x.com/thevescavia',
    icon: (
      <svg {...svgProps}>
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thevescavia/reels/',
    icon: <Instagram size={15} aria-hidden="true" />,
  },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/user/Fluffy-Stop2248/',
    icon: (
      <svg {...svgProps}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="12" r="2" />
        <path d="M19.07 4.93L17 7l2.07 2.07" />
        <path d="M4.93 19.07L7 17l-2.07-2.07" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@thevescavia',
    icon: (
      <svg {...svgProps}>
        <circle cx="7" cy="12" r="3" />
        <circle cx="17" cy="12" r="3" />
        <path d="M7 15l10-6" />
      </svg>
    ),
  },
];

const navItems = [
  { label: 'Home', href: `#${SectionId.HERO}` },
  { label: 'Work', href: `#${SectionId.REELS}` },
  { label: 'Services', href: `#${SectionId.SOLUTIONS}` },
  { label: 'Process', href: `#${SectionId.PROCESS}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative overflow-hidden px-4 pb-6 pt-10 md:pb-8 md:pt-16">
      <div className="container mx-auto">
        <div className="glass rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* Brand */}
            <div className="max-w-sm">
              <a href={`#${SectionId.HERO}`} className="group inline-flex items-center gap-3" aria-label="Vescavia home">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 shadow-glow transition-transform duration-300 group-hover:scale-105">
                  <img src="/Logo.png" alt="" width={24} height={24} className="h-6 w-6 object-contain logo-on-accent" />
                </span>
                <span className="text-lg font-semibold tracking-tight text-black dark:text-white">Vescavia</span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                An integrated creative-tech partner building brands, products and intelligent systems that compound.
              </p>
              <div className="glass-pill mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="eyebrow !text-[9px] text-emerald-700 dark:text-emerald-400">System Online</span>
              </div>
            </div>

            {/* OrbitDesk teaser */}
            <a
              href={`#${SectionId.ORBITDESK}`}
              className="glass-pill glass-interactive group flex max-w-xs items-center gap-4 rounded-3xl p-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 shadow-glow">
                <img src="/Logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain logo-on-accent" />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block !text-[10px] text-accent-text">
                  {orbitDesk.status}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-base font-semibold tracking-tight text-black dark:text-white">
                  {orbitDesk.name}
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="block text-xs text-gray-600 dark:text-gray-400">{orbitDesk.eyebrow}</span>
              </span>
            </a>

            {/* Links */}
            <nav aria-label="Footer">
              <ul className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition-colors hover:text-black dark:hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hairline my-8" />

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="neo flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-300 hover:text-accent-text dark:text-gray-300 "
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="eyebrow !text-[10px] text-gray-500 dark:text-gray-400">© {currentYear} Vescavia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
