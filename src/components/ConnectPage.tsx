import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Linkedin,
  Loader2,
  Send,
} from 'lucide-react';
import { CONNECT_FAQS, CONNECT_TOPICS } from '../data/fessData';
import { sendContactMessage } from '../utils/apiClient';
import { validateConnectForm } from '../utils/fessLogic';
import { FESS_EASE, Reveal } from './MotionPrimitives';

interface ConnectPageProps {
  onShowToast: (message: string) => void;
}

interface SentMessage {
  name: string;
  email: string;
  topic: string;
  message: string;
  emailId?: string | null;
}

export function ConnectPage({ onShowToast }: ConnectPageProps) {
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

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-[#141923] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(153,27,27,0.35),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300 mb-4">
            Let&apos;s Talk Business
          </p>
          <h1
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
          >
            Connect With <span className="text-red-300">FESS</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed">
            Have questions about Enterprise Expo stalls, Pitch Arena rules, or Sell Me
            This Pen? Send a direct message to the FESS team.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left: Contact Form */}
            <Reveal className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-5 sm:p-9 shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] border border-slate-200/80">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                  Direct Desk
                </span>
                <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1 mb-5 sm:mb-6">
                  Send Us a Message
                </h2>

                {sentMessage ? (
                  <div
                    role="status"
                    className="p-5 sm:p-6 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/20 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900">
                          Message Received
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Thank you, <strong className="text-slate-900">{sentMessage.name}</strong>.
                          Your inquiry regarding{' '}
                          <strong className="text-[#991B1B]">{sentMessage.topic}</strong> has been
                          dispatched. Our team will reply to{' '}
                          <span className="font-mono text-xs text-slate-800">
                            {sentMessage.email}
                          </span>
                          .
                        </p>
                        {sentMessage.emailId && (
                          <p className="text-[11px] font-mono text-slate-500 mt-2">
                            Ref: {sentMessage.emailId}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSentMessage(null)}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] active:scale-[0.98] text-white text-sm font-semibold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {submitError && (
                      <div
                        role="alert"
                        className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#7F1D1D] text-xs sm:text-sm flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#991B1B]" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                        >
                          Your Name
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
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/80 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm disabled:opacity-60"
                        />
                        {errors.name && (
                          <p className="text-xs text-[#991B1B] mt-1 font-medium">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                        >
                          Email Address
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
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/80 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm disabled:opacity-60"
                        />
                        {errors.email && (
                          <p className="text-xs text-[#991B1B] mt-1 font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-bold uppercase text-slate-600 mb-2"
                      >
                        Topic
                      </label>
                      {/* One-thumb quick topic chips for mobile */}
                      <div
                        role="radiogroup"
                        aria-label="Topic"
                        className="flex flex-wrap gap-2 sm:hidden"
                      >
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
                              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                                active
                                  ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-sm'
                                  : 'bg-[#FAF6F0] text-slate-700 border-slate-200'
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
                        className="sr-only sm:not-sr-only sm:block sm:w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/80 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm font-medium disabled:opacity-60"
                      >
                        {CONNECT_TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-msg"
                        className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                      >
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
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/80 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm disabled:opacity-60"
                      />
                      {errors.message && (
                        <p className="text-xs text-[#991B1B] mt-1 font-medium">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.985 }}
                      disabled={isSubmitting}
                      className="w-full min-h-[50px] py-3.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm shadow-[0_10px_28px_-6px_rgba(153,27,27,0.3)] transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to FESS</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Right: Competition FAQs & Official Channels */}
            <Reveal delay={0.1} className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] border border-slate-200/80">
                <h2 className="font-extrabold text-xl text-slate-900 mb-4">
                  Competition FAQs
                </h2>
                <div className="space-y-3">
                  {CONNECT_FAQS.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={faq.question}
                        className="rounded-2xl bg-[#FAF6F0]/80 border border-slate-200/80 overflow-hidden"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full min-h-[52px] px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-3 font-bold text-sm text-slate-900 active:bg-slate-100/60 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#991B1B] transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180' : ''
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
                              <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#141923] rounded-3xl p-6 sm:p-7 text-white shadow-xl">
                <h3 className="font-bold text-lg mb-2">Official Channels</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Follow updates for Movie Night, Qawali Night, and competition
                  announcements.
                </p>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onShowToast('Opening @fess_fast on Instagram')}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-red-300" />
                    <span>@fess_fast</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onShowToast('Opening FESS on LinkedIn')}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-red-300" />
                    <span>LinkedIn</span>
                  </motion.button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
