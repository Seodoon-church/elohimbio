import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactPageClient from '@/components/contact/ContactPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.contact as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
    alternates: {
      canonical: `https://elohimbio.com/${locale}/contact`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://elohimbio.com/${l}/contact`]),
      ),
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
