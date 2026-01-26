import React, { useState } from 'react';
import { Linkedin, Twitter, Github, Instagram, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Accordion state for mobile
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const NavLinks = () => (
     <ul className="space-y-4 text-sm font-bold uppercase tracking-wide">
       <li><a href={`#${SectionId.HERO}`} className="hover:text-vescavia-purple transition-colors">Home</a></li>
       <li><a href={`#${SectionId.REELS}`} className="hover:text-vescavia-purple transition-colors">Work</a></li>
       <li><a href={`#${SectionId.SOLUTIONS}`} className="hover:text-vescavia-purple transition-colors">Services</a></li>
       <li><a href={`#${SectionId.PROCESS}`} className="hover:text-vescavia-purple transition-colors">Process</a></li>
       <li><a href={`#${SectionId.ABOUT}`} className="hover:text-vescavia-purple transition-colors">About</a></li>
     </ul>
  );

  const ModelLinks = () => (
     <ul className="space-y-4 text-sm font-bold uppercase tracking-wide">
       <li><a href={`#${SectionId.MODELS}`} className="hover:text-vescavia-purple transition-colors">Foundation</a></li>
       <li><a href={`#${SectionId.MODELS}`} className="hover:text-vescavia-purple transition-colors">Growth</a></li>
       <li><a href={`#${SectionId.MODELS}`} className="hover:text-vescavia-purple transition-colors">Scale</a></li>
     </ul>
  );

  return (
    <footer id="footer" className="relative bg-vescavia-light dark:bg-vescavia-black text-black dark:text-white pt-12 pb-12 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">
           
           {/* Brand Column */}
           <div className="md:col-span-4 flex flex-col justify-between">
             <div className="mb-8">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded flex items-center justify-center font-black font-mono text-xl">
                   V
                 </div>
                 <span className="font-bold uppercase tracking-tight text-2xl">Vescavia</span>
               </div>
               <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-mono uppercase max-w-xs">
                 // Creative Tech Lab<br/>
                 Building integrated ecosystems for ambitious brands.
               </p>
             </div>
             
             <div className="flex gap-4">
                 {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                        <Icon size={18} />
                    </a>
                 ))}
             </div>
           </div>

           {/* Navigation Columns - Desktop (Visible on MD+) */}
           <div className="hidden md:block md:col-span-2">
             <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-6">Sitemap</h4>
             <NavLinks />
           </div>

           <div className="hidden md:block md:col-span-2">
             <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-6">Models</h4>
             <ModelLinks />
           </div>

           {/* Mobile Accordions */}
           <div className="md:hidden border-t border-black/10 dark:border-white/10 pt-4">
              <div className="mb-4">
                 <button 
                   onClick={() => toggleSection('sitemap')}
                   className="flex justify-between items-center w-full py-2 font-mono text-[10px] uppercase tracking-widest text-gray-500"
                 >
                    <span>Sitemap</span>
                    {openSection === 'sitemap' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </button>
                 <AnimatePresence>
                    {openSection === 'sitemap' && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                         <div className="pt-2 pb-4">
                            <NavLinks />
                         </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              <div className="mb-4 border-t border-black/10 dark:border-white/10 pt-4">
                 <button 
                   onClick={() => toggleSection('models')}
                   className="flex justify-between items-center w-full py-2 font-mono text-[10px] uppercase tracking-widest text-gray-500"
                 >
                    <span>Models</span>
                    {openSection === 'models' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </button>
                 <AnimatePresence>
                    {openSection === 'models' && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                         <div className="pt-2 pb-4">
                            <ModelLinks />
                         </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           {/* Newsletter / Status */}
           <div className="md:col-span-4 border-t md:border-t-0 border-black/10 dark:border-white/10 pt-8 md:pt-0">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-6">System Updates</h4>
                <div className="relative mb-6">
                    <input 
                        type="email" 
                        placeholder="ENTER EMAIL ADDRESS" 
                        className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-sm font-mono focus:outline-none focus:border-vescavia-purple transition-colors uppercase placeholder:text-gray-600"
                    />
                    <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest hover:text-vescavia-purple">
                        Subscribe
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        All Systems Operational
                    </span>
                </div>
           </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-black/10 dark:border-white/10 text-center md:text-left">
          <div className="text-[10px] font-mono text-gray-500 dark:text-gray-600 uppercase tracking-widest">
            © {currentYear} Vescavia. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;