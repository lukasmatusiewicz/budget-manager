# 💸 Budget Manager - Portfolio Project

![Tests and Linting](https://github.com/lukasmatusiewicz/budget-manager/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-96.1%25-brightgreen)

A comprehensive personal finance tracking application built with **React 19** and **Vite**. This project demonstrates advanced front-end engineering practices, clean architecture using **Atomic Design**, and a high-performance "premium" user experience.

---

## 🔗 Live Demo

You can experience the live application here:
**[Budget Manager Hosted on Firebase](https://budget-manager-e11d2.web.app/)**

---

## 🚀 Key Features

- **📊 Dynamic Dashboard:** Real-time summary of balance, monthly income, and expenses with **Skeleton Screen** loaders for perceived performance.
- **🔍 Advanced Filtering:** Powerful search bar and multi-select filters for date ranges, categories, and price brackets in the transaction history.
- **📥 Data Portability:** Ability to export transaction history to **CSV** and **JSON** formats for external analysis.
- **📈 Advanced Analytics:** Data-driven insights powered by **Recharts**, including category breakdowns, savings rates, and daily spending trends.
- **🎨 Premium UI & Animations:** Fluid view transitions and modal appearances powered by **Framer Motion**, featuring mesh gradients and glassmorphism.
- **🌍 Internationalization (i18n):** Full support for multiple languages (**English, Polish, German, French**) using **i18next**.
- **🌓 Dynamic Theming Engine:** Beyond Light/Dark mode, users can customize the UI with a **Dynamic Accent Color** picker.
- **🔒 Firebase Cloud Sync:** Secure user authentication and real-time data synchronization with **Firebase Realtime Database**.
- **♿ Accessibility Focus:** Customizable UI settings, including high contrast, dynamic font size scaling, and reduced motion support.

---

## 🛠️ Tech Stack & Skills

### **Core Frontend**
- **React 19:** Functional components, Hooks (`useMemo`, `useCallback`, `useEffect`), and modern React patterns.
- **Vite:** Blazing fast build tool and HMR.
- **Redux Toolkit:** Centralized state management with Slices and asynchronous thunks for Firebase sync.
- **Framer Motion:** High-performance animations for a premium feel and accessible motion handling.
- **React Router v7:** Modern client-side routing with animated transitions.

### **Testing & QA**
- **Vitest:** Modern testing framework with built-in coverage reporting.
- **React Testing Library:** User-centric testing for UI components.
- **GitHub Actions:** Automated CI/CD using **Node.js 24** for linting, testing, and coverage analysis.

### **Backend & Infrastructure**
- **Firebase Auth:** Secure login, registration, and session persistence.
- **Firebase Realtime Database:** NoSQL cloud database for real-time data persistence.

### **UI & Visualization**
- **Vanilla CSS:** Modular styling following **Atomic Design**, utilizing CSS Variables for dynamic accent colors and theme consistency.
- **Recharts:** Interactive and responsive data visualization (Pie, Area, Line, and Bar Charts).
- **Glassmorphism:** Modern UI design with blurred surfaces and layered mesh gradients.

---

## 🏗️ Architectural Excellence

- **Atomic Design Methodology:** Components are organized into Atoms, Molecules, and Organisms to ensure maximum reusability and maintainability.
- **Clean Code & Patterns:** Strict adherence to SOLID principles, custom hooks for logic abstraction, and modular state management.
- **Responsive Architecture:** A mobile-first approach ensuring a seamless experience across all device sizes.
- **State-Driven Styling:** UI effects (font size, accessibility, accent colors) are managed via a unified Redux-to-CSS-Variable pipeline.

---

## 🧪 Quality Assurance & Testing

The project maintains high reliability through a comprehensive suite of unit and integration tests. The testing strategy focuses on:

- **Component Integrity:** Verifying that UI components (Atoms and Molecules) render correctly and handle user interactions as expected.
- **State Logic:** Ensuring that Redux actions and slices correctly manage transaction data and UI states.
- **CI/CD Integration:** Automated reports on Pull Requests provide detailed coverage statistics and linting results, ensuring no regressions are introduced.

---

## ⚠️ Important Note
This application was developed as a **portfolio project** to showcase software engineering skills, architectural knowledge, and a commitment to building high-quality, accessible user experiences. It is intended for demonstration purposes only.

---

## 🚦 Getting Started

To run this project locally, clone the repository and follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Quality Assurance (Tests & Linting):**
   Execute the full test suite and check for code quality:
   ```bash
   # Run all unit and integration tests
   npm test

   # Run ESLint to verify code standards
   npm run lint
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```
