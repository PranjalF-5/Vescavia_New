import React, { useId, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { site } from '../../content/site';
import { orbitDesk } from '../../content/orbitdesk';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * OrbitDesk early-access signup. Posts to the same Formspree inbox as the contact form,
 * tagged with `source` so signups are easy to filter.
 */
const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [invalid, setInvalid] = useState(false);
  const inputId = useId();
  const hintId = useId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;

    // Honeypot: humans never see or fill this field, so a value means a bot.
    const honeypot = new FormData(e.currentTarget).get('_gotcha');
    if (honeypot) {
      setStatus('success');
      return;
    }

    const value = email.trim();
    if (!EMAIL_RE.test(value) || value.length > MAX_EMAIL_LENGTH) {
      setInvalid(true);
      return;
    }

    setInvalid(false);
    setStatus('submitting');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: value,
          source: 'OrbitDesk waitlist',
          _subject: 'OrbitDesk waitlist signup',
        }),
        signal: controller.signal,
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="glass flex items-start gap-3 rounded-2xl p-4 text-sm text-black dark:text-white"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <Check size={14} strokeWidth={3} />
        </span>
        <span className="leading-relaxed">{orbitDesk.waitlist.success}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div
        className={`glass flex flex-col gap-2 rounded-3xl p-2 transition-shadow focus-within:shadow-glow sm:flex-row sm:items-center sm:rounded-full sm:p-1.5 sm:pl-5 ${invalid ? 'ring-2 ring-red-500/60' : ''}`}
      >
        <input
          id={inputId}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalid) setInvalid(false);
          }}
          placeholder={orbitDesk.waitlist.placeholder}
          aria-invalid={invalid}
          aria-describedby={hintId}
          disabled={status === 'submitting'}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-sm text-black placeholder:text-gray-500 focus:outline-none dark:text-white dark:placeholder:text-gray-500 sm:w-0 sm:flex-1 sm:px-0 sm:py-2"
        />
        {/* Honeypot (hidden from users and assistive tech) */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full shrink-0 !px-5 !py-3 sm:w-auto">
          {status === 'submitting' ? (
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          ) : (
            <>
              <span>{orbitDesk.waitlist.cta}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
          <span className="sr-only">{status === 'submitting' ? 'Submitting' : ''}</span>
        </button>
      </div>
      <p
        id={hintId}
        role={invalid || status === 'error' ? 'alert' : undefined}
        className={`mt-3 pl-5 text-xs ${invalid || status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
      >
        {invalid
          ? 'Please enter a valid email address.'
          : status === 'error'
            ? orbitDesk.waitlist.error
            : orbitDesk.waitlist.note}
      </p>
    </form>
  );
};

export default WaitlistForm;
