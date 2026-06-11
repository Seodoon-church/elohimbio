import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';

const SITE_LINKS = [
  { href: '/about', key: 'navAbout' },
  { href: '/technology', key: 'navTechnology' },
  { href: '/products', key: 'navProducts' },
  { href: '/business', key: 'navBusiness' },
  { href: '/board', key: 'navBoard' },
  { href: '/ir', key: 'navIR' },
  { href: '/contact', key: 'navContact' },
] as const;

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white font-heading">
              {t('siteName')}
            </Link>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              {t('siteTagline')}
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sitemap
            </h3>
            <ul className="space-y-2">
              {SITE_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li>{t('footerEmail')}</li>
              <li>{t('footerAddress')}</li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('langSelect')}
            </h3>
            <LocaleSwitcher />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">{t('footerCopyright')}</p>
          <Link
            href="/about"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {t('footerPrivacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
