import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en', 'zh-CN', 'zh-TW', 'ja', 'vi', 'th', 'id', 'ar', 'hi'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
