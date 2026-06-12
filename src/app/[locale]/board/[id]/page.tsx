import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import BoardDetailClient from '@/components/board/BoardDetailClient';

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
  };
}

export default function BoardDetailPage() {
  return <BoardDetailClient />;
}
