import React, { useState } from 'react';
import { SectionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<null | 'success' | 'error'>(null);

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);
    try {
      const response = await fetch('https://formspree.io/f/xlgnkryp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });
      if (response.ok) {
        setSubmitResult('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setStep(1);
      } else {
        setSubmitResult('error');
      }
    } catch (err) {
      setSubmitResult('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="relative pt-32 pb-20 bg-vescavia-light dark:bg-vescavia-black transition-colors duration-300 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-transparent to-vescavia-purple/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Merged "Ready to Upgrade" Header */}
        <div className="mb-24 text-center md:text-left">
          <div className="max-w-4xl">
            <div className="font-mono text-xs text-eccentric-blue uppercase tracking-widest mb-4">
                  // Start Transmission
            </div>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-black dark:text-white">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-eccentric-blue to-vescavia-purple">Upgrade?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Turn your digital presence into a high-performance growth system. Fill out the form or reach us directly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left Column: Direct Contact Info (Styled to fit the new vibe) */}
          <div className="lg:col-span-4 space-y-12">
            <div className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold uppercase text-black dark:text-white mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-vescavia-purple rounded-full animate-pulse"></span>
                Direct Access
              </h3>

              <div className="space-y-8">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thevescavia@gmail.com" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white group-hover:bg-eccentric-blue group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Email Us</span>
                    <span className="text-lg font-bold text-black dark:text-white group-hover:text-eccentric-blue transition-colors flex items-center gap-2">
                      thevescavia@gmail.com <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white group-hover:bg-vescavia-purple group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Call Us</span>
                    <span className="text-lg font-bold text-black dark:text-white group-hover:text-vescavia-purple transition-colors">
                      +1 (555) 123-4567
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">HQ Location</span>
                    <span className="text-lg font-bold text-black dark:text-white">
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-8">
            <div className="relative bg-white dark:bg-dark-surface border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  className="h-full bg-gradient-to-r from-eccentric-blue to-vescavia-purple"
                />
              </div>

              <div className="mb-8 flex justify-between items-center">
                <span className="font-mono text-xs text-eccentric-blue uppercase tracking-widest">
                  Step 0{step} / 0{totalSteps}
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= step ? 'bg-vescavia-purple' : 'bg-gray-200 dark:bg-white/10'}`} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-8">Who are we speaking with?</h3>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Type your name"
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-lg md:text-2xl font-bold text-black dark:text-white focus:outline-none focus:border-eccentric-blue transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-2xl font-bold text-black dark:text-white focus:outline-none focus:border-eccentric-blue transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-8">Tell us about your organization</h3>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Ltd."
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-2xl font-bold text-black dark:text-white focus:outline-none focus:border-eccentric-blue transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone (Optional)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-2xl font-bold text-black dark:text-white focus:outline-none focus:border-eccentric-blue transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-8">What are you looking to build?</h3>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Project Details</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your goals, timeline, and budget..."
                          rows={4}
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-xl font-medium text-black dark:text-white focus:outline-none focus:border-eccentric-blue transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitResult === 'success' && (
                  <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 font-semibold text-center">Thank you! Your message has been sent.</div>
                )}
                {submitResult === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 font-semibold text-center">Oops! Something went wrong. Please try again.</div>
                )}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : <div />}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-eccentric-blue dark:hover:bg-eccentric-blue hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={submitting}
                    >
                      Next Step <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="group flex items-center gap-2 px-10 py-4 bg-vescavia-purple text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-lg shadow-vescavia-purple/20 hover:shadow-xl"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : (<><span>Launch Project</span> <Mail size={14} /></>)}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;