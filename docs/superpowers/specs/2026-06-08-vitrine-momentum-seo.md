# Momentum Vitrine — Spec SEO
*Date : 2026-06-08*

## Objectif SEO

Capter le trafic organique francophone sur les requêtes liées à la **préparation Hyrox format Open** (Single, Duo, Mixte) et convertir ces visiteurs en inscrits sur la liste d'attente Momentum. Le SEO est traité comme un canal d'acquisition principal dès le lancement.

---

## Recherche de mots-clés

### Requêtes cibles — volume estimé (FR)

#### Haut de funnel (informationnel — attire les débutants)

| Mot-clé | Intention | Priorité |
|---------|-----------|----------|
| `c'est quoi le hyrox` | Découverte | Haute |
| `hyrox débutant` | Découverte | Haute |
| `comment se préparer au hyrox` | Préparation | Haute |
| `hyrox programme entrainement` | Préparation | Haute |
| `hyrox single open` | Format | Haute |
| `hyrox duo open` | Format | Haute |
| `hyrox mixte open` | Format | Haute |
| `hyrox open c'est quoi` | Format | Moyenne |
| `stations hyrox explication` | Contenu | Moyenne |
| `hyrox erreurs débutant` | Contenu | Moyenne |

#### Milieu de funnel (considération — intermédiaires)

| Mot-clé | Intention | Priorité |
|---------|-----------|----------|
| `plan entrainement hyrox 12 semaines` | Programme | Haute |
| `programme hyrox open débutant` | Programme | Haute |
| `programme hyrox single` | Programme | Haute |
| `allures course hyrox` | Technique | Haute |
| `hyrox zones intensité` | Technique | Moyenne |
| `comment progresser au hyrox` | Progression | Haute |
| `hyrox running pace` | Technique | Moyenne |
| `préparer hyrox en 3 mois` | Programme | Moyenne |

#### Bas de funnel (intention d'achat / téléchargement)

| Mot-clé | Intention | Priorité |
|---------|-----------|----------|
| `application hyrox entrainement` | Produit | Haute |
| `app hyrox programme` | Produit | Haute |
| `meilleure appli hyrox` | Produit | Haute |
| `momentum hyrox` | Marque | Haute |
| `hyrox coaching app` | Produit | Moyenne |

### Mots-clés à éviter (trop compétitifs pour le lancement)

- `hyrox` seul (dominé par le site officiel hyrox.com)
- `crossfit hyrox` (hors sujet)
- `hyrox prix inscription` (intention différente)

---

## Architecture des URLs

```
/                                          → Home (conversion + SEO généraliste)
/guides/                                   → Guide pilier (mot-clé central)
/guides/hyrox-single-open/                 → Guide Single Open
/guides/hyrox-duo-mixte-open/              → Guide Duo & Mixte Open
/mentions-legales/                         → Mentions légales (obligatoire RGPD)
```

