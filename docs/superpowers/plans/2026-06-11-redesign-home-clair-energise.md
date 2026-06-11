# Redesign Home « Clair énergisé » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre la page d'accueil du site vitrine Momentum (plus vivante, animée, avec mockups fidèles de l'app) et moderniser header/footer, sans toucher au SEO ni aux pages guides.

**Architecture:** Site Astro statique existant (thème clair blanc/orange, variables CSS dans `global.css`). On ajoute une config centrale (`src/config.ts`) pour le CTA, un composant cadre de téléphone (`PhoneMockup.astro`) et trois écrans d'app recréés en HTML/CSS d'après l'app réelle (`C:\Users\thoma\Documents\Claude\Momentum`, Vue 3 + Tailwind). La home devient : Hero animé → marquee stations → 4 phases → triptyque app → features → tarifs/waitlist → guides. Animations 100 % CSS + IntersectionObserver (déjà en place), aucun nouveau package.

**Tech Stack:** Astro 4, CSS scoped par composant, vanilla JS minimal (compteurs, ombre header). Pas de framework de test — vérification = `npm run build` + grep sur `dist/` + contrôle visuel `npm run dev`.

**Référence spec :** `docs/superpowers/specs/2026-06-11-redesign-home-clair-energise-design.md`

**Données réelles de l'app (source de vérité pour les mockups — ne rien inventer) :**
- Phases : 01 Fondation (bleu, S1–4), 02 Construction (émeraude, S5–9), 03 Spécificité (orange, S10–15), 04 Affûtage (violet, S16–19). 19 semaines au total.
- Semaine 6 (utilisée dans les mockups) : phase 2, thème « Montée de Volume », 22–28 Juin, note « Charges 72% · 5 × 1km mardi · Brick 5 stations samedi ». Séances : Mardi running « Course A — Intervalles 5 × 1km » 58 min int 7 ; Mercredi hyrox « Hyrox A — AMRAP 22 min » 70 min int 7 ; Jeudi running « Course B — Tempo » 50 min int 4 ; Samedi brick « Brick — Course + 5 Stations Hyrox » 100 min int 7 ; Dimanche hyrox « Hyrox B — Force Progression » 60 min int 7.
- Pastilles d'intensité : 5 points, allumés si `n*2 <= intensityScore` (int 7 → 3 points, int 4 → 2 points).
- Couleurs types de séance : running 🏃 emerald, strength 💪 blue, hyrox ⚡ amber, brick 🔗 cyan, mobility 🧘 violet.
- L'app utilise la police système (pas Syne/Barlow) — les écrans mockup utilisent donc `system-ui`.

---

### Task 1: Config centrale du CTA + composant `CtaPrimary`

Le CTA principal (« Rejoindre la liste d'attente ») doit pouvoir devenir des badges stores au lancement en changeant **un seul fichier**.

**Files:**
- Create: `src/config.ts`
- Create: `src/components/CtaPrimary.astro`

- [ ] **Step 1: Créer `src/config.ts`**

```ts
// src/config.ts
// Configuration centrale du site. Au lancement de l'app :
// passer productState à 'live' et renseigner les URLs stores —
// tous les CTA basculent automatiquement.
export type ProductState = 'waitlist' | 'live'

export const SITE = {
  productState: 'waitlist' as ProductState,
  cta: {
    label: "Rejoindre la liste d'attente",
    shortLabel: 'Rejoindre la liste',
    href: '/#waitlist',
  },
  stores: {
    appStore: '',
    playStore: '',
  },
  formspreeUrl: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
}
```

- [ ] **Step 2: Créer `src/components/CtaPrimary.astro`**

```astro
---
// CTA principal du site. En mode 'waitlist' : lien ancre vers le formulaire.
// En mode 'live' : badges App Store / Google Play.
import { SITE } from '../config'

interface Props {
  size?: 'md' | 'lg'
  label?: string
}

const { size = 'md', label = SITE.cta.label } = Astro.props
const isLive = SITE.productState === 'live'
---

{isLive ? (
  <span class={`store-badges ${size}`}>
    <a href={SITE.stores.appStore} class="store-badge"> App Store</a>
    <a href={SITE.stores.playStore} class="store-badge">▶ Google Play</a>
  </span>
) : (
  <a href={SITE.cta.href} class={`cta ${size}`}>{label} →</a>
)}

<style>
  .cta {
    display: inline-block;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: #fff;
    background: var(--accent);
    border-radius: 10px;
    text-decoration: none;
    transition: background 150ms, transform 150ms, box-shadow 150ms;
    box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  }
  .cta.md { font-size: 14px; padding: 13px 24px; }
  .cta.lg { font-size: 16px; padding: 17px 32px; }
  .cta:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
  }

  .store-badges { display: inline-flex; gap: 12px; }
  .store-badge {
    display: inline-block;
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #fff; background: #1a1a1a;
    padding: 13px 22px; border-radius: 10px;
    text-decoration: none;
    transition: transform 150ms, opacity 150ms;
  }
  .store-badge:hover { transform: translateY(-2px); opacity: 0.9; }
</style>
```

- [ ] **Step 3: Vérifier que le build passe**

Run: `npm run build`
Expected: build OK, aucune erreur (les composants ne sont pas encore utilisés, on vérifie juste la compilation TS/Astro).

- [ ] **Step 4: Commit**

```bash
git add src/config.ts src/components/CtaPrimary.astro
git commit -m "feat: add site config and centralized CtaPrimary component"
```

---

### Task 2: Fondations d'animation (`global.css` + observer `BaseLayout`)

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro:78` (sélecteur de l'observer)

- [ ] **Step 1: Ajouter les variantes d'animation à `global.css`**

Ajouter après le bloc `.reveal.visible { ... }` (ligne ~45) :

```css
/* Reveal avec zoom léger (mockups téléphone) */
.reveal-scale {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  transition: opacity 600ms ease, transform 600ms ease;
  transition-delay: var(--delay, 0ms);
}
.reveal-scale.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Flottement continu du téléphone du hero */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--float-rotate, 0deg)); }
  50%      { transform: translateY(-14px) rotate(var(--float-rotate, 0deg)); }
}
.phone-float {
  --float-rotate: 5deg;
  transform: rotate(var(--float-rotate));
  animation: float 6s ease-in-out infinite;
}
```

- [ ] **Step 2: Étendre le bloc reduced-motion de `global.css`**

Remplacer :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.2ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

Par :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.2ms !important;
  }
  .reveal, .reveal-scale { opacity: 1; transform: none; }
  .phone-float { animation: none; }
}
```

