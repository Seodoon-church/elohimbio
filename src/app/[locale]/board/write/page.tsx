import type { Metadata } from 'next';
import BoardWriteClient from '@/components/board/BoardWriteClient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BoardWritePage() {
  return <BoardWriteClient />;
}
