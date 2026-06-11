'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';

const NAV_ITEMS = [
  { href: '/about', key: 'navAbout' },
  { href: '/technology', key: 'navTechnology' },
  { href: '/products', key: 'navProducts' },
  { href: '/business', key: 'navBusiness' },
  { href: '/board', key: 'navBoard' },
  { href: '/ir', key: 'navIR' },
  { href: '/contact', key: 'navContact' },
] as const;

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${
        scrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-circle.jpg"
              alt={t('siteName')}
              width={36}
              height={38}
              className="rounded-full"
            />
            <span className="text-lg font-bold tracking-tight font-heading">
              {t('siteName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-150
                    relative after:absolute after:bottom-0 after:left-0
                    after:h-0.5 after:bg-moss after:transition-all after:duration-200
                    ${isActive
                      ? 'text-white after:w-full'
                      : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
                    }
                  `}
                >
                  {t(key)}
                </Link>
              );
            })}
            <div className="ml-4">
              <LocaleSwitcher />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav className="lg:hidden bg-forest/95 backdrop-blur-md border-t border-white/10" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block px-3 py-3 rounded-lg text-base font-medium transition-colors
                    ${isActive
                      ? 'bg-sage text-white'
                      : 'text-white/80 hover:bg-sage/50 hover:text-white'
                    }
                  `}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
