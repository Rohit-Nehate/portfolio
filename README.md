# Rohit Nehte — Portfolio Website

A modern, interactive portfolio website built with React, Three.js, and Tailwind CSS. Showcasing frontend development skills with 3D graphics, smooth animations, and a sleek dark theme.

**Live Demo:** [rohitnehte.me](https://rohitnehte.me/)

---

## ✨ Features

- **Interactive 3D Background** — Three.js powered animated background with smooth WebGL rendering
- **Smooth Scroll Navigation** — Seamless page navigation with react-scroll integration
- **Animated Sections** — Framer Motion animations for engaging section reveals
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Dark Theme UI** — Modern dark interface with carefully chosen color palette
- **Contact Form** — EmailJS integration for direct messaging capabilities
- **Optimized Performance** — Vite build tool for fast development and production builds
- **SEO Optimized** — Meta tags, Open Graph support, and semantic HTML
- **Scroll Butterfly Animation** — Custom animated element that follows scroll behavior

---

## 🛠️ Tech Stack

### Core Framework
- **React.js** — UI library for building component-based interfaces
- **Vite** — Lightning-fast build tool and development server
- **TypeScript** — Type-safe JavaScript development

### Styling & Animation
- **Tailwind CSS** — Utility-first CSS framework for rapid UI development
- **@tailwindcss/vite** — Vite integration for Tailwind
- **Framer Motion** — Animation library for smooth, physics-based animations
- **Lucide React** — Beautiful, consistent icon library

### 3D & Graphics
- **Three.js** — 3D JavaScript library for WebGL rendering
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers and components for React Three
- **@react-three/postprocessing** — Post-processing effects for Three.js

### Utilities & Backend Integration
- **React Scroll** — Scroll-based navigation component
- **@emailjs/browser** — Client-side email service integration
- **Gemini API** — AI integration for smart features

---

## 📋 Project Structure

```
portfolio/
├── public/
│   ├── images/              # Project images and assets
│   ├── models/              # 3D models for Three.js scenes
│   ├── fonts/               # Custom web fonts
│   ├── robots.txt          # SEO robots configuration
│   └── sitemap.xml         # XML sitemap for search engines
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with mobile menu
│   │   ├── Hero.jsx            # Hero section with intro
│   │   ├── About.jsx           # About section
│   │   ├── Skills.jsx          # Skills showcase
│   │   ├── Projects.jsx        # Portfolio projects display
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── TechStack.jsx       # Technology stack showcase
│   │   ├── Journey.jsx         # Personal journey/story
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Footer.jsx          # Footer section
│   │   ├── AnimatedSection.jsx # Wrapper for animated sections
│   │   ├── ScrollButterfly.jsx # Custom scroll animation
│   │   └── ThreeBackground.jsx # 3D background scene
│   │
│   ├── data/
│   │   └── portfolio.js     # Portfolio content (personal info, projects, skills)
│   │
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   ├── main.ts              # TypeScript entry point
│   ├── index.css            # Global styles
│   └── style.css            # Additional styles
│
├── index.html               # HTML entry point with SEO meta tags
├── vite.config.js          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed for Gemini API or EmailJS)
   ```bash
   # Create a .env file in the root directory
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### Available Scripts

```bash
# Start development server
npm run dev
# Runs on http://localhost:5173

# Build for production
npm run build
# Compiles TypeScript and creates optimized production build

# Preview production build locally
npm run preview
# Serves the built project for testing
```

---

## 📁 Key Components Overview

### Navbar
Sticky navigation bar with smooth scroll links and mobile-responsive hamburger menu. Changes appearance on scroll with backdrop blur effect.

### Hero
Eye-catching landing section with personal branding, tagline, and call-to-action buttons.

### About
Personal introduction and background story section with typography-focused design.

### Skills
Categorized skill display including Frontend, Backend, 3D/Graphics, Tools, and Exploring technologies.

### Projects
Portfolio of 3 major projects (CineQuery, Minecraft Three.js, Project Nova) with descriptions, tech tags, and links to code and live demos.

### Experience
Work experience and timeline section with detailed descriptions of roles and responsibilities.

### TechStack
Visual showcase of all technologies used and proficiencies.

### Journey
Personal learning journey and growth story with milestones.

### Contact
EmailJS-integrated contact form for direct messaging with form validation.

### ScrollButterfly
Custom animated element that responds to scroll events, adding visual interest to the page.

### ThreeBackground
Three.js 3D scene renderer providing an immersive animated background.

---

## 🎨 Design System

### Color Palette
- **Background**: `#131313` (Deep black)
- **Text**: `#e5e2e1` (Light beige)
- **Primary Accent**: `#0066ff` (Bright blue)
- **Secondary Colors**: Project-specific accent colors

### Typography
- **Font Family**: Inter
- **Base Size**: 16px
- **Line Height**: 1.5 (relaxed)

### Spacing
- **Container Max-width**: 1280px
- **Padding**: 1rem (mobile), 2rem (desktop)

---

## 🔧 Customization Guide

### Update Personal Information
Edit `src/data/portfolio.js`:
```javascript
export const personal = {
  name: "YOUR NAME",
  role: "YOUR ROLE",
  tagline: "YOUR TAGLINE",
  bio1: "YOUR BIO",
  bio2: "YOUR SECOND BIO",
  stats: ["YOUR STATS"],
  resumeUrl: "your-resume-url",
};
```

### Add/Remove Projects
Modify the `projects` array in `src/data/portfolio.js`:
```javascript
{
  id: 4,
  title: "Project Title",
  desc: "Project description",
  tags: ["Tag1", "Tag2", "Tag3"],
  color: "#hexcolor",
  codeUrl: "github-url",
  liveUrl: "live-url",
  imageUrl: "/images/project.png"
}
```

### Update Skills
Edit the `skills` object in `src/data/portfolio.js` with your proficiencies.

### Modify Colors
Global colors are defined in the App.jsx className and can be customized using Tailwind utilities.

---

## 📦 Dependencies Explained

### Development Dependencies
- **TypeScript** (~6.0.2) — Type checking for JavaScript
- **Vite** (^8.0.12) — Next-gen frontend tooling

### Production Dependencies

**UI & Animation:**
- `framer-motion` — Production-ready animation library
- `react-scroll` — Scroll-based navigation
- `lucide-react` — Icon library
- `@tailwindcss/vite` — Tailwind integration
- `tailwindcss` — CSS utility framework

**3D Graphics:**
- `three` — 3D JavaScript library
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — Useful Three.js abstractions
- `@react-three/postprocessing` — Post-processing effects

**Build & Integration:**
- `@vitejs/plugin-react` — Vite React support
- `@emailjs/browser` — Email service integration

---

## 🌐 SEO & Meta Information

The portfolio includes comprehensive SEO optimization:
- **Meta Description** — Clear summary of who you are
- **Keywords** — Relevant search terms
- **Open Graph Tags** — Rich preview on social media
- **Canonical URL** — Prevents duplicate content issues
- **Robots Meta** — Directs search engine crawlers
- **Sitemap.xml** — Easy indexing for search engines
- **Robots.txt** — Crawler guidelines

---

## ⚡ Performance Optimization

- **Vite Build** — Optimized production bundles with code splitting
- **Lazy Loading** — Components load on demand
- **WebGL Optimization** — Three.js scenes optimized for performance
- **Tailwind Purging** — Only used styles included in production build
- **Image Optimization** — Use compressed image formats where possible

---

## 🔐 Environment Variables

For features requiring API keys, create a `.env.local` file:
```
VITE_EMAILJS_SERVICE_ID=your_id
VITE_EMAILJS_TEMPLATE_ID=your_id
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_GEMINI_API_KEY=your_api_key
```

Access in components:
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
```

---

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Tailwind's responsive prefixes (sm:, md:, lg:) are used throughout.

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

### Deploy to GitHub Pages
Update vite.config.js:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

---

## 📄 License

This project is personal work. Feel free to use it as inspiration for your own portfolio, but please don't copy it directly without modification.

---

## 👤 Author

**Rohit Nehte**
- **Role**: Frontend Developer & BCA Student
- **Location**: India
- **Semester**: 5th
- **GitHub**: [Rohit-Nehate](https://github.com/Rohit-Nehate)
- **Portfolio**: [rohitnehte.me](https://rohitnehte.me)

---

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, feel free to fork and modify for your own use.

---

## 📞 Support

For questions or issues, reach out through:
- **Email**: Contact form on the portfolio
- **GitHub Issues**: Open an issue on the repository
- **Social Media**: Connect on LinkedIn or GitHub

---

## 🎯 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Dark/Light theme toggle
- [ ] Multilingual support
- [ ] Analytics integration
- [ ] Advanced animations and transitions
- [ ] Performance monitoring
- [ ] CMS integration for dynamic content

---

**Last Updated**: June 2026  
**Build Tool**: Vite 8.0.12  
**React Version**: 18+  
**Node Version**: 16+
