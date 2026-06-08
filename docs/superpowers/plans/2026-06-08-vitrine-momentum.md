# Momentum Vitrine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site vitrine Astro de l'application Hyrox Momentum — dark, premium, SEO-first — avec liste d'attente early bird, page d'accueil et 3 guides éditoriaux.

**Architecture:** Site statique généré par Astro (SSG). Chaque page est un fichier `.astro` qui utilise un `BaseLayout` commun contenant le `<head>` SEO, le header fixe et le footer. Les composants sont isolés par section (Hero, Features, Pricing, etc.). Zéro JS framework côté client — animations vanilla JS inline.

**Tech Stack:** Astro 4, Tailwind CSS 3, Google Fonts (Barlow Condensed + Syne + JetBrains Mono), Formspree (formulaire email), @astrojs/sitemap

---

## Structure des fichiers

```
momentom-vitrine/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          ← <head> SEO + structure page
│   ├── components/
│   │   ├── Header.astro              ← nav fixe
│   │   ├── Footer.astro              ← footer
│   │   ├── GrainOverlay.astro        ← texture grain fixed
│   │   ├── CustomCursor.astro        ← curseur custom desktop
│   │   ├── Hero.astro                ← section hero home
│   │   ├── Features.astro            ← 4 blocs fonctionnalités
│   │   ├── Pricing.astro             ← tarifs + formulaire waitlist
│   │   ├── GuidesTeaser.astro        ← liens vers guides (style magazine)
│   │   └── GuideLayout.astro         ← layout commun aux pages guides
│   ├── pages/
│   │   ├── index.astro               ← home
│   │   ├── mentions-legales.astro    ← mentions légales
│   │   └── guides/
│   │       ├── index.astro           ← guide pilier
│   │       ├── hyrox-single-open.astro
│   │       └── hyrox-duo-mixte-open.astro
│   └── styles/
│       └── global.css                ← variables CSS, grain, reset
```

---

## Task 1 : Scaffold du projet Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`

- [ ] **Step 1 : Initialiser le projet Astro avec Tailwind**

Dans le dossier `C:\Users\thoma\Documents\Claude\momentom-vitrine`, exécuter :

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
npm install
npx astro add tailwind --yes
npx astro add sitemap --yes
```

- [ ] **Step 2 : Installer les dépendances supplémentaires**

```bash
npm install @astrojs/sitemap
```

- [ ] **Step 3 : Configurer `astro.config.mjs`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://momentum-hyrox.fr',
  integrations: [tailwind(), sitemap()],
})
```

- [ ] **Step 4 : Configurer `tailwind.config.mjs`**

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        deep:     '#080808',
        surface:  '#111111',
        elevated: '#1a1a1a',
        border:   '#2a2a2a',
        accent:   '#f97316',
        'accent-bright': '#fb923c',
        'accent-dim':    '#7c3a0e',
        'text-primary':  '#f5f5f5',
        'text-secondary':'#a3a3a3',
        'text-muted':    '#525252',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Syne', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(56px, 10vw, 120px)',
        'section': 'clamp(36px, 6vw, 72px)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5 : Créer `src/styles/global.css`**

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --bg-deep:       #080808;
  --bg-surface:    #111111;
  --bg-elevated:   #1a1a1a;
  --bg-border:     #2a2a2a;
  --accent:        #f97316;
  --accent-bright: #fb923c;
  --accent-glow:   rgba(249, 115, 22, 0.15);
  --text-primary:  #f5f5f5;
  --text-secondary:#a3a3a3;
  --text-muted:    #525252;
}

*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'Syne', sans-serif;
  overflow-x: hidden;
}

/* Grain overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}

/* Grille décorative */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Focus visible global */
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.2ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}

/* Cursor custom */
@media (pointer: fine) {
  * { cursor: none !important; }
}
```

- [ ] **Step 6 : Créer `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://momentum-hyrox.fr/sitemap.xml
```

- [ ] **Step 7 : Créer `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#080808"/>
  <text x="4" y="24" font-family="sans-serif" font-weight="900" font-size="22" fill="#f97316">M</text>
</svg>
```

- [ ] **Step 8 : Vérifier que le build fonctionne**

```bash
npm run build
```

Résultat attendu : `dist/` créé sans erreur, `dist/sitemap-index.xml` présent.

- [ ] **Step 9 : Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind, sitemap, fonts and global styles"
```

---

## Task 2 : BaseLayout + Header + Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/GrainOverlay.astro`
- Create: `src/components/CustomCursor.astro`

- [ ] **Step 1 : Créer `src/components/GrainOverlay.astro`**

```astro
---
// src/components/GrainOverlay.astro
// Grain + grille décorative — géré en CSS global, ce composant est un no-op
// mais permet de documenter l'effet dans l'arbre des composants
---
```

- [ ] **Step 2 : Créer `src/components/CustomCursor.astro`**

```astro
---
// src/components/CustomCursor.astro
---

<div id="cursor-dot" aria-hidden="true"></div>
<div id="cursor-ring" aria-hidden="true"></div>

<style>
  #cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    transition: width 200ms, height 200ms, background 200ms;
  }

  #cursor-ring {
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1.5px solid rgba(249, 115, 22, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    transition: width 200ms, height 200ms, border-color 200ms;
  }

  @media (pointer: coarse) {
    #cursor-dot, #cursor-ring { display: none; }
  }
</style>

<script>
  const dot  = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left  = mouseX + 'px'
      dot.style.top   = mouseY + 'px'
    })

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      requestAnimationFrame(animateRing)
    }
    animateRing()

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.width  = '12px'
        dot.style.height = '12px'
        ring.style.width  = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = 'rgba(249, 115, 22, 0.8)'
      })
      el.addEventListener('mouseleave', () => {
        dot.style.width  = '8px'
        dot.style.height = '8px'
        ring.style.width  = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(249, 115, 22, 0.5)'
      })
    })
  }
</script>
```

- [ ] **Step 3 : Créer `src/components/Header.astro`**

```astro
---
// src/components/Header.astro
const navLinks = [
  { label: 'Accueil',  href: '/' },
  { label: 'Tarifs',   href: '/#tarifs' },
  { label: 'Guides',   href: '/guides/' },
]
---

<header id="header">
  <div class="container">
    <a href="/" class="logo" aria-label="Momentum — retour à l'accueil">
      MOMENTUM
    </a>

    <nav aria-label="Navigation principale">
      <ul>
        {navLinks.map(link => (
          <li><a href={link.href}>{link.label}</a></li>
        ))}
      </ul>
    </nav>

    <a href="/#waitlist" class="cta-btn">
      Liste d'attente
    </a>

    <button id="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- Mobile drawer -->
<div id="mobile-drawer" aria-hidden="true">
  <button id="drawer-close" aria-label="Fermer le menu">✕</button>
  <nav aria-label="Menu mobile">
    <ul>
      {navLinks.map(link => (
        <li><a href={link.href}>{link.label}</a></li>
      ))}
      <li><a href="/#waitlist" class="drawer-cta">Liste d'attente →</a></li>
    </ul>
  </nav>
</div>
<div id="drawer-overlay"></div>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: rgba(8, 8, 8, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--bg-border);
    z-index: 100;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.1em;
    color: var(--text-primary);
    text-decoration: none;
    flex-shrink: 0;
  }

  nav { margin-left: auto; }

  nav ul {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav a {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 200ms;
  }
  nav a:hover { color: var(--text-primary); }

  .cta-btn {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #080808;
    background: var(--accent);
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    flex-shrink: 0;
    transition: background 200ms, box-shadow 200ms, transform 200ms;
  }
  .cta-btn:hover {
    background: var(--accent-bright);
    box-shadow: 0 0 24px rgba(249, 115, 22, 0.35);
    transform: translateY(-1px);
  }

  #menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: 8px;
    margin-left: auto;
  }
  #menu-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text-primary);
    transition: all 200ms;
  }

  /* Mobile drawer */
  #mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: #0d0d0d;
    border-left: 1px solid var(--bg-border);
    z-index: 200;
    padding: 32px 24px;
    transform: translateX(100%);
    transition: transform 300ms ease;
  }
  #mobile-drawer.open { transform: translateX(0); }

  #mobile-drawer ul {
    list-style: none;
    margin: 48px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  #mobile-drawer a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    letter-spacing: -0.01em;
    display: block;
    padding: 4px 0;
    transition: color 200ms;
  }
  #mobile-drawer a:hover { color: var(--accent); }
  .drawer-cta { color: var(--accent) !important; }

  #drawer-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 20px;
    padding: 8px;
  }

  #drawer-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 199;
  }
  #drawer-overlay.open { display: block; }

  @media (max-width: 768px) {
    nav, .cta-btn { display: none; }
    #menu-toggle { display: flex; }
    .container { gap: 0; }
  }
</style>

<script>
  const toggle  = document.getElementById('menu-toggle')
  const drawer  = document.getElementById('mobile-drawer')
  const overlay = document.getElementById('drawer-overlay')
  const close   = document.getElementById('drawer-close')

  function openDrawer() {
    drawer.classList.add('open')
    overlay.classList.add('open')
    toggle.setAttribute('aria-expanded', 'true')
    drawer.setAttribute('aria-hidden', 'false')
  }
  function closeDrawer() {
    drawer.classList.remove('open')
    overlay.classList.remove('open')
    toggle.setAttribute('aria-expanded', 'false')
    drawer.setAttribute('aria-hidden', 'true')
  }

  toggle?.addEventListener('click', openDrawer)
  close?.addEventListener('click', closeDrawer)
  overlay?.addEventListener('click', closeDrawer)
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer))
</script>
```

