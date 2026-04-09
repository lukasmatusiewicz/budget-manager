# 💸 Budget Manager - Portfolio Project

![Tests and Linting](https://github.com/lukasmatusiewicz/budget-manager/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-93.8%25-brightgreen)

A comprehensive personal finance tracking application built with **React 19** and **Vite**. This project demonstrates advanced front-end engineering practices, clean architecture using **Atomic Design**, and seamless integration with **Firebase** services.

---

## 🔗 Live Demo

You can experience the live application here:
**[Budget Manager Hosted on Firebase](https://budget-manager-e11d2.web.app/)**

---

## 🚀 Key Features

- **📊 Dynamic Dashboard:** Real-time summary of balance, monthly income, and expenses with visual indicators.
- **💸 Transaction Management:** Intuitive interface for recording, editing, and deleting financial transactions.
- **📈 Advanced Analytics:** Data-driven insights powered by **Recharts**, including category breakdowns and daily spending trends.
- **🌍 Internationalization (i18n):** Full support for multiple languages (English, Polish, Spanish, German) using **i18next**.
- **🌓 Adaptive Theme Engine:** Dynamic switching between Light and Dark modes with persistent user preferences.
- **🔒 Firebase Authentication:** Secure user authentication and real-time data synchronization with **Firebase Realtime Database**.
- **♿ Accessibility Focus:** Customizable UI settings, including high contrast, increased font size, and reduced motion.

---

## 🛠️ Tech Stack & Skills

### **Core Frontend**
- **React 19:** Functional components, Hooks (`useMemo`, `useCallback`, `useEffect`), and modern React patterns.
- **Vite:** Blazing fast build tool and HMR.
- **Redux Toolkit:** Centralized state management with Slices and asynchronous thunks for Firebase sync.
- **React Router v7:** Modern client-side routing and navigation.

### **Testing & QA**
- **Vitest:** Blazing fast unit testing framework powered by Vite.
- **React Testing Library:** User-centric testing for UI components.
- **JSDOM:** Browser environment simulation for reliable DOM testing.

### **Backend & Infrastructure**
- **Firebase Auth:** Secure login, registration, and session persistence.
- **Firebase Realtime Database:** NoSQL cloud database for real-time data persistence.

### **UI & Visualization**
- **Vanilla CSS:** Modular styling following **Atomic Design** principles, utilizing CSS Variables for theming.
- **Recharts:** Interactive and responsive data visualization (Pie Charts, Area Charts).
- **SVG Sprites:** Optimized icon delivery system for performance and scalability.

---

## 🏗️ Architectural Excellence

- **Atomic Design Methodology:** Components are organized into Atoms, Molecules, and Organisms to ensure maximum reusability and maintainability.
- **Clean Code & Patterns:** Strict adherence to SOLID principles, custom hooks for logic abstraction, and modular state management.
- **Responsive Architecture:** A mobile-first approach ensuring a seamless experience across all device sizes.
- **Type Safety & Standards:** ESLint configuration for code quality and consistency.

---

## 🧪 Quality Assurance & Testing

The project maintains high reliability through a comprehensive suite of unit and integration tests. The testing strategy focuses on:

- **Component Integrity:** Verifying that UI components (Atoms and Molecules) render correctly and handle user interactions (clicks, input changes) as expected.
- **State Logic:** Ensuring that Redux actions and slices correctly manage transaction data and UI states.
- **Mocking Strategy:** Robust use of Vitest mocks for external dependencies like `react-i18next`, `react-redux`, and Firebase to ensure isolated and deterministic test results.

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
   *Note: A GitHub Actions workflow automatically runs these checks on every pull request to ensure high code quality.*

5. **Build for Production:**
   ```bash
   npm run build
   ```
