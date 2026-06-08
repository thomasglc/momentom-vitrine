# Momentum Vitrine — Spec UI/UX Premium
*Date : 2026-06-08*

## Direction artistique

**Concept :** "Athlete's Black Book" — l'esthétique d'un carnet de préparation d'élite. Sombre, dense, précis. Pas un site fitness générique pastel. Pas de gradients violets. Une identité qui dit : *ce programme est sérieux, et tu l'es aussi.*

**Ton visuel :** Editorial sportif × performance data × typographie bold.
Pense *Nike Training App* rencontre *un magazine de running haut de gamme*.

**Ce qu'on retient après avoir vu le site :** la typographie massive, l'orange qui tranche, et la sensation que c'est fait pour gagner.

---

## Typographie

### Choix des polices

```css
/* Display — titres, hero, chiffres clés */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&display=swap');
/* Barlow Condensed Black/Bold — condensé, athlétique, lisible en grand */

/* Body — textes, descriptions, UI */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap');
/* Syne Regular/Medium — géométrique, moderne, légèrement inattendu */

/* Mono — stats, chiffres, labels techniques */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
/* JetBrains Mono — pour les données chiffrées, allures, compteurs */
```

### Scale typographique

| Rôle | Police | Taille | Poids | Lettre-spacing |
|------|--------|--------|-------|----------------|
| Hero headline | Barlow Condensed | `clamp(56px, 10vw, 120px)` | 900 | `-0.02em` |
| Section title | Barlow Condensed | `clamp(36px, 6vw, 72px)` | 700 | `-0.01em` |
| Card title | Syne | `18-22px` | 700 | `0` |
| Body | Syne | `15-17px` | 400 | `0.01em` |
| Label / badge | Syne | `11px` | 600 | `0.12em` uppercase |
| Stats / data | JetBrains Mono | `13-14px` | 600 | `0.05em` |
| Prix | Barlow Condensed | `48-64px` | 700 | `-0.02em` |

**Règle d'or :** les titres sont *massifs*. On n'a pas peur du grand. Le `clamp()` garantit l'adaptation mobile sans casser le rythme.

---

## Palette de couleurs

```css
:root {
  /* Fonds */
  --bg-deep:       #080808;   /* fond principal — quasi-noir */
  --bg-surface:    #111111;   /* cards, sections alternées */
  --bg-elevated:   #1a1a1a;   /* hover states, inputs */
  --bg-border:     #2a2a2a;   /* séparateurs, bordures subtiles */

  /* Accent — orange Momentum */
  --accent:        #f97316;   /* orange principal */
  --accent-bright: #fb923c;   /* hover, glow */
  --accent-dim:    #7c3a0e;   /* version atténuée, backgrounds */
  --accent-glow:   rgba(249, 115, 22, 0.15); /* lueur diffuse */

  /* Texte */
  --text-primary:  #f5f5f5;   /* blanc cassé — moins agressif que #fff pur */
  --text-secondary:#a3a3a3;   /* gris moyen */
  --text-muted:    #525252;   /* très discret, labels secondaires */

  /* Statuts / badges */
  --badge-single:  #f97316;   /* orange — Single */
  --badge-duo:     #3b82f6;   /* bleu — Duo */
  --badge-mixte:   #8b5cf6;   /* violet — Mixte */
}
```

### Utilisation de la couleur

- **80% noir** — le fond absorbe tout, la typo respire
- **15% gris** — hiérarchie visuelle, cartes, sections
- **5% orange** — uniquement sur les CTA, accents, badges importants. L'orange doit *surprendre* à chaque apparition.
- **Jamais** d'orange comme couleur de fond large — uniquement en accent, bordure, ou texte sur fond sombre.

---

## Textures & atmosphère

### Grain overlay (priorité haute)
```css
/* Appliquer sur le body ou une pseudo-classe fixed */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}
```
Le grain subtil (3.5% opacité) empêche le noir d'être "plat" et donne une texture premium analogue à du papier haut de gamme.

### Ligne de grille décorative
```css
/* Motif de grille très discret en arrière-plan */
background-image: 
  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
background-size: 60px 60px;
```
Ajoute de la profondeur sans distraire.

### Lueur orange sur les éléments actifs
```css
.cta-primary {
  box-shadow: 0 0 40px rgba(249, 115, 22, 0.3),
              0 0 80px rgba(249, 115, 22, 0.1);
}
```

