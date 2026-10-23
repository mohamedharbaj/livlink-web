# LIVLINK Web

Next.js 14 + TypeScript + Tailwind, connected to the same Firebase project as the Android app
(same `ads` collection, same fields, same 7-day expiry, same phone rule).

## Run locally
1. `cp .env.example .env.local` and fill `NEXT_PUBLIC_FIREBASE_API_KEY` and `NEXT_PUBLIC_FIREBASE_APP_ID`
   (Firebase Console, Project settings, web app `livlink-web`).
2. `npm install` then `npm run dev`, open http://localhost:3000

## Deploy on Vercel
1. Push this folder to a new GitHub repo, then on vercel.com choose Add New, Project, import it.
2. Add the same variables from `.env.example` in Environment Variables, then Deploy.
3. Firebase Console, Authentication, Settings, Authorized domains: add your `*.vercel.app` domain.
   Without this, anonymous sign-in fails and publishing will not work.
4. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL and redeploy (enables the sitemap).
