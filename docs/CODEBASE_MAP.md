# Codebase Map

> **Last Verified:** 2026-11-21  
> **Base Commit:** `2479571` (`main`)  
> **Scope Note:** This map covers tracked source, test, public asset, configuration, and CI/CD files. Generated, vendor, cache, and secret directories/files (`node_modules/`, `.git/`, `dist/`, `coverage/`, `.env*`) are intentionally omitted.

---

## 1. Annotated Project File Tree

```text
budget-manager/
├── .firebaserc                              # Default Firebase project alias (budget-manager-e11d2)
├── .gitignore                               # Ignores node_modules/, dist/, coverage/, .env*, .firebase/, IDE/agent dirs
├── database.rules.json                      # Firebase RTDB security & validation rules (per-user auth.uid isolation)
├── eslint.config.js                         # ESLint 9 flat config (JS/JSX, react-hooks, react-refresh, Vitest test globals)
├── firebase.json                            # Firebase Hosting & RTDB rules config (dist/, SPA rewrite, database.rules.json)
├── index.html                               # Vite HTML entry point (#root mount, loads /src/main.jsx)
├── package.json                             # NPM scripts (dev, build, lint, preview, test, test:coverage) & dependencies
├── package-lock.json                        # Locked dependency tree
├── README.md                                # Project overview, features, tech stack, and local setup guide
├── vite.config.js                           # Vite bundler configuration (@vitejs/plugin-react)
├── vitest.config.js                         # Vitest runner config (jsdom, vitest.setup.js, V8 coverage)
├── vitest.setup.js                          # Global test setup (@testing-library/jest-dom, react-i18next mock)
├── .github/workflows/
│   ├── test.yml                             # PR CI (main): npm ci, lint, test:coverage, PR coverage comment, build
│   └── firebase-hosting-merge.yml           # CD (push to main): builds dist/ and deploys to Firebase Hosting live channel
├── public/
│   ├── favicon.svg                          # Application favicon
│   ├── icons.svg                            # SVG icon sprite sheet consumed by Icon atom
│   └── LICENSE                              # License for public assets
└── src/
    ├── main.jsx                             # App bootstrap: StrictMode, Redux Provider, BrowserRouter, Roboto fonts, i18n
    ├── index.css                            # Global CSS variables, light/dark/high-contrast & font-size root classes
    ├── config/
    │   ├── firebase.js                      # Initializes Firebase app, Auth, and RTDB from VITE_FIREBASE_* env vars
    │   └── i18n.js                          # i18next configuration with LanguageDetector & bundled en/pl/de/fr resources
    ├── constants/
    │   ├── categories.js                    # EXPENSE_CATEGORIES and INCOME_CATEGORIES lists
    │   └── colors.js                        # CATEGORY_COLORS, LIGHT_CHART_COLORS, DARK_CHART_COLORS palettes
    ├── hooks/
    │   ├── useAuth.js (+ .test.js)          # Firebase onAuthStateChanged listener, initial RTDB fetch, logout handler
    │   ├── useFirebaseSync.js (+ .test.js)  # Reactive effect syncing theme, accessibility, welcome & transactions to RTDB
    │   └── useUIAffects.js (+ .test.js)     # Applies theme, high-contrast, reduced-motion, font-size & --accent* vars to <html>
    ├── store/
    │   ├── index.js                         # Redux Toolkit store (transactions, auth, theme, accessibility)
    │   ├── firebaseSync.js (+ .test.js)     # RTDB helpers: syncFromFirebase, saveToFirebase, fetchAllUserData
    │   └── slices/
    │       ├── accessibilitySlice.js (+ .test.js) # highContrast, reducedMotion, fontSize state & actions
    │       ├── authSlice.js (+ .test.js)          # Auth state, localStorage user persistence, hasCompletedWelcome
    │       ├── themeSlice.js (+ .test.js)         # Theme mode (dark/light) and accentColor state
    │       └── transactionSlice.js (+ .test.js)   # Transactions, preferences, budgetLimits, recurringItems & selectors
    ├── utils/
    │   ├── exportUtils.js (+ .test.js)      # downloadFile, convertToCSV, exportTransactionsToCSV/JSON
    │   └── formatters.js (+ .test.js)       # getCurrencySymbol, formatCurrency (USD, EUR, GBP, JPY, PLN)
    ├── views/                               # Page-level routes (no .test.jsx files in src/views/)
    │   ├── App/ (App.jsx, App.css)          # Root layout, MotionConfig, Routes, auth & onboarding guards
    │   ├── Dashboard/ (Dashboard.jsx, .css) # Balance/income/expense summary, budget warnings, recent activity, skeleton
    │   ├── Legal/ (Legal.jsx, .css)         # Public Impressum and AGB/terms page (/legal)
    │   ├── Login/ (Login.jsx, .css)         # Login/registration container wrapping LoginForm
    │   ├── Reports/ (Reports.jsx, .css)     # Recharts analytics grid (structure, daily/monthly trends, stats, merchants)
    │   ├── Settings/ (Settings.jsx)         # Composes profile, theme, language, preferences, limits, recurring & danger zone
    │   ├── Transactions/ (Transactions.jsx, .css) # TransactionForm, TransactionFilters, CSV/JSON export, animated list
    │   └── Welcome/ (Welcome.jsx, .css)     # First-time onboarding view dispatching completeWelcome
    └── components/                          # Atomic Design UI components (each folder has .jsx and usually .css)
        ├── atoms/
        │   ├── AnimatedView/                # Framer Motion page transition wrapper (no test)
        │   ├── Button/ (+ .test.jsx)        # Reusable button component
        │   ├── Icon/ (+ .test.jsx, no .css) # SVG sprite <use> wrapper for public/icons.svg
        │   ├── Modal/ (+ .test.jsx)         # Accessible modal dialog
        │   └── Skeleton/                    # Loading skeleton placeholder (no test)
        ├── molecules/                       # All 4 molecules have .test.jsx coverage
        │   ├── FormField/ (+ .test.jsx)     # Labeled form input/select wrapper
        │   ├── SummaryCard/ (+ .test.jsx)   # Metric display card used in SummaryGrid
        │   ├── TransactionItem/ (+ .test.jsx) # Single transaction row with category/date/delete actions
        │   └── TypeSelector/ (+ .test.jsx)  # Income vs. expense toggle control
        └── organisms/
            ├── Tested (.test.jsx present):  # 16 organisms:
            │   AccessibilitySettings, AppHeader, CategoryComparison, CategoryStructure,
            │   DailyStats, DangerZone, LanguageSettings, LoginForm, NavBar,
            │   ProfileSettings, QuickStatsTable, RecentActivity, SummaryGrid,
            │   ThemeSettings, TransactionForm, TransactionPreferences
            └── Untested (no .test.jsx):     # 10 organisms:
                AppFooter, BudgetLimits, BudgetWarnings, DashboardSkeleton,
                IncomeVsExpense, MonthlySpendingTrends, RecurringSettings,
                SavingsRateChart, TopMerchants, TransactionFilters
```