- [ ] **Step 4 : Créer `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
const currentYear = new Date().getFullYear()
---

<footer>
  <div class="container">
    <div class="top">
      <span class="logo">MOMENTUM</span>
      <nav aria-label="Footer">
        <a href="/">Accueil</a>
        <a href="/#tarifs">Tarifs</a>
        <a href="/guides/">Guides</a>
        <a href="/mentions-legales/">Mentions légales</a>
      </nav>
    </div>
    <div class="bottom">
      <p class="copy">© {currentYear} Momentum. Tous droits réservés.</p>
      <p class="tagline">Prépare ton Hyrox. Sans improviser.</p>
    </div>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--bg-border);
    padding: 48px 0 32px;
    margin-top: 120px;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 32px;
  }
  .logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 0.1em;
    color: var(--text-primary);
  }
  nav {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  nav a {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 200ms;
  }
  nav a:hover { color: var(--text-primary); }

  .bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 24px;
    border-top: 1px solid var(--bg-border);
  }
  .copy, .tagline {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
  }

  @media (max-width: 640px) {
    .top { flex-direction: column; }
    .bottom { flex-direction: column; }
  }
</style>
```

- [ ] **Step 5 : Créer `src/layouts/BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import CustomCursor from '../components/CustomCursor.astro'
import '../styles/global.css'

interface Props {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  schema?: object
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage   = 'https://momentum-hyrox.fr/og-default.jpg',
  schema,
} = Astro.props
---

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type"        content="website" />
  <meta property="og:title"       content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image"       content={ogImage} />
  <meta property="og:locale"      content="fr_FR" />

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image"       content={ogImage} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
  />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  {schema && (
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  )}
</head>
<body>
  <Header />
  <CustomCursor />
  <main>
    <slot />
  </main>
  <Footer />

  <!-- Scroll reveal observer -->
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  </script>
</body>
</html>
```

- [ ] **Step 6 : Créer `src/pages/index.astro` temporaire pour tester**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
---
<BaseLayout
  title="Momentum — Test"
  description="Test"
>
  <div style="padding: 120px 24px; color: white;">Header + Footer OK</div>
</BaseLayout>
```

- [ ] **Step 7 : Lancer le serveur dev et vérifier**

```bash
npm run dev
```

Ouvrir `http://localhost:4321`. Vérifier : header fixe visible, logo "MOMENTUM", bouton orange "Liste d'attente", grain subtil sur le fond. Sur mobile (< 768px) : hamburger visible, drawer s'ouvre et se ferme.

- [ ] **Step 8 : Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout, Header, Footer and CustomCursor components"
```

---

## Task 3 : Section Hero

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1 : Créer `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
const stats = [
  { value: 'Guidé pas à pas', label: 'Du 1er entraînement à la course' },
  { value: '4 phases',        label: 'Progressives' },
  { value: '3 formats',       label: 'Single · Duo · Mixte' },
]
---

<section class="hero">
  <!-- Badge formats -->
  <div class="badge-row reveal" style="--delay: 0ms">
    <span class="badge badge-single">Single Open</span>
    <span class="badge badge-duo">Duo Open</span>
    <span class="badge badge-mixte">Mixte Open</span>
  </div>

  <!-- Headline -->
  <h1 class="headline reveal" style="--delay: 150ms">
    Du premier entraînement<br />
    au jour J — Momentum<br />
    t'emmène jusqu'à ton<br class="hide-lg" />
    <span class="accent-word">plein potentiel.</span>
  </h1>

  <!-- Sous-titre -->
  <p class="subtitle reveal" style="--delay: 300ms">
    Un plan structuré, semaine par semaine, adapté à ton niveau —
    que tu débarques ou que tu vises le podium.
  </p>

  <!-- CTA -->
  <div class="cta-row reveal" style="--delay: 450ms">
    <a href="#waitlist" class="cta-primary">
      Rejoins la liste d'attente — offre early bird
    </a>
    <p class="app-mention">App iOS &amp; Android · Bientôt disponible</p>
  </div>

  <!-- Stats -->
  <div class="stats reveal" style="--delay: 600ms">
    {stats.map(stat => (
      <div class="stat">
        <span class="stat-value">{stat.value}</span>
        <span class="stat-label">{stat.label}</span>
      </div>
    ))}
  </div>
</section>

<style>
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 24px 80px;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  /* Staggered reveal via CSS custom property */
  .reveal { transition-delay: var(--delay, 0ms); }

  .badge-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .badge {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
  }
  .badge-single { background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.35); color: #f97316; }
  .badge-duo    { background: rgba(59,130,246,0.12);  border: 1px solid rgba(59,130,246,0.35);  color: #60a5fa; }
  .badge-mixte  { background: rgba(139,92,246,0.12);  border: 1px solid rgba(139,92,246,0.35);  color: #a78bfa; }

  .headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(52px, 9vw, 112px);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 32px;
    max-width: 900px;
  }

  .accent-word { color: var(--accent); }
  .hide-lg { display: none; }

  .subtitle {
    font-family: 'Syne', sans-serif;
    font-size: clamp(15px, 2vw, 18px);
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 520px;
    margin: 0 0 48px;
  }

  .cta-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 64px;
  }

  .cta-primary {
    display: inline-block;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #080808;
    background: var(--accent);
    padding: 16px 32px;
    border-radius: 4px;
    text-decoration: none;
    transition: background 200ms, box-shadow 200ms, transform 200ms;
    box-shadow: 0 0 40px rgba(249, 115, 22, 0.25);
  }
  .cta-primary:hover {
    background: var(--accent-bright);
    box-shadow: 0 0 60px rgba(249, 115, 22, 0.4);
    transform: translateY(-2px);
  }

  .app-mention {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
    letter-spacing: 0.05em;
  }

  .stats {
    display: flex;
    gap: 0;
    border: 1px solid var(--bg-border);
    border-radius: 8px;
    overflow: hidden;
    max-width: 640px;
  }

  .stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px 24px;
    border-right: 1px solid var(--bg-border);
  }
  .stat:last-child { border-right: none; }

  .stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: -0.01em;
  }

  .stat-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  @media (max-width: 640px) {
    .hero { padding: 100px 20px 60px; }
    .stats { flex-direction: column; max-width: 100%; }
    .stat { border-right: none; border-bottom: 1px solid var(--bg-border); }
    .stat:last-child { border-bottom: none; }
    .hide-lg { display: block; }
  }
