# CLAUDE.md — 엘로힘바이오 홈페이지 마스터 지시서

## 프로젝트 개요

- **사이트명**: 엘로힘바이오 (Elohim Bio)
- **도메인**: elohimbio.com
- **목적**: 소비자(제품 구매·체험) + 투자자(IR) 동시 대응 공식 홈페이지
- **핵심 제품**: 신생삼(새싹삼), 신생 도라지, 신생 마늘 — 인큐베이터 농법 + 홍게 해양 바이오 비료
- **핵심 차별화**: 진세노사이드 F2 일반 대비 800배, 잎·줄기만 섭취하는 철학

---

## 기술 스택 (절대 변경 금지)

```
Framework:   Next.js 15 (App Router)
Language:    TypeScript (strict mode)
Styling:     Tailwind CSS v4
i18n:        next-intl
Backend:     Firebase (Firestore + Storage + Auth + Functions)
Hosting:     Firebase Hosting
```

### 패키지 설치 명령
```bash
npx create-next-app@latest elohimbio --typescript --tailwind --app --src-dir
cd elohimbio
npm install next-intl firebase firebase-admin
npm install -D @types/node
```

---

## 다국어 (i18n) 규칙

### 지원 언어 (10개)
| 코드 | 언어 | 비고 |
|------|------|------|
| `ko` | 한국어 | 기본 언어 (fallback) |
| `en` | 영어 | 글로벌 공용 |
| `zh-CN` | 중국어 간체 | 중국 본토 |
| `zh-TW` | 중국어 번체 | 대만·홍콩 |
| `ja` | 일본어 | 고단가 시장 |
| `vi` | 베트남어 | 동남아 |
| `th` | 태국어 | 동남아 |
| `id` | 인도네시아어 | 할랄 시장 |
| `ar` | 아랍어 | RTL 레이아웃 |
| `hi` | 힌디어 | 인도 |

### 라우팅 구조
```
elohimbio.com/ko/        ← 기본
elohimbio.com/en/
elohimbio.com/zh-CN/
elohimbio.com/ar/        ← RTL
```

### RTL 처리 (아랍어 전용)
- `<html dir="rtl">` 적용
- Tailwind: `rtl:` 변형자 활용
- 레이아웃 미러링 필수

### 번역 파일 위치
```
src/
└── messages/
    ├── ko.json   ← 기준본 (모든 키 포함)
    ├── en.json
    ├── zh-CN.json
    ├── zh-TW.json
    ├── ja.json
    ├── vi.json
    ├── th.json
    ├── id.json
    ├── ar.json
    └── hi.json
```

---

