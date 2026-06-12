import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Sprout, Factory, Heart, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.business as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
    alternates: {
      canonical: `https://elohimbio.com/${locale}/business`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://elohimbio.com/${l}/business`]),
      ),
    },
  };
}

const BUSINESS_ITEMS = [
  { key: 'smartfarm', icon: Sprout, image: '/images/about/team-smartfarm.jpg' },
  { key: 'factory', icon: Factory, image: '/images/products/garlic/bulk-harvest.jpg' },
  { key: 'healing', icon: Heart, image: '/images/products/sinsaengssam/harvest-leaves.jpg' },
] as const;

export default function BusinessPage() {
  const t = useTranslations('business');

  const investmentItems = t.raw('investment.items') as Array<{ value: string; label: string }>;
  const roadmapItems = t.raw('roadmap.items') as Array<{ phase: string; title: string; desc: string }>;

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/business/harvest-scene.jpg"
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

      {/* 3 Business Sections */}
      {BUSINESS_ITEMS.map((item, idx) => {
        const Icon = item.icon;
        const specs = t.raw(`${item.key}.specs`) as Array<{ label: string; value: string }>;
        const isEven = idx % 2 === 0;

        return (
          <section key={item.key} className={`py-16 md:py-20 ${isEven ? 'bg-cream' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? '' : ''}`}>
                <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg ${!isEven ? 'lg:order-2' : ''}`}>
                  <Image src={item.image} alt={t(`${item.key}.title`)} fill className="object-cover" />
                </div>
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-forest" />
                    <span className="text-moss text-xs font-semibold tracking-widest uppercase">
                      {t(`${item.key}.eyebrow`)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-charcoal font-heading mb-4">
                    {t(`${item.key}.title`)}
                  </h2>
                  <p className="text-slate leading-relaxed mb-6">
                    {t(`${item.key}.description`)}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {specs.map((spec) => (
                      <div key={spec.label} className="bg-forest/5 rounded-lg p-3 border border-forest/10">
                        <p className="text-xs text-slate mb-1">{spec.label}</p>
                        <p className="text-sm font-semibold text-charcoal">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Investment Highlights */}
      <section className="py-16 md:py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('investment.eyebrow')}
            </span>
            <h2 className="text-3xl font-bold font-heading">{t('investment.title')}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentItems.map((item) => (
              <div key={item.label} className="bg-white/10 rounded-2xl p-6 md:p-8 text-center backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{item.value}</div>
                <p className="text-white/70 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('roadmap.eyebrow')}
            </span>
            <h2 className="text-3xl font-bold text-charcoal font-heading">{t('roadmap.title')}</h2>
          </div>
          <div className="space-y-6">
            {roadmapItems.map((item, idx) => (
              <div
                key={item.phase}
                className="relative bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 flex gap-6"
              >
                <div className="hidden sm:flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    idx === 0 ? 'bg-forest' : idx === 1 ? 'bg-sage' : idx === 2 ? 'bg-moss' : 'bg-gold'
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < roadmapItems.length - 1 && (
                    <div className="w-px h-full bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gold tracking-wider uppercase">{item.phase}</span>
                  <h3 className="text-xl font-bold text-charcoal font-heading mt-1 mb-2">{item.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IR CTA */}
      <section className="py-16 md:py-20 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">{t('irCta.title')}</h2>
          <p className="text-white/70 mb-8">{t('irCta.description')}</p>
          <Link
            href="/ir"
            className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-4 rounded-full hover:bg-gold-light transition-colors duration-200"
          >
            {t('irCta.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