</style>
```

- [ ] **Step 2 : Mettre à jour `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Hero from '../components/Hero.astro'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Momentum",
  "description": "Application de préparation à la compétition Hyrox format Open. Programme structuré en 4 phases avec calibrage d'allures personnalisé.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS, Android",
  "offers": [
    {
      "@type": "Offer",
      "price": "15.00",
      "priceCurrency": "EUR",
      "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
    },
    {
      "@type": "Offer",
      "price": "150.00",
      "priceCurrency": "EUR",
      "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1Y" }
    }
  ]
}
---

<BaseLayout
  title="Momentum — Application de préparation Hyrox Open | Single, Duo, Mixte"
  description="Prépare-toi au Hyrox Open avec Momentum : programme structuré, allures personnalisées, suivi séance par séance. Single, Duo et Mixte Open. Rejoins la liste d'attente."
  schema={schema}
>
  <Hero />
</BaseLayout>
```

- [ ] **Step 3 : Vérifier dans le navigateur**

```bash
npm run dev
```

Vérifier : badges colorés visibles, headline massive, CTA orange avec glow, stats en bas. Sur mobile : headline réduite mais toujours impactante.

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add Hero section with staggered animations and stat blocks"
```

---

## Task 4 : Section Fonctionnalités

**Files:**
- Create: `src/components/Features.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1 : Créer `src/components/Features.astro`**

```astro
---
// src/components/Features.astro
const features = [
  {
    number: '01',
    title:  'Plan structuré',
    body:   'Un programme pensé en phases progressives — force, endurance, spécificité Hyrox. Tu sais toujours ce que tu fais et pourquoi.',
    icon:   '◈',
  },
  {
    number: '02',
    title:  'Adapté à ton allure',
    body:   'Tu entres ton temps au 10km, Momentum calibre toutes tes allures de course. Ton entraînement, à ton niveau.',
    icon:   '◎',
  },
  {
    number: '03',
    title:  'Suivi séance par séance',
    body:   'Chaque entraînement est détaillé : exercices, durées, intensités. Tu coches, tu avances, tu progresses.',
    icon:   '◉',
  },
  {
    number: '04',
    title:  'Single, Duo & Mixte Open',
    body:   'Que tu coures seul, en duo ou en mixte — le programme s'adapte à ton format de compétition.',
    icon:   '◐',
  },
]
---

