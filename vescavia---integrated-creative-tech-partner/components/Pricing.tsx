import React from 'react';
import { SectionId, PricingTier } from '../types';
import { Check, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const tiers: PricingTier[] = [
  {
    name: 'Foundation',
    price: 'Custom',
    priceDetail: 'tailored entry point',
    subtitle: 'For ambitious startups ready to build systematic growth',
    features: [
      '6-8 video edits + motion graphics',
      'Website maintenance + 1 landing page',
      'Audio mixing + SFX library access',
      'Bi-weekly strategy syncs',
      'Dedicated Slack channel',
      'Monthly performance reviews',
    ],
    minTerm: '3-Month Minimum',
    buttonText: 'Start Building',
  },
  {
    name: 'Growth',
    price: 'Custom',
    priceDetail: 'scalable investment',
    subtitle: 'For scaling brands serious about market leadership',
    features: [
      '12-15 video edits + advanced motion',
      '2 landing pages + A/B testing + CRO',
      'Full sound design + 1 custom composition',
      'Weekly strategic planning calls',
      'Priority development support',
      'Quarterly business reviews + CD',
    ],
    minTerm: '6-Month Preferred',
    buttonText: 'Accelerate Growth',
    isPopular: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    priceDetail: 'enterprise velocity',
    subtitle: 'For enterprises demanding excellence at velocity',
    features: [
      'Unlimited production (within capacity)',
      'Full-stack development + infrastructure',
      'Complete sonic identity system',
      'Daily collaboration + rapid response',
      'Dedicated pod: Creative, Tech, Strategy',
      'White-glove partnership management',
    ],
    minTerm: '12-Month Strategic',
    buttonText: 'Book Consultation',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1.2,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const Pricing: React.FC = () => {
  return (
    <section id={SectionId.MODELS} className="py-24 md:py-32 bg-vescavia-light dark:bg-vescavia-black relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-vescavia-purple/30 bg-vescavia-purple/10 text-vescavia-purple font-mono text-[10px] uppercase tracking-widest">
            <Zap size={10} />
            <span>Retainer Models</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-black dark:text-white">
            Partnership Models
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Stop paying per hour. Start paying for a <strong>dedicated creative-tech engine</strong> that scales with you.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 items-stretch overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {tiers.map((tier) => (
            <motion.div 
              key={tier.name}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className={`flex flex-col relative group will-change-transform h-full min-w-[85vw] md:min-w-0 snap-center`}
            >
              {/* Premium Gradient Border Container for Popular Tier */}
              <div className={`h-full rounded-2xl p-[1px] ${
                  tier.isPopular 
                  ? 'bg-gradient-to-b from-vescavia-purple via-eccentric-blue to-vescavia-purple shadow-[0_0_40px_rgba(124,58,237,0.15)]' 
                  : 'bg-transparent'
              }`}>
                  
                  {/* Actual Card Content */}
                  <div className={`h-full flex flex-col bg-white dark:bg-dark-surface transition-colors duration-300 rounded-2xl overflow-hidden relative ${
                    tier.isPopular 
                      ? 'shadow-inner' 
                      : 'border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                  }`}>
                    
                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Popular Badge */}
                    {tier.isPopular && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-0 right-0 bg-gradient-to-l from-vescavia-purple to-eccentric-blue text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-bl-xl z-20 shadow-lg flex items-center gap-1"
                      >
                        <Sparkles size={10} /> Best Value
                      </motion.div>
                    )}

                    {/* Header Section */}
                    <div className="p-8 pb-0 relative z-10">
                      <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${tier.isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-vescavia-purple to-eccentric-blue' : 'text-black dark:text-white group-hover:text-eccentric-blue transition-colors'}`}>
                        {tier.name}
                      </h3>
                      <div className="min-h-[4rem] mb-6">
                        <p className="text-gray-500 text-xs font-mono leading-relaxed uppercase tracking-wide">
                          {tier.subtitle}
                        </p>
                      </div>
                      
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-black dark:text-white tracking-tighter">{tier.price}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-8">
                        {tier.priceDetail}
                      </div>
                    </div>

                    {/* Spec Sheet Table */}
                    <div className="flex-grow flex flex-col border-t border-black/10 dark:border-white/10 relative z-10">
                      {tier.features.map((feature, i) => (
                          <motion.div 
                            key={i} 
                            variants={featureItemVariants}
                            className="flex items-start gap-3 p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          >
                            <div className={`mt-0.5 flex-shrink-0 ${tier.isPopular ? 'text-vescavia-purple' : 'text-eccentric-blue'}`}>
                              <Check size={14} />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                              {feature}
                            </span>
                          </motion.div>
                      ))}
                    </div>

                    {/* Footer Section */}
                    <div className="p-6 bg-black/5 dark:bg-black/20 relative z-10">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5 dark:border-white/5">
                          <span className="text-[10px] uppercase font-mono text-gray-500">Commitment</span>
                          <span className="text-[10px] uppercase font-bold text-black dark:text-white tracking-wider">{tier.minTerm}</span>
                      </div>

                      <button className={`w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:gap-4 transition-all duration-300 shadow-md ${
                        tier.isPopular 
                          ? 'bg-gradient-to-r from-vescavia-purple to-eccentric-blue text-white hover:shadow-lg hover:brightness-110' 
                          : 'bg-black dark:bg-white/10 text-white hover:bg-eccentric-blue dark:hover:bg-white hover:text-white dark:hover:text-black'
                      }`}>
                        {tier.buttonText} <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;