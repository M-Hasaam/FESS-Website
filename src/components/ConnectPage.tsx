import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Loader2,
  Plus,
  Send,
} from 'lucide-react';
import { CONNECT_FAQS, CONNECT_TOPICS, SOCIAL_LINKS } from '../data/fessData';
import { sendContactMessage } from '../utils/apiClient';
import { validateConnectForm } from '../utils/fessLogic';
import { FESS_EASE, Reveal } from './MotionPrimitives';
import { PageHero } from './ui/page-hero';

interface ConnectPageProps {
  onShowToast: (message: string) => void;
  introDelay?: number;
}

interface SentMessage {
  name: string;
  email: string;
  topic: string;
  message: string;
  emailId?: string | null;
}

export function ConnectPage({ onShowToast, introDelay = 0 }: ConnectPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(CONNECT_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMessage, setSentMessage] = useState<SentMessage | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateConnectForm({ name, email, topic, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
    };

    try {
      const result = await sendContactMessage(payload);

      if (!result.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(
          result.error || 'Could not send your message via EmailJS. Please try again.'
        );
        return;
      }

      setSentMessage({
        ...payload,
        emailId: result.id ?? null,
      });
      onShowToast(`Thank you, ${payload.name}! Your email has been sent to FESS.`);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setSubmitError(
        'Network error while reaching EmailJS. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldLabel =
    'block font-mono text-[11px] uppercase tracking-[0.18em] text-[#141923]/60 mb-2';
  const field =
    'w-full min-h-[48px] bg-transparent border-0 border-b border-[#141923]/30 px-0 py-3 text-base text-[#141923] placeholder:text-[#141923]/35 outline-none transition-colors focus:border-[#991B1B] disabled:opacity-60 sm:text-[15px]';

  return (
    <div>
      <PageHero
        eyebrow="Let's talk business"
        title="Connect with"
        accent="FESS."
        subtitle="Have questions about Enterprise Expo stalls, Pitch Arena rules, or Sell Me This Pen? Send a direct message to the FESS team."
        introDelay={introDelay}
      />

      <section className="bg-[#FAF6F0] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:px-8">
          {/* Left: contact form */}
          <Reveal className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">Direct desk</p>
            <h2 className="mt-6 font-[family-name:var(--font-headline)] text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-[#141923] sm:text-5xl">
              Send us a message.
            </h2>

            {sentMessage ? (
              <div
                role="status"
                className="mt-10 border-y border-dashed border-[#141923]/30 py-8"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-600" />
                  <div>
                    <h3 className="font-serif text-3xl leading-none text-[#141923]">
                      Message received
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      Thank you, <strong className="text-[#141923]">{sentMessage.name}</strong>.
                      Your inquiry regarding{' '}
                      <strong className="text-[#991B1B]">{sentMessage.topic}</strong> has been
                      dispatched. Our team will reply to{' '}
                      <span className="font-mono text-xs text-[#141923]">{sentMessage.email}</span>.
                    </p>
                    {sentMessage.emailId && (
                      <p className="mt-3 font-mono text-[11px] text-slate-500">
                        Ref: {sentMessage.emailId}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setSentMessage(null)}
                      className="mt-6 text-sm font-semibold text-[#991B1B] underline decoration-[#991B1B]/30 underline-offset-[6px] transition-colors hover:decoration-[#991B1B]"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-8">
                {submitError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 border-l-2 border-[#991B1B] bg-[#991B1B]/[0.06] px-4 py-3 text-xs text-[#7F1D1D] sm:text-sm"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#991B1B]" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={fieldLabel}>
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      autoComplete="name"
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={field}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-[#991B1B]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={fieldLabel}>
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={field}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-[#991B1B]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className={fieldLabel}>
                    Topic
                  </label>
                  {/* One-thumb quick topic chips for mobile */}
                  <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-2 sm:hidden">
                    {CONNECT_TOPICS.map((t) => {
                      const active = topic === t;
                      return (
                        <motion.button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          whileTap={{ scale: 0.96 }}
                          disabled={isSubmitting}
                          onClick={() => setTopic(t)}
                          className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            active
                              ? 'border-[#141923] bg-[#141923] text-[#FAF6F0]'
                              : 'border-[#141923]/30 text-[#141923]/75'
                          }`}
                        >
                          {t}
                        </motion.button>
                      );
                    })}
                  </div>
                  <select
                    id="contact-topic"
                    disabled={isSubmitting}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`${field} sr-only sm:not-sr-only sm:block`}
                  >
                    {CONNECT_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-msg" className={fieldLabel}>
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message or question here..."
                    className={`${field} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs font-medium text-[#991B1B]">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.985 }}
                  disabled={isSubmitting}
                  className="group inline-flex min-h-[52px] w-full items-center justify-between gap-3 bg-[#141923] px-6 text-sm font-semibold text-[#FAF6F0] transition-colors hover:bg-[#991B1B] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[18rem]"
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending message...</span>
                      <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
                    </>
                  ) : (
                    <>
                      <span>Send message to FESS</span>
                      <Send className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </Reveal>

          {/* Right: FAQs and official channels */}
          <Reveal delay={0.1} className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">
              Before you write
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-none text-[#141923] sm:text-5xl">
              Competition FAQs
            </h2>

            <div className="mt-8 border-t border-dashed border-[#141923]/30">
              {CONNECT_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question} className="border-b border-dashed border-[#141923]/30">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#991B1B]"
                    >
                      <span className="font-serif text-xl leading-snug text-inherit sm:text-2xl">
                        {faq.question}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-[#991B1B] transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: FESS_EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-md pb-6 text-sm leading-relaxed text-slate-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-[#141923] p-8 text-[#FAF6F0]">
              <h3 className="font-serif text-3xl leading-none">Official channels</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Follow updates for Movie Night, Qawali Night, and competition announcements.
              </p>
              <div className="mt-6 border-t border-dashed border-white/25">
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[56px] w-full items-center justify-between border-b border-dashed border-white/25 text-left text-sm font-semibold transition-colors hover:text-amber-300"
                >
                  <span className="flex items-center gap-3">
                    <Instagram className="h-4 w-4 text-amber-300" />
                    {SOCIAL_LINKS.instagram.handle}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[56px] w-full items-center justify-between border-b border-dashed border-white/25 text-left text-sm font-semibold transition-colors hover:text-amber-300"
                  >
                    <span className="flex items-center gap-3">
                      <Linkedin className="h-4 w-4 text-amber-300" />
                      {SOCIAL_LINKS.linkedin.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