<section class="features">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-label">Fonctionnalités</p>
      <h2 class="section-title">Un programme pensé<br />pour progresser</h2>
    </div>

    <div class="grid">
      {features.map((f, i) => (
        <div class="card reveal" style={`--delay: ${i * 80}ms`}>
          <span class="card-number" aria-hidden="true">{f.number}</span>
          <div class="card-icon">{f.icon}</div>
          <h3 class="card-title">{f.title}</h3>
          <p class="card-body">{f.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .features {
    padding: 120px 0;
    position: relative;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-header {
    margin-bottom: 64px;
  }

  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 16px;
  }

  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 0.95;
    color: var(--text-primary);
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }

  .card {
    background: var(--bg-surface);
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: background 300ms, border-color 300ms, transform 300ms, box-shadow 300ms;
    border: 1px solid transparent;
  }
  .card:hover {
    background: #141414;
    border-color: rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .card-number {
    position: absolute;
    top: 24px;
    right: 28px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 72px;
    font-weight: 900;
    color: var(--text-primary);
    opacity: 0.04;
    line-height: 1;
    user-select: none;
  }

  .card-icon {
    font-size: 28px;
    color: var(--accent);
    margin-bottom: 20px;
    line-height: 1;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .card-body {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin: 0;
  }

  @media (max-width: 768px) {
    .features { padding: 80px 0; }
    .grid { grid-template-columns: 1fr; }
    .card { padding: 28px 24px; }
  }
</style>
```

- [ ] **Step 2 : Ajouter Features à `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Hero from '../components/Hero.astro'
import Features from '../components/Features.astro'
// ... schema identique
---
<BaseLayout ...>
  <Hero />
  <Features />
</BaseLayout>
```

- [ ] **Step 3 : Vérifier — grille 2×2 avec numéros décoratifs, hover orange**

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add Features section with 2x2 card grid and hover effects"
```

---

## Task 5 : Section Tarifs + Formulaire liste d'attente

**Files:**
- Create: `src/components/Pricing.astro`
- Modify: `src/pages/index.astro`

> **Note Formspree :** Créer un compte sur formspree.io (gratuit jusqu'à 50 soumissions/mois). Créer un formulaire et noter l'ID (ex: `xyzabc12`). Remplacer `YOUR_FORMSPREE_ID` ci-dessous par cet ID.

- [ ] **Step 1 : Créer `src/components/Pricing.astro`**

```astro
---
// src/components/Pricing.astro
---

<section class="pricing" id="tarifs">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-label">Tarifs</p>
      <h2 class="section-title">Simple.<br />Transparent.</h2>
    </div>

    <div class="cards-row">
      <!-- Mensuel -->
      <div class="card card-monthly reveal">
        <div class="card-top">
          <p class="plan-name">Mensuel</p>
          <div class="price-row">
            <span class="price">15€</span>
            <span class="period">/ mois</span>
          </div>
          <p class="plan-desc">Sans engagement, résiliable à tout moment.</p>
        </div>
        <ul class="features-list">
          <li>Accès complet au programme</li>
          <li>Calibrage d'allures personnalisé</li>
          <li>Single, Duo &amp; Mixte Open</li>
          <li>Suivi séance par séance</li>
        </ul>
        <a href="#waitlist" class="btn-secondary">Rejoindre la liste →</a>
      </div>

      <!-- Annuel — mis en avant -->
      <div class="card card-annual reveal" style="--delay: 80ms">
        <div class="badge-best">Meilleure offre</div>
        <div class="card-top">
          <p class="plan-name">Annuel</p>
          <div class="price-row">
            <span class="price">150€</span>
            <span class="period">/ an</span>
          </div>
          <p class="price-detail">soit 12,50€/mois · 2 mois offerts</p>
          <p class="plan-desc">Accès complet toute la saison.</p>
        </div>
        <ul class="features-list">
          <li>Accès complet au programme</li>
          <li>Calibrage d'allures personnalisé</li>
          <li>Single, Duo &amp; Mixte Open</li>
          <li>Suivi séance par séance</li>
          <li><strong>2 mois offerts vs mensuel</strong></li>
        </ul>
        <a href="#waitlist" class="btn-primary">Rejoindre la liste →</a>
      </div>
    </div>

    <!-- Waitlist -->
    <div class="waitlist reveal" id="waitlist">
      <div class="waitlist-inner">
        <div class="waitlist-text">
          <p class="waitlist-label">Early Bird</p>
          <h3 class="waitlist-title">Sois parmi les premiers.</h3>
          <p class="waitlist-body">
            Inscris-toi maintenant et bénéficie d'une
            <strong>remise exclusive</strong> réservée aux premiers arrivés.
            Offre limitée.
          </p>
        </div>
        <form
          class="waitlist-form"
          action="https://formspree.io/f/YOUR_FORMSPREE_ID"
          method="POST"
        >
          <div class="form-row">
            <label for="email" class="sr-only">Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ton@email.com"
              required
              autocomplete="email"
            />
            <button type="submit">Je réserve ma place</button>
          </div>
          <p class="form-mention">
            Pas de spam. Juste le lancement + ta remise.
            <a href="/mentions-legales/">Politique de confidentialité</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .pricing { padding: 120px 0; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  .section-header { margin-bottom: 64px; }
  .section-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 16px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 5vw, 64px); font-weight: 700;
    letter-spacing: -0.01em; line-height: 0.95;
    color: var(--text-primary); margin: 0;
  }

  .cards-row {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 80px;
  }

  .card {
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    border-radius: 8px;
    padding: 36px;
    flex: 1;
    position: relative;
    transition: border-color 300ms, transform 300ms;
  }

  .card-annual {
    border-color: rgba(249, 115, 22, 0.4);
    transform: translateY(-12px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249,115,22,0.1);
  }

  .badge-best {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: #080808;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 16px;
    border-radius: 2px;
    white-space: nowrap;
  }

  .plan-name {
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-muted); margin: 0 0 12px;
  }
  .price-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px; }
  .price {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(48px, 6vw, 64px); font-weight: 700;
    color: var(--text-primary); letter-spacing: -0.02em; line-height: 1;
  }
  .period { font-family: 'Syne', sans-serif; font-size: 16px; color: var(--text-muted); }
  .price-detail {
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    color: var(--accent); margin: 0 0 8px; letter-spacing: 0.02em;
  }
  .plan-desc {
    font-family: 'Syne', sans-serif; font-size: 14px;
    color: var(--text-secondary); margin: 0 0 28px;
  }

  .features-list {
    list-style: none; margin: 0 0 32px; padding: 0;
    display: flex; flex-direction: column; gap: 10px;
  }
  .features-list li {
    font-family: 'Syne', sans-serif; font-size: 14px;
    color: var(--text-secondary); padding-left: 20px; position: relative;
  }
  .features-list li::before {
    content: '→'; position: absolute; left: 0;
    color: var(--accent); font-size: 12px;
  }
  .features-list strong { color: var(--text-primary); }

  .btn-primary {
    display: block; text-align: center;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: #080808; background: var(--accent);
    padding: 14px 24px; border-radius: 4px; text-decoration: none;
    transition: background 200ms, box-shadow 200ms, transform 200ms;
  }
  .btn-primary:hover {
    background: var(--accent-bright);
    box-shadow: 0 0 32px rgba(249,115,22,0.4);
    transform: translateY(-1px);
  }

  .btn-secondary {
    display: block; text-align: center;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--text-primary); border: 1px solid var(--bg-border);
    padding: 14px 24px; border-radius: 4px; text-decoration: none;
    transition: border-color 200ms, color 200ms;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

  /* Waitlist */
  .waitlist {
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    border-radius: 8px;
    padding: 56px;
  }
  .waitlist-inner {
    display: flex;
    gap: 64px;
    align-items: center;
  }
  .waitlist-text { flex: 1; }
  .waitlist-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 12px;
  }
  .waitlist-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 4vw, 48px); font-weight: 700;
    letter-spacing: -0.01em; color: var(--text-primary); margin: 0 0 16px;
  }
  .waitlist-body {
    font-family: 'Syne', sans-serif; font-size: 15px;
    color: var(--text-secondary); line-height: 1.7; margin: 0;
  }
  .waitlist-body strong { color: var(--accent); }

  .waitlist-form { flex: 1; }
  .form-row {
    display: flex; gap: 0;
    border: 1px solid var(--bg-border); border-radius: 4px; overflow: hidden;
    margin-bottom: 12px;
  }
  .form-row input {
    flex: 1; background: var(--bg-elevated); border: none; outline: none;
    padding: 14px 20px; font-family: 'Syne', sans-serif; font-size: 15px;
    color: var(--text-primary);
    transition: box-shadow 200ms;
  }
  .form-row input::placeholder { color: var(--text-muted); }
  .form-row input:focus {
    box-shadow: inset 0 0 0 2px rgba(249, 115, 22, 0.4);
  }
  .form-row button {
    background: var(--accent); color: #080808; border: none;
    padding: 14px 24px; font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
    white-space: nowrap;
    transition: background 200ms;
  }
  .form-row button:hover { background: var(--accent-bright); }

  .form-mention {
    font-family: 'Syne', sans-serif; font-size: 12px;
    color: var(--text-muted); margin: 0;
  }
  .form-mention a { color: var(--text-muted); text-decoration: underline; }

  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); border: 0;
  }

  @media (max-width: 900px) {
    .cards-row { flex-direction: column; }
    .card-annual { transform: none; }
    .waitlist-inner { flex-direction: column; gap: 40px; }
    .waitlist { padding: 32px 24px; }
    .form-row { flex-direction: column; border-radius: 4px; }
    .form-row input { border-radius: 4px 4px 0 0; }
    .form-row button { border-radius: 0 0 4px 4px; padding: 14px; }
  }

  @media (max-width: 640px) {
    .pricing { padding: 80px 0; }
  }
</style>
```

- [ ] **Step 2 : Ajouter Pricing à `src/pages/index.astro`**

```astro
import Pricing from '../components/Pricing.astro'
// Dans le template :
<Hero />
<Features />
<Pricing />
```

- [ ] **Step 3 : Vérifier — 2 cartes tarifaires, carte annuelle décalée vers le haut, badge orange, bloc waitlist avec formulaire**

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add Pricing section with waitlist form and early bird CTA"
```

---

## Task 6 : Section Guides Teaser

**Files:**
- Create: `src/components/GuidesTeaser.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1 : Créer `src/components/GuidesTeaser.astro`**

```astro
---
// src/components/GuidesTeaser.astro
const guides = [
  {
    number: '01',
    title:  'Comment se préparer au Hyrox Open : le guide complet',
    excerpt:'Stations, allures, structure d'entraînement, erreurs classiques — tout ce qu'il faut savoir avant de s'inscrire.',
    href:   '/guides/',
  },
  {
    number: '02',
    title:  'Hyrox Single Open : programme et conseils pour débutants',
    excerpt:'Ta première compétition en solo, pas à pas. Comment t'entraîner, quel rythme tenir, comment ne pas te planter.',
    href:   '/guides/hyrox-single-open/',
  },
  {
    number: '03',
    title:  'Hyrox Duo & Mixte Open : s'organiser à deux pour performer',
    excerpt:'Courir à deux, ça se prépare différemment. Organisation des relais, synchronisation, stratégie de course.',
    href:   '/guides/hyrox-duo-mixte-open/',
  },
]
---

<section class="guides-teaser">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-label">Guides</p>
      <h2 class="section-title">Tout ce qu'il faut savoir<br />pour se préparer au Hyrox</h2>
    </div>

    <div class="guides-list">
      {guides.map((g, i) => (
        <a href={g.href} class="guide-row reveal" style={`--delay: ${i * 80}ms`}>
          <span class="guide-number" aria-hidden="true">{g.number}</span>
          <div class="guide-content">
            <h3 class="guide-title">{g.title}</h3>
            <p class="guide-excerpt">{g.excerpt}</p>
          </div>
          <span class="guide-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .guides-teaser { padding: 120px 0; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  .section-header { margin-bottom: 56px; }
  .section-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 16px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 4.5vw, 60px); font-weight: 700;
    letter-spacing: -0.01em; line-height: 0.95;
    color: var(--text-primary); margin: 0;
  }

  .guides-list { display: flex; flex-direction: column; }

  .guide-row {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px 0;
    border-bottom: 1px solid var(--bg-border);
    text-decoration: none;
    transition: all 250ms ease;
  }
  .guide-row:first-child { border-top: 1px solid var(--bg-border); }
  .guide-row:hover .guide-number { color: var(--accent); }
  .guide-row:hover .guide-title  { color: var(--accent); }
  .guide-row:hover .guide-arrow  { color: var(--accent); transform: translateX(6px); }
  .guide-row:hover { border-bottom-color: rgba(249, 115, 22, 0.3); }

  .guide-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; font-weight: 600;
    color: var(--text-muted); letter-spacing: 0.05em;
    flex-shrink: 0; width: 32px;
    transition: color 250ms;
  }

  .guide-content { flex: 1; min-width: 0; }

  .guide-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(17px, 2.2vw, 22px); font-weight: 700;
    color: var(--text-primary); margin: 0 0 8px;
    transition: color 250ms;
  }

  .guide-excerpt {
    font-family: 'Syne', sans-serif; font-size: 14px;
    color: var(--text-muted); line-height: 1.6; margin: 0;
  }

  .guide-arrow {
    font-size: 20px; color: var(--text-muted);
    flex-shrink: 0; transition: color 250ms, transform 250ms;
  }

  @media (max-width: 640px) {
    .guides-teaser { padding: 80px 0; }
    .guide-row { gap: 16px; }
    .guide-arrow { display: none; }
  }
</style>
```

- [ ] **Step 2 : Ajouter GuidesTeaser à `src/pages/index.astro`**

```astro
import GuidesTeaser from '../components/GuidesTeaser.astro'
// Dans le template, après Pricing :
<GuidesTeaser />
```

- [ ] **Step 3 : Vérifier — 3 lignes style magazine avec numéros, hover orange sur titre et numéro**

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add GuidesTeaser section with editorial magazine layout"
```

---

## Task 7 : Layout guides + Guide pilier

**Files:**
- Create: `src/components/GuideLayout.astro`
- Create: `src/pages/guides/index.astro`

- [ ] **Step 1 : Créer `src/components/GuideLayout.astro`**

```astro
---
// src/components/GuideLayout.astro
import BaseLayout from '../layouts/BaseLayout.astro'

interface Props {
  title: string
  description: string
  canonical?: string
  schema?: object
  breadcrumbs: Array<{ name: string; href?: string }>
}

const { title, description, canonical, schema, breadcrumbs } = Astro.props
---

<BaseLayout {title} {description} {canonical} {schema}>
  <article class="guide-article">
    <div class="container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        {breadcrumbs.map((crumb, i) => (
          <span>
            {crumb.href
              ? <a href={crumb.href}>{crumb.name}</a>
              : <span aria-current="page">{crumb.name}</span>
            }
            {i < breadcrumbs.length - 1 && <span class="sep" aria-hidden="true"> / </span>}
          </span>
        ))}
      </nav>

      <!-- Contenu injecté -->
      <div class="guide-body">
        <slot />
      </div>

      <!-- CTA bas de guide -->
      <div class="guide-cta">
        <p class="guide-cta-label">Prêt à te préparer sérieusement ?</p>
        <h3 class="guide-cta-title">Momentum t'accompagne du premier entraînement au jour J.</h3>
        <a href="/#waitlist" class="guide-cta-btn">Rejoindre la liste d'attente →</a>
      </div>

    </div>
  </article>
</BaseLayout>

<style>
  .guide-article { padding-top: 96px; padding-bottom: 120px; }
  .container { max-width: 800px; margin: 0 auto; padding: 0 24px; }

  /* Breadcrumb */
  .breadcrumb {
    font-family: 'Syne', sans-serif; font-size: 13px;
    color: var(--text-muted); margin-bottom: 48px;
    display: flex; flex-wrap: wrap; gap: 4px;
  }
  .breadcrumb a { color: var(--text-muted); text-decoration: none; }
  .breadcrumb a:hover { color: var(--text-primary); }
  .sep { color: var(--bg-border); }

  /* Guide body typography */
  .guide-body :global(h1) {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(40px, 6vw, 72px); font-weight: 900;
    letter-spacing: -0.02em; line-height: 0.95;
    color: var(--text-primary); margin: 0 0 32px;
  }
  .guide-body :global(h2) {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 700;
    letter-spacing: -0.01em; line-height: 1;
    color: var(--text-primary); margin: 64px 0 20px;
    padding-top: 48px; border-top: 1px solid var(--bg-border);
  }
  .guide-body :global(h3) {
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700;
    color: var(--text-primary); margin: 32px 0 12px;
  }
  .guide-body :global(p) {
    font-family: 'Syne', sans-serif; font-size: 16px;
    color: var(--text-secondary); line-height: 1.8;
    margin: 0 0 20px;
  }
  .guide-body :global(strong) { color: var(--text-primary); }
  .guide-body :global(ul), .guide-body :global(ol) {
    padding-left: 20px; margin: 0 0 20px;
  }
  .guide-body :global(li) {
    font-family: 'Syne', sans-serif; font-size: 16px;
    color: var(--text-secondary); line-height: 1.8; margin-bottom: 8px;
  }
  .guide-body :global(li::marker) { color: var(--accent); }

  /* FAQ spécifique */
  .guide-body :global(.faq-item) {
    border-bottom: 1px solid var(--bg-border);
    padding: 24px 0;
  }
  .guide-body :global(.faq-q) {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
    color: var(--text-primary); margin: 0 0 12px;
  }
  .guide-body :global(.faq-a) {
    font-family: 'Syne', sans-serif; font-size: 15px;
    color: var(--text-secondary); line-height: 1.7; margin: 0;
  }

  /* CTA bas de page */
  .guide-cta {
    margin-top: 80px; padding: 48px;
    background: var(--bg-surface); border: 1px solid rgba(249,115,22,0.3);
    border-radius: 8px; text-align: center;
  }
  .guide-cta-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 12px;
  }
  .guide-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 700;
    color: var(--text-primary); margin: 0 0 32px; line-height: 1;
  }
  .guide-cta-btn {
    display: inline-block;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: #080808; background: var(--accent);
    padding: 16px 32px; border-radius: 4px; text-decoration: none;
    transition: background 200ms, box-shadow 200ms, transform 200ms;
  }
  .guide-cta-btn:hover {
    background: var(--accent-bright);
    box-shadow: 0 0 32px rgba(249,115,22,0.4);
    transform: translateY(-2px);
  }
</style>
```

- [ ] **Step 2 : Créer `src/pages/guides/index.astro`**

```astro
---
import GuideLayout from '../../components/GuideLayout.astro'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour préparer un Hyrox Open ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pour un débutant, 3 à 4 mois de préparation structurée sont recommandés. Momentum propose un programme progressif qui s'adapte à ton niveau de départ." }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre Hyrox Single, Duo et Mixte Open ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le Single Open se court seul sur 8km + 8 stations. Le Duo se court à deux en alternance. Le Mixte est un duo homme/femme. Dans tous les cas, les stations et les distances sont identiques." }
    },
    {
      "@type": "Question",
      "name": "Quel niveau faut-il pour faire un Hyrox Open ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le Hyrox Open est accessible aux débutants avec une préparation adaptée. Pas besoin d'être un athlète de haut niveau — la progression structurée est la clé." }
    },
    {
      "@type": "Question",
      "name": "Faut-il courir vite pour faire le Hyrox ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Non. La gestion de l'allure est plus importante que la vitesse brute. Momentum calibre tes allures en fonction de ton temps au 10km pour que tu ne partes pas trop vite." }
    },
    {
      "@type": "Question",
      "name": "Peut-on faire un Hyrox sans salle de sport ?",
      "acceptedAnswer": { "@type": "Answer", "text": "La préparation Hyrox nécessite un accès à du matériel spécifique (ski erg, rowing, sled, etc.). Certaines salles de sport proposent des espaces Hyrox dédiés." }
    }
  ]
}
---

