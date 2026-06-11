import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import { PotencyBar } from '@/components/ui/PotencyBar';
import {
  ArrowRight,
  Leaf,
  Sprout,
  Factory,
  Heart,
  Truck,
  Cog,
  FlaskConical,
  Package,
} from 'lucide-react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface BarItem {
  label: string;
  component: string;
  multiplier: number;
  unit: string;
  pct: number;
}

interface GrowthStage {
  day: string;
  desc: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface HistoryEvent {
  year: string;
  event: string;
  major: boolean;
}

interface ProductCardMeta {
  components: string[];
}

const GROWTH_IMAGES = [
  '/images/technology/growth-day1.jpg',
  '/images/technology/growth-day7.jpg',
  '/images/technology/growth-day11.jpg',
  '/images/technology/growth-day15.jpg',
];

const PROCESS_ICONS = [Truck, Cog, FlaskConical, Package];

export default function HomePage() {
  const t = useTranslations();

  const stats = t.raw('home.stats.items') as StatItem[];
  const bars = t.raw('home.potency.bars') as BarItem[];
  const philosophyPoints = t.raw('home.philosophy.points') as string[];
  const tableHeaders = t.raw('home.incubator.tableHeaders') as string[];
  const tableRows = t.raw('home.incubator.tableRows') as string[][];
  const growthStages = t.raw('home.growth.stages') as GrowthStage[];
  const processSteps = t.raw('home.process.steps') as ProcessStep[];
  const historyEvents = t.raw('home.historyTimeline.events') as HistoryEvent[];
  const productCards = t.raw('home.products.cards') as ProductCardMeta[];

  const products = [
    {
      name: t('products.sinsaengssam.name'),
      tagline: t('products.sinsaengssam.tagline'),
      badge: t('products.sinsaengssam.badge'),
      image: '/images/products/sinsaengssam/sprout.jpg',
      components: productCards[0]?.components ?? [],
    },
    {
      name: t('products.doraji.name'),
      tagline: t('products.doraji.tagline'),
      badge: '',
      image: '/images/products/doraji/hero.jpg',
      components: productCards[1]?.components ?? [],
    },
    {
      name: t('products.garlic.name'),
      tagline: t('products.garlic.tagline'),
      badge: '',
      image: '/images/products/garlic/hero.jpg',
      components: productCards[2]?.components ?? [],
    },
  ];

  const businesses = [
    {
      icon: Sprout,
      title: t('home.business.smartfarm'),
      desc: t('home.business.smartfarmDesc'),
      image: '/images/about/team-smartfarm.jpg',
    },
    {
      icon: Factory,
      title: t('home.business.factory'),
      desc: t('home.business.factoryDesc'),
      image: '/images/products/garlic/bulk-harvest.jpg',
    },
    {
      icon: Heart,
      title: t('home.business.healing'),
      desc: t('home.business.healingDesc'),
      image: '/images/products/sinsaengssam/harvest-leaves.jpg',
    },
  ];

  return (
    <>
      {/* ===== 1. Hero ===== */}
      <section className="relative min-h-screen -mt-16 lg:-mt-20 flex items-center text-white overflow-hidden">
        <Image
          src="/images/hero/farm-incubator.jpg"
          alt={t('home.hero.imageAlt')}
          fill
          className="object-cover hero-bg-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-32 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-gold-light" />
              {t('home.hero.eyebrow')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 whitespace-pre-line">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 whitespace-pre-line leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-forest font-semibold px-8 py-4 rounded-full hover:bg-cream transition-colors text-center"
              >
                {t('home.hero.ctaPrimary')}
              </Link>
              <Link
                href="/ir"
                className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-center"
              >
                {t('home.hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>

        {/* Floating 800x badge */}
        <div className="absolute bottom-24 right-8 lg:right-16 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hidden md:block">
          <p className="text-3xl lg:text-4xl font-heading font-bold text-fern">
            {t('home.hero.badgeNum')}
          </p>
          <p className="text-xs text-white/70 mt-1 max-w-[160px]">
            {t('home.hero.badgeLbl')}
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full scroll-cue-dot" />
          </div>
          <span className="text-[10px] text-white/50 tracking-widest uppercase">
            {t('home.hero.scrollCue')}
          </span>
        </div>
      </section>

      {/* ===== 2. Stats Strip ===== */}
      <section className="bg-forest-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-forest px-6 py-10 md:py-14 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <CountUp
                      target={stat.value}
                      useComma={stat.value >= 1000}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white"
                    />
                    <span className="text-lg md:text-xl text-gold-light font-semibold">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-white/60 whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Philosophy ===== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/products/sinsaengssam/hero.jpg"
                  alt={t('home.philosophy.quote')}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="bg-forest/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {t('home.philosophy.tagMain')}
                  </span>
                  <span className="bg-white/90 text-forest text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm hidden sm:inline-block">
                    {t('home.philosophy.tagSub')}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-4 block">
                  {t('home.philosophy.eyebrow')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-6">
                  {t('home.philosophy.quote')}
                </h2>
                <p className="text-slate text-lg leading-relaxed mb-8">
                  {t('home.philosophy.body')}
                </p>
                <ul className="space-y-4">
                  {philosophyPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Leaf className="w-5 h-5 text-moss mt-0.5 shrink-0" />
                      <span className="text-charcoal font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 4. Potency Bars ===== */}
      <section className="py-20 md:py-28 bg-forest-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(82,183,136,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.potency.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                {t('home.potency.title')}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                {t('home.potency.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-8">
            {bars.map((bar: BarItem, i: number) => (
              <PotencyBar
                key={i}
                label={bar.label}
                component={bar.component}
                multiplier={bar.multiplier}
                unit={bar.unit}
                pct={bar.pct}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
            <span>{t('home.potency.baseLabel')}</span>
            <span>{t('home.potency.note')}</span>
          </div>
        </div>
      </section>

      {/* ===== 5. Incubator + Comparison ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/technology/incubator-collage.jpg"
                  alt={t('home.incubator.title')}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-forest/90 backdrop-blur-sm text-white rounded-xl px-5 py-3">
                  <p className="text-2xl md:text-3xl font-heading font-bold">
                    {t('home.incubator.waterNum')}
                  </p>
                  <p className="text-xs text-white/70 whitespace-pre-line">
                    {t('home.incubator.waterText')}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-4 block">
                  {t('home.incubator.eyebrow')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
                  {t('home.incubator.title')}
                </h2>
                <p className="text-gold font-semibold mb-6">
                  {t('home.incubator.subtitle')}
                </p>
                <p className="text-slate text-lg leading-relaxed mb-8">
                  {t('home.incubator.body')}
                </p>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-8 py-4 rounded-full hover:bg-sage transition-colors"
                >
                  {t('home.incubator.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="text-xl font-heading font-bold text-charcoal mb-6 text-center">
              {t('home.incubator.tableTitle')}
            </h3>
            <div className="overflow-x-auto">
              <table className="compare-table w-full min-w-[600px]">
                <thead>
                  <tr>
                    {tableHeaders.map((h: string, i: number) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row: string[], i: number) => (
                    <tr key={i}>
                      {row.map((cell: string, j: number) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 6. Growth Timeline ===== */}
      <section className="py-20 md:py-28 bg-mist">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.growth.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
                {t('home.growth.title')}
              </h2>
              <p className="text-slate max-w-xl mx-auto">
                {t('home.growth.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-px bg-moss/30" />
            {growthStages.map((stage: GrowthStage, i: number) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="text-center">
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden border-4 border-moss/30 mb-4">
                    <Image
                      src={GROWTH_IMAGES[i]}
                      alt={stage.desc}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-moss font-bold text-sm tracking-wider">
                    {stage.day}
                  </p>
                  <p className="text-charcoal font-medium mt-1">{stage.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Process (Crab Fertilizer) ===== */}
      <section className="py-20 md:py-28 bg-sage text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.process.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                {t('home.process.title')}
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                {t('home.process.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {processSteps.map((step: ProcessStep, i: number) => {
              const Icon = PROCESS_ICONS[i];
              return (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center relative">
                    <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-fern" />
                    </div>
                    <p className="text-fern text-xs font-bold tracking-wider mb-2">
                      {step.step}
                    </p>
                    <h3 className="text-lg font-heading font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm">{step.desc}</p>
                    {i < 3 && (
                      <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sage rounded-full items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-fern" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <div className="mt-12 text-center">
              <span className="text-4xl md:text-5xl font-heading font-bold text-fern">
                {t('home.process.footerNum')}
              </span>
              <p className="text-white/60 text-sm mt-2">
                {t('home.process.footerLabel')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 8. Business Pillars ===== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.business.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-heading">
                {t('home.business.title')}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {businesses.map(({ icon: Icon, title, desc, image }, i) => (
              <ScrollReveal key={title} delay={i * 150}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-line">
                  <div className="relative h-52">
                    <Image src={image} alt={title} fill className="object-cover" />
                    <span className="absolute top-4 left-4 bg-forest/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-forest" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-2 font-heading">
                      {title}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. Products ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.products.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-heading mb-3">
                {t('home.products.title')}
              </h2>
              <p className="text-slate max-w-xl mx-auto">
                {t('home.products.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 150}>
                <Link
                  href="/products"
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-line block"
                >
                  <div className="relative h-56 md:h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-charcoal mb-1 font-heading">
                      {product.name}
                    </h3>
                    <p className="text-slate text-sm mb-3">{product.tagline}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.components.map((comp: string) => (
                        <span
                          key={comp}
                          className="text-[11px] bg-fern-2 text-forest px-2 py-0.5 rounded-full font-medium"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-8 py-4 rounded-full hover:bg-sage transition-colors"
              >
                {t('home.products.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 10. History Timeline ===== */}
      <section className="py-20 md:py-28 bg-forest text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-fern text-sm font-semibold tracking-widest uppercase mb-3 block">
                {t('home.historyTimeline.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                {t('home.historyTimeline.title')}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                {t('home.historyTimeline.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="hist-scroll pb-4">
            <div className="flex gap-0 min-w-max relative">
              <div className="absolute top-5 left-0 right-0 h-px bg-white/20" />
              {historyEvents.map((ev: HistoryEvent, i: number) => (
                <div
                  key={i}
                  className="relative shrink-0 w-36 md:w-48 scroll-snap-start pt-12 px-2"
                >
                  <div
                    className={`absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                      ev.major
                        ? 'bg-fern border-fern shadow-[0_0_12px_rgba(149,213,178,0.6)]'
                        : 'bg-forest border-white/40'
                    }`}
                  />
                  <p
                    className={`text-sm font-bold mb-1 ${
                      ev.major ? 'text-fern' : 'text-white/60'
                    }`}
                  >
                    {ev.year}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      ev.major ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {ev.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. CTA Banner ===== */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/products/sinsaengssam/harvest-scene.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 whitespace-pre-line">
              {t('home.ctaBanner.title')}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              {t('home.ctaBanner.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold text-white font-semibold px-8 py-4 rounded-full hover:bg-gold-light transition-colors"
              >
                {t('home.ctaBanner.ctaConsumer')}
              </Link>
              <Link
                href="/ir"
                className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                {t('home.ctaBanner.ctaInvestor')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