## 디렉토리 구조

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx          ← locale별 html dir 설정
│       ├── page.tsx            ← 홈 (/)
│       ├── about/
│       │   └── page.tsx        ← 회사소개
│       ├── technology/
│       │   └── page.tsx        ← 핵심기술
│       ├── products/
│       │   └── page.tsx        ← 제품
│       ├── business/
│       │   └── page.tsx        ← 사업소개
│       ├── ir/
│       │   ├── page.tsx        ← IR (로그인 필요)
│       │   └── login/
│       │       └── page.tsx    ← IR 로그인
│       └── contact/
│           └── page.tsx        ← 문의하기
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LocaleSwitcher.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── BusinessPillars.tsx
│   │   └── CTASection.tsx
│   ├── technology/
│   │   ├── ComparisonTable.tsx
│   │   └── GinsenosideChart.tsx
│   ├── ir/
│   │   ├── IRLoginForm.tsx
│   │   └── IRDashboard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SectionTitle.tsx
├── lib/
│   ├── firebase.ts             ← Firebase 클라이언트 초기화
│   ├── firebase-admin.ts       ← Firebase Admin 초기화
│   └── auth.ts                 ← Auth 헬퍼
├── messages/                   ← 번역 파일
└── middleware.ts               ← next-intl 미들웨어
```

---

## 페이지별 상세 명세

### 1. 홈 (/)
**목적**: 소비자 + 투자자 두 타깃 동시 대응

**섹션 순서**:
1. **HeroSection** — 풀스크린 배경(신생삼 이미지), 슬로건, 두 CTA 버튼
   - CTA 1: "제품 보기" → `/[locale]/products`
   - CTA 2: "투자자 IR" → `/[locale]/ir`
2. **StatsSection** — 핵심 수치 3개
   - 30년+ 기술력
   - 진세노사이드 F2 800배
   - 연간 홍게 처리 4,500톤
3. **BusinessPillars** — 3대 사업 카드
   - 스마트팜 / 비료공장 / 치유센터
4. **TechnologyPreview** — 인큐베이터 농법 한 줄 소개 + 링크
5. **ProductHighlight** — 신생삼·도라지·마늘 3종 카드
6. **CTASection** — 문의하기 유도

### 2. 회사소개 (/about)
**섹션**:
1. 비전 & 미션
2. 이춘길 대표 연혁 타임라인 (1989~현재)
3. 엘로힘바이오 철학 ("뿌리가 아닌 잎·줄기를 먹는다")

### 3. 핵심기술 (/technology)
**섹션**:
1. 인큐베이터 농법 소개
2. 인큐베이터 농법 vs 고설 농법 비교표 (시각화)
3. 홍게 해양 바이오 비료 생산 프로세스 인포그래픽
4. 진세노사이드 F2/Rh2 함량 비교 차트
5. "단 한 방울의 물도 안 버린다" 철학 섹션

### 4. 제품 (/products)
**섹션**:
1. 신생삼 (새싹삼) — 간기능·항암·면역
2. 신생 도라지 — 기관지·호흡기
3. 신생 마늘 — 혈관·항균
4. 건강기능식품 (예정) — 출시 예정 안내
5. 할랄 인증 트랙 (id, ar 로케일에서만 표시)

### 5. 사업소개 (/business)
**섹션**:
1. 스마트팜 — IoT 자동화, 연중 재배
2. 비료공장 — 홍게 부산물 → 액상/분말 비료
3. 치유센터 — 체험 농장, 건강 프로그램 (예정)
4. 사업 단계별 로드맵 (2025~2028)

### 6. IR (/ir) — 로그인 필요
**접근 제어**: Firebase Auth (이메일/비밀번호)
- 비로그인 → `/ir/login` 리다이렉트
- 로그인 성공 → IR 대시보드

**IR 대시보드 섹션**:
1. 사업 개요 요약
2. 단계별 투자 규모 (1차 265억 / 2차 750억 / 총 1,000억)
3. 연간 예상 매출 (5년차 4,000억)
4. IR 자료 PDF 다운로드 (Firebase Storage)
5. 담당자 직접 연락

### 7. 문의하기 (/contact)
**폼 필드**:
- 문의 유형: 소비자 문의 / 투자자 문의 / 파트너십 / 기타
- 이름, 이메일, 연락처, 소속(선택), 메시지
- 제출 → Firestore 저장 + 관리자 이메일 알림 (Firebase Functions)

---

## Firebase 설정

### 환경변수 (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

### Firestore 컬렉션 구조
```
contacts/              ← 문의 내용
  {docId}/
    type: string       ← consumer | investor | partnership | other
    name: string
    email: string
    phone: string
    company: string
    message: string
    locale: string
    createdAt: timestamp

ir_users/              ← IR 접근 허용 사용자 목록
  {uid}/
    email: string
    name: string
    company: string
    grantedAt: timestamp
```

### Firebase Storage 구조
```
ir-documents/          ← IR 자료 (Auth 필요)
  business-plan.pdf
  financial-projection.pdf
products/              ← 제품 이미지 (공개)
  sinsaengssam/
  doraji/
  garlic/
