# Site Vitrine Momentum — Design Spec
*Date : 2026-06-08*

## Contexte

Momentum est une application mobile (iOS & Android, en développement) de préparation à la compétition Hyrox format Open. Elle propose un programme structuré en 4 phases avec calibrage d'allures personnalisé basé sur le temps au 10km. Le site vitrine a pour objectif de convertir les visiteurs en inscrits sur liste d'attente et de capter du trafic SEO qualifié sur les requêtes Hyrox Open.

---

## Stack technique

- **Framework** : Astro (SSG — génération statique)
- **Hébergement** : Vercel ou Netlify (gratuit)
- **Styles** : Tailwind CSS
- **Formulaire liste d'attente** : service tiers (ex. Mailchimp, Brevo, ou simple Formspree)

---

## Design

### Identité visuelle
- **Fond** : noir / anthracite (`#0a0a0a`, `#111111`)
- **Accent** : orange vif (cohérent avec l'app Momentum, ex. `#f97316`)
- **Texte** : blanc, gris clair pour les secondaires
- **Typographie** : sans-serif bold pour les titres (ex. Inter, DM Sans), lisible et moderne
- **Ambiance** : sport de performance, sombre et intense — inspire l'aspiration chez les débutants, la crédibilité chez les intermédiaires

### Responsive
- Mobile-first (même cible que l'app)
- Breakpoints standard : mobile / tablette / desktop

---

## Architecture du site

```
/                        → Home (one-page longue)
/guides/                 → Guide pilier : "Comment se préparer au Hyrox Open"
/guides/single-open/     → "Hyrox Single Open : programme et conseils pour débutants"
/guides/duo-mixte-open/  → "Hyrox Duo & Mixte Open : comment s'organiser à deux"
```

---

## Page d'accueil — Structure des sections

### 1. Hero

**Accroche :**
> "Du premier entraînement au jour J — Momentum t'emmène jusqu'à ton plein potentiel."

**Sous-titre :**
> "Momentum te donne un plan structuré, semaine par semaine, adapté à ton niveau — que tu débarques ou que tu vises le podium."

**Visuels :** fond noir avec image/vidéo d'ambiance Hyrox en overlay sombre. Badge orange "Single · Duo · Mixte Open".

**CTA principal :** bouton orange "Rejoins la liste d'attente — offre early bird"

**Mention :** "App iOS & Android — bientôt disponible"

**3 stats en bas du hero :**
| Stat | Valeur |
|------|--------|
| Guidé pas à pas | Du premier entraînement à la course |
| 4 phases | Progressives |
| 3 formats | Single / Duo / Mixte |

---

### 2. Fonctionnalités clés

4 blocs visuels (icône + titre + description) :

| # | Titre | Description |
|---|-------|-------------|
| 1 | Plan structuré | Un programme pensé en phases progressives — force, endurance, spécificité Hyrox. Tu sais toujours ce que tu fais et pourquoi. |
| 2 | Adapté à ton allure | Tu entres ton temps au 10km, Momentum calibre toutes tes allures de course. Ton entraînement, à ton niveau. |
| 3 | Suivi séance par séance | Chaque entraînement est détaillé : exercices, durées, intensités. Tu coches, tu avances, tu progresses. |
| 4 | Single, Duo & Mixte Open | Que tu coures seul, en duo ou en mixte — le programme s'adapte à ton format de compétition. |

---

### 3. Tarifs

Deux cartes côte à côte (empilées sur mobile) :

**Carte Mensuel :**
- Prix : **15€ / mois**
- Sans engagement, résiliable à tout moment
- Accès complet

**Carte Annuel** *(mise en avant, badge orange "Meilleure offre")* :
- Prix : **150€ / an** — soit 12,50€/mois
- 2 mois offerts vs mensuel
- Accès complet toute la saison

**Bloc liste d'attente sous les cartes :**
> "Inscris-toi maintenant et bénéficie d'une remise exclusive en tant que premier arrivé."
- Champ email + bouton orange "Je réserve ma place"
- Mention : *offre limitée aux premiers inscrits*

---

### 4. Liens vers les guides SEO

**Titre de section :**
> "Tout ce qu'il faut savoir pour se préparer au Hyrox"

3 cartes articles avec extrait court et lien "Lire le guide →" :
1. Guide pilier — *"Comment se préparer au Hyrox Open : le guide complet"*
2. *"Hyrox Single Open : programme et conseils pour débutants"*
3. *"Hyrox Duo & Mixte Open : comment s'organiser à deux"*

---

### 5. Footer

- Logo Momentum
- Liens : Accueil · Tarifs · Guides · Contact
- Mentions légales / CGU
- Réseaux sociaux (à compléter)

---

## Pages guides SEO

### Stratégie éditoriale

**Objectif SEO :** capter les requêtes longue traîne autour de :
- "programme hyrox open débutant"
- "préparer hyrox single open"
- "hyrox duo mixte programme entrainement"
- "comment se préparer au hyrox"

**Structure de chaque guide :**
1. Introduction (contexte, format concerné)
2. Qu'est-ce que le Hyrox Open (Single / Duo / Mixte)
3. Les stations Hyrox expliquées
4. Les erreurs des débutants
5. Comment structurer son entraînement
6. Pourquoi Momentum aide à progresser (CTA naturel)
7. FAQ (questions fréquentes — contenu riche pour le SEO)

### Guide pilier (`/guides/`)
Couvre les 3 formats, longueur 1500-2500 mots, liens internes vers les sous-guides.

### Sous-guides
- `/guides/single-open/` — focus débutant solo, 1000-1500 mots
- `/guides/duo-mixte-open/` — focus organisation à deux, 1000-1500 mots

---

## SEO technique

- Balises `<title>` et `<meta description>` uniques par page
- Balises `<h1>` / `<h2>` structurées avec mots-clés Hyrox
- Schema.org `FAQPage` sur les guides
- Sitemap XML généré automatiquement par Astro
- Images avec attributs `alt` descriptifs
- URL lisibles et descriptives (ex. `/guides/hyrox-single-open/`)
- Open Graph pour le partage social

---

## Liste d'attente — Early Bird

- Formulaire email simple (champ unique + bouton)
- Message de confirmation : "Bienvenue ! Tu feras partie des premiers à accéder à Momentum avec une remise exclusive."
- Intégration via Brevo / Mailchimp / Formspree (à choisir selon préférence)
- Données collectées : email uniquement (RGPD — mention obligatoire)

---

## Ce qui n'est PAS dans ce scope

- Backend / API
- Authentification
- Tableau de bord utilisateur
- Blog avec CMS (les guides sont des fichiers Markdown statiques dans Astro)
- Intégration App Store / Google Play (liens placeholder pour l'instant)
