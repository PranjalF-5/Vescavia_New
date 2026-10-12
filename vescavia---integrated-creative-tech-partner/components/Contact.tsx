import React, { useState } from 'react';
import { SectionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { site } from '../content/site';
import SectionHeader from './ui/SectionHeader';

type SubmitResult = null | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUEST_TIMEOUT_MS = 12_000;

const LIMITS = { name: 100, email: 254, phone: 30, company: 120, message: 2000 } as const;

const inputClass =
  'neo-inset w-full rounded-2xl border border-black/5 bg-transparent px-5 py-4 text-base font-medium text-black placeholder:text-gray-400 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/5 dark:text-white dark:placeholder:text-gray-600 md:text-lg';

const labelClass = 'eyebrow mb-2.5 block !text-[11px] text-gray-600 dark:text-gray-400';

const stepTitleClass =
  'mb-8 text-2xl font-semibold leading-tight tracking-tight text-black dark:text-white md:text-3xl';

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.3 },
};

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null);

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailValid = EMAIL_RE.test(formData.email.trim());
  const canProceed =
    step === 1 ? formData.name.trim() !== '' && emailValid : step === 2 ? true : formData.message.trim() !== '';

  const handleNext = () => {
    if (step < totalSteps && canProceed) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || step !== totalSteps) return;

    // Honeypot: humans never see or fill this field, so a value means a bot.
    if (new FormData(e.currentTarget).get('_gotcha')) {
      setSubmitResult('success');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !EMAIL_RE.test(payload.email) || !payload.message) {
      setSubmitResult('error');
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'Contact form' }),
        signal: controller.signal,
      });
      if (response.ok) {
        setSubmitResult('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setStep(1);
      } else {
        setSubmitResult('error');
      }
    } catch {
      setSubmitResult('error');
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  const contactItems = [
    {
      Icon: Mail,
      label: 'Email Us',
      value: site.email,
      href: `mailto:${site.email}`,
      hover: 'group-hover:bg-accent-2',
      external: true,
    },
    {
      Icon: Phone,
      label: 'Call Us',
      value: site.phone,
      href: site.phoneHref,
      hover: 'group-hover:bg-accent',
      external: false,
    },
    {
      Icon: MapPin,
      label: 'HQ Location',
      value: site.location,
      href: undefined,
      hover: 'group-hover:bg-accent-3',
      external: false,
    },
  ];

  return (
    <section id={SectionId.CONTACT} className="relative overflow-hidden py-12 md:py-28">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader
          eyebrow="Start Transmission"
          title={
            <>
              Ready to <span className="text-gradient">Upgrade?</span>
            </>
          }
          description="Turn your digital presence into a high-performance growth system. Fill out the form or reach us directly."
          className="mb-8 md:mb-16"
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Direct contact */}
          <div className="lg:col-span-4">
            <div className="glass rounded-[2rem] p-6 md:p-9">
              <h3 className="mb-5 flex items-center gap-2.5 text-lg md:mb-7 font-semibold tracking-tight text-black dark:text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                Direct Access
              </h3>

              <ul className="space-y-5 md:space-y-6">
                {contactItems.map(({ Icon, label, value, href, hover, external }) => {
                  const body = (
                    <>
                      <span
                        className={`neo flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-black transition-all duration-300 dark:text-white ${href ? `${hover} group-hover:text-on-accent` : ''}`}
                      >
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow mb-1 block !text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
                        <span className="flex items-center gap-1.5 break-words text-sm font-semibold text-black dark:text-white md:text-base">
                          {value}
                          {external && (
                            <ArrowUpRight
                              size={14}
                              aria-hidden="true"
                              className="hidden opacity-0 transition-opacity group-hover:opacity-100 md:block"
                            />
                          )}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="group flex items-center gap-4">
                          {body}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-12">
              {/* Progress */}
              <div className="absolute left-0 top-0 h-1 w-full bg-black/5 dark:bg-white/5">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-accent-2 to-accent"
                />
              </div>

              <div className="mb-8 flex items-center justify-between">
                <span className="eyebrow text-accent-text">
                  Step 0{step} / 0{totalSteps}
                </span>
                <div className="flex gap-2" aria-hidden="true">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i <= step ? 'bg-accent' : 'bg-black/10 dark:bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot (hidden from users and assistive tech) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" {...stepMotion} className="space-y-6">
                      <h3 className={stepTitleClass}>Who are we speaking with?</h3>
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full Name
                        </label>
                        <input
                          id="contact-name"
                          required
                          type="text"
                          name="name"
                          autoComplete="name"
                          maxLength={LIMITS.name}
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Type your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          required
                          type="email"
                          name="email"
                          autoComplete="email"
                          inputMode="email"
                          maxLength={LIMITS.email}
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          aria-invalid={formData.email !== '' && !emailValid}
                          className={inputClass}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" {...stepMotion} className="space-y-6">
                      <h3 className={stepTitleClass}>Tell us about your organization</h3>
                      <div>
                        <label htmlFor="contact-company" className={labelClass}>
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          autoComplete="organization"
                          maxLength={LIMITS.company}
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Ltd."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className={labelClass}>
                          Phone (Optional)
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          maxLength={LIMITS.phone}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputClass}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" {...stepMotion} className="space-y-6">
                      <h3 className={stepTitleClass}>What are you looking to build?</h3>
                      <div>
                        <label htmlFor="contact-message" className={labelClass}>
                          Project Details
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          name="message"
                          maxLength={LIMITS.message}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your goals, timeline, and budget..."
                          rows={5}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div aria-live="polite">
                  {submitResult === 'success' && (
                    <div
                      role="status"
                      className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                    >
                      <Check size={18} aria-hidden="true" />
                      Thank you! Your message has been sent.
                    </div>
                  )}
                  {submitResult === 'error' && (
                    <div
                      role="alert"
                      className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-700 dark:text-red-300"
                    >
                      Oops! Something went wrong. Please check your details and try again.
                    </div>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-7 dark:border-white/5">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="eyebrow flex items-center gap-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                      <ArrowLeft size={14} aria-hidden="true" /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="btn btn-primary group"
                    >
                      Next Step
                      <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting || !canProceed} className="btn btn-primary">
                      {submitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" aria-hidden="true" /> Sending...
                        </>
                      ) : (
                        <>
                          Launch Project <Mail size={15} aria-hidden="true" />
                        </>
                      )}
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