**Test Coverage Gaps (Factual):**
- `src/views/` (0/8 views have `.test.jsx` files).
- `src/components/atoms/` (2/5 untested: `AnimatedView`, `Skeleton`).
- `src/components/organisms/` (10/26 untested: `AppFooter`, `BudgetLimits`, `BudgetWarnings`, `DashboardSkeleton`, `IncomeVsExpense`, `MonthlySpendingTrends`, `RecurringSettings`, `SavingsRateChart`, `TopMerchants`, `TransactionFilters`).

---

## 2. Task-to-File Routing Table ("Where to Look First")

| Engineering Task | Read These Files First |
| :--- | :--- |
| **Auth & Firebase RTDB Sync** | `src/config/firebase.js`, `src/hooks/useAuth.js`, `src/hooks/useFirebaseSync.js`, `src/store/firebaseSync.js`, `src/store/slices/authSlice.js`, `database.rules.json` |
| **Transactions, Budgets & Recurring State** | `src/store/slices/transactionSlice.js`, `src/constants/categories.js`, `src/views/Transactions/Transactions.jsx`, `src/components/organisms/BudgetLimits/BudgetLimits.jsx`, `src/components/organisms/RecurringSettings/RecurringSettings.jsx` |
| **UI Views & Atomic Design Components** | `src/views/App/App.jsx`, target view in `src/views/<View>/`, and composed components in `src/components/{atoms,molecules,organisms}/` |
| **Export & Formatting Utilities** | `src/utils/exportUtils.js`, `src/utils/formatters.js`, `src/views/Transactions/Transactions.jsx` |
| **Theming, Accessibility & i18n** | `src/hooks/useUIAffects.js`, `src/index.css`, `src/store/slices/themeSlice.js`, `src/store/slices/accessibilitySlice.js`, `src/config/i18n.js`, `src/constants/colors.js` |
| **Tests & CI/CD** | `vitest.config.js`, `vitest.setup.js`, `eslint.config.js`, `.github/workflows/test.yml`, `.github/workflows/firebase-hosting-merge.yml` |
| **Hosting & Legal** | `firebase.json`, `database.rules.json`, `.firebaserc`, `src/views/Legal/Legal.jsx` |