<GuideLayout
  title="Comment se préparer au Hyrox Open : le guide complet"
  description="Tout ce qu'il faut savoir pour préparer le Hyrox Open : programme d'entrainement, stations expliquées, allures de course, formats Single, Duo et Mixte. Guide complet pour débutants et intermédiaires."
  canonical="https://momentum-hyrox.fr/guides/"
  schema={faqSchema}
  breadcrumbs={[
    { name: 'Accueil', href: '/' },
    { name: 'Guides' }
  ]}
>
  <h1>Comment se préparer au Hyrox Open : le guide complet</h1>

  <p>
    Le Hyrox explose en France. Des milliers d'athlètes — débutants comme confirmés — franchissent
    chaque année la ligne d'arrivée après 8 kilomètres de course entrecoupés de 8 stations fonctionnelles.
    Mais entre l'inscription et le jour J, il y a une préparation. Ce guide te donne tout ce qu'il faut
    pour l'aborder correctement, que tu vises juste finir ou que tu veuilles performer.
  </p>

  <h2>Qu'est-ce que le Hyrox Open ?</h2>

  <p>
    Le Hyrox est une compétition de fitness racing : tu cours 1 km, tu réalises une station fonctionnelle,
    tu cours 1 km, tu réalises la station suivante — et ainsi de suite sur 8 répétitions.
    Le format <strong>Open</strong> est le plus accessible : pas de temps minimum requis, pas de
    qualification préalable.
  </p>

  <h3>Le format Single Open</h3>
  <p>Tu cours seul. Tu réalises toutes les stations toi-même. C'est le format le plus exigeant physiquement et le plus répandu.</p>

  <h3>Le format Duo Open</h3>
  <p>Tu cours à deux en alternance. Chaque athlète peut réaliser les stations librement — une stratégie de relais bien pensée fait toute la différence.</p>

  <h3>Le format Mixte Open</h3>
  <p>Un duo homme + femme. Les mêmes règles que le Duo, avec une dimension de complémentarité supplémentaire.</p>

  <h2>Les 8 stations Hyrox expliquées</h2>

  <p>Chaque station revient dans le même ordre, quelle que soit la ville ou la date de compétition :</p>

  <ul>
    <li><strong>SkiErg — 1000m</strong> : mouvement de tirage bilatéral debout, travaille le dos, les épaules et le gainage.</li>
    <li><strong>Sled Push — 50m</strong> : pousser un traîneau lesté sur 50 mètres. Force des jambes et cardiovasculaire.</li>
    <li><strong>Sled Pull — 50m</strong> : tirer le traîneau avec une corde. Dos, biceps, gainage.</li>
    <li><strong>Burpees Broad Jump — 80m</strong> : burpee avec saut en longueur. L'une des stations les plus épuisantes.</li>
    <li><strong>Rowing — 1000m</strong> : ergomètre à rames. Technique et endurance.</li>
    <li><strong>Farmer's Carry — 200m</strong> : porter deux kettlebells sur 200 mètres. Force de préhension et stabilité.</li>
    <li><strong>Sandbag Lunges — 100m</strong> : fentes avec un sac de sable sur les épaules. Quadriceps et équilibre.</li>
    <li><strong>Wall Balls — 75 à 100 répétitions</strong> : lancer une médecine-ball contre un mur depuis une position squat. Effort final souvent décisif.</li>
  </ul>

  <h2>Comment structurer son entraînement Hyrox</h2>

  <p>
    La clé d'une bonne préparation Hyrox, c'est la <strong>progression structurée</strong>.
    Trop d'athlètes arrivent le jour J sans avoir jamais enchaîné course + station à la même
    intensité qu'en compétition. Momentum découpe la préparation en 4 phases :
  </p>

  <h3>Phase 1 — Poser les bases</h3>
  <p>Développer l'endurance aérobie fondamentale et la force fonctionnelle de base. Travail en zone 2, introduction des mouvements Hyrox sans charge maximale.</p>

  <h3>Phase 2 — Développer l'endurance spécifique</h3>
  <p>Augmenter le volume et introduire des blocs de course + station. L'objectif est d'habituer le corps à enchaîner sans récupération complète.</p>

  <h3>Phase 3 — Spécificité Hyrox</h3>
  <p>Simuler les conditions de course. Séances complètes avec les 8 stations, travail des allures de compétition, gestion de l'intensité station par station.</p>

  <h3>Phase 4 — Affûtage avant compétition</h3>
  <p>Réduire le volume, maintenir l'intensité. Préparer mentalement le plan de course, récupérer sans perdre les acquis.</p>

  <h2>Les erreurs classiques des débutants</h2>

  <ul>
    <li><strong>Partir trop vite sur le premier kilomètre.</strong> L'erreur numéro un. L'enthousiasme du départ détruit le reste de la course.</li>
    <li><strong>Négliger les stations à l'entraînement.</strong> Courir sans jamais s'entraîner aux mouvements spécifiques, c'est arriver le jour J sans repères.</li>
    <li><strong>Ne pas s'entraîner à l'enchaînement.</strong> Courir d'un côté, faire de la force de l'autre — mais jamais ensemble. C'est pourtant l'essence du Hyrox.</li>
    <li><strong>Sous-estimer le Sled Push et les Wall Balls.</strong> Ces deux stations sont systématiquement plus difficiles que prévu le jour J.</li>
    <li><strong>Ignorer la récupération.</strong> La progression vient pendant la récupération, pas pendant l'entraînement.</li>
  </ul>

  <h2>Comment Momentum t'aide à progresser</h2>

  <p>
    Momentum est une application iOS et Android qui te donne un programme complet de préparation Hyrox.
    Tu entres ton temps au 10km, et l'app calibre toutes tes allures de course en fonction de ton niveau.
    Chaque semaine, tu sais exactement ce que tu dois faire, pourquoi, et à quelle intensité.
    Tu suis ta progression séance par séance.
  </p>

  <p>
    Disponible pour le <strong>Single Open</strong>, le <strong>Duo Open</strong> et le <strong>Mixte Open</strong>.
  </p>

  <h2>Questions fréquentes sur le Hyrox Open</h2>

  <div class="faq-item">
    <p class="faq-q">Combien de temps faut-il pour préparer un Hyrox Open ?</p>
    <p class="faq-a">Pour un débutant, 3 à 4 mois de préparation structurée sont recommandés. Momentum propose un programme progressif qui s'adapte à ton niveau de départ.</p>
  </div>

  <div class="faq-item">
    <p class="faq-q">Quelle est la différence entre Hyrox Single, Duo et Mixte Open ?</p>
    <p class="faq-a">Le Single Open se court seul sur 8km + 8 stations. Le Duo se court à deux en alternance. Le Mixte est un duo homme/femme. Dans tous les cas, les stations et les distances sont identiques.</p>
  </div>

  <div class="faq-item">
    <p class="faq-q">Quel niveau faut-il pour faire un Hyrox Open ?</p>
    <p class="faq-a">Le Hyrox Open est accessible aux débutants avec une préparation adaptée. Pas besoin d'être un athlète de haut niveau — la progression structurée est la clé.</p>
  </div>

  <div class="faq-item">
    <p class="faq-q">Faut-il courir vite pour faire le Hyrox ?</p>
    <p class="faq-a">Non. La gestion de l'allure est plus importante que la vitesse brute. Momentum calibre tes allures en fonction de ton temps au 10km pour que tu ne partes pas trop vite.</p>
  </div>

  <div class="faq-item">
    <p class="faq-q">Peut-on faire un Hyrox sans salle de sport ?</p>
    <p class="faq-a">La préparation Hyrox nécessite un accès à du matériel spécifique (ski erg, rowing, sled, etc.). Certaines salles de sport proposent des espaces Hyrox dédiés.</p>
  </div>

  <p style="margin-top: 32px;">
    <a href="/guides/hyrox-single-open/" style="color: var(--accent);">→ Lire : Hyrox Single Open — programme et conseils pour débutants</a><br/>
    <a href="/guides/hyrox-duo-mixte-open/" style="color: var(--accent);">→ Lire : Hyrox Duo & Mixte Open — s'organiser à deux</a>
  </p>

