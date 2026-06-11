import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Image from 'next/image';
import { Award, FlaskConical, ShieldCheck, Layers } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.about as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
  };
}

const STRENGTH_ICONS = [Award, FlaskConical, ShieldCheck, Layers];

export default function AboutPage() {
  const t = useTranslations('about');

  const history = t.raw('history.items') as Array<{ year: string; event: string }>;
  const strengths = t.raw('strengths.items') as Array<{ title: string; desc: string }>;

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/about/team-smartfarm.jpg"
          alt={t('hero.title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/team-inspection.jpg"
                alt={t('vision.eyebrow')}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('vision.eyebrow')}
              </span>
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-6 whitespace-pre-line">
                {t('vision.title')}
              </h2>
              <div className="space-y-4">
                <p className="text-slate leading-relaxed">{t('vision.vision')}</p>
                <p className="text-slate leading-relaxed">{t('vision.mission')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-20 bg-sage text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold font-heading mb-6">
            {t('vision.philosophy.title')}
          </h2>
          <p className="text-white/85 text-lg leading-relaxed">
            {t('vision.philosophy.body')}
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('history.eyebrow')}
            </span>
            <h2 className="text-3xl font-bold text-charcoal font-heading">
              {t('history.title')}
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-forest/20 -translate-x-1/2" />
            <div className="space-y-8">
              {history.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-forest rounded-full border-4 border-cream -translate-x-1/2 mt-1 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-2xl font-bold text-forest font-heading">{item.year}</span>
                    <p className="text-slate mt-1 leading-relaxed">{item.event}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
            <h3 className="text-sm font-semibold text-moss tracking-widest uppercase mb-2">
              CEO
            </h3>
            <p className="text-2xl font-bold text-charcoal font-heading mb-1">
              {t('ceo.name')}
            </p>
            <p className="text-gold font-medium mb-6">{t('ceo.title')}</p>
            <p className="text-slate leading-relaxed text-base">{t('ceo.bio')}</p>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="py-16 md:py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('strengths.eyebrow')}
            </span>
            <h2 className="text-3xl font-bold font-heading">
              {t('strengths.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item, idx) => {
              const Icon = STRENGTH_ICONS[idx];
              return (
                <div
                  key={item.title}
                  className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
