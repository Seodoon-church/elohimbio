# Firebase 설정 스펙 — 엘로힘바이오

## 프로젝트 정보

```
Firebase Project ID: elohimbio (생성 필요)
Project Name:        Elohim Bio
Default Location:    asia-northeast3 (서울)
Plan:                Blaze (종량제) — Functions 사용을 위해 필수
```

---

## 1. Firebase 서비스 구성

### 사용 서비스

| 서비스 | 용도 | 플랜 |
|--------|------|------|
| Firebase Hosting | 웹사이트 배포 (elohimbio.com) | Spark/Blaze |
| Firestore | 문의 데이터 저장, IR 사용자 관리 | Blaze |
| Firebase Storage | 제품 이미지, IR 문서 PDF | Blaze |
| Firebase Auth | IR 페이지 투자자 로그인 | Spark/Blaze |
| Firebase Functions | 문의 이메일 알림 발송 | Blaze 필수 |

---

## 2. Firebase 초기화 코드

### 클라이언트 초기화 (src/lib/firebase.ts)

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db      = getFirestore(app);
export const storage = getStorage(app);
export const auth    = getAuth(app);
export default app;
```

### Admin 초기화 (src/lib/firebase-admin.ts)

```typescript
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const adminConfig = {
  credential: cert({
    projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

const adminApp = getApps().length === 0
  ? initializeApp(adminConfig, 'admin')
  : getApps().find(a => a.name === 'admin')!;

export const adminDb   = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
```

---

## 3. 환경변수

### .env.local (로컬 개발용, 절대 Git 커밋 금지)

```env
# Firebase 클라이언트 SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elohimbio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elohimbio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elohimbio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (서버사이드 전용)
FIREBASE_ADMIN_PROJECT_ID=elohimbio
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

### .gitignore에 반드시 포함

```
.env.local
.env.*.local
```

---

## 4. Firestore 데이터 구조

### contacts 컬렉션 (문의 폼)

```typescript
// 컬렉션: contacts
// 문서 ID: 자동 생성

interface Contact {
  type:      'consumer' | 'investor' | 'partnership' | 'experience' | 'other';
  name:      string;
  email:     string;
  phone:     string;
  company?:  string;        // 선택 필드
  message:   string;
  locale:    string;        // 'ko' | 'en' | 'zh-CN' | ...
  createdAt: Timestamp;     // serverTimestamp()
  status:    'new' | 'read' | 'replied';  // 기본값: 'new'
}
```

### ir_users 컬렉션 (IR 접근 허용 사용자)

```typescript
// 컬렉션: ir_users
// 문서 ID: Firebase Auth UID

interface IRUser {
  email:      string;
  name:       string;
  company:    string;
  grantedAt:  Timestamp;
  grantedBy:  string;   // 관리자 이메일
  isActive:   boolean;
}
```

---

## 5. Firestore 보안 규칙 (firestore.rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 문의 폼: 누구나 생성 가능, 읽기/수정/삭제 불가
    match /contacts/{docId} {
      allow create: if
        request.resource.data.keys().hasAll(['type','name','email','phone','message','locale','createdAt','status'])
        && request.resource.data.type in ['consumer','investor','partnership','experience','other']
        && request.resource.data.name is string
        && request.resource.data.name.size() <= 100
        && request.resource.data.message.size() <= 2000;
      allow read, update, delete: if false;
    }

    // IR 사용자: 본인 문서만 읽기 가능
    match /ir_users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid && resource.data.isActive == true;
      allow write: if false;
    }
  }
}
```

---

## 6. Firebase Storage 구조 및 보안 규칙

### 폴더 구조

```
gs://elohimbio.appspot.com/
├── products/                    ← 공개 (누구나 읽기)
│   ├── sinsaengssam/
│   │   ├── hero.webp
│   │   ├── detail-1.webp
│   │   └── detail-2.webp
│   ├── doraji/
│   │   ├── hero.webp
│   │   └── detail-1.webp
│   └── garlic/
│       ├── hero.webp
│       └── detail-1.webp
├── about/                       ← 공개
│   ├── ceo-portrait.webp
│   └── farm-overview.webp
├── technology/                  ← 공개
│   ├── incubator-farming.webp
│   └── crab-fertilizer.webp
└── ir-documents/                ← 인증된 IR 사용자만 접근
    ├── business-plan.pdf
    ├── financial-projection.pdf
    └── technology-overview.pdf
```

### Storage 보안 규칙 (storage.rules)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // 제품·회사 이미지: 공개 읽기
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }

    match /about/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }

    match /technology/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }

    // IR 문서: 인증된 IR 사용자만 읽기
    match /ir-documents/{fileName} {
      allow read: if
        request.auth != null
        && firestore.get(/databases/(default)/documents/ir_users/$(request.auth.uid)).data.isActive == true;
      allow write: if false;
    }
  }
}
```

---

## 7. Firebase Auth 설정

### 로그인 방식

```
활성화: 이메일/비밀번호 (Email/Password)
비활성화: Google, Facebook, etc. (IR은 관리자 발급 계정만)
```

