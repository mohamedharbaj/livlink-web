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

## Before first deploy (important order)
1. Deploy the Firestore index first (`firestore.indexes.json` lives in the Android repo): `firebase deploy --only firestore`.
   The city queries use `city` + `createdAt` and fail without this index.
2. (Optional but recommended) App Check: register the web app with reCAPTCHA v3 in Firebase Console, then set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
3. Run `npm install` once and commit the generated `package-lock.json`.
