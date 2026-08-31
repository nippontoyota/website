# Nippon Toyota - Enterprise Customer Portal

![Nippon Toyota](public/nippon-toyota.png)

This repository contains the source code for the official Nippon Toyota Enterprise Customer Portal, providing a seamless digital showroom experience, service booking, intelligent vehicle exploration, and a 360° virtual showroom.

## 🚀 Key Features

- **360° Virtual Showroom:** Immersive, high-performance 3D panorama views for Toyota's entire fleet powered by Pannellum.
- **Dynamic Price Lists:** Context-aware, real-time vehicle variant and pricing tables.
- **Intelligent Pipelines:** End-to-end user flows for Test Drives, E-Brochures, Vehicle Exchange, and Finance with smart dropdowns.
- **Enterprise UI/UX:** Built with a strict, pixel-perfect layout using Tailwind CSS, Framer Motion, and Next.js App Router for zero-jank scrolling and native app-like mobile experiences.
- **High Performance:** Edge-proxied media routing and highly optimized asset delivery.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **3D Viewer:** [Pannellum](https://pannellum.org/)

## 💻 Getting Started

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/nippontoyota/website.git
   cd website
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Architecture & Guidelines

- **Strict Mode:** The application runs in Strict Mode. All components must be free of implicit \`any\` typings and unused imports.
- **Routing:** Handled via Next.js App Router. The `src/middleware.ts` handles highly specific proxy rewrites for the 3D Virtual Showroom.
- **Performance:** All images must use \`next/image\` with strictly defined \`sizes\` and \`priority\` attributes for LCP elements. Layout shifts are mitigated through strict fixed-height containers.

## 🔒 Security & Deployment

This application is deployed directly to **Vercel** with full SSL, Global CDN, and Edge Network proxying. Any pushes to the \`main\` branch will trigger a production deployment.

*Confidential and Proprietary. © Nippon Toyota.*