---

## 3. Entry Points & Architecture Wiring

1. **Application Boot Chain:**
   `index.html` (`<div id="root">`) -> `src/main.jsx` (mounts React 19 `StrictMode`, Redux `<Provider store={store}>`, `<BrowserRouter>`, Roboto `@fontsource` weights, `src/index.css`, and `src/config/i18n.js`) -> `src/views/App/App.jsx`.
2. **Routing & Layout (`src/views/App/App.jsx`):**
   Wraps the app in Framer Motion's `<MotionConfig reducedMotion={...}>`, renders persistent `AppHeader`, conditional `NavBar` (when authenticated and onboarding complete), `<AnimatePresence>` route transitions (`/login`, `/welcome`, `/`, `/transactions`, `/reports`, `/settings`, `/legal`), and `AppFooter`.
3. **High-Level Data & Sync Flow:**
   - **Hydration:** `useAuth` subscribes to `onAuthStateChanged(auth)`. On sign-in, it dispatches `login`, calls `fetchAllUserData()` from `src/store/firebaseSync.js`, hydrates `themeSlice`, `accessibilitySlice`, `transactionSlice`, and `hasCompletedWelcome`, then marks `dataLoaded.current = true`.
   - **Reactive Persistence:** `useFirebaseSync` watches `themeMode`, `accessibility`, `transactions`, `transactionPreferences`, `budgetLimits`, `recurringItems`, and `hasCompletedWelcome`. After initial mount and once `dataLoaded.current` is `true`, it writes updates back to `users/${user.uid}/*` via `saveToFirebase`.
   - **UI/CSS Variable Pipeline:** `useUIAffects` subscribes to `themeSlice` and `accessibilitySlice` and updates `document.documentElement` classes (`light-theme`, `dark-theme`, `high-contrast`, `reduced-motion`, `font-small`/`medium`/`large`) and CSS custom properties (`--accent`, `--accent-bg`, `--accent-border`).
4. **Test & CI Roots:**
   - **Unit/Component Tests:** `vitest.config.js` runs `src/**/*.test.{js,jsx}` in `jsdom` with `vitest.setup.js` mocking `react-i18next`.
   - **CI/CD:** `.github/workflows/test.yml` gates PRs to `main` (lint, coverage, build); `.github/workflows/firebase-hosting-merge.yml` deploys `dist/` on merge to `main`.

---

## 4. Restricted, Isolated & Sensitive Zones

- **`.env*` & Runtime Secrets:** Never read, commit, or log `.env` or `.env.*` files. Firebase credentials are injected via `VITE_FIREBASE_*` environment variables at build time (`src/config/firebase.js`).
- **`.github/workflows/` Secrets:** `test.yml` and `firebase-hosting-merge.yml` reference `secrets.VITE_FIREBASE_*`, `secrets.GITHUB_TOKEN`, and `secrets.FIREBASE_SERVICE_ACCOUNT_BUDGET_MANAGER_E11D2`. Do not hardcode secrets or alter deployment targets without explicit approval.
- **`package-lock.json`:** Lockfile managed by npm; do not hand-edit.
- **`firebase.json`, `database.rules.json` & `.firebaserc`:** Control live hosting target (`budget-manager-e11d2`), SPA routing rewrites, and RTDB per-user security rules; treat changes as production-impacting.
- **`src/views/Legal/Legal.jsx`:** Contains legal Impressum/AGB contact details and disclaimers; do not alter legal copy or personal contact information unless explicitly requested.