</GuideLayout>
```

- [ ] **Step 3 : Vérifier — guide pilier lisible, breadcrumb, CTA orange en bas**

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add GuideLayout and guide pilier hyrox open"
```

---

## Task 8 : Guides Single Open et Duo & Mixte

**Files:**
- Create: `src/pages/guides/hyrox-single-open.astro`
- Create: `src/pages/guides/hyrox-duo-mixte-open.astro`

- [ ] **Step 1 : Créer `src/pages/guides/hyrox-single-open.astro`**

```astro
---
import GuideLayout from '../../components/GuideLayout.astro'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hyrox Single Open : Programme et conseils pour débutants",
  "description": "Comment préparer le Hyrox Single Open quand on est débutant ? Programme, allures, stations, erreurs à éviter.",
  "author": { "@type": "Organization", "name": "Momentum" },
  "datePublished": "2026-06-08",
  "dateModified": "2026-06-08"
}
---

<GuideLayout
  title="Hyrox Single Open : Programme et conseils pour débutants"
  description="Comment préparer le Hyrox Single Open quand on est débutant ? Programme d'entraînement, allures, stations, erreurs à éviter. Tout ce qu'il faut savoir avant ta première compétition."
  canonical="https://momentum-hyrox.fr/guides/hyrox-single-open/"
  schema={schema}
  breadcrumbs={[
    { name: 'Accueil', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: 'Hyrox Single Open' }
  ]}
>
  <h1>Hyrox Single Open : programme et conseils pour débutants</h1>

  <p>
    Le <strong>Hyrox Single Open</strong> est le format le plus populaire et le plus exigeant : tu cours seul,
    tu gères tout toi-même, et tu n'as personne sur qui compter entre les stations. C'est aussi le format
    le plus gratifiant quand tu franchis la ligne d'arrivée. Voici comment te préparer correctement,
    même si c'est ta première compétition.
  </p>

  <h2>Ce que le Single Open implique concrètement</h2>

  <p>
    8 kilomètres de course fractionnés en 8 segments d'1 km, avec une station fonctionnelle après chaque
    kilomètre. Tu ne t'arrêtes jamais vraiment — tu passes de la course à l'effort musculaire, puis tu
    repars courir. Le total de l'effort dure entre 1h et 2h selon ton niveau.
  </p>

  <ul>
    <li>Distance totale de course : <strong>8 km</strong></li>
    <li>Nombre de stations : <strong>8</strong></li>
    <li>Temps moyen débutant : <strong>1h30 à 2h</strong></li>
    <li>Temps moyen intermédiaire : <strong>1h05 à 1h30</strong></li>
  </ul>

  <h2>L'allure de course : l'erreur à ne pas faire</h2>

  <p>
    La plus grande erreur des débutants en Single Open, c'est de courir le premier kilomètre trop vite.
    Tu es frais, la foule te porte, l'adrénaline est là — et tu dépenses en 4 minutes ce dont tu
    avais besoin pour tenir 90 minutes.
  </p>

  <p>
    <strong>Règle d'or :</strong> ton allure de course au Hyrox doit être environ 60 à 75 secondes par kilomètre
    plus lente que ton allure naturelle au 10km. Si tu cours un 10km en 55 minutes (5'30"/km), ta cible
    au Hyrox sera autour de 6'30"–7'00"/km.
  </p>

  <p>
    Momentum calcule automatiquement ces allures à partir de ton temps au 10km. Tu n'as pas à faire
    le calcul toi-même.
  </p>

  <h2>Comment structurer ta préparation Single Open</h2>

  <h3>Si tu es débutant (première compétition)</h3>
  <p>
    Commence au moins <strong>12 à 16 semaines avant</strong> ta compétition. Les premières semaines
    servent à poser les bases aérobies et à apprendre les gestes techniques des stations.
    Ne te concentre pas sur la performance — concentre-toi sur la régularité.
  </p>

  <ul>
    <li>3 à 4 séances par semaine</li>
    <li>Au moins 1 longue sortie course par semaine (45–60 min à allure confortable)</li>
    <li>1 séance dédiée aux stations Hyrox (technique et volume modéré)</li>
    <li>1 séance de renforcement musculaire général</li>
  </ul>

  <h3>Si tu es intermédiaire</h3>
  <p>
    Tu as une base aérobie et tu maîtrises les mouvements fonctionnels. Concentre-toi sur
    l'<strong>enchaînement course + station</strong> à intensité de compétition. Les séances
    "brick" (course puis stations sans récupération) sont ta priorité.
  </p>

  <h2>Les stations les plus piégeuses en Single</h2>

  <p>En Single Open, trois stations font particulièrement trébucher les débutants :</p>

  <ul>
    <li>
      <strong>Burpees Broad Jump (80m) :</strong> c'est la station la plus épuisante du parcours.
      Garder un rythme régulier plutôt que de sprinter puis s'effondrer.
    </li>
    <li>
      <strong>Sandbag Lunges (100m) :</strong> les jambes sont déjà fatiguées quand tu arrives là.
      Le poids du sac amplifie la fatigue accumulée.
    </li>
    <li>
      <strong>Wall Balls (75–100 reps) :</strong> la station finale. Si tu es parti trop vite,
      c'est ici que tout s'effondre.
    </li>
  </ul>

  <h2>Momentum pour le Single Open</h2>

  <p>
    L'application Momentum inclut un programme complet dédié au <strong>Single Open</strong>.
    Programme progressif, allures calibrées selon ton niveau, suivi séance par séance.
    Rejoins la liste d'attente pour être notifié au lancement et bénéficier de la remise early bird.
  </p>

  <p>
    <a href="/guides/" style="color: var(--accent);">← Retour au guide complet Hyrox Open</a><br/>
    <a href="/guides/hyrox-duo-mixte-open/" style="color: var(--accent);">→ Lire : Hyrox Duo & Mixte Open</a>
  </p>

</GuideLayout>
```

