'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Lock, AlertCircle } from 'lucide-react';

export default function IRLoginPage() {
  const t = useTranslations('ir.login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: Firebase Auth 연동
    setTimeout(() => {
      setError(t('errorNotAuthorized'));
      setLoading(false);
    }, 1200);
  }

  return (
    <section className="py-16 md:py-20 bg-charcoal min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-forest" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal font-heading">
              {t('title')}
            </h1>
            <p className="text-slate text-sm mt-2">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                {t('emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                {t('passwordLabel')}
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-white font-semibold py-3 rounded-full hover:bg-sage transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '...' : t('loginBtn')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate">
            {t('contactHint')}{' '}
            <Link href="/contact" className="text-moss hover:text-sage font-medium">
              {t('contactLink')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
