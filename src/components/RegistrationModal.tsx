import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, Check, CheckCircle2, Loader2, Ticket, X } from 'lucide-react';
import { COMPETITIONS, type CompetitionName } from '../data/fessData';
import { submitRegistration } from '../utils/apiClient';
import {
  getCompetitionMeta,
  validateRegistrationForm,
  type RegistrationRecord,
} from '../utils/fessLogic';
import { FESS_EASE } from './MotionPrimitives';

interface RegistrationModalProps {
  isOpen: boolean;
  initialEvent: CompetitionName;
  registrations: RegistrationRecord[];
  onClose: () => void;
  onRegisterSuccess: (record: RegistrationRecord) => void;
}

export function RegistrationModal({
  isOpen,
  initialEvent,
  registrations,
  onClose,
  onRegisterSuccess,
}: RegistrationModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<CompetitionName>(initialEvent);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [entityName, setEntityName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'passes'>('form');
  const [latestReceipt, setLatestReceipt] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedEvent(initialEvent);
      setViewMode('form');
      setLatestReceipt(null);
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, initialEvent]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const activeMeta = getCompetitionMeta(selectedEvent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateRegistrationForm({
      event: selectedEvent,
      fullName,
      phone,
      entityName,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const result = await submitRegistration({
        event: selectedEvent,
        fullName: fullName.trim(),
        phone: phone.trim(),
        entityName: entityName.trim(),
      });

      if (!result.ok || !result.record) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(
          result.error || 'Unable to confirm registration on the server. Please try again.'
        );
        return;
      }

      setLatestReceipt(result.record);
      setFullName('');
      setPhone('');
      setEntityName('');
      onRegisterSuccess(result.record);
    } catch {
      setSubmitError(
        'Network error while reaching the FESS registration server. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-md"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-modal-title"
            initial={{ opacity: 0, scale: 0.97, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 28 }}
            transition={{ duration: 0.24, ease: FESS_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[92dvh] sm:max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7F1D1D] to-[#141923] px-5 sm:px-6 pt-3 sm:pt-5 pb-4 sm:pb-5 text-white shrink-0">
              <div
                aria-hidden="true"
                className="w-10 h-1 rounded-full bg-white/30 mx-auto mb-3 sm:hidden"
              />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                    Event Registration
                  </span>
                  <h2 id="reg-modal-title" className="font-extrabold text-lg">
                    Register for FESS Event
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close registration modal"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional switcher if user has saved passes */}
            {registrations.length > 0 && (
              <div className="px-5 sm:px-6 pt-3 flex gap-2 border-b border-slate-100 pb-3 bg-[#FAF6F0]/60 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('form');
                    setLatestReceipt(null);
                  }}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    viewMode === 'form'
                      ? 'bg-[#991B1B] text-white'
                      : 'text-slate-600 hover:text-[#991B1B]'
                  }`}
                >
                  New Registration
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('passes')}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                    viewMode === 'passes'
                      ? 'bg-[#991B1B] text-white'
                      : 'text-slate-600 hover:text-[#991B1B]'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>My Passes ({registrations.length})</span>
                </button>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-5 sm:p-7 pb-8 sm:pb-7 overflow-y-auto overscroll-contain">
              {viewMode === 'passes' ? (
                <div className="space-y-3">
                  {registrations.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/15 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          {pass.event}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#991B1B]">
                          {pass.id}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700">
                        {pass.fullName} · {pass.entityName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1">
                        <span>{pass.timing}</span>
                        <span className="font-bold text-slate-800">{pass.feeLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : latestReceipt ? (
                <div className="space-y-5 text-center py-2">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">
                      Registration Confirmed
                    </p>
                    <h3 className="font-extrabold text-2xl text-slate-900 mt-1">
                      {latestReceipt.event}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Pass ID:{' '}
                      <strong className="font-mono text-[#991B1B]">
                        {latestReceipt.id}
                      </strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/15 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Participant / Lead</span>
                      <span className="font-bold text-slate-900">
                        {latestReceipt.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Business / Team</span>
                      <span className="font-bold text-slate-900">
                        {latestReceipt.entityName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Schedule</span>
                      <span className="font-mono text-slate-800">
                        {latestReceipt.timing}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fee Due</span>
                      <span className="font-mono font-bold text-[#991B1B]">
                        {latestReceipt.feeLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setLatestReceipt(null)}
                      className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                    >
                      Register Another
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-sm transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {submitError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#7F1D1D] text-xs flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#991B1B]" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <span className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Select Event
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {COMPETITIONS.map((comp) => {
                        const active = selectedEvent === comp.id;
                        return (
                          <button
                            key={comp.id}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => setSelectedEvent(comp.id)}
                            className={`relative min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold active:scale-[0.98] transition-all disabled:opacity-60 ${
                              active
                                ? 'border-2 border-[#991B1B] bg-red-50 text-[#991B1B]'
                                : 'border border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {comp.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Event Fee & Rule Summary */}
                  <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/12 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{activeMeta.id}</span>
                      <span className="font-mono text-[#991B1B] tabular-nums">
                        {activeMeta.feeLabel}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 tabular-nums">
                      {activeMeta.timing}
                    </div>
                    <div className="text-slate-600 pt-1 leading-relaxed">
                      {activeMeta.shortDesc}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-fullname"
                      className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                    >
                      Participant / Team Lead Name
                    </label>
                    <input
                      id="reg-fullname"
                      required
                      type="text"
                      autoComplete="name"
                      disabled={isSubmitting}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/70 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm font-medium disabled:opacity-60"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#991B1B] mt-1 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="reg-phone"
                        className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                      >
                        Contact Number
                      </label>
                      <input
                        id="reg-phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={isSubmitting}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/70 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm font-medium disabled:opacity-60"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#991B1B] mt-1 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="reg-entity"
                        className="block text-xs font-bold uppercase text-slate-600 mb-1.5"
                      >
                        Business / Team Name
                      </label>
                      <input
                        id="reg-entity"
                        type="text"
                        autoComplete="organization"
                        disabled={isSubmitting}
                        value={entityName}
                        onChange={(e) => setEntityName(e.target.value)}
                        placeholder="Optional for individual"
                        className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#FAF6F0]/70 border border-slate-200 focus:border-[#991B1B] outline-none text-base sm:text-sm font-medium disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] py-3.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm shadow-[0_10px_28px_-6px_rgba(153,27,27,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Registration...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Registration</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
