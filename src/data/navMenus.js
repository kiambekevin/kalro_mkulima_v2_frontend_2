// src/data/navMenus.js
/**
 * Mega menu configuration.
 *
 * Every user-facing string is a translation key — the header
 * resolves them with `t(key)` at render time. Data files stay
 * language-agnostic.
 */

export const navMenus = [
  /* ───────────────────────────── COURSES ───────────────────────────── */
  {
    id: 'courses',
    labelKey: 'nav.courses',
    variant: 'mega__inner--2',
    columns: [
      {
        titleKey: 'nav.courses.subjects',
        linksClass: 'mega__links mega__cols',
        links: [
          { icon: 'fa-solid fa-wheat-awn', titleKey: 'nav.courses.crops', descKey: 'nav.courses.crops.desc', count: 42, href: '/courses?subject=crops' },
          { icon: 'fa-solid fa-cow', titleKey: 'nav.courses.livestock', descKey: 'nav.courses.livestock.desc', count: 28, href: '/courses?subject=livestock' },
          { icon: 'fa-solid fa-tree', titleKey: 'nav.courses.natural', descKey: 'nav.courses.natural.desc', count: 18, href: '/courses?subject=natural' },
          { icon: 'fa-solid fa-droplet', titleKey: 'nav.courses.water', descKey: 'nav.courses.water.desc', count: 15, href: '/courses?subject=water' },
          { icon: 'fa-solid fa-jar', titleKey: 'nav.courses.processing', descKey: 'nav.courses.processing.desc', count: 22, href: '/courses?subject=processing' },
          { icon: 'fa-solid fa-cloud-sun-rain', titleKey: 'nav.courses.climate', descKey: 'nav.courses.climate.desc', count: 20, href: '/courses?subject=climate' },
          { icon: 'fa-solid fa-chart-line', titleKey: 'nav.courses.agribusiness', descKey: 'nav.courses.agribusiness.desc', count: 25, href: '/courses?subject=agribusiness' },
          { icon: 'fa-solid fa-book-open', titleKey: 'nav.courses.fullCatalogue', descKey: 'nav.courses.fullCatalogue.desc', href: '/courses' },
        ],
      },
      {
        titleKey: 'nav.courses.pathwaysTitle',
        links: [
          { icon: 'fa-solid fa-cloud-sun-rain', titleKey: 'nav.courses.pathway.csa', descKey: 'nav.courses.pathway.csa.desc', href: '/courses?pathway=climate-smart-agriculture-csa' },
          { icon: 'fa-solid fa-cow', titleKey: 'nav.courses.pathway.dairy', descKey: 'nav.courses.pathway.dairy.desc', href: '/courses?pathway=dairy-value-chain' },
          { icon: 'fa-solid fa-chart-line', titleKey: 'nav.courses.pathway.agribusiness', descKey: 'nav.courses.pathway.agribusiness.desc', href: '/courses?pathway=agribusiness-essentials' },
          { icon: 'fa-solid fa-carrot', titleKey: 'nav.courses.pathway.horticulture', descKey: 'nav.courses.pathway.horticulture.desc', href: '/courses?pathway=horticulture-production' },
        ],
      },
    ],
    feature: {
      variant: 'course',
      icon: 'fa-solid fa-cow',
      titleKey: 'nav.courses.featured.title',
      descKey: 'nav.courses.featured.desc',
      cta: { labelKey: 'nav.courses.featured.cta', href: '/courses/dairy-farming-increased-milk' },
    },
  },

  /* ───────────────────────────── AUDIENCE ───────────────────────────── */
  {
    id: 'audience',
    labelKey: 'nav.audience',
    columns: [
      {
        links: [
          { icon: 'fa-solid fa-seedling', titleKey: 'nav.audience.farmers', descKey: 'nav.audience.farmers.desc', href: '/courses' },
          { icon: 'fa-solid fa-people-group', titleKey: 'nav.audience.groups', descKey: 'nav.audience.groups.desc', href: '/about' },
          { icon: 'fa-solid fa-clipboard-user', titleKey: 'nav.audience.extension', descKey: 'nav.audience.extension.desc', href: '/about' },
          { icon: 'fa-solid fa-briefcase', titleKey: 'nav.audience.agripreneurs', descKey: 'nav.audience.agripreneurs.desc', href: '/courses?subject=agribusiness' },
          { icon: 'fa-solid fa-chalkboard-user', titleKey: 'nav.audience.trainers', descKey: 'nav.audience.trainers.desc', href: '/about' },
          { icon: 'fa-solid fa-graduation-cap', titleKey: 'nav.audience.students', descKey: 'nav.audience.students.desc', href: '/about' },
        ],
      },
    ],
    feature: {
      titleKey: 'nav.audience.feature.title',
      descKey: 'nav.audience.feature.desc',
      cta: { labelKey: 'nav.audience.feature.cta', href: '/call-centre' },
    },
  },

  /* ───────────────────────────── BADGES ───────────────────────────── */
  {
    id: 'badges',
    labelKey: 'nav.badges',
    columns: [
      {
        titleKey: 'nav.badges.yourBadges',
        links: [
          { icon: 'fa-solid fa-trophy', titleKey: 'nav.badges.myBadges', descKey: 'nav.badges.myBadges.desc', href: '/badges' },
          { icon: 'fa-solid fa-circle-check', titleKey: 'nav.badges.verify', descKey: 'nav.badges.verify.desc', href: '/badges/verify' },
          { icon: 'fa-solid fa-award', titleKey: 'nav.badges.how', descKey: 'nav.badges.how.desc', href: '/about' },
        ],
      },
      {
        titleKey: 'nav.badges.progress',
        links: [
          { icon: 'fa-solid fa-gauge', titleKey: 'nav.badges.dashboard', descKey: 'nav.badges.dashboard.desc', href: '/dashboard' },
        ],
      },
    ],
    feature: {
      titleKey: 'nav.badges.feature.title',
      descKey: 'nav.badges.feature.desc',
      verify: true,
    },
  },

  /* ───────────────────────────── MORE ───────────────────────────── */
  {
    id: 'more',
    labelKey: 'nav.more',
    columns: [
      {
        titleKey: 'nav.more.learnMore',
        links: [
          { icon: 'fa-solid fa-circle-info', titleKey: 'nav.more.about', descKey: 'nav.more.about.desc', href: '/about' },
          { icon: 'fa-solid fa-phone-volume', titleKey: 'nav.more.callCentre', descKey: 'nav.more.callCentre.desc', href: '/call-centre' },
          { icon: 'fa-solid fa-circle-question', titleKey: 'nav.more.help', descKey: 'nav.more.help.desc', href: '/#faq' },
        ],
      },
    ],
  },
];