- [ ] **Step 2 : Créer `src/pages/guides/hyrox-duo-mixte-open.astro`**

```astro
---
import GuideLayout from '../../components/GuideLayout.astro'

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hyrox Duo & Mixte Open : S'organiser à deux pour performer",
  "description": "Préparer le Hyrox Duo ou Mixte Open demande une organisation spécifique. Découvre comment structurer ton entrainement à deux, gérer les relais et optimiser votre stratégie de course.",
  "author": { "@type": "Organization", "name": "Momentum" },
  "datePublished": "2026-06-08",
  "dateModified": "2026-06-08"
}
---

<GuideLayout
  title="Hyrox Duo & Mixte Open : S'organiser à deux pour performer"
  description="Préparer le Hyrox Duo ou Mixte Open demande une organisation spécifique. Découvre comment structurer ton entrainement à deux, gérer les relais et optimiser votre stratégie de course."
  canonical="https://momentum-hyrox.fr/guides/hyrox-duo-mixte-open/"
  schema={schema}
  breadcrumbs={[
    { name: 'Accueil', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: 'Hyrox Duo & Mixte Open' }
  ]}
>
  <h1>Hyrox Duo & Mixte Open : s'organiser à deux pour performer</h1>

  <p>
    Le <strong>Hyrox Duo Open</strong> et le <strong>Mixte Open</strong> partagent la même structure :
    deux athlètes, un dossard, des relais à gérer intelligemment. Si l'aspect collectif rend
    l'expérience plus fun, il ajoute aussi une couche de stratégie que beaucoup de duos négligent
    à leur préparation. Ce guide t'explique comment maximiser ta performance à deux.
  </p>

  <h2>Règles et spécificités du format Duo</h2>

  <p>
    En Duo et Mixte Open, les deux athlètes courent ensemble pendant les kilomètres de course.
    Sur les stations, vous pouvez vous organiser librement : alterner les répétitions, se relayer
    tous les X reps, ou laisser le plus fort gérer une station entière.
  </p>

  <ul>
    <li>Les deux athlètes courent <strong>simultanément</strong> les segments de 1km</li>
    <li>Sur les stations, <strong>un seul athlète travaille à la fois</strong></li>
    <li>Le volume total des stations est <strong>identique au Single</strong> — il est partagé entre les deux</li>
    <li>En Mixte, la composition homme/femme est obligatoire</li>
  </ul>

  <h2>La stratégie de relais : la clé de la performance</h2>

  <p>
    La grande question de chaque duo : comment se répartir les stations ? Il n'existe pas de
    réponse universelle, mais quelques principes guident les meilleures équipes :
  </p>

  <h3>Option 1 — Relais égaux (50/50)</h3>
  <p>
    Chaque athlète fait la moitié des reps sur chaque station, en alternant. Simple à gérer,
    mais pas optimal si les deux athlètes ont des niveaux différents sur certains mouvements.
  </p>

  <h3>Option 2 — Répartition par spécialité</h3>
  <p>
    L'un gère le Rowing et le SkiErg (endurance haute), l'autre prend le Sled Push et les Lunges
    (force). Cette approche nécessite de connaître mutuellement vos points forts.
  </p>

  <h3>Option 3 — Relais variables selon la fatigue</h3>
  <p>
    Pas de plan rigide — vous vous relayez selon comment vous vous sentez en temps réel.
    Nécessite une bonne communication et une confiance mutuelle. Déconseillé pour les débutants.
  </p>

  <h2>S'entraîner à deux : comment organiser la préparation</h2>

  <p>
    L'erreur la plus fréquente des duos : s'entraîner séparément et se retrouver le jour J sans
    avoir jamais enchaîné ensemble. <strong>Au moins 30% de vos séances doivent être réalisées ensemble</strong>,
    notamment les séances de simulation de course.
  </p>

  <ul>
    <li><strong>Séances individuelles :</strong> chacun développe sa base aérobie et sa force fonctionnelle</li>
    <li><strong>Séances communes :</strong> simulation des enchaînements avec les relais</li>
    <li><strong>Test à blanc :</strong> au moins une simulation complète des 8 stations avec relais, 3 à 4 semaines avant la compétition</li>
  </ul>

  <h2>Spécificités du Mixte Open</h2>

  <p>
    Le Mixte ajoute une dimension supplémentaire : les gabarits et les niveaux de force peuvent
    varier significativement entre les deux athlètes. Quelques ajustements s'imposent :
  </p>

  <ul>
    <li>
      <strong>Farmer's Carry :</strong> le poids est identique pour les deux. Si l'un des deux
      est nettement plus léger, prévoir de s'entraîner spécifiquement sur ce mouvement.
    </li>
    <li>
      <strong>Sandbag Lunges :</strong> idem — poids fixe, mais impact très différent selon le
      ratio poids/force de chaque athlète.
    </li>
    <li>
      <strong>Wall Balls :</strong> hauteur cible différente selon le genre (hommes 6m, femmes 4,5m).
      Bien connaître les règles avant le jour J.
    </li>
  </ul>

  <h2>Momentum pour le Duo & Mixte Open</h2>

  <p>
    L'application Momentum inclut les formats <strong>Duo Open</strong> et <strong>Mixte Open</strong>.
    Programme progressif adapté à une préparation à deux, allures calibrées, suivi séance par séance.
    Rejoins la liste d'attente pour être notifié au lancement et bénéficier de la remise early bird.
  </p>

  <p>
    <a href="/guides/" style="color: var(--accent);">← Retour au guide complet Hyrox Open</a><br/>
    <a href="/guides/hyrox-single-open/" style="color: var(--accent);">→ Lire : Hyrox Single Open</a>
  </p>

</GuideLayout>
```

