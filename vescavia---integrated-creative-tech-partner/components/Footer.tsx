import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer id="footer" className="relative bg-black text-white py-8 border-t border-white/10 transition-colors duration-300 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">

          {/* Left: Brand & Status */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a href={`#${SectionId.HERO}`} className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-black font-mono overflow-hidden group-hover:bg-vescavia-purple group-hover:text-white transition-colors duration-300">
                <img src="/Logo.png" alt="Vescavia" className="w-full h-full object-contain p-0.5 invert-0 group-hover:invert transition-all duration-300" />
              </div>
              <span className="font-bold uppercase tracking-tight text-lg group-hover:text-vescavia-purple transition-colors duration-300">Vescavia</span>
            </a>

            {/* Compact System Status */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                System Online
              </span>
            </div>
          </div>

          {/* Center: Navigation (Pill/Text Row) */}
          <nav>
            <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <li><a href={`#${SectionId.HERO}`} className="hover:text-white hover:text-shadow-glow transition-all">Home</a></li>
              <li><a href={`#${SectionId.REELS}`} className="hover:text-white hover:text-shadow-glow transition-all">Work</a></li>
              <li><a href={`#${SectionId.SOLUTIONS}`} className="hover:text-white hover:text-shadow-glow transition-all">Services</a></li>
              <li><a href={`#${SectionId.PROCESS}`} className="hover:text-white hover:text-shadow-glow transition-all">Process</a></li>
              <li><a href={`#${SectionId.ABOUT}`} className="hover:text-white hover:text-shadow-glow transition-all">About</a></li>
            </ul>
          </nav>

          {/* Right: Socials & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Social Icons (Compact) */}
            <div className="flex gap-3">
              {[
                { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/in/vescavia-586158395/", label: "LinkedIn" },
                { icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>, href: "https://x.com/thevescavia", label: "X" },
                { icon: <Instagram size={14} />, href: "https://www.instagram.com/thevescavia/reels/", label: "Instagram" },
                { icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><circle cx="12" cy="12" r="2" /><path d="M19.07 4.93L17 7l2.07 2.07" /><path d="M4.93 19.07L7 17l-2.07-2.07" /></svg>, href: "https://www.reddit.com/user/Fluffy-Stop2248/", label: "Reddit" },
                { icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><path d="M7 15l10-6" /></svg>, href: "https://medium.com/@thevescavia", label: "Medium" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-vescavia-purple/20 hover:border-vescavia-purple transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest text-center md:text-right">
              © {currentYear} Vescavia
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;