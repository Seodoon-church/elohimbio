# 디자인 시스템 — 엘로힘바이오

## 브랜드 방향성

> **자연 × 과학 × 프리미엄**
> 
> 30년 기술력의 신뢰감 + 자연 친화적 이미지 + 글로벌 프리미엄 건강식품 브랜드

---

## 컬러 팔레트

### 메인 컬러 (Tailwind config에 등록)

```javascript
// tailwind.config.ts
colors: {
  forest:   '#1B4332',  // 딥 그린 — 헤더, 주요 CTA, 강조
  sage:     '#2D6A4F',  // 미디엄 그린 — hover, 섹션 배경
  moss:     '#52B788',  // 라이트 그린 — 링크, 뱃지, 아이콘
  fern:     '#95D5B2',  // 연한 그린 — 배경 톤
  cream:    '#F8F5F0',  // 크림 화이트 — 기본 페이지 배경
  gold:     '#B7882C',  // 골드 — 프리미엄 포인트, 수상 배지
  'gold-light': '#D4A847',  // 밝은 골드 — hover
  charcoal: '#1C1C1E',  // 다크 — 헤드라인 텍스트
  slate:    '#4B5563',  // 중간 — 본문 텍스트
  mist:     '#F1F5F4',  // 연한 그린-화이트 — 카드 배경
}
```

### 사용 규칙