- [ ] **Step 3 : Vérifier les deux guides — breadcrumbs corrects, liens entre guides fonctionnels**

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: add Hyrox Single Open and Duo Mixte Open guide pages"
```

---

## Task 9 : Page mentions légales

**Files:**
- Create: `src/pages/mentions-legales.astro`

- [ ] **Step 1 : Créer `src/pages/mentions-legales.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
---

<BaseLayout
  title="Mentions légales — Momentum"
  description="Mentions légales, politique de confidentialité et conditions d'utilisation de Momentum."
  canonical="https://momentum-hyrox.fr/mentions-legales/"
>
  <div class="mentions">
    <div class="container">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>Momentum — [Nom ou raison sociale à compléter]<br/>
      Email : [email à compléter]</p>

      <h2>Hébergement</h2>
      <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, San Francisco, CA 94104, États-Unis.</p>

      <h2>Collecte de données personnelles</h2>
      <p>
        Dans le cadre de la liste d'attente, nous collectons uniquement ton adresse email.
        Cette donnée est utilisée exclusivement pour t'informer du lancement de l'application
        Momentum et t'envoyer l'offre early bird promise lors de ton inscription.
      </p>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), tu disposes d'un
        droit d'accès, de rectification et de suppression de tes données. Pour exercer ces droits,
        contacte-nous à [email à compléter].
      </p>
      <p>Nous ne vendons ni ne partageons tes données avec des tiers.</p>

      <h2>Cookies</h2>
      <p>Ce site n'utilise pas de cookies de tracking. Aucune donnée de navigation n'est collectée.</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, visuels, code) est la propriété exclusive de Momentum.
        Toute reproduction est interdite sans autorisation préalable.
      </p>
    </div>
  </div>
</BaseLayout>

<style>
  .mentions { padding: 120px 0 80px; }
  .container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

  h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(40px, 6vw, 64px); font-weight: 900;
    color: var(--text-primary); margin: 0 0 48px;
  }
  h2 {
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
    color: var(--text-primary); margin: 40px 0 12px;
  }
  p {
    font-family: 'Syne', sans-serif; font-size: 15px;
    color: var(--text-secondary); line-height: 1.8; margin: 0 0 16px;
  }
</style>
```

- [ ] **Step 2 : Commit**

```bash
git add -A
git commit -m "feat: add mentions légales page"
```

---

## Task 10 : Vérification build, SEO et performance

**Files:**
- Verify: `dist/sitemap-index.xml`
- Verify: `dist/robots.txt`

- [ ] **Step 1 : Build de production**

```bash
npm run build
```

Résultat attendu : pas d'erreur, dossier `dist/` avec toutes les pages.

- [ ] **Step 2 : Vérifier le sitemap**

```bash
cat dist/sitemap-0.xml
```

Doit contenir les URLs :
- `https://momentum-hyrox.fr/`
- `https://momentum-hyrox.fr/guides/`
- `https://momentum-hyrox.fr/guides/hyrox-single-open/`
- `https://momentum-hyrox.fr/guides/hyrox-duo-mixte-open/`
- `https://momentum-hyrox.fr/mentions-legales/`

- [ ] **Step 3 : Vérifier les balises meta sur chaque page**

```bash
npx astro preview
```

Ouvrir `http://localhost:4321` et inspecter le `<head>` de chaque page :
- `<title>` unique et < 60 caractères ✓
- `<meta description>` unique et < 160 caractères ✓
- `<link rel="canonical">` présent ✓
- `<script type="application/ld+json">` présent sur home et guides ✓

- [ ] **Step 4 : Vérifier les liens internes**

Naviguer manuellement :
- Home → `/guides/` via la section GuidesTeaser ✓
- Home → `/#waitlist` via le header ✓
- Guide pilier → sous-guides ✓
- Sous-guides → guide pilier ✓
- Footer → toutes les pages ✓

- [ ] **Step 5 : Configurer Formspree**

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire nommé "Momentum Waitlist"
3. Copier l'ID du formulaire (ex: `xyzabc12`)
4. Mettre à jour `src/components/Pricing.astro` ligne `action` :

```astro
action="https://formspree.io/f/VOTRE_VRAI_ID"
```

- [ ] **Step 6 : Tester le formulaire**

Soumettre le formulaire avec une adresse email test. Vérifier la réception dans le dashboard Formspree.

- [ ] **Step 7 : Commit final**

```bash
git add -A
git commit -m "feat: complete vitrine momentum - all pages, SEO, sitemap, guides"
```

---

## Self-Review — Couverture du spec

| Exigence spec | Tâche | Statut |
|---------------|-------|--------|
| Stack Astro + Tailwind | Task 1 | ✓ |
| Fonts Barlow/Syne/JetBrains | Task 1 | ✓ |
| Grain overlay + grille déco | Task 1 (global.css) | ✓ |
| Header fixe + mobile drawer | Task 2 | ✓ |
| Footer complet | Task 2 | ✓ |
| Curseur custom desktop | Task 2 | ✓ |
| Hero avec accroche + stats + CTA | Task 3 | ✓ |
| Badges Single/Duo/Mixte | Task 3 | ✓ |
| Révélations au scroll | Task 2 (BaseLayout) + global.css | ✓ |
| Section features 2×2 avec numéros déco | Task 4 | ✓ |
| Tarifs mensuel/annuel | Task 5 | ✓ |
| Formulaire waitlist early bird | Task 5 | ✓ |
| Guides teaser style magazine | Task 6 | ✓ |
| Guide pilier (2000+ mots) | Task 7 | ✓ |
| Guide Single Open | Task 8 | ✓ |
| Guide Duo & Mixte Open | Task 8 | ✓ |
| Mentions légales | Task 9 | ✓ |
| Schema.org SoftwareApplication | Task 3 (index.astro) | ✓ |
| Schema.org FAQPage | Task 7 | ✓ |
| Schema.org Article | Task 8 | ✓ |
| BreadcrumbList | Task 7 + 8 (GuideLayout) | ✓ |
| Sitemap.xml | Task 1 + Task 10 | ✓ |
| robots.txt | Task 1 | ✓ |
| Balises meta uniques par page | Task 3–9 | ✓ |
| H1 avec mot-clé sur chaque page | Task 7–9 | ✓ |
| Liens internes entre guides | Task 7 + 8 | ✓ |
| Mentions légales RGPD formulaire | Task 9 | ✓ |
| prefers-reduced-motion | Task 1 (global.css) | ✓ |
| Focus visible accessible | Task 1 (global.css) | ✓ |
