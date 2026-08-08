# HRHub Pro - React & Tailwind CSS Web Application

A modern, production-grade React 18 application for managing free HR document templates, policy forms, and interactive workforce calculators.

## Tech Stack Highlights
- **Framework**: React 18 (Component-based SPA architecture)
- **Styling**: Tailwind CSS (Utility-first, responsive design, modern dark/light contrast)
- **Icons**: Lucide React / FontAwesome
- **Build System**: Vite (Lightning fast HMR & bundling)
- **State Management**: React Hooks (`useState`, `useMemo`, `useEffect`)

## Getting Started (Local Development)
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Start local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Immediate Offline Execution
You can also open `index.html` in the root folder directly in any browser without needing to run `npm install`.

## Deploying to GitHub Pages (automatic)

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the site automatically every time you push to `main`. No `gh-pages` package or manual build step needed.

**One-time setup after pushing this repo to GitHub:**
1. Go to the repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab).
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

Every subsequent push to `main` redeploys automatically.

### Manual deploy alternative
If you'd rather not use Actions, you can build locally and push the `dist/` folder to a `gh-pages` branch:
```bash
npm install
npm run build
npx gh-pages -d dist
```
(This requires `npm install gh-pages --save-dev` first, and Pages source set to the `gh-pages` branch instead of GitHub Actions.)

## Note on `functions/`
The `functions/` folder is a separate Firebase Cloud Function (`aiAssistant`) used by the AI assistant feature — it is **not** part of the static site build and is deployed separately via `firebase deploy --only functions`. See `.env.example` for wiring the deployed function URL into the frontend.

## Setting up Sign In / Sign Up (Google + Email/Password)

The "Sign In" / "Join Free Community" buttons in the navbar open a modal backed by Firebase Authentication. To make it work end-to-end:

1. **Create (or reuse) a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com).
2. **Enable sign-in methods**: in the console go to **Build → Authentication → Sign-in method**, then enable:
   - **Email/Password**
   - **Google**
3. **Register a web app**: **Project Settings → General → Your apps → Add app → Web (`</>`)**. Firebase will show you a config object with `apiKey`, `authDomain`, etc.
4. **Fill in `.env`**: copy `.env.example` to `.env` and paste those values into the `VITE_FIREBASE_*` variables.
5. **Add your deployed domain**: still in **Authentication → Settings → Authorized domains**, add your GitHub Pages / Netlify domain (localhost is already allowed by default) — otherwise Google sign-in will fail on the live site.
6. **If deploying via the included GitHub Actions workflow**: add the same `VITE_FIREBASE_*` values (plus `VITE_AI_API_URL`) as **Repo → Settings → Secrets and variables → Actions → New repository secret**. The workflow already reads them from `secrets.*` during the build step.

Once configured, `src/firebase.js` initializes the app and `src/context/AuthContext.jsx` exposes `currentUser`, `login`, `signup`, `loginWithGoogle`, `resetPassword`, `logout`, and `deleteAccount` to the rest of the app via `useAuth()`.

## Member Directory admin approval

New signups start with `status: "pending"` on their `members/{uid}` doc and are hidden from the public Member Directory until approved.

1. **Deploy `firestore.rules`** (there wasn't one in this repo before — Firestore's default is deny-all, so reads/writes will fail until you deploy some rules): `firebase deploy --only firestore:rules`, or paste the file's contents into **Firebase Console → Firestore Database → Rules**.
2. **Add your admin UID**: in `firestore.rules`, replace `REPLACE_WITH_YOUR_FIREBASE_AUTH_UID` with your own Firebase Auth UID (found in **Authentication → Users**). Only UIDs in that list can change a profile's `status`.
3. **Set `VITE_ADMIN_PASSWORD`** in `.env` — this is a client-side UI gate for the admin panel, not real access control; the Firestore rule above is what actually protects the data.
4. **Open the panel** at `#admin` (e.g. `http://localhost:5173/#admin`) while signed in with your admin account, enter the password, and approve/reject/revoke profiles.

## Deleting your account

Signed-in members can delete their own account from their profile modal ("Delete My Account"). This deletes their `members/{uid}` doc, any posts/job listings they created, and their Firebase Auth account. Firebase requires a recent sign-in to allow account deletion, so the flow re-authenticates first — via a fresh Google popup for Google users, or a password prompt for email/password users.