| 요소 | 컬러 |
|------|------|
| 페이지 배경 | `cream` (#F8F5F0) |
| 헤더 배경 | `forest` (#1B4332) |
| 헤더 텍스트 | `white` |
| CTA 버튼 (primary) | `forest` 배경 + `white` 텍스트 |
| CTA 버튼 (secondary) | `white` 배경 + `forest` 테두리 + `forest` 텍스트 |
| 섹션 강조 배경 | `sage` (#2D6A4F) |
| 카드 배경 | `white` or `mist` |
| 헤드라인 | `charcoal` (#1C1C1E) |
| 본문 | `slate` (#4B5563) |
| 링크 | `moss` (#52B788) hover → `sage` |
| 프리미엄 포인트 | `gold` (#B7882C) |
| 수치 강조 | `gold` 또는 `forest` |

---

## 타이포그래피

### 폰트 패밀리 (로케일별)

```css
/* 한국어 (ko) */
--font-heading: 'Noto Serif KR', serif;
--font-body:    'Noto Sans KR', sans-serif;

/* 영어 (en) */
--font-heading: 'Playfair Display', serif;
--font-body:    'Inter', sans-serif;

/* 중국어 간체 (zh-CN) */
--font-heading: 'Noto Serif SC', serif;
--font-body:    'Noto Sans SC', sans-serif;

/* 중국어 번체 (zh-TW) */
--font-heading: 'Noto Serif TC', serif;
--font-body:    'Noto Sans TC', sans-serif;

/* 일본어 (ja) */
--font-heading: 'Noto Serif JP', serif;
--font-body:    'Noto Sans JP', sans-serif;

/* 베트남어·태국어·인도네시아어 (vi, th, id) */
--font-heading: 'Playfair Display', serif;
--font-body:    'Inter', sans-serif;

/* 아랍어 (ar) — RTL */
--font-heading: 'Noto Naskh Arabic', serif;
--font-body:    'Noto Sans Arabic', sans-serif;

/* 힌디어 (hi) */
--font-heading: 'Noto Serif Devanagari', serif;
--font-body:    'Noto Sans Devanagari', sans-serif;
```

### 타입 스케일

```css
/* Tailwind 커스텀 폰트 사이즈 */
text-hero:   clamp(2.5rem, 5vw, 4rem)    /* 히어로 타이틀 */
text-h1:     clamp(2rem, 3.5vw, 3rem)    /* 페이지 타이틀 */
text-h2:     clamp(1.5rem, 2.5vw, 2rem)  /* 섹션 타이틀 */
text-h3:     clamp(1.25rem, 2vw, 1.5rem) /* 카드 타이틀 */
text-body:   1rem (16px)                  /* 본문 */
text-sm:     0.875rem (14px)              /* 캡션, 라벨 */
```

### 자간·행간

```css
letter-spacing-tight: -0.02em  /* 한글 헤드라인 */
letter-spacing-wide:   0.05em  /* 영문 소문자 버튼 레이블 */
line-height-heading:   1.2
line-height-body:      1.7
```

---

## 컴포넌트 스펙

### Button

```tsx
// Primary (주요 CTA)
className="
  bg-forest text-white font-semibold
  px-8 py-4 rounded-full
  hover:bg-sage transition-colors duration-200
  focus:ring-2 focus:ring-moss focus:ring-offset-2
  text-base tracking-wide
"

// Secondary (보조 CTA)
className="
  bg-transparent text-forest font-semibold
  px-8 py-4 rounded-full
  border-2 border-forest
  hover:bg-forest hover:text-white transition-colors duration-200
  text-base tracking-wide
"

// Gold (프리미엄 강조)
className="
  bg-gold text-white font-semibold
  px-8 py-4 rounded-full
  hover:bg-gold-light transition-colors duration-200
"
```

### Card

```tsx
// 기본 카드
className="
  bg-white rounded-2xl shadow-md
  p-6 md:p-8
  hover:shadow-lg transition-shadow duration-200
  border border-gray-100
"

// 제품 카드
className="
  bg-white rounded-2xl overflow-hidden shadow-md
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-300
"

// 통계 카드 (StatsSection)
className="
  bg-forest/10 rounded-2xl p-8 text-center
  border border-forest/20
"
```

### SectionTitle

```tsx
// 섹션 타이틀 + 부제목 패턴
<div className="text-center mb-12 md:mb-16">
  <span className="text-moss text-sm font-semibold tracking-widest uppercase mb-3 block">
    {eyebrow}  {/* 예: TECHNOLOGY | 핵심기술 */}
  </span>
  <h2 className="text-h2 font-bold text-charcoal mb-4 font-heading">
    {title}
  </h2>
  <p className="text-slate text-lg max-w-2xl mx-auto">
    {subtitle}
  </p>
</div>
```

### NavigationLink

```tsx
className="
  text-white/80 hover:text-white
  font-medium text-sm tracking-wide
  transition-colors duration-150
  relative after:absolute after:bottom-0 after:left-0
  after:w-0 after:h-0.5 after:bg-moss
  hover:after:w-full after:transition-all after:duration-200
"
```

---

## 레이아웃

### 컨테이너

```tsx
// 표준 섹션 컨테이너
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// 좁은 컨텐츠 (블로그, 문의폼 등)
className="max-w-3xl mx-auto px-4 sm:px-6"

// 섹션 패딩
className="py-16 md:py-20 lg:py-24"
```

### 그리드

```tsx
// 3열 카드 그리드 (제품, 사업 소개)
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"

// 2열 그리드 (비교, 특징)
className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"

// 4열 통계
className="grid grid-cols-2 lg:grid-cols-4 gap-6"
```

---

## 섹션별 배경 패턴

```
홈 HeroSection:       bg-forest (딥 그린) + 오버레이
홈 StatsSection:      bg-cream
홈 BusinessPillars:   bg-mist (연한 그린)
홈 TechPreview:       bg-sage (미디엄 그린) + white 텍스트
홈 ProductHighlight:  bg-white
홈 CTASection:        bg-forest (딥 그린)

about:                교차 bg-white / bg-cream
technology:           교차 bg-white / bg-mist
products:             bg-cream 기본, 카드는 bg-white
business:             bg-white, 로드맵은 bg-forest
ir:                   bg-charcoal (프리미엄 다크)
contact:              bg-cream + 폼은 bg-white 카드
```

---

## 아이콘

```
라이브러리: lucide-react
크기 기본: 24px (w-6 h-6)
크기 대형: 40px (w-10 h-10) — 섹션 아이콘
크기 소형: 16px (w-4 h-4) — 인라인

주요 아이콘 매핑:
  스마트팜:     Sprout
  비료공장:     Factory
  치유센터:     Heart
  기술:         FlaskConical
  투자:         TrendingUp
  문의:         MessageCircle
  다운로드:     Download
  언어:         Globe
  로그인:       Lock
  체크:         CheckCircle2
  화살표:       ChevronRight, ArrowRight
```

---

## 이미지 가이드

### 비율

```
히어로 이미지:     16:9 또는 풀스크린
제품 카드 이미지:  4:3 (가로형)
제품 상세 이미지:  1:1 또는 3:4 (세로형)
팀/대표 이미지:   1:1 (정사각형, 원형 크롭)
배경 이미지:      와이드 (21:9)
```

### 파일 형식 & 최적화

```
형식: WebP 우선 (next/image 자동 변환)
히어로: 1920×1080 원본
카드: 800×600 원본
아이콘/로고: SVG
Firebase Storage 폴더:
  /products/sinsaengssam/
  /products/doraji/
  /products/garlic/
  /about/
  /technology/
```

### 플레이스홀더 (사진 확보 전)
```tsx
// next/image placeholder
<Image
  src="/placeholder-sinsaengssam.jpg"
  alt={t('products.sinsaengssam.imageAlt')}
  fill
  className="object-cover"
  placeholder="blur"
/>
```

---

## 애니메이션

```css
/* 기본 트랜지션 */
transition-duration: 200ms   /* 버튼, 링크 hover */
transition-duration: 300ms   /* 카드 hover, 드로어 */
transition-duration: 500ms   /* 페이지 전환 */

/* 스크롤 진입 애니메이션 (Intersection Observer) */
초기: opacity-0 translate-y-8
진입: opacity-100 translate-y-0
duration: 600ms
easing: ease-out

/* 수치 카운트업 (StatsSection) */
진입 시 0 → 목표값 애니메이션
duration: 2000ms
easing: ease-out
```

---

## RTL (아랍어) 특수 처리

```tsx
// layout.tsx에서 dir 설정
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>

// Tailwind RTL 변형자 예시
className="mr-4 rtl:mr-0 rtl:ml-4"
className="text-left rtl:text-right"
className="flex-row rtl:flex-row-reverse"

// 아이콘 미러링 (방향성 아이콘만)
className="rtl:scale-x-[-1]"  // ChevronRight → 좌향
```

---

## 반응형 브레이크포인트

```
sm:  640px   모바일 가로
md:  768px   태블릿
lg:  1024px  소형 데스크톱
xl:  1280px  데스크톱
2xl: 1536px  와이드스크린
```

### 헤더 반응형
- `lg:` 이상 → 풀 네비게이션 바
- `lg:` 미만 → 햄버거 메뉴 (Sheet/드로어)

---

## globals.css 기본 설정

```css
@import "tailwindcss";

@layer base {
  :root {
    --color-forest:   #1B4332;
    --color-sage:     #2D6A4F;
    --color-moss:     #52B788;
    --color-fern:     #95D5B2;
    --color-cream:    #F8F5F0;
    --color-gold:     #B7882C;
    --color-charcoal: #1C1C1E;
    --color-slate:    #4B5563;
    --color-mist:     #F1F5F4;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-cream);
    color: var(--color-charcoal);
  }

  /* 아랍어 폰트 */
  :lang(ar) {
    font-family: 'Noto Sans Arabic', sans-serif;
  }

  /* 힌디어 폰트 */
  :lang(hi) {
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
}
```
