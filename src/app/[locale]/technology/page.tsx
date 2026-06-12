import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages.technology as Record<string, unknown>)?.meta as Record<string, string>;
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: { title: meta?.title, description: meta?.description },
    alternates: {
      canonical: `https://elohimbio.com/${locale}/technology`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://elohimbio.com/${l}/technology`]),
      ),
    },
  };
}

export default function TechnologyPage() {
  const t = useTranslations('technology');

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/technology/ginseng-detail.jpg"
          alt={t('hero.title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
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

      {/* Incubator Farming */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('incubator.eyebrow')}
              </span>
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-2">
                {t('incubator.title')}
              </h2>
              <p className="text-gold font-medium mb-6">{t('incubator.subtitle')}</p>
              <p className="text-slate leading-relaxed mb-6">
                {t('incubator.description')}
              </p>
              <ul className="space-y-3">
                {(t.raw('incubator.advantages') as string[]).map((adv, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-moss font-bold mt-0.5">&#10003;</span>
                    <span className="text-slate text-sm">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/technology/incubator-collage.jpg"
                alt={t('incubator.title')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal font-heading text-center mb-10">
            {t('incubator.comparisonTitle')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {(t.raw('comparison.headers') as string[]).map((h, i) => (
                    <th
                      key={i}
                      className={`px-4 py-3 text-left text-sm font-semibold ${
                        i === 0 ? 'text-charcoal bg-mist' : i === 1 ? 'text-slate bg-gray-50' : 'text-forest bg-forest/10'
                      } ${i === 0 ? 'w-1/4' : 'w-[37.5%]'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(t.raw('comparison.rows') as string[][]).map((row, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-charcoal bg-mist">{row[0]}</td>
                    <td className="px-4 py-3 text-sm text-slate">{row[1]}</td>
                    <td className="px-4 py-3 text-sm text-forest font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-16 md:py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
              {t('fertilizer.eyebrow')}
            </span>
            <h2 className="text-3xl font-bold text-charcoal font-heading mb-2">
              {t('fertilizer.title')}
            </h2>
            <p className="text-gold font-medium">{t('fertilizer.subtitle')}</p>
          </div>
          <p className="text-slate leading-relaxed max-w-3xl mx-auto text-center mb-12">
            {t('fertilizer.description')}
          </p>

          {/* Growth photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/technology/growth-day1.jpg', label: 'Day 1' },
              { src: '/images/technology/growth-day7.jpg', label: 'Day 7' },
              { src: '/images/technology/growth-day11.jpg', label: 'Day 11' },
              { src: '/images/technology/growth-day15.jpg', label: 'Day 15' },
            ].map((photo) => (
              <div key={photo.label} className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image src={photo.src} alt={photo.label} fill className="object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white font-semibold text-sm">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ginsenoside Chart */}
      <section className="py-16 md:py-20 bg-forest text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t('ginsenoside.eyebrow')}
          </span>
          <h2 className="text-3xl font-bold font-heading mb-3">{t('ginsenoside.title')}</h2>
          <p className="text-white/70 mb-12">{t('ginsenoside.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(t.raw('ginsenoside.items') as Array<{crop: string; component: string; multiplier: number; unit: string}>).map((item) => (
              <div key={item.crop} className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="text-5xl font-bold text-gold mb-1">
                  {item.multiplier}<span className="text-2xl">{item.unit}</span>
                </div>
                <p className="text-white font-semibold mb-1">{item.component}</p>
                <p className="text-white/60 text-sm">{item.crop}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-white/40 text-xs">{t('ginsenoside.note')}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <blockquote className="text-3xl md:text-4xl font-bold text-charcoal font-heading mb-6 italic">
            &ldquo;{t('philosophy.quote')}&rdquo;
          </blockquote>
          <p className="text-gold font-medium mb-6">{t('philosophy.author')}</p>
          <p className="text-slate leading-relaxed">{t('philosophy.body')}</p>
        </div>
      </section>
    </>
  );
}