### IR 사용자 계정 발급 프로세스 (관리자용)

```bash
# Firebase Admin SDK 또는 Firebase Console에서 수동 발급
# 1. Firebase Console → Authentication → 사용자 추가
# 2. 이메일 + 임시 비밀번호 설정
# 3. Firestore ir_users/{uid}에 문서 생성
# 4. 투자자에게 이메일로 계정 정보 전달

# Firebase Admin SDK로 자동화 시:
const userRecord = await adminAuth.createUser({
  email: 'investor@company.com',
  password: 'TempPassword123!',
  displayName: '투자자 이름',
});

await adminDb.collection('ir_users').doc(userRecord.uid).set({
  email: 'investor@company.com',
  name: '투자자 이름',
  company: '투자회사명',
  grantedAt: FieldValue.serverTimestamp(),
  grantedBy: 'admin@elohimbio.com',
  isActive: true,
});
```

---

## 8. Firebase Functions (문의 이메일 알림)

### functions/src/index.ts

```typescript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as nodemailer from 'nodemailer';

// 문의 폼 제출 시 관리자에게 이메일 발송
export const onContactCreated = onDocumentCreated(
  'contacts/{docId}',
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"엘로힘바이오 홈피" <${process.env.GMAIL_USER}>`,
      to: 'info@elohimbio.com',
      subject: `[새 문의] ${data.type} — ${data.name} (${data.company || '개인'})`,
      html: `
        <h2>새 문의가 접수되었습니다</h2>
        <table>
          <tr><td><b>유형</b></td><td>${data.type}</td></tr>
          <tr><td><b>이름</b></td><td>${data.name}</td></tr>
          <tr><td><b>이메일</b></td><td>${data.email}</td></tr>
          <tr><td><b>연락처</b></td><td>${data.phone}</td></tr>
          <tr><td><b>소속</b></td><td>${data.company || '—'}</td></tr>
          <tr><td><b>언어</b></td><td>${data.locale}</td></tr>
          <tr><td><b>내용</b></td><td>${data.message}</td></tr>
        </table>
      `,
    });
  }
);
```

### Functions 환경변수 설정

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD
```

---

## 9. Firebase Hosting 설정

### firebase.json

```json
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "trailingSlash": false,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ],
    "redirects": [
      {
        "source": "/",
        "destination": "/ko",
        "type": 302
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  }
}
```

### .firebaserc

```json
{
  "projects": {
    "default": "elohimbio"
  }
}
```

---

## 10. next-intl + Firebase Hosting 설정

### Next.js를 Static Export로 설정 (next.config.ts)

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Firebase Hosting은 정적 파일 제공
  trailingSlash: false,
  images: {
    unoptimized: true,        // Static export 시 next/image 최적화 비활성
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

### src/i18n/routing.ts

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en', 'zh-CN', 'zh-TW', 'ja', 'vi', 'th', 'id', 'ar', 'hi'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});
```

### src/middleware.ts

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

---

## 11. 배포 명령어 순서

```bash
# 1. Firebase 프로젝트 생성 (Firebase Console에서)
#    - 이름: elohimbio
#    - 위치: asia-northeast3 (서울)
#    - Blaze 플랜으로 업그레이드

# 2. Firebase CLI 설치 및 로그인
npm install -g firebase-tools
firebase login

# 3. 프로젝트 초기화
firebase init

# 4. Next.js 빌드 (정적 파일 생성)
npm run build
# → out/ 폴더에 정적 파일 생성됨

# 5. Firestore/Storage 규칙 배포
firebase deploy --only firestore:rules,storage

# 6. Functions 배포
firebase deploy --only functions

# 7. 웹사이트 배포
firebase deploy --only hosting

# 8. 전체 배포 (한번에)
npm run build && firebase deploy

# 9. 커스텀 도메인 연결 (Firebase Console)
#    Hosting → 커스텀 도메인 추가 → elohimbio.com
#    DNS: A 레코드 / TXT 레코드 설정
```

---

## 12. 도메인 연결 (elohimbio.com)

```
Firebase Console → Hosting → 커스텀 도메인 추가

1. "elohimbio.com" 입력
2. Firebase가 TXT 레코드 제공 → 도메인 등록 업체에서 설정
3. 소유권 확인 후 A 레코드 설정:
   - 151.101.1.195
   - 151.101.65.195
4. www.elohimbio.com도 동일하게 설정
5. SSL 인증서 자동 발급 (Let's Encrypt)
```

---

## 13. 비용 추정 (Blaze 플랜)

| 서비스 | 무료 한도 | 초과 비용 |
|--------|-----------|-----------|
| Hosting | 10GB 저장 / 월 360MB 전송 | $0.026/GB |
| Firestore | 1GB 저장 / 5만 읽기·쓰기/일 | $0.06/10만 |
| Storage | 5GB | $0.026/GB |
| Functions | 200만 호출/월 | $0.40/100만 |
| Auth | 무제한 | 무료 |

> 초기 트래픽 수준에서는 **월 $0~$5 수준** 예상