---

## Composants UI

### Bouton CTA principal

```
Fond : #f97316
Texte : #080808 (noir — contraste maximal sur orange)
Padding : 16px 32px
Border-radius : 4px (pas arrondi — carré = sérieux, athlétique)
Font : Syne 600, 15px, letterspacing 0.08em, uppercase
Transition : background 200ms, box-shadow 200ms

Hover :
  background : #fb923c
  box-shadow : 0 0 32px rgba(249,115,22,0.4)
  transform : translateY(-1px)
```

### Bouton secondaire (outline)

```
Fond : transparent
Bordure : 1px solid #2a2a2a
Texte : #f5f5f5
Hover : border-color #f97316, color #f97316
```

### Cartes (fonctionnalités, tarifs, guides)

```
Fond : #111111
Bordure : 1px solid #2a2a2a
Border-radius : 8px
Padding : 32px

Hover :
  border-color : #f97316 (transition 300ms)
  background : #141414
  transform : translateY(-2px)
  box-shadow : 0 16px 40px rgba(0,0,0,0.5)

Pas de shadow par défaut — le hover révèle la profondeur.
```

### Badge format (Single / Duo / Mixte)

```
Border-radius : 2px
Padding : 4px 10px
Font : Syne 600, 10px, uppercase, letterspacing 0.12em
Background : semi-transparent (couleur/15%)
Border : 1px solid (couleur/40%)
```

### Inputs (formulaire email)

```
Fond : #1a1a1a
Bordure : 1px solid #2a2a2a
Focus border : #f97316
Border-radius : 4px
Padding : 14px 20px
Font : Syne 400, 15px, color #f5f5f5
Placeholder : #525252

Focus glow : box-shadow 0 0 0 3px rgba(249,115,22,0.15)
```

### Séparateurs de section

Éviter les `<hr>` génériques. À la place :
```css
/* Ligne fine avec dégradé qui s'efface sur les côtés */
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #2a2a2a 20%, #2a2a2a 80%, transparent);
}
```

---

## Animations & Motion

### Philosophie
**Moins de micro-interactions, plus de moments forts.** Une révélation bien orchestrée au scroll vaut mieux que 40 animations qui se battent.

### Entrée de page (hero)
```
Séquence staggered au chargement :
  0ms   → badge "Single · Duo · Mixte" fade-in + slide-up 12px
  150ms → headline principale fade-in + slide-up 20px
  300ms → sous-titre fade-in
  500ms → stats fade-in staggered (chaque stat +100ms)
  650ms → CTA button fade-in + légère scale (0.95 → 1)

Durée : 600ms ease-out pour chaque élément
```

### Scroll reveals
```css
/* Classe appliquée aux sections via IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Chaque section s'active quand elle entre dans le viewport (threshold 0.15). Les cards dans une grille utilisent un stagger de 80ms entre chaque carte.

### Compteur animé (stats chiffrées)
Les statistiques numériques (ex: "4 phases") s'incrémentent de 0 à la valeur finale en 800ms quand elles entrent dans le viewport. Effet data/terminal.

### CTA hover — effet de pulsation
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(249,115,22,0.3); }
  50%       { box-shadow: 0 0 50px rgba(249,115,22,0.5); }
}
.cta-primary:hover {
  animation: pulse-glow 1.5s ease infinite;
}
```

### Curseur custom (desktop uniquement)
```css
* { cursor: none; }

/* Curseur : cercle orange 10px, suit la souris avec lag */
/* Anneau extérieur 32px qui suit avec 120ms de délai */
/* Sur hover d'un CTA : le curseur grossit à 48px */
```

### Transition entre sections
Légère parallaxe sur le fond (movement factor 0.3x) pour donner de la profondeur au scroll. À implémenter avec `transform: translateY()` sur les backgrounds décorés.

---

## Layout & Structure spatiale

### Grille
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; /* mobile */
}
@media (min-width: 768px)  { padding: 0 40px; }
@media (min-width: 1024px) { padding: 0 80px; }
```

### Hero — composition asymétrique

```
Desktop :
  Colonne gauche (55%) : badge + headline + CTA
  Colonne droite (45%) : image/mockup app en overlay sombre avec grain

  La headline déborde légèrement sur la colonne droite — 
  casse la grille de manière contrôlée.

