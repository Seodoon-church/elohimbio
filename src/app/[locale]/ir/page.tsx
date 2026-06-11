import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Lock, ShieldCheck, FileText, TrendingUp } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.ir as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
  };
}

export default function IRPage() {
  const t = useTranslations('ir');

  return (
    <>
      {/* Hero Gate */}
      <section className="bg-charcoal min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading mb-3">
            {t('login.title')}
          </h1>
          <p className="text-white/60 mb-10 text-lg">
            {t('login.subtitle')}
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: FileText, label: '사업계획서' },
              { icon: TrendingUp, label: '재무 자료' },
              { icon: ShieldCheck, label: '기술 특허' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/ir/login"
            className="inline-block bg-gold text-white font-semibold px-10 py-4 rounded-full hover:bg-gold-light transition-colors duration-200 text-lg"
          >
            {t('login.loginBtn')}
          </Link>
          <p className="mt-6 text-white/40 text-sm">
            {t('login.contactHint')}{' '}
            <Link href="/contact" className="text-gold hover:text-gold-light underline">
              {t('login.contactLink')}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