**Règles d'URL :**
- Tout en minuscules, tirets uniquement (pas d'underscores)
- Mots-clés dans l'URL, pas de dates ni d'IDs
- Maximum 3 niveaux de profondeur
- URL stables — ne jamais changer après indexation

---

## Balises meta — templates

### Home `/`

```html
<title>Momentum — Application de préparation Hyrox Open | Single, Duo, Mixte</title>
<!-- 60 caractères max — le mot-clé principal en premier -->

<meta name="description" content="Prépare-toi au Hyrox Open avec Momentum : programme structuré, allures personnalisées, suivi séance par séance. Single, Duo et Mixte Open. Rejoins la liste d'attente.">
<!-- 150-160 caractères — inclure le CTA et les 3 formats -->
```

### Guide pilier `/guides/`

```html
<title>Comment se préparer au Hyrox Open : le guide complet 2025</title>

<meta name="description" content="Tout ce qu'il faut savoir pour préparer le Hyrox Open : programme d'entrainement, stations expliquées, allures de course, formats Single, Duo et Mixte. Guide complet pour débutants et intermédiaires.">
```

### Guide Single Open `/guides/hyrox-single-open/`

```html
<title>Hyrox Single Open : Programme et conseils pour débutants</title>

<meta name="description" content="Comment préparer le Hyrox Single Open quand on est débutant ? Programme d'entraînement, allures, stations, erreurs à éviter. Tout ce qu'il faut savoir avant ta première compétition.">
```

### Guide Duo & Mixte `/guides/hyrox-duo-mixte-open/`

```html
<title>Hyrox Duo & Mixte Open : S'organiser à deux pour performer</title>

<meta name="description" content="Préparer le Hyrox Duo ou Mixte Open demande une organisation spécifique. Découvre comment structurer ton entrainement à deux, gérer les relais et optimiser votre stratégie de course.">
```

---

## Structure des titres (H1 → H6)

### Règle absolue
- **1 seul H1 par page** — contient le mot-clé principal
- **H2** : grandes sections (≥ 3 par guide)
- **H3** : sous-sections
- Jamais sauter de niveau (pas de H1 → H3)

### Home

```
H1 : "Du premier entraînement au jour J — Momentum t'emmène jusqu'à ton plein potentiel"
  H2 : "Un programme pensé pour progresser"
    H3 : "Plan structuré"
    H3 : "Adapté à ton allure"
    H3 : "Suivi séance par séance"
    H3 : "Single, Duo & Mixte Open"
  H2 : "Tarifs"
  H2 : "Tout ce qu'il faut savoir pour se préparer au Hyrox"
    H3 : "Comment se préparer au Hyrox Open : le guide complet"
    H3 : "Hyrox Single Open : programme et conseils pour débutants"
    H3 : "Hyrox Duo & Mixte Open : comment s'organiser à deux"
```

### Guide pilier `/guides/`

```
H1 : "Comment se préparer au Hyrox Open : le guide complet"
  H2 : "Qu'est-ce que le Hyrox Open ?"
    H3 : "Le format Single Open"
    H3 : "Le format Duo Open"
    H3 : "Le format Mixte Open"
  H2 : "Les 8 stations Hyrox expliquées"
    H3 : [une H3 par station]
  H2 : "Comment structurer son entraînement Hyrox"
    H3 : "Phase 1 : Poser les bases"
    H3 : "Phase 2 : Développer l'endurance"
    H3 : "Phase 3 : Spécificité Hyrox"
    H3 : "Phase 4 : Affûtage avant compétition"
  H2 : "Les erreurs classiques des débutants"
  H2 : "Comment Momentum t'aide à progresser"
  H2 : "Questions fréquentes sur le Hyrox Open"
    H3 : [une H3 par question FAQ]
```

---

## Schema.org — Données structurées

### Home — SoftwareApplication

```json
{
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
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingDuration": "P1M"
      }
    },
    {
      "@type": "Offer",
      "price": "150.00",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingDuration": "P1Y"
      }
    }
  ]
}
```

### Guide pilier — Article + FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Comment se préparer au Hyrox Open : le guide complet",
  "description": "Guide complet pour préparer le Hyrox Open : Single, Duo, Mixte. Programme, stations, allures, conseils débutants.",
  "author": {
    "@type": "Organization",
    "name": "Momentum"
  },
  "datePublished": "2026-06-08",
  "dateModified": "2026-06-08"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour préparer un Hyrox Open ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour un débutant, 3 à 4 mois de préparation structurée sont recommandés. Momentum propose un programme progressif qui s'adapte à ton niveau de départ."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre Hyrox Single, Duo et Mixte Open ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Single Open se court seul sur 8km + 8 stations. Le Duo se court à deux en alternance. Le Mixte est un duo homme/femme. Dans tous les cas, les stations et les distances sont identiques."
      }
    },
    {
      "@type": "Question",
      "name": "Quel niveau faut-il pour faire un Hyrox Open ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Hyrox Open est accessible aux débutants avec une préparation adaptée. Pas besoin d'être un athlète de haut niveau — la progression structurée est la clé."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il courir vite pour faire le Hyrox ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. La gestion de l'allure est plus importante que la vitesse brute. Momentum calibre tes allures en fonction de ton temps au 10km pour que tu ne partes pas trop vite."
      }
    }
  ]
}
```

### BreadcrumbList (sur les guides)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://momentum-hyrox.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://momentum-hyrox.fr/guides/" },
    { "@type": "ListItem", "position": 3, "name": "Hyrox Single Open" }
  ]
}
```