```

### Firestore 보안 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 문의 폼: 누구나 쓰기 가능, 읽기 불가
    match /contacts/{docId} {
      allow create: if true;
      allow read: if false;
    }
    // IR 사용자 목록: 본인만 읽기 가능
    match /ir_users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

---

## 디자인 시스템

### 컬러 팔레트
```css
/* 메인 컬러 */
--color-forest:   #1B4332   /* 딥 그린 — 헤더, 주요 CTA */
--color-sage:     #2D6A4F   /* 미디엄 그린 — 섹션 배경 */
--color-moss:     #52B788   /* 라이트 그린 — 강조, 링크 */
--color-cream:    #F8F5F0   /* 크림 화이트 — 기본 배경 */
--color-gold:     #B7882C   /* 골드 — 프리미엄 포인트 */
--color-charcoal: #1C1C1E   /* 다크 — 본문 텍스트 */
--color-white:    #FFFFFF
```

### 타이포그래피
```css
/* 한국어/일본어/중국어: Noto Serif KR + Noto Sans KR */
/* 영어/기타: Playfair Display (헤드라인) + Inter (본문) */
/* 아랍어: Noto Sans Arabic */
/* 힌디어: Noto Sans Devanagari */
```

### 주요 컴포넌트 스타일
```
Button Primary:   bg-forest text-white hover:bg-sage
Button Secondary: border border-forest text-forest hover:bg-forest hover:text-white
Card:             bg-white rounded-2xl shadow-md p-6
Section:          py-20 px-4 max-w-7xl mx-auto
SectionTitle:     text-3xl font-bold text-charcoal mb-4
```

---

## 코딩 규칙

1. **모든 텍스트는 번역 키 사용** — 하드코딩 금지
   ```tsx
   // ❌ 금지
   <h1>엘로힘바이오</h1>
   // ✅ 올바른 방법
   const t = useTranslations('home');
   <h1>{t('hero.title')}</h1>
   ```

2. **이미지**: `next/image` 사용, `alt`에 번역 키 적용

3. **Firebase 클라이언트**: `lib/firebase.ts`에서만 초기화, 각 컴포넌트에서 import

4. **IR 보호**: middleware.ts에서 `/[locale]/ir` 경로 접근 시 Firebase Auth 토큰 검증

5. **반응형**: mobile-first, Tailwind breakpoints (`sm:` `md:` `lg:` `xl:`)

6. **접근성**: ARIA 레이블 필수, 키보드 탐색 지원

7. **성능**: 
   - 이미지 lazy loading
   - 컴포넌트 dynamic import (차트 등 무거운 컴포넌트)

---

## 개발 순서 (이 순서대로 진행)

```
Phase 1 — 기반 구조
  [ ] 1. Next.js 프로젝트 생성 + 패키지 설치
  [ ] 2. next-intl 설정 (middleware.ts, i18n.ts)
  [ ] 3. Firebase 초기화 (lib/firebase.ts, lib/firebase-admin.ts)
  [ ] 4. 디자인 시스템 (tailwind.config.ts, globals.css)
  [ ] 5. Layout 컴포넌트 (Header, Footer, LocaleSwitcher)

Phase 2 — 핵심 페이지
  [ ] 6. 홈 페이지 (모든 섹션)
  [ ] 7. 핵심기술 페이지
  [ ] 8. 제품 페이지
  [ ] 9. 회사소개 페이지
  [ ] 10. 사업소개 페이지

Phase 3 — 기능 페이지
  [ ] 11. 문의하기 + Firestore 연동
  [ ] 12. IR 로그인 페이지 (Firebase Auth)
  [ ] 13. IR 대시보드 (Storage PDF 다운로드)

Phase 4 — 번역 & 배포
  [ ] 14. 10개 언어 번역 파일 완성
  [ ] 15. Firebase Hosting 배포 설정
  [ ] 16. elohimbio.com 도메인 연결
```

---

## 배포 명령

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# Firebase 배포
firebase deploy --only hosting

# Functions 배포 (문의 이메일 알림)
firebase deploy --only functions
```

---

## 주의사항

- `ar` 로케일: 반드시 `dir="rtl"` 적용, Tailwind `rtl:` 변형자 사용
- `id`, `ar` 로케일: 제품 페이지에 할랄 인증 섹션 추가 표시
- IR 페이지: Firebase Auth 미들웨어 보호 필수 — 미인증 접근 시 `/[locale]/ir/login`으로 리다이렉트
- 환경변수: `.env.local`은 절대 커밋하지 않음 (`.gitignore` 확인)
- Firebase 보안 규칙은 `firestore.rules`와 `storage.rules` 파일로 관리
