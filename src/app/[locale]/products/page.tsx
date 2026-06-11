import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Check, Leaf, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.products as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
  };
}

const PRODUCTS = [
  {
    key: 'sinsaengssam',
    hero: '/images/products/sinsaengssam/hero.jpg',
    detail: '/images/products/sinsaengssam/harvest-leaves.jpg',
    color: 'forest',
  },
  {
    key: 'doraji',
    hero: '/images/products/doraji/hero.jpg',
    detail: '/images/products/doraji/leaves.jpg',
    color: 'sage',
  },
  {
    key: 'garlic',
    hero: '/images/products/garlic/hero.jpg',
    detail: '/images/products/garlic/harvest-top.jpg',
    color: 'moss',
  },
] as const;

export default function ProductsPage() {
  const t = useTranslations();

  const whySproutsItems = t.raw('products.whySprouts.items') as Array<{ title: string; desc: string }>;
  const WHY_ICONS = [Leaf, Droplets, ShieldCheck];

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/products/sinsaengssam/hero.jpg"
          alt={t('products.hero.title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t('products.hero.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 whitespace-pre-line">
            {t('products.hero.title')}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto whitespace-pre-line">
            {t('products.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Why Sprouts */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('products.whySprouts.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-heading whitespace-pre-line">
              {t('products.whySprouts.title')}
            </h2>
            <p className="text-slate mt-4 max-w-3xl mx-auto">
              {t('products.whySprouts.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whySproutsItems.map((item, idx) => {
              const Icon = WHY_ICONS[idx];
              return (
                <div key={item.title} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center">
                  <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal font-heading mb-2">{item.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Detail Sections */}
      {PRODUCTS.map((product, idx) => {
        const benefits = t.raw(`products.${product.key}.benefits`) as string[];
        const isEven = idx % 2 === 0;

        return (
          <section
            key={product.key}
            id={product.key}
            className={`py-16 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-mist'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${!isEven ? '' : ''}`}>
                {/* Image side */}
                <div className={`space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image src={product.hero} alt={t(`products.${product.key}.name`)} fill className="object-cover" />
                    {t.has(`products.${product.key}.badge`) && (
                      <span className="absolute top-4 left-4 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {t(`products.${product.key}.badge`)}
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                    <Image src={product.detail} alt={t(`products.${product.key}.name`)} fill className="object-cover" />
                  </div>
                </div>

                {/* Content side */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-charcoal font-heading mb-2">
                    {t(`products.${product.key}.name`)}
                  </h2>
                  <p className="text-gold font-semibold mb-4">{t(`products.${product.key}.tagline`)}</p>

                  {/* Key Component Highlight */}
                  <div className="bg-forest/5 rounded-xl p-5 mb-6 border border-forest/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-forest">{t(`products.${product.key}.multiplier`)}</span>
                      <span className="text-charcoal font-medium">{t(`products.${product.key}.keyComponent`)}</span>
                    </div>
                    <p className="text-xs text-slate mt-1">{t(`products.${product.key}.certification`)}</p>
                  </div>

                  <p className="text-slate leading-relaxed mb-6">
                    {t(`products.${product.key}.description`)}
                  </p>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
                      {idx === 0 ? '주요 효능' : idx === 1 ? '주요 효능' : '주요 효능'}
                    </h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-moss mt-0.5 shrink-0" />
                          <span className="text-slate text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to eat & Storage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">섭취 방법</h4>
                      <p className="text-slate text-sm">{t(`products.${product.key}.howToEat`)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">보관 방법</h4>
                      <p className="text-slate text-sm">{t(`products.${product.key}.storage`)}</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-6 py-3 rounded-full hover:bg-sage transition-colors duration-200 text-sm"
                  >
                    {t('common.ctaContact')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