---

## Contenu éditorial — guide de rédaction

### Principes de rédaction SEO

1. **Le H1 contient le mot-clé exact** — sans paraphrase
2. **Le mot-clé principal apparaît dans les 100 premiers mots** du corps
3. **Densité de mots-clés** : 1-2% (pas de sur-optimisation)
4. **Synonymes et champ lexical** : utiliser les variantes naturelles
   - "hyrox" / "compétition hyrox" / "course hyrox"
   - "programme" / "plan d'entrainement" / "préparation"
   - "débutant" / "novice" / "première compétition"
5. **Longueur minimale** :
   - Guide pilier : 2000 mots
   - Sous-guides : 1200 mots
   - Les guides courts ne rankent pas

### Structure de contenu recommandée par guide

#### Guide pilier — "Comment se préparer au Hyrox Open"

```
Introduction (150 mots)
  → Accroche sur la croissance du Hyrox en France
  → Ce que couvre ce guide
  → CTA discret vers Momentum

Qu'est-ce que le Hyrox Open ? (300 mots)
  → Explication du format
  → Single / Duo / Mixte en 2-3 phrases chacun
  → Les 8 stations listées avec description

Comment structurer son entrainement (400 mots)
  → Les 4 phases de préparation
  → Volume par semaine selon le niveau
  → Importance de l'allure de course

Les erreurs classiques (300 mots)
  → Partir trop vite
  → Négliger les stations
  → Pas de plan structuré
  → Manque de spécificité

Pourquoi utiliser Momentum (200 mots)
  → Programme clé en main
  → Calibrage d'allures
  → Suivi progressif
  → CTA liste d'attente

FAQ (400 mots — 5 à 7 questions)
  → Voir liste ci-dessus

Liens internes vers sous-guides (bas de page)
```

### Champ lexical à intégrer naturellement

**Sport / performance :** allure, tempo, zone 2, VO2max, endurance, force fonctionnelle, gainage, sled, ski erg, rowing, burpees, wall balls, sandbag, farmer's carry, lunges

**Progression :** débutant, intermédiaire, progressif, phases, semaines, charge, volume, intensité, récupération, deload, affûtage

**Hyrox spécifique :** format open, divisions, temps de course, transitions, bib, finishers, podium, qualifications

---

## SEO technique — implémentation Astro

### Fichier `<head>` type

```astro
---
// src/layouts/BaseLayout.astro
const { title, description, canonical, ogImage } = Astro.props
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- SEO primaire -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:locale" content="fr_FR" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <!-- Fonts avec preload -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Schema.org -->
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
</head>
```

### Sitemap — `sitemap.xml`

Astro génère le sitemap automatiquement avec `@astrojs/sitemap`.

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap'

export default {
  site: 'https://momentum-hyrox.fr',
  integrations: [sitemap()],
}
```

Résultat attendu :
```xml
<url><loc>https://momentum-hyrox.fr/</loc><priority>1.0</priority></url>
<url><loc>https://momentum-hyrox.fr/guides/</loc><priority>0.9</priority></url>
<url><loc>https://momentum-hyrox.fr/guides/hyrox-single-open/</loc><priority>0.8</priority></url>
<url><loc>https://momentum-hyrox.fr/guides/hyrox-duo-mixte-open/</url><priority>0.8</priority></url>
```

### `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://momentum-hyrox.fr/sitemap.xml
```

### Performance — Core Web Vitals

Google intègre les CWV dans son algorithme de classement. Objectifs :

| Métrique | Objectif | Comment l'atteindre |
|----------|----------|---------------------|
| LCP (Largest Contentful Paint) | < 2.5s | Preload de l'image hero, pas de JS bloquant |
| CLS (Cumulative Layout Shift) | < 0.1 | Dimensions explicites sur toutes les images |
| FID / INP (Interaction) | < 200ms | JS minimal, Astro = 0 JS par défaut |
| TTFB (Time to First Byte) | < 800ms | SSG sur CDN (Vercel edge) |

**Astro génère du HTML statique = 0 JS par défaut** — avantage massif sur les frameworks JS classiques.

### Images — bonnes pratiques

```astro
<!-- Toujours utiliser le composant Image d'Astro -->
import { Image } from 'astro:assets'

