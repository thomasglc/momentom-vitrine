# Redesign home « Clair énergisé » — Design

**Date :** 2026-06-11
**Statut :** validé en brainstorming (direction A, structure wireframe, showcase triptyque)

## Contexte et objectifs

Le site vitrine Momentum (Astro statique, thème clair blanc/orange « Athletic Clarity ») est aujourd'hui purement typographique : aucune image, aucun visuel de l'app. Objectifs de la refonte :

1. **Donner envie de télécharger l'app** : montrer l'application via des mockups de téléphone recréés en HTML/CSS (aucun asset photo ni screenshot disponible).
2. **Rendre le site plus vivant** : animations au scroll, bandeau défilant, compteurs, micro-interactions — sans dépendance JS supplémentaire.
3. **Conversion** : aujourd'hui inscription à la liste d'attente ; à terme, téléchargement sur les stores. Le CTA principal doit être centralisé pour que la bascule waitlist → badges stores soit un changement à un seul endroit.
4. **SEO conservé** : tout le contenu reste rendu en HTML statique, schéma JSON-LD, métas, sitemap et pages guides inchangés sur le fond.

## Décisions actées

- **Direction artistique A — « Clair énergisé »** : on garde la base claire blanc/orange actuelle (variables CSS existantes), on injecte du mouvement et des mockups d'app. Pas de bascule dark ; seuls le bandeau stations, le bloc waitlist et le footer sont sombres pour rythmer le scroll.
- **Assets** : aucune photo ni screenshot. Les écrans de l'app sont recréés en HTML/CSS dans des cadres de téléphone (composant réutilisable).
- **Fidélité à l'app réelle** : les mockups reproduisent l'application existante (`C:\Users\thoma\Documents\Claude\Momentum`, Vue 3 + Tailwind), **rien n'est inventé**. Langage visuel de l'app : fond clair stone, cartes blanches `rounded-2xl` à ombre légère, îlot de navigation semaine sombre (slate-900) avec gros numéro « S6 » blanc et thème en orange-400, barre de progression orange-500, types de séances codés par couleur avec emoji (🏃 course/emerald, 💪 renfo/blue, ⚡ hyrox/amber, 🔗 brick/cyan, 🧘 mobilité/violet), phases codées par couleur (1 Fondation/bleu, 2 Construction/émeraude, 3 Spécificité/orange, 4 Affûtage/violet), intensité en pastilles (5 points), check de complétion circulaire.
- **Écrans d'app à recréer (3)**, d'après les vues réelles :
  - **Semaine courante** (`WeekView.vue`) : îlot sombre WeekNav (badge « PH.2 — Construction », « S6 » massif, plage de dates, thème orange, flèches ‹ ›), barre « Progression XX % », note de semaine (encart orange à bord gauche), liste de SessionCards (emoji typé, jour en label coloré, titre, durée, pastilles d'intensité, rond de validation ✓).
  - **Séance du jour** (`SessionView.vue` / `SessionDetail.vue`) : héro coloré selon le type (ex. emerald-600 pour une course), badge type + emoji, titre blanc massif, « Mardi · 50 min · ●●●●○ », corps avec description, coach tip 💬, blocs « Programme », bouton « Valider la séance ».
  - **Plan 4 phases** (`PhasesView.vue`) : titre « Plan d'Entraînement », « 4 phases · 19 semaines », grille de 4 boutons de phase colorés, cartes de phase avec barre verticale colorée, « Phase 2 · S7–S12 », nom, dates · volume.
- **Showcase = triptyque** : 3 téléphones côte à côte, apparition en cascade au scroll, téléphone central surélevé, hover qui redresse/agrandit. Sur mobile : défilement horizontal avec scroll-snap. Pas de scroll-jacking ni de téléphone épinglé.
- **Périmètre** : refonte de la home + header/footer globaux. Les pages guides et mentions légales gardent leur structure et leur contenu, elles héritent seulement du header/footer modernisés.

## Structure de la nouvelle home (ordre du scroll)

1. **Hero animé** — grille 2 colonnes : à gauche badges formats (Single/Duo/Mixte), H1 massive (Barlow Condensed), sous-titre, CTA principal + mention « Bientôt sur iOS & Android » ; à droite un téléphone (écran Semaine courante, le plus signature avec son îlot sombre « S6 ») en légère rotation, animation de flottement continue, cartes de la séance révélées en cascade au chargement. Fond : halo radial orange discret. Compteurs animés (4 phases · 19 semaines · 100 % guidé) remplacent les stat-cards actuelles.
2. **Bandeau stations** — marquee sombre défilant en continu : SkiErg · Sled Push · Sled Pull · Burpee Broad Jump · Row · Farmers Carry · Sandbag Lunges · Wall Balls. Contenu dupliqué pour la boucle, duplicata en `aria-hidden`.
3. **Le programme** — section « 4 phases. Une méthode. » : 4 cartes de phase reprenant les vraies phases et couleurs de l'app (01 Fondation/bleu, 02 Construction/émeraude, 03 Spécificité/orange, 04 Affûtage/violet) qui s'allument une à une au scroll, barre de progression horizontale qui se remplit (IntersectionObserver, pas de scroll-jacking).
4. **L'app en action** — triptyque de mockups (Semaine courante · Séance du jour · Plan 4 phases, fidèles aux vues réelles) avec titre « Dans ta poche, semaine après semaine. » et courts textes de feature sous chaque téléphone.
5. **Pourquoi Momentum** — Features actuelles (2×2) restylées : icônes, hover plus marqué, cohérence avec le nouveau langage visuel.
6. **Tarifs + waitlist** — cartes Mensuel/Annuel restylées ; le bloc waitlist early-bird passe en fond sombre pour ressortir comme point de conversion principal (formulaire Formspree conservé).
7. **Guides** — teaser actuel conservé (pilier SEO), restylé légèrement.
8. **Footer** — modernisé, sombre : logo, nav, mentions légales, mention « bientôt sur les stores ».

Header : sticky avec fond translucide + blur au scroll, nav (Programme, Tarifs, Guides), CTA pill orange « Rejoindre la liste ».

## Composants

| Composant | Statut | Rôle |
|---|---|---|
| `PhoneMockup.astro` | nouveau | Cadre de téléphone réutilisable (notch, bords, ombre), slot pour l'écran |
| `screens/ScreenSemaine.astro` | nouveau | Réplique de `WeekView.vue` : îlot sombre S6, barre de progression, SessionCards avec emoji typés et checks |
| `screens/ScreenSeance.astro` | nouveau | Réplique de `SessionDetail.vue` : héro coloré, titre, durée/intensité, blocs programme, bouton « Valider la séance » |
| `screens/ScreenProgramme.astro` | nouveau | Réplique de `PhasesView.vue` : grille des 4 phases colorées + cartes de phase |
| `CtaPrimary.astro` | nouveau | CTA principal centralisé ; libellé/cible définis dans `src/config.ts` — la bascule waitlist → stores se fait à un seul endroit |
| `StationsMarquee.astro` | nouveau | Bandeau défilant CSS pur |
| `Programme.astro` | nouveau | Section 4 phases + barre de progression au scroll |
| `AppShowcase.astro` | nouveau | Triptyque de PhoneMockup |
| `Hero.astro` | réécrit | Nouveau hero avec téléphone flottant et compteurs |
| `Header.astro`, `Footer.astro` | restylés | Sticky/blur ; footer sombre |
| `Features.astro`, `Pricing.astro`, `GuidesTeaser.astro` | restylés | Même contenu, nouveau langage visuel |
| `CustomCursor.astro`, `GuideLayout.astro`, pages guides | inchangés | Hors périmètre |

`src/config.ts` (nouveau) : constantes du site — état du produit (`waitlist` / `live`), URL du formulaire, futurs liens stores. Tous les CTA lisent cette config.

## Animations

- Tout en CSS + l'IntersectionObserver `.reveal` existant (étendu : délais en cascade, variante `reveal-scale`).
- Flottement du téléphone : `@keyframes` CSS, boucle lente.
- Marquee : `@keyframes translateX` CSS pur.
- Compteurs du hero : petit script vanilla (~20 lignes) déclenché à l'intersection.
- Barre de progression du programme : classe ajoutée à l'intersection, transition CSS.
- `prefers-reduced-motion` déjà géré dans `global.css` : le marquee est figé, le flottement désactivé, les compteurs affichent directement la valeur finale.

## SEO

- Aucun contenu généré en JS : tout le texte est dans le HTML statique Astro.
- H1, title, meta description, canonical, JSON-LD `SoftwareApplication`, sitemap : conservés tels quels (ou texte enrichi, jamais appauvri).
- Pages guides intactes (contenu et structure) — seul l'habillage global change.
- Pas de nouvelle dépendance, pas d'image lourde : le poids de page reste minimal (mockups = HTML/CSS).

## Tests / vérification

- `npm run build` sans erreur ni warning Astro.
- Vérification visuelle en dev : desktop (1280+), tablette (768), mobile (375) ; triptyque en scroll-snap sur mobile.
- Test `prefers-reduced-motion` (émulation devtools).
- Contrôle que le HTML rendu contient bien H1, schéma JSON-LD et contenu texte complet (vue source).
