# FINISH Lab

FINISH is a high-velocity engineering service focused on shipping "almost done" applications to production in **24–72 hours**. This repository contains the **FINISH marketing site / frontend app** built with **React, TypeScript, and Vite**, optimized for speed, clarity, and conversion.

---

## 🧱 Tech Stack

* **React** – UI library
* **TypeScript** – Static typing and maintainability
* **Vite** – Fast dev server & build tooling
* **Yarn** – Package manager
* **Tailwind CSS** – Utility-first styling (if applicable)
* **Gimmnie** – AI bot used for internal automation and assistance

---

## 📁 Project Structure

```
finish/
├─ public/                # Static assets
├─ src/
│  ├─ assets/             # Images, icons, branding
│  ├─ components/         # Reusable UI components
│  ├─ pages/              # Page-level components (Home, Pricing, FAQ, etc.)
│  ├─ layouts/            # Layout wrappers (Navbar, Footer)
│  ├─ hooks/              # Custom React hooks
│  ├─ utils/              # Helpers and utilities
│  ├─ styles/             # Global styles (if not fully Tailwind)
│  ├─ App.tsx             # Root component
│  └─ main.tsx            # App entry point
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** ≥ 18
* **Yarn** ≥ 1.22

### Install Dependencies

```bash
yarn install
```

### Start Development Server

```bash
yarn dev
```

App will be available at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

---

## 🎯 Key Pages & Sections

* **Home** – Primary value proposition and CTA ("Fix My App Now")
* **How It Works** – Engagement and delivery process
* **Pricing** – Clear, fixed-scope pricing
* **Why FINISH** – Differentiation and trust signals
* **FAQ** – Objection handling

---

## 🤖 Gimmnie Bot

This project uses an internal automation bot built with **Gimmnie** to support:

* Internal workflows
* Lead handling & routing
* Developer and ops assistance
* Process automation (non-customer facing)

> Gimmnie is **not part of the frontend bundle** but is a supporting system in the FINISH ecosystem.

---

## 🎨 Design Principles

* Minimal, high-contrast UI
* Strong primary CTA focus
* Fast load times
* Clear technical credibility
* Conversion-first layout

---

## 🧪 Linting & Type Safety

If configured:

```bash
yarn lint
yarn typecheck
```

---

## 📦 Deployment

The app is compatible with:

* Vercel
* Netlify
* Cloudflare Pages
* Static hosting (S3, Nginx, etc.)

Typical Vercel setup:

* **Build Command:** `yarn build`
* **Output Directory:** `dist`

---

## 🔐 Environment Variables

If required, define them in:

```
.env
```

Example:

```
GEMINI_API_KEY=XXXXXXXXXX
```

---

## 📄 License

© FINISH. All rights reserved.

---

## ✨ Maintainers

Built and maintained by the **FINISH Engineering Team**.

High-velocity. Production-first. No excuses.