<Image
  src={heroImg}
  alt="Athlète en train de préparer un Hyrox Open avec l'application Momentum"
  width={1280}
  height={720}
  format="webp"
  loading="eager"  <!-- hero uniquement -->
  fetchpriority="high"
/>
```

- **Format WebP** sur toutes les images (30-50% plus léger que JPG)
- **`loading="eager"`** uniquement sur l'image hero, `lazy` partout ailleurs
- **`fetchpriority="high"`** sur le LCP (image hero)
- **`alt` descriptifs** avec mots-clés contextuels (pas de "image1.jpg")
- **Dimensions explicites** — évite le layout shift

---

## Maillage interne

### Stratégie de liens internes

```
Home → Guide pilier (lien dans la section "Guides" + CTA)
Home → Guide Single Open (carte article)
Home → Guide Duo & Mixte (carte article)

Guide pilier → Guide Single Open (lien contextuel dans le texte)
Guide pilier → Guide Duo & Mixte (lien contextuel dans le texte)
Guide Single Open → Guide pilier (breadcrumb + "Voir aussi")
Guide Duo & Mixte → Guide pilier (breadcrumb + "Voir aussi")
Guide Single Open ↔ Guide Duo & Mixte (liens croisés en bas de page)
```

### Ancres de lien — utiliser les mots-clés

```
✓ "préparer le Hyrox Single Open"
✓ "programme Hyrox Open complet"
✗ "cliquez ici"
✗ "en savoir plus"
✗ "ce guide"
```

---

## Stratégie de contenu long terme

### Phase 1 — Lancement (mois 1-2)
- Home optimisée
- Guide pilier complet (2000+ mots)
- 2 sous-guides (1200+ mots chacun)
- FAQ structured data

### Phase 2 — Extension (mois 3-6, selon traction)
Selon les requêtes qui commencent à ranker, envisager :
- `/guides/stations-hyrox/` — "Les 8 stations Hyrox expliquées"
- `/guides/allures-hyrox/` — "Comment gérer son allure au Hyrox"
- `/guides/hyrox-femme/` — "Hyrox pour les femmes : conseils et programme"
- `/guides/hyrox-preparation-physique/` — "Renforcement musculaire pour le Hyrox"

### Suivi SEO
- Installer **Google Search Console** dès le lancement (propriété vérifiée)
- Soumettre le sitemap manuellement dans GSC
- Suivre les positions sur les mots-clés cibles toutes les 2 semaines
- Outils gratuits : Google Search Console, Ubersuggest, Ahrefs Free

---

## Checklist SEO avant mise en ligne

### Technique
- [ ] Toutes les pages ont un `<title>` unique sous 60 caractères
- [ ] Toutes les pages ont une `<meta description>` unique sous 160 caractères
- [ ] 1 seul `<h1>` par page
- [ ] `<link rel="canonical">` présent sur chaque page
- [ ] Sitemap.xml généré et accessible à `/sitemap.xml`
- [ ] Robots.txt présent à `/robots.txt`
- [ ] Schema.org validé via [validator.schema.org](https://validator.schema.org)
- [ ] Open Graph testé via [opengraph.xyz](https://opengraph.xyz)
- [ ] Images en WebP avec dimensions et alt
- [ ] Pas d'erreurs 404 (vérifier avec crawl Screaming Frog ou Sitebulb)
- [ ] HTTPS actif (obligatoire — Vercel le fait automatiquement)

### Contenu
- [ ] Mot-clé principal dans les 100 premiers mots de chaque guide
- [ ] H1 contient le mot-clé exact
- [ ] Guide pilier ≥ 2000 mots
- [ ] Sous-guides ≥ 1200 mots
- [ ] FAQ structurée avec Schema.org
- [ ] Liens internes entre toutes les pages guides
- [ ] Ancres de liens avec mots-clés (pas "cliquez ici")

### Post-lancement
- [ ] Google Search Console configuré
- [ ] Sitemap soumis dans GSC
- [ ] Google Analytics ou Plausible installé
- [ ] Première vérification d'indexation à J+7
