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
  directusUrl: 'https://back.galocha.fr',
}
