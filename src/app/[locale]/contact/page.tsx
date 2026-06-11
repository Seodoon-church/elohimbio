'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    // TODO: Firebase Functions 연동 후 실제 전송 로직 추가
    setTimeout(() => setStatus('success'), 1200);
  }

  if (status === 'success') {
    return (
      <section className="py-20 md:py-28 bg-cream min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-moss/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-moss" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal font-heading mb-3">
            {t('form.successTitle')}
          </h1>
          <p className="text-slate">{t('form.successMessage')}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t('hero.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 whitespace-pre-line">
            {t('hero.title')}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto whitespace-pre-line">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-charcoal mb-1">
                      {t('form.typeLabel')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal bg-white focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                    >
                      <option value="">{t('form.typeLabel')}</option>
                      <option value="consumer">{t('form.typeConsumer')}</option>
                      <option value="investor">{t('form.typeInvestor')}</option>
                      <option value="partnership">{t('form.typePartnership')}</option>
                      <option value="experience">{t('form.typeExperience')}</option>
                      <option value="other">{t('form.typeOther')}</option>
                    </select>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                        {t('form.nameLabel')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder={t('form.namePlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                        {t('form.emailLabel')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder={t('form.emailPlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
                        {t('form.phoneLabel')}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder={t('form.phonePlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-1">
                        {t('form.companyLabel')}
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder={t('form.companyPlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                      {t('form.messageLabel')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder={t('form.messagePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Privacy Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-forest border-gray-300 rounded focus:ring-forest"
                    />
                    <span className="text-sm text-slate">{t('form.privacyLabel')}</span>
                  </label>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4" />
                      {t('form.errorMessage')}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-forest text-white font-semibold py-4 rounded-full hover:bg-sage transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? t('form.submitting') : t('form.submitBtn')}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-charcoal font-heading mb-6">
                  {t('info.title')}
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs text-slate uppercase tracking-wider mb-1">Email</p>
                      <a
                        href={`mailto:${t('info.email')}`}
                        className="text-charcoal font-medium hover:text-forest transition-colors"
                      >
                        {t('info.email')}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs text-slate uppercase tracking-wider mb-1">Location</p>
                      <p className="text-charcoal font-medium">{t('info.location')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs text-slate uppercase tracking-wider mb-1">Response</p>
                      <p className="text-charcoal font-medium">{t('info.responseTime')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-mist h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-forest/40 mx-auto mb-2" />
                    <p className="text-slate text-sm">{t('info.location')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