- [ ] **Step 3: Inclure `.reveal-scale` dans l'observer de `BaseLayout.astro`**

Remplacer la ligne :

```js
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
```

Par :

```js
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el))
```

- [ ] **Step 4: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: add reveal-scale and phone float animations"
```

---

### Task 3: Composant `PhoneMockup`

**Files:**
- Create: `src/components/PhoneMockup.astro`

- [ ] **Step 1: Créer `src/components/PhoneMockup.astro`**

```astro
---
// Cadre de téléphone réutilisable. Le contenu de l'écran est passé en slot
// (composants screens/Screen*.astro). role="img" : le contenu interne est
// décoratif pour les lecteurs d'écran mais reste indexable.
interface Props {
  class?: string
  label?: string
}

const { class: className = '', label = "Aperçu de l'application Momentum" } = Astro.props
---

<div class:list={['phone', className]} role="img" aria-label={label}>
  <div class="phone-notch" aria-hidden="true"></div>
  <div class="phone-screen">
    <slot />
  </div>
</div>

<style>
  .phone {
    width: 280px;
    aspect-ratio: 9 / 19;
    background: #111;
    border-radius: 38px;
    padding: 9px;
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.22),
      0 4px 12px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1.5px #333;
    position: relative;
    flex-shrink: 0;
  }

  .phone-notch {
    position: absolute;
    top: 17px; left: 50%;
    transform: translateX(-50%);
    width: 80px; height: 17px;
    background: #111;
    border-radius: 10px;
    z-index: 2;
  }

  .phone-screen {
    width: 100%; height: 100%;
    background: #fafaf9;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/PhoneMockup.astro
git commit -m "feat: add PhoneMockup frame component"
```

---

### Task 4: Écran « Semaine courante » (`ScreenSemaine`)

Réplique de `WeekView.vue` de l'app : îlot sombre WeekNav, barre de progression, note de semaine, cartes de séance. Données réelles de la semaine 6.

**Files:**
- Create: `src/components/screens/ScreenSemaine.astro`

- [ ] **Step 1: Créer `src/components/screens/ScreenSemaine.astro`**

```astro
---
// Réplique de WeekView.vue de l'app Momentum (semaine 6 réelle du plan).
// Couleurs = palette Tailwind utilisée par l'app.
const sessions = [
  { icon: '🏃', iconBg: '#d1fae5', day: 'Mardi',    dayColor: '#059669', dur: '58 min',  title: 'Course A — Intervalles 5 × 1km',  dots: 3, dotColor: '#10b981', done: true,  checkColor: '#10b981' },
  { icon: '⚡', iconBg: '#fef3c7', day: 'Mercredi', dayColor: '#d97706', dur: '70 min',  title: 'Hyrox A — AMRAP 22 min',           dots: 3, dotColor: '#f59e0b', done: true,  checkColor: '#f59e0b' },
  { icon: '🏃', iconBg: '#d1fae5', day: 'Jeudi',    dayColor: '#059669', dur: '50 min',  title: 'Course B — Tempo',                 dots: 2, dotColor: '#10b981', done: false, checkColor: '#10b981' },
  { icon: '🔗', iconBg: '#cffafe', day: 'Samedi',   dayColor: '#0e7490', dur: '100 min', title: 'Brick — Course + 5 Stations',      dots: 3, dotColor: '#06b6d4', done: false, checkColor: '#06b6d4' },
  { icon: '⚡', iconBg: '#fef3c7', day: 'Dimanche', dayColor: '#d97706', dur: '60 min',  title: 'Hyrox B — Force Progression',      dots: 3, dotColor: '#f59e0b', done: false, checkColor: '#f59e0b' },
]
---

<div class="screen">
  <div class="statusbar">9:41</div>

  <!-- Îlot navigation semaine (WeekNav) -->
  <div class="weeknav">
    <div class="weeknav-top">
      <span class="phase-badge">Ph.2 — Construction</span>
    </div>
    <div class="weeknav-row">
      <span class="nav-arrow">‹</span>
      <div class="weeknav-center">
        <div class="week-num">S6</div>
        <div class="week-dates">22–28 Juin</div>
        <div class="week-theme">Montée de Volume</div>
      </div>
      <span class="nav-arrow">›</span>
    </div>
  </div>

  <!-- Barre de progression -->
  <div class="progress">
    <div class="progress-head">
      <span class="progress-label">Progression</span>
      <span class="progress-pct">40%</span>
    </div>
    <div class="progress-track"><div class="progress-fill"></div></div>
  </div>

  <!-- Note de semaine -->
  <div class="week-note">Charges 72% · 5 × 1km mardi · Brick samedi</div>

  <!-- Cartes de séance -->
  <div class="sessions">
    {sessions.map(s => (
      <div class="session" style={s.done ? 'opacity: 0.55' : ''}>
        <span class="session-icon" style={`background:${s.iconBg}`}>{s.icon}</span>
        <span class="session-body">
          <span class="session-meta">
            <span class="session-day" style={`color:${s.dayColor}`}>{s.day}</span>
            <span class="session-dur"> · {s.dur}</span>
          </span>
          <span class="session-title">{s.title}</span>
          <span class="session-dots">
            {[1, 2, 3, 4, 5].map(n => (
              <span class="dot" style={`background:${n <= s.dots ? s.dotColor : '#e7e5e4'}`}></span>
            ))}
          </span>
        </span>
        <span class="session-check" style={s.done ? `background:${s.checkColor}; border-color:${s.checkColor}` : ''}>
          {s.done && <span class="check-mark">✓</span>}
        </span>
      </div>
    ))}
  </div>
</div>

<style>
  .screen {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    height: 100%;
    background: #fafaf9;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .statusbar {
    flex-shrink: 0;
    font-size: 9px; font-weight: 600; color: #292524;
    padding: 8px 16px 2px;
  }

  .weeknav {
    flex-shrink: 0;
    background: #0f172a;
    border-radius: 14px;
    margin: 6px 10px 0;
    padding: 10px 12px 12px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }
  .weeknav-top { margin-bottom: 7px; }
  .phase-badge {
    font-size: 6.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.1);
    padding: 2.5px 7px; border-radius: 9px;
  }
  .weeknav-row { display: flex; align-items: center; justify-content: space-between; }
  .nav-arrow {
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #fff; font-size: 12px;
  }
  .weeknav-center { text-align: center; }
  .week-num { font-size: 30px; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.02em; }
  .week-dates { font-size: 7px; color: rgba(255, 255, 255, 0.5); margin-top: 3px; letter-spacing: 0.04em; }
  .week-theme { font-size: 9px; font-weight: 600; color: #fb923c; margin-top: 2px; }

  .progress { flex-shrink: 0; padding: 8px 12px 4px; }
  .progress-head { display: flex; justify-content: space-between; margin-bottom: 3px; }
  .progress-label {
    font-size: 7px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: #a8a29e;
  }
  .progress-pct { font-size: 8px; font-weight: 700; color: #57534e; }
  .progress-track { height: 4px; background: #e7e5e4; border-radius: 4px; overflow: hidden; }
  .progress-fill { width: 40%; height: 100%; background: #f97316; border-radius: 4px; }

  .week-note {
    flex-shrink: 0;
    margin: 5px 12px 0;
    background: #fff7ed;
    border-left: 2.5px solid #fb923c;
    border-radius: 0 6px 6px 0;
    padding: 4px 7px;
    font-size: 7px; color: #9a3412;
  }

  .sessions {
    padding: 7px 10px 10px;
    display: flex; flex-direction: column; gap: 5px;
  }
  .session {
    background: #fff;
    border: 1px solid #f5f5f4;
    border-radius: 12px;
    padding: 7px 8px;
    display: flex; align-items: center; gap: 7px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }
  .session-icon {
    width: 26px; height: 26px; flex-shrink: 0;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }
  .session-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.5px; }
  .session-meta { font-size: 6.5px; }
  .session-day { font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
  .session-dur { color: #a8a29e; }
  .session-title {
    font-size: 8.5px; font-weight: 600; color: #292524; line-height: 1.25;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .session-dots { display: flex; gap: 2px; margin-top: 1px; }
  .dot { width: 4px; height: 4px; border-radius: 50%; }
  .session-check {
    width: 16px; height: 16px; flex-shrink: 0;
    border: 1.5px solid #e7e5e4; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .check-mark { color: #fff; font-size: 8px; font-weight: 700; }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/screens/ScreenSemaine.astro
git commit -m "feat: add ScreenSemaine app mockup (WeekView replica)"
```

---

### Task 5: Écran « Séance du jour » (`ScreenSeance`)

Réplique de `SessionDetail.vue` : héro coloré selon le type (running → emerald-600), badge, titre, méta, coach tip, blocs programme, bouton valider. Séance réelle du mardi S6.

**Files:**
- Create: `src/components/screens/ScreenSeance.astro`

- [ ] **Step 1: Créer `src/components/screens/ScreenSeance.astro`**

```astro
---
// Réplique de SessionDetail.vue (séance running du mardi, semaine 6).
// Héro emerald-600 = heroBg du type 'running' dans l'app.
const blocks = [
  { tag: 'Échauffement', detail: '15 min footing', pace: 'Z2 · 5:50 /km' },
  { tag: 'Intervalles',  detail: '5 × 1km · récup 90 s', pace: 'Z4 · 4:35 /km' },
  { tag: 'Retour au calme', detail: '8 min très facile', pace: 'Z1' },
]
---

<div class="screen">
  <div class="statusbar">9:41</div>

  <!-- Héro coloré (type running) -->
  <div class="hero">
    <div class="hero-top">
      <span class="back">‹</span>
      <span class="type-badge">🏃 Course</span>
    </div>
    <div class="hero-title">Course A — Intervalles 5 × 1km</div>
    <div class="hero-meta">
      <span>Mardi</span>
      <span class="sep">·</span>
      <span>58 min</span>
      <span class="sep">·</span>
      <span class="dots">
        {[1, 2, 3, 4, 5].map(n => (
          <span class="dot" style={`background:${n <= 3 ? '#fff' : 'rgba(255,255,255,0.25)'}`}></span>
        ))}
      </span>
    </div>
  </div>

  <div class="body">
    <p class="desc">Intervalles longs à allure seuil pour développer ton endurance de course.</p>

    <div class="coach-tip">
      <span class="tip-icon">💬</span>
      <span class="tip-text">Pars contrôlé sur le premier kilomètre — les derniers doivent être les plus rapides.</span>
    </div>

    <div class="prog-label">Programme</div>
    <div class="prog-blocks">
      {blocks.map(b => (
        <div class="prog-block">
          <span class="block-left">
            <span class="block-tag">{b.tag}</span>
            <span class="block-detail">{b.detail}</span>
          </span>
          <span class="block-pace">{b.pace}</span>
        </div>
      ))}
    </div>

    <div class="validate-btn">Valider la séance</div>
  </div>
</div>

<style>
  .screen {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    height: 100%;
    background: #fafaf9;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .statusbar {
    flex-shrink: 0;
    font-size: 9px; font-weight: 600; color: #292524;
    padding: 8px 16px 2px;
  }

  .hero {
    flex-shrink: 0;
    background: #059669;
    border-radius: 14px;
    margin: 6px 10px 0;
    padding: 10px 12px 13px;
    box-shadow: 0 6px 14px rgba(5, 150, 105, 0.25);
  }
  .hero-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }
  .back {
    width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #fff; font-size: 11px;
  }
  .type-badge {
    font-size: 6.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: #fff; background: rgba(255, 255, 255, 0.2);
    padding: 2.5px 7px; border-radius: 9px;
  }
  .hero-title { font-size: 14px; font-weight: 900; color: #fff; line-height: 1.2; letter-spacing: -0.01em; margin-bottom: 7px; }
  .hero-meta { display: flex; align-items: center; gap: 4px; font-size: 8px; color: rgba(255, 255, 255, 0.75); }
  .sep { color: rgba(255, 255, 255, 0.35); }
  .dots { display: inline-flex; gap: 2px; }
  .dot { width: 4px; height: 4px; border-radius: 50%; }

  .body { padding: 9px 12px; display: flex; flex-direction: column; }

  .desc { font-size: 8px; color: #57534e; line-height: 1.5; margin: 0 0 7px; }

  .coach-tip {
    display: flex; gap: 5px; align-items: flex-start;
    background: #fafaf9;
    border: 1px solid #e7e5e4;
    border-radius: 9px;
    padding: 6px 7px;
    margin-bottom: 9px;
  }
  .tip-icon { font-size: 9px; flex-shrink: 0; }
  .tip-text { font-size: 7px; font-style: italic; color: #57534e; line-height: 1.45; }

  .prog-label {
    font-size: 7px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: #a8a29e;
    margin-bottom: 5px;
  }
  .prog-blocks { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
  .prog-block {
    background: #fff;
    border: 1px solid #f5f5f4;
    border-radius: 9px;
    padding: 6px 8px;
    display: flex; justify-content: space-between; align-items: center; gap: 6px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }
  .block-left { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .block-tag { font-size: 6.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #059669; }
  .block-detail { font-size: 8px; font-weight: 600; color: #292524; }
  .block-pace { font-size: 7px; font-weight: 700; color: #57534e; white-space: nowrap; }

  .validate-btn {
    background: #10b981;
    color: #fff;
    font-size: 8.5px; font-weight: 700;
    text-align: center;
    padding: 8px;
    border-radius: 9px;
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/screens/ScreenSeance.astro
git commit -m "feat: add ScreenSeance app mockup (SessionDetail replica)"
```

---

### Task 6: Écran « Plan 4 phases » (`ScreenProgramme`)

Réplique de `PhasesView.vue` : titre, grille de 4 boutons de phase, cartes de phase avec barre colorée. Phase 2 (courante) mise en avant avec ses vrais objectifs.

**Files:**
- Create: `src/components/screens/ScreenProgramme.astro`

- [ ] **Step 1: Créer `src/components/screens/ScreenProgramme.astro`**

```astro
---
// Réplique de PhasesView.vue avec les vraies phases du plan.
const phases = [
  { id: 1, short: 'Ph.1', name: 'Fondation',    weeks: 'S1–4',   dates: '18 Mai – 14 Juin',   bg: '#eff6ff', text: '#2563eb', bar: '#60a5fa', active: false },
  { id: 2, short: 'Ph.2', name: 'Construction', weeks: 'S5–9',   dates: '15 Juin – 19 Juil',  bg: '#ecfdf5', text: '#059669', bar: '#34d399', active: true },
  { id: 3, short: 'Ph.3', name: 'Spécificité',  weeks: 'S10–15', dates: '20 Juil – 30 Août',  bg: '#fff7ed', text: '#f97316', bar: '#fb923c', active: false },
  { id: 4, short: 'Ph.4', name: 'Affûtage',     weeks: 'S16–19', dates: '31 Août – 27 Sep',   bg: '#f5f3ff', text: '#7c3aed', bar: '#a78bfa', active: false },
]
const goals = ['Augmenter le volume', 'Course → station sans pause']
---

<div class="screen">
  <div class="statusbar">9:41</div>

  <div class="head">
    <div class="title">Plan d'Entraînement</div>
    <div class="sub">4 phases · 19 semaines · 18 Mai – 27 Sep</div>
  </div>

  <!-- Grille de sélection rapide -->
  <div class="phase-grid">
    {phases.map(p => (
      <div class="phase-btn" style={`background:${p.bg}; ${p.active ? 'box-shadow: 0 0 0 1.5px ' + p.text : 'opacity: 0.6'}`}>
        <span class="btn-id" style={`color:${p.text}`}>{p.short}</span>
        <span class="btn-name">{p.name}</span>
      </div>
    ))}
  </div>

  <!-- Cartes de phase -->
  <div class="phase-cards">
    {phases.map(p => (
      <div class="phase-card">
        <div class="card-row">
          <span class="card-bar" style={`background:${p.bar}`}></span>
          <span class="card-content">
            <span class="card-label" style={`color:${p.text}`}>Phase {p.id} · {p.weeks}</span>
            <span class="card-name">{p.name}</span>
            <span class="card-dates">{p.dates}</span>
          </span>
          <span class="chevron" style={p.active ? 'transform: rotate(180deg)' : ''}>⌄</span>
        </div>
        {p.active && (
          <div class="card-expanded">
            <span class="goals-label">Objectifs</span>
            <span class="goals">
              {goals.map(g => <span class="goal-chip">{g}</span>)}
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

<style>
  .screen {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    height: 100%;
    background: #fafaf9;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .statusbar {
    flex-shrink: 0;
    font-size: 9px; font-weight: 600; color: #292524;
    padding: 8px 16px 2px;
  }

  .head { padding: 8px 12px 7px; }
  .title { font-size: 12px; font-weight: 700; color: #292524; }
  .sub { font-size: 7px; color: #a8a29e; margin-top: 1px; }

  .phase-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 0 12px 8px;
  }
  .phase-btn {
    border-radius: 8px;
    padding: 5px 3px;
    text-align: center;
    display: flex; flex-direction: column; gap: 1px;
  }
  .btn-id { font-size: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  .btn-name { font-size: 6px; font-weight: 600; color: #44403c; }

  .phase-cards { padding: 0 12px; display: flex; flex-direction: column; gap: 5px; }
  .phase-card {
    background: #fff;
    border-radius: 11px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 8px 9px;
  }
  .card-row { display: flex; gap: 7px; align-items: stretch; }
  .card-bar { width: 3.5px; border-radius: 3px; flex-shrink: 0; }
  .card-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .card-label { font-size: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; }
  .card-name { font-size: 9px; font-weight: 700; color: #292524; }
  .card-dates { font-size: 6.5px; color: #a8a29e; }
  .chevron { font-size: 8px; color: #d6d3d1; align-self: center; }

  .card-expanded {
    border-top: 1px solid #f5f5f4;
    margin-top: 7px; padding-top: 6px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .goals-label {
    font-size: 6px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    color: #a8a29e;
  }
  .goals { display: flex; flex-wrap: wrap; gap: 3px; }
  .goal-chip {
    font-size: 6.5px; font-weight: 500;
    background: #f5f5f4; color: #44403c;
    padding: 2.5px 6px; border-radius: 8px;
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/screens/ScreenProgramme.astro
git commit -m "feat: add ScreenProgramme app mockup (PhasesView replica)"
```

---

### Task 7: Bandeau défilant des stations (`StationsMarquee`)

**Files:**
- Create: `src/components/StationsMarquee.astro`

- [ ] **Step 1: Créer `src/components/StationsMarquee.astro`**

```astro
---
// Bandeau défilant des 8 stations officielles Hyrox (distances format Open).
// Liste dupliquée pour la boucle infinie ; le duplicata est aria-hidden.
const stations = [
  '1000m SkiErg',
  '50m Sled Push',
  '50m Sled Pull',
  '80m Burpee Broad Jump',
  '1000m Row',
  '200m Farmers Carry',
  '100m Sandbag Lunges',
  '100 Wall Balls',
]
---

<div class="marquee" aria-label="Les 8 stations du Hyrox">
  <div class="marquee-track">
    <ul class="marquee-list">
      {stations.map(s => <li>{s}</li>)}
    </ul>
    <ul class="marquee-list" aria-hidden="true">
      {stations.map(s => <li>{s}</li>)}
    </ul>
  </div>
</div>

<style>
  .marquee {
    background: #1a1a1a;
    overflow: hidden;
    padding: 16px 0;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }

  .marquee-list {
    display: flex;
    list-style: none;
    margin: 0; padding: 0;
  }

  .marquee-list li {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    white-space: nowrap;
    display: flex; align-items: center;
  }

  .marquee-list li::after {
    content: '◆';
    font-size: 8px;
    color: var(--accent);
    margin: 0 28px;
  }

  @keyframes marquee {
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
  }

  @media (max-width: 640px) {
    .marquee { padding: 12px 0; }
    .marquee-list li { font-size: 16px; }
    .marquee-list li::after { margin: 0 18px; }
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/StationsMarquee.astro
git commit -m "feat: add StationsMarquee scrolling band"
```

---

### Task 8: Section « Le programme » (`Programme`)

4 cartes de phase (vraies phases/couleurs de l'app) + barre de progression qui se remplit au scroll. La barre utilise la classe `.reveal` existante : quand l'observer ajoute `.visible`, la transition CSS remplit la barre — aucun JS supplémentaire.

**Files:**
- Create: `src/components/Programme.astro`

- [ ] **Step 1: Créer `src/components/Programme.astro`**

```astro
---
// Section programme : les 4 vraies phases du plan, couleurs de l'app.
const phases = [
  { num: '01', name: 'Fondation',    weeks: 'Semaines 1–4',   color: '#3b82f6', bg: '#eff6ff', desc: 'Maîtriser les 8 mouvements, construire la base cardio. Zéro blessure.' },
  { num: '02', name: 'Construction', weeks: 'Semaines 5–9',   color: '#10b981', bg: '#ecfdf5', desc: 'Monter le volume, enchaîner course → station sans pause.' },
  { num: '03', name: 'Spécificité',  weeks: 'Semaines 10–15', color: '#f97316', bg: '#fff7ed', desc: 'Poids de course officiels, simulations complètes chronométrées.' },
  { num: '04', name: 'Affûtage',     weeks: 'Semaines 16–19', color: '#7c3aed', bg: '#f5f3ff', desc: 'Réduire la charge, arriver frais et confiant le jour J.' },
]
---

<section class="programme" id="programme">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-label">Le programme</p>
      <h2 class="section-title">4 phases. Une méthode.</h2>
      <p class="section-sub">19 semaines guidées, de la première séance au jour de la course.</p>
    </div>

    <div class="phases-grid">
      {phases.map((p, i) => (
        <article class="phase-card reveal" style={`--delay: ${i * 100}ms; --phase-color: ${p.color}; --phase-bg: ${p.bg}`}>
          <div class="phase-top" aria-hidden="true"></div>
          <span class="phase-num">{p.num}</span>
          <span class="phase-weeks">{p.weeks}</span>
          <h3 class="phase-name">{p.name}</h3>
          <p class="phase-desc">{p.desc}</p>
        </article>
      ))}
    </div>

    <div class="progress-line reveal" style="--delay: 300ms" aria-hidden="true">
      <div class="progress-line-fill"></div>
      <span class="progress-flag">🏁 Jour J</span>
    </div>
  </div>
</section>

<style>
  .programme { padding: 100px 0; background: var(--bg-secondary); }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  .section-header { margin-bottom: 48px; }
  .section-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 12px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 5vw, 60px); font-weight: 700;
    letter-spacing: -0.01em; line-height: 0.95;
    color: var(--text-primary); margin: 0 0 8px;
  }
  .section-sub {
    font-family: 'Syne', sans-serif; font-size: 16px;
    color: var(--text-secondary); margin: 0;
  }

  .phases-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .phase-card {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 0 24px 28px;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: box-shadow 200ms, transform 200ms;
  }
  .phase-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }

  .phase-top { height: 5px; background: var(--phase-color); margin: 0 -24px 22px; }

  .phase-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 44px; font-weight: 900;
    color: var(--phase-color);
    line-height: 1; letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .phase-weeks {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 10px;
  }
  .phase-name {
    font-family: 'Syne', sans-serif;
    font-size: 18px; font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 8px;
  }
  .phase-desc {
    font-family: 'Syne', sans-serif;
    font-size: 13.5px; color: var(--text-secondary);
    line-height: 1.65; margin: 0;
  }

  .progress-line {
    position: relative;
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: 6px;
    margin-top: 40px;
    overflow: visible;
  }
  .progress-line-fill {
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #10b981, #f97316, #7c3aed);
    border-radius: 6px;
    transition: width 1600ms cubic-bezier(0.22, 1, 0.36, 1) 200ms;
  }
  .progress-line.visible .progress-line-fill { width: 100%; }
  .progress-flag {
    position: absolute;
    right: 0; top: -28px;
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 700;
    color: var(--text-secondary);
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-line-fill { width: 100%; transition: none; }
  }

  @media (max-width: 1024px) {
    .phases-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .programme { padding: 72px 0; }
    .phases-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/Programme.astro
git commit -m "feat: add Programme section with 4 phases and scroll progress line"
```

---

### Task 9: Réécriture du Hero

Hero 2 colonnes : texte + CTA à gauche avec compteurs animés, téléphone flottant (ScreenSemaine) à droite. Le H1 et le sous-titre actuels sont conservés à l'identique (SEO).

**Files:**
- Modify: `src/components/Hero.astro` (réécriture complète)

- [ ] **Step 1: Remplacer intégralement `src/components/Hero.astro`**

```astro
---
import CtaPrimary from './CtaPrimary.astro'
import PhoneMockup from './PhoneMockup.astro'
import ScreenSemaine from './screens/ScreenSemaine.astro'

const counters = [
  { target: 4,   suffix: '',  label: 'phases progressives' },
  { target: 19,  suffix: '',  label: "semaines d'entraînement" },
  { target: 100, suffix: '%', label: 'guidé, séance par séance' },
]
---

<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">

      <div class="badge-row reveal" style="--delay: 0ms">
        <span class="badge">Single Open</span>
        <span class="badge">Duo Open</span>
        <span class="badge">Mixte Open</span>
      </div>

      <h1 class="headline reveal" style="--delay: 100ms">
        Un plan.<br />
        Une progression.<br />
        <span class="accent-word">Ton Hyrox.</span>
      </h1>

      <p class="subtitle reveal" style="--delay: 200ms">
        Momentum te donne un programme structuré et adapté à ton niveau —
        que tu découvres le Hyrox ou que tu veuilles performer.
      </p>

      <div class="cta-row reveal" style="--delay: 300ms">
        <CtaPrimary size="lg" />
        <p class="app-mention">📱 iOS &amp; Android · Bientôt disponible</p>
      </div>

      <div class="counters reveal" style="--delay: 400ms">
        {counters.map(c => (
          <div class="counter">
            <span class="counter-value" data-target={c.target} data-suffix={c.suffix}>{c.target}{c.suffix}</span>
            <span class="counter-label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div class="hero-phone reveal-scale" style="--delay: 250ms">
      <PhoneMockup class="phone-float" label="L'application Momentum — vue de la semaine d'entraînement">
        <ScreenSemaine />
      </PhoneMockup>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 130px 0 90px;
    background: var(--bg-primary);
    position: relative;
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    top: -180px; right: -120px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, var(--accent-glow), transparent 65%);
    pointer-events: none;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 64px;
    align-items: center;
    position: relative;
  }

  .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
  .badge {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px;
    background: var(--accent-light);
    color: var(--accent);
    border: 1px solid rgba(249, 115, 22, 0.2);
  }

  .headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(56px, 8vw, 100px);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 28px;
  }
  .accent-word { color: var(--accent); }

  .subtitle {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 480px;
    margin: 0 0 36px;
  }

  .cta-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 48px;
  }

  .app-mention {
    font-family: 'Syne', sans-serif;
    font-size: 12px; color: var(--text-muted);
    margin: 0; letter-spacing: 0.03em;
  }

  .counters {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .counter { display: flex; flex-direction: column; gap: 2px; }
  .counter-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 44px; font-weight: 900;
    color: var(--accent);
    line-height: 1; letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .counter-label {
    font-family: 'Syne', sans-serif;
    font-size: 12.5px; color: var(--text-secondary);
    max-width: 130px; line-height: 1.4;
  }

  .hero-phone { display: flex; justify-content: center; }

  @media (max-width: 1024px) {
    .container { grid-template-columns: 1fr; gap: 56px; }
    .hero-phone { order: 1; }
  }

  @media (max-width: 640px) {
    .hero { padding: 100px 0 64px; }
    .counters { gap: 28px; }
    .counter-value { font-size: 36px; }
  }
</style>

<script>
  // Compteurs animés : la valeur finale est dans le HTML (SEO / no-JS),
  // le JS anime de 0 vers la cible au moment où le compteur devient visible.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      io.unobserve(entry.target)
      const el = entry.target as HTMLElement
      const target = parseInt(el.dataset.target || '0', 10)
      const suffix = el.dataset.suffix || ''
      if (reduce) return

      const start = performance.now()
      const duration = 1100
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = `${Math.round(eased * target)}${suffix}`
        if (p < 1) requestAnimationFrame(tick)
      }
      el.textContent = `0${suffix}`
      requestAnimationFrame(tick)
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.counter-value').forEach(el => io.observe(el))
</script>
```

- [ ] **Step 2: Build + vérifier le contenu SEO du hero**

Run: `npm run build && grep -c "Ton Hyrox" dist/index.html`
Expected: build OK, compteur ≥ 1 (le H1 est bien dans le HTML statique).

Run: `grep -c "Montée de Volume" dist/index.html`
Expected: ≥ 1 (l'écran semaine est rendu côté serveur).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: rewrite Hero with floating phone mockup and animated counters"
```

---

### Task 10: Section « L'app en action » (`AppShowcase`)

Triptyque : Semaine (gauche, inclinée), Séance du jour (centre, surélevée), Programme (droite, inclinée). Cascade au scroll, hover qui redresse. Mobile : scroll-snap horizontal.

**Files:**
- Create: `src/components/AppShowcase.astro`

- [ ] **Step 1: Créer `src/components/AppShowcase.astro`**

```astro
---
import PhoneMockup from './PhoneMockup.astro'
import ScreenSemaine from './screens/ScreenSemaine.astro'
import ScreenSeance from './screens/ScreenSeance.astro'
import ScreenProgramme from './screens/ScreenProgramme.astro'
---

<section class="showcase" id="app">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-label">L'app en action</p>
      <h2 class="section-title">Dans ta poche,<br />semaine après semaine.</h2>
    </div>

    <div class="phones">
      <div class="phone-item tilt-left reveal-scale" style="--delay: 0ms">
        <PhoneMockup label="Écran semaine : progression et séances de la semaine">
          <ScreenSemaine />
        </PhoneMockup>
        <h3 class="phone-title">Ta semaine, d'un coup d'œil</h3>
        <p class="phone-desc">Progression de la semaine, séances cochées, thème du moment.</p>
      </div>

      <div class="phone-item phone-center reveal-scale" style="--delay: 120ms">
        <PhoneMockup label="Écran séance : détail des blocs et allures personnalisées">
          <ScreenSeance />
        </PhoneMockup>
        <h3 class="phone-title">Chaque séance, détaillée</h3>
        <p class="phone-desc">Blocs, allures calibrées sur ton niveau, validation en un geste.</p>
      </div>

      <div class="phone-item tilt-right reveal-scale" style="--delay: 240ms">
        <PhoneMockup label="Écran programme : les 4 phases du plan">
          <ScreenProgramme />
        </PhoneMockup>
        <h3 class="phone-title">19 semaines, 4 phases</h3>
        <p class="phone-desc">La vue d'ensemble, de la première séance au jour J.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .showcase { padding: 100px 0 110px; background: var(--bg-primary); overflow: hidden; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  .section-header { margin-bottom: 64px; }
  .section-label {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 12px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 5vw, 60px); font-weight: 700;
    letter-spacing: -0.01em; line-height: 0.95;
    color: var(--text-primary); margin: 0;
  }

  .phones {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    align-items: start;
  }

  .phone-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .phone-item :global(.phone) {
    transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tilt-left :global(.phone)  { transform: rotate(-4deg); }
  .tilt-right :global(.phone) { transform: rotate(4deg); }
  .phone-center { margin-top: -24px; }

  .phone-item:hover :global(.phone) { transform: rotate(0deg) scale(1.04); }

  .phone-title {
    font-family: 'Syne', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--text-primary);
    margin: 28px 0 6px;
  }
  .phone-desc {
    font-family: 'Syne', sans-serif;
    font-size: 13.5px; color: var(--text-secondary);
    line-height: 1.6; margin: 0;
    max-width: 260px;
  }

  @media (max-width: 1024px) {
    .phones {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 24px;
      padding: 24px 8px;
      margin: 0 -24px;
      padding-left: 24px;
      padding-right: 24px;
      -webkit-overflow-scrolling: touch;
    }
    .phone-item { scroll-snap-align: center; flex-shrink: 0; }
    .phone-center { margin-top: 0; }
    .tilt-left :global(.phone), .tilt-right :global(.phone) { transform: none; }
  }

  @media (max-width: 640px) {
    .showcase { padding: 72px 0 80px; }
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/AppShowcase.astro
git commit -m "feat: add AppShowcase triptych with three app screen mockups"
```

---

### Task 11: Assemblage de la home (`index.astro`)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Mettre à jour les imports et l'ordre des sections**

Remplacer intégralement `src/pages/index.astro` par (le frontmatter `schema` reste identique à l'existant) :

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Hero from '../components/Hero.astro'
import StationsMarquee from '../components/StationsMarquee.astro'
import Programme from '../components/Programme.astro'
import AppShowcase from '../components/AppShowcase.astro'
import Features from '../components/Features.astro'
import Pricing from '../components/Pricing.astro'
import GuidesTeaser from '../components/GuidesTeaser.astro'

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
  <StationsMarquee />
  <Programme />
  <AppShowcase />
  <Features />
  <Pricing />
  <GuidesTeaser />
</BaseLayout>
```

- [ ] **Step 2: Build + vérifications SEO**

Run: `npm run build`
Expected: OK.

Run: `grep -c "<h1" dist/index.html && grep -c "application/ld+json" dist/index.html && grep -c "SkiErg" dist/index.html`
Expected: `1` (un seul H1), `1` (schéma présent), `≥ 2` (stations rendues en statique).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble new home — hero, marquee, programme, showcase"
```

---

### Task 12: Header — CTA pill, lien Programme, ombre au scroll

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Mettre à jour le frontmatter et les CTA**

Remplacer le frontmatter par :

```astro
---
import { SITE } from '../config'

const navLinks = [
  { label: 'Accueil',   href: '/' },
  { label: 'Programme', href: '/#programme' },
  { label: 'Tarifs',    href: '/#tarifs' },
  { label: 'Guides',    href: '/guides/' },
]
---
```

Remplacer le CTA desktop :

```astro
    <a href={SITE.cta.href} class="cta-btn">
      {SITE.cta.shortLabel}
    </a>
```

Et le CTA du drawer mobile :

```astro
      <li><a href={SITE.cta.href} class="drawer-cta">{SITE.cta.shortLabel} →</a></li>
```

- [ ] **Step 2: Style pill + ombre au scroll**

Dans le `<style>`, remplacer la règle `.cta-btn` par :

```css
  .cta-btn {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.05em;
    color: #fff;
    background: var(--accent);
    padding: 10px 22px;
    border-radius: 999px;
    text-decoration: none;
    flex-shrink: 0;
    transition: background 150ms, transform 150ms, box-shadow 150ms;
  }
  .cta-btn:hover {
    background: var(--accent-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
  }
```

Ajouter après la règle `header { ... }` :

```css
  header.scrolled { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07); }
```

- [ ] **Step 3: Script d'ombre au scroll**

Dans le `<script>` existant du Header, ajouter à la fin :

```js
  const header = document.getElementById('header')
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 8)
  }, { passive: true })
```

- [ ] **Step 4: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/Header.astro
git commit -m "feat: header pill CTA, Programme link, scroll shadow"
```

---

### Task 13: Footer sombre

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Remplacer intégralement `src/components/Footer.astro`**

```astro
---
const currentYear = new Date().getFullYear()
---

<footer>
  <div class="container">
    <div class="top">
      <div class="brand">
        <span class="logo"><span class="logo-m">M</span>OMENTUM</span>
        <p class="tagline">Prépare ton Hyrox. Sans improviser.</p>
        <p class="stores">📱 Bientôt sur iOS &amp; Android</p>
      </div>
      <nav aria-label="Footer">
        <a href="/">Accueil</a>
        <a href="/#programme">Programme</a>
        <a href="/#tarifs">Tarifs</a>
        <a href="/guides/">Guides</a>
        <a href="/mentions-legales/">Mentions légales</a>
      </nav>
    </div>
    <div class="bottom">
      <p class="copy">© {currentYear} Momentum. Tous droits réservés.</p>
      <p class="formats">Single Open · Duo Open · Mixte Open</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: #1a1a1a;
    padding: 56px 0 32px;
  }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  .top {
    display: flex; align-items: flex-start;
    justify-content: space-between; flex-wrap: wrap;
    gap: 32px; margin-bottom: 40px;
  }

  .logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 22px;
    letter-spacing: 0.08em; color: #fff;
    display: block; margin-bottom: 8px;
  }
  .logo-m { color: var(--accent); }

  .tagline {
    font-family: 'Syne', sans-serif; font-size: 13px;
    color: #a3a3a3; margin: 0 0 12px;
  }
  .stores {
    font-family: 'Syne', sans-serif; font-size: 12px;
    color: #737373; margin: 0;
  }

  nav { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
  nav a {
    font-family: 'Syne', sans-serif; font-size: 13px;
    color: #d4d4d4; text-decoration: none;
    transition: color 150ms;
  }
  nav a:hover { color: #fff; }

  .bottom {
    display: flex; justify-content: space-between;
    flex-wrap: wrap; gap: 8px;
    padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .copy, .formats {
    font-family: 'Syne', sans-serif; font-size: 12px;
    color: #737373; margin: 0;
  }

  @media (max-width: 640px) {
    .top { flex-direction: column; }
    .bottom { flex-direction: column; }
  }
</style>
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/Footer.astro
git commit -m "feat: dark footer with stores mention"
```

---

### Task 14: Pricing — bloc waitlist sombre + config

**Files:**
- Modify: `src/components/Pricing.astro`

- [ ] **Step 1: Brancher la config**

Remplacer le frontmatter vide par :

```astro
---
import { SITE } from '../config'
---
```

Remplacer les deux liens de cartes (`<a href="#waitlist" class="btn-secondary">` et `<a href="#waitlist" class="btn-primary">`) par :

```astro
          <a href={SITE.cta.href} class="btn-secondary">{SITE.cta.shortLabel} →</a>
```

```astro
          <a href={SITE.cta.href} class="btn-primary">{SITE.cta.shortLabel} →</a>
```

Remplacer la ligne du formulaire :

```astro
        <form class="waitlist-form" action={SITE.formspreeUrl} method="POST">
```

- [ ] **Step 2: Passer le bloc waitlist en sombre**

Dans le `<style>`, remplacer les règles `.waitlist`, `.waitlist-title`, `.waitlist-body`, `.waitlist-label`, `.form-mention`, `.form-mention a`, `.form-row` par :

```css
  .waitlist {
    background: #1a1a1a;
    border: none;
    border-radius: 20px; padding: 56px 48px;
    position: relative;
    overflow: hidden;
  }
  .waitlist::before {
    content: '';
    position: absolute;
    top: -120px; right: -80px;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.18), transparent 65%);
    pointer-events: none;
  }
  .waitlist-label {
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    color: #fb923c; margin: 0 0 12px;
  }
  .waitlist-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 700;
    color: #fff; margin: 0 0 12px;
  }
  .waitlist-body {
    font-family: 'Syne', sans-serif; font-size: 15px;
    color: #d4d4d4; line-height: 1.7; margin: 0;
  }
  .form-row {
    display: flex; border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px; overflow: hidden; margin-bottom: 10px;
  }
  .form-mention {
    font-family: 'Syne', sans-serif; font-size: 12px;
    color: #a3a3a3; margin: 0;
  }
  .form-mention a { color: #a3a3a3; text-decoration: underline; }
```

(La règle `.waitlist-body strong { color: var(--accent); }` existante reste valable. Les règles `.waitlist-inner`, `.waitlist-text`, `.waitlist-form`, `.form-row input`, `.form-row button` et le responsive restent inchangées.)

- [ ] **Step 3: Build + vérifier**

Run: `npm run build && grep -c "formspree" dist/index.html`
Expected: build OK, `1`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Pricing.astro
git commit -m "feat: dark waitlist conversion block, CTA/form from site config"
```

---

### Task 15: Micro-interactions Features + GuidesTeaser

**Files:**
- Modify: `src/components/Features.astro`
- Modify: `src/components/GuidesTeaser.astro`

- [ ] **Step 1: Features — icône animée au hover**

Dans le `<style>` de `Features.astro`, remplacer la règle `.card-icon` par :

```css
  .card-icon {
    font-size: 28px; line-height: 1;
    display: inline-block;
    transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .card:hover .card-icon { transform: scale(1.2) rotate(-6deg); }
```

- [ ] **Step 2: GuidesTeaser — flèche qui glisse au hover**

Dans le `<style>` de `GuidesTeaser.astro`, remplacer la règle `.guide-link` par :

```css
  .guide-link {
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--accent);
    display: inline-block;
    transition: transform 200ms;
  }
  .guide-card:hover .guide-link { transform: translateX(6px); }
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` — Expected: OK.

```bash
git add src/components/Features.astro src/components/GuidesTeaser.astro
git commit -m "feat: hover micro-interactions on features and guides cards"
```

---

### Task 16: Vérification finale

**Files:** aucun (vérification)

- [ ] **Step 1: Build complet propre**

Run: `npm run build`
Expected: 6 pages générées (index, guides ×3, mentions légales + sitemap), aucune erreur ni warning.

- [ ] **Step 2: Vérifications SEO sur le HTML généré**

```bash
grep -c "<h1" dist/index.html                      # Expected: 1
grep -c "application/ld+json" dist/index.html       # Expected: 1
grep -c 'rel="canonical"' dist/index.html           # Expected: 1
grep -c "Ton Hyrox" dist/index.html                 # Expected: >= 1
grep -c "Fondation" dist/index.html                 # Expected: >= 2 (Programme + mockups)
grep -c "<h1" dist/guides/hyrox-single-open/index.html  # Expected: 1 (guides intacts)
```

- [ ] **Step 3: Contrôle visuel en dev**

Run: `npm run dev` (en arrière-plan), ouvrir `http://localhost:4321`.

Vérifier :
- Hero : téléphone flotte, cartes du hero apparaissent en cascade, compteurs montent (4 / 19 / 100 %).
- Marquee : défile en continu, boucle sans à-coup.
- Programme : les 4 cartes se révèlent, la barre multicolore se remplit.
- Showcase : 3 téléphones, centre surélevé, hover redresse ; à < 1024px, scroll horizontal avec snap.
- Pricing : bloc waitlist sombre avec halo orange, formulaire lisible.
- Header : ombre apparaît au scroll ; menu mobile OK.
- Footer sombre sur la home **et** sur une page guide.
- DevTools → Rendering → `prefers-reduced-motion: reduce` : plus de flottement ni de marquee, contenu entièrement visible.

- [ ] **Step 4: Commit final éventuel**

Si des ajustements ont été faits en Step 3 :

```bash
git add -A && git commit -m "fix: visual adjustments after final review"
```

---

## Self-Review (effectuée)

- **Couverture spec :** config CTA → Task 1 ; animations → Task 2 ; PhoneMockup + 3 écrans fidèles → Tasks 3–6 ; marquee → Task 7 ; programme 4 phases → Task 8 ; hero → Task 9 ; triptyque → Task 10 ; assemblage → Task 11 ; header/footer → Tasks 12–13 ; waitlist sombre → Task 14 ; features/guides restylés → Task 15 ; SEO + reduced-motion + responsive → Task 16. ✔
- **Pas de placeholders :** chaque step contient le code complet. Le seul `YOUR_FORMSPREE_ID` vient du code existant (l'ID réel n'est pas encore créé par l'utilisateur) — conservé tel quel volontairement. ✔
- **Cohérence des types :** `SITE.cta.href/label/shortLabel` (Tasks 1, 9, 12, 14), classe `.phone-float` (Tasks 2, 9), classes `.reveal`/`.reveal-scale` observées par BaseLayout (Task 2) et utilisées Tasks 8–10. ✔
