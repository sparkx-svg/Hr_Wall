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

Once configured, `src/firebase.js` initializes the app and `src/context/AuthContext.jsx` exposes `currentUser`, `login`, `signup`, `loginWithGoogle`, `resetPassword`, and `logout` to the rest of the app via `useAuth()`.