Mobile :
  Empilé — image en fond avec overlay, texte par-dessus centré.
```

### Section fonctionnalités — grille 2×2

```
Desktop : grid 2 colonnes, gap 2px (les cartes sont quasi-adjacentes)
Mobile : 1 colonne

Chaque carte a un numéro décoratif en très grand (Barlow Condensed, 
opacity 0.04, position absolute top-right) — "01", "02", "03", "04".
Donne de la profondeur sans surcharger.
```

### Section tarifs — layout asymétrique

```
Desktop : 
  Carte Mensuel : plus petite, sobre, alignée à gauche
  Carte Annuel : plus grande (padding supérieur), badge orange en haut,
                 légèrement décalée vers le haut (-16px) pour créer
                 une hiérarchie visuelle immédiate.

Mobile : empilées, Annuel en premier.
```

### Section guides — liste editoriale

```
Pas de grille de cartes classiques.
Au lieu : 3 lignes avec un numéro de type magazine (01 / 02 / 03),
un titre bold qui prend 80% de la largeur, et une ligne de séparation.
Au hover : l'orange apparaît sur le numéro, la ligne change de couleur.

Ça ressemble à un sommaire de magazine — plus premium que 3 cartes.
```

---

## Spacing & rythme vertical

Basé sur une unité de 8px :

| Usage | Valeur |
|-------|--------|
| Entre sections | `120px` desktop / `80px` mobile |
| Padding interne section | `80px 0` desktop / `60px 0` mobile |
| Gap entre cartes | `2px` (noir comme "jointure") ou `24px` selon contexte |
| Padding carte | `32px` desktop / `24px` mobile |
| Marge label → titre | `12px` |
| Marge titre → body | `16px` |
| Marge body → CTA | `32px` |

L'espace négatif est généreux dans le hero, compressé dans les sections données — crée un rythme respiratoire intentionnel.

---

## Navigation (header)

```
Position : fixed, top: 0, pleine largeur
Fond : rgba(8, 8, 8, 0.85) + backdrop-blur: 12px
Hauteur : 64px desktop / 56px mobile
Bordure bas : 1px solid #1a1a1a

Contenu :
  - Logo "MOMENTUM" en Barlow Condensed 700, 20px
  - Nav links : Accueil · Tarifs · Guides (Syne 500, 14px)
  - CTA "Liste d'attente" → bouton orange compact (padding 10px 20px)

Mobile : hamburger menu → drawer depuis la droite
  Le drawer est pleine hauteur, fond #0d0d0d, liens en grand (Barlow 48px)
```

---

## Mobile-first — points d'attention

1. **Touch targets** : minimum 44×44px pour tous les éléments interactifs
2. **Le hero sur mobile** : headline en `clamp(44px, 12vw, 64px)` — toujours massif
3. **Pas de hover states sur mobile** — les animations sont déclenchées par IntersectionObserver uniquement
4. **Formulaire email** : input + bouton empilés sur mobile, côte à côte sur desktop
5. **Images** : format WebP avec fallback, lazy loading sur tout ce qui est hors viewport
6. **Pas de curseur custom sur mobile** (touch device detection)

---

## Accessibilité (non négociable)

- Ratio de contraste : minimum AA (4.5:1) sur tout le texte body. L'orange `#f97316` sur fond `#080808` = ratio 5.8:1 ✓
- Focus visible : outline `2px solid #f97316` avec `outline-offset: 4px`
- `prefers-reduced-motion` : désactiver toutes les animations CSS, garder uniquement les transitions opacity courtes (200ms)
- `aria-label` sur tous les boutons icône
- Formulaire : label visible ou `aria-label` explicite sur l'input email

---

## Checklist qualité avant livraison

- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Pas de layout shift (CLS < 0.1)
- [ ] Fonts chargées avec `font-display: swap`
- [ ] Toutes les images en WebP avec dimensions explicites
- [ ] Le grain overlay ne ralentit pas le scroll (fixed + pointer-events none)
- [ ] Curseur custom désactivé sur touch devices
- [ ] Animations désactivées si `prefers-reduced-motion: reduce`
- [ ] Testé sur iOS Safari (comportements différents sur `position: fixed`)
- [ ] Testé sur Chrome Android
