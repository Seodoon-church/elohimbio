import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Elohim Bio — Functional Sprout Agriculture Innovation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage() {
  let logoSrc = '';
  try {
    const logoPath = join(process.cwd(), 'public', 'images', 'logo', 'logo-circle.jpg');
    const logoData = await readFile(logoPath);
    logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`;
  } catch {
    // 로고 로드 실패 시 텍스트로 대체
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #1B4332 100%)',
          position: 'relative',
        }}
      >
        {/* 상단 골드 라인 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            display: 'flex',
            background: '#B7882C',
          }}
        />

        {/* 콘텐츠 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {/* 로고 */}
          {logoSrc ? (
            <img
              src={logoSrc}
              width={120}
              height={120}
              style={{ borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)' }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: '#52B788',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                fontWeight: 700,
                color: 'white',
              }}
            >
              E
            </div>
          )}

          {/* 사이트명 */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.08em',
              display: 'flex',
            }}
          >
            ELOHIM BIO
          </div>

          {/* 골드 구분선 */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#B7882C',
              display: 'flex',
            }}
          />

          {/* 슬로건 (영문 고정 - Satori 폰트 호환) */}
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            Functional Sprout Agriculture with Incubator Farming
          </div>
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            display: 'flex',
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
          }}
        >
          elohimbio.com
        </div>

        {/* 하단 골드 라인 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            display: 'flex',
            background: '#B7882C',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
