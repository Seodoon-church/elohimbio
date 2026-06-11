import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Inter, Playfair_Display, Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seo = messages.seo as Record<string, string>;

  return {
    metadataBase: new URL('https://elohimbio.com'),
    title: seo?.defaultTitle ?? 'Elohim Bio',
    description: seo?.defaultDescription ?? '',
    openGraph: {
      type: 'website',
      locale,
      siteName: 'Elohim Bio',
      url: `https://elohimbio.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

const RTL_LOCALES = ['ar'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="h-16 lg:h-20" />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
