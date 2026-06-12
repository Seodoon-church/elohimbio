import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import BoardPageClient from '@/components/board/BoardPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.board as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
    alternates: {
      canonical: `https://elohimbio.com/${locale}/board`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://elohimbio.com/${l}/board`]),
      ),
    },
  };
}

export default function BoardPage() {
  return <BoardPageClient />;
}
