'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';

const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa',
  ar: 'العربية',
  hi: 'हिन्दी',
};

export function LocaleSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative inline-flex items-center">
      <Globe className="absolute left-2 w-4 h-4 text-white/60 pointer-events-none" />
      <select
        value={locale}
        onChange={handleChange}
        aria-label={t('langSelect')}
        className="
          appearance-none bg-white/10 text-white text-sm
          pl-8 pr-6 py-1.5 rounded-lg
          border border-white/20
          hover:bg-white/20 transition-colors
          cursor-pointer focus:outline-none focus:ring-2 focus:ring-moss
        "
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc} className="bg-forest text-white">
            {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
