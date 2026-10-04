// src/i18n/translations.js
/**
 * Translation dictionary.
 *
 * Structure:
 *   translations[lang][key] = string
 *
 * Keys are namespaced by section:
 *   hero.*        — the homepage hero
 *   utility.*     — the top bar
 *   nav.*         — the header nav (add more as you translate)
 *   common.*      — shared strings
 */

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'sw', label: 'Kiswahili', short: 'SW' },
];

export const translations = {
  en: {
    'hero.kicker': 'Official KALRO eLearning platform',
    'hero.title.line1': 'Learn. Grow.',
    'hero.title.line2': 'Prosper.',
    'hero.lead':
      'Free, practical training for farmers, extension officers and agripreneurs. Learn online or offline, and earn KALRO badges as you go.',
    'hero.search.placeholder': 'Search by crop, livestock or topic',
    'hero.search.button': 'Search',
    'hero.popular': 'Popular:',
    'hero.chip.maize': 'Maize',
    'hero.chip.dairy': 'Dairy',
    'hero.chip.poultry': 'Poultry',
    'hero.chip.irrigation': 'Irrigation',
    'hero.proof.free': '100% free',
    'hero.proof.offline': 'Works offline',
    'hero.proof.languages': 'English and Kiswahili',

    'hero.panel.title': 'Training at a glance',
    'hero.panel.courses': 'Modules',
    'hero.panel.learners': 'Trainees',
    'hero.panel.counties': 'Counties',
    'hero.panel.badges': 'Badges',
    'hero.award.earned': 'Badge earned today',
    'hero.award.course': 'Dairy Pro, Level 2',
    'hero.award.learner': 'Wanjiku, Nakuru',
    'hero.trust':
      'Built on research from the Kenya Agricultural & Livestock Research Organization',

    'utility.news':
      'Climate-Smart Agriculture pathway: 6 modules, 1 pathway badge.',
    'utility.news.link': 'See the pathway →',
    'utility.phone': '0800 721 741 (toll free)',

        // src/i18n/translations.js — additions

    // Inside translations.en, add these keys alongside the hero ones:

    // ── Nav: top-level menu triggers ─────────────────────────
    'nav.courses': 'Courses',
    'nav.audience': 'Who it’s for',
    'nav.badges': 'Badges',
    'nav.more': 'More',
    'nav.allCourses': 'All courses',
    'nav.callCentre': 'Call centre',
    'nav.help': 'Help',

    // ── Nav: Courses mega menu ───────────────────────────────
    'nav.courses.subjects': 'Browse by subject',
    'nav.courses.crops': 'Crops',
    'nav.courses.crops.desc': 'Maize, beans, horticulture, coffee, tea',
    'nav.courses.livestock': 'Livestock',
    'nav.courses.livestock.desc': 'Dairy, beef, poultry, goats, bees',
    'nav.courses.natural': 'Natural Resources',
    'nav.courses.natural.desc': 'Soil health, agroforestry, biodiversity',
    'nav.courses.water': 'Water & Irrigation',
    'nav.courses.water.desc': 'Drip, water harvesting, pumps',
    'nav.courses.processing': 'Agro-Processing',
    'nav.courses.processing.desc': 'Value addition, storage, food safety',
    'nav.courses.climate': 'Climate-Smart',
    'nav.courses.climate.desc': 'Resilience, conservation farming',
    'nav.courses.agribusiness': 'Agribusiness',
    'nav.courses.agribusiness.desc': 'Marketing, finance, cooperatives',
    'nav.courses.fullCatalogue': 'Full catalogue',
    'nav.courses.fullCatalogue.desc': 'All 150+ courses',
    'nav.courses.pathwaysTitle': 'Learning pathways',
    'nav.courses.pathway.csa': 'Climate-Smart Agriculture',
    'nav.courses.pathway.csa.desc': '6 courses, 24 hrs',
    'nav.courses.pathway.dairy': 'Dairy Value Chain',
    'nav.courses.pathway.dairy.desc': '5 courses, 20 hrs',
    'nav.courses.pathway.agribusiness': 'Agribusiness Essentials',
    'nav.courses.pathway.agribusiness.desc': '4 courses, 16 hrs',
    'nav.courses.pathway.horticulture': 'Horticulture Production',
    'nav.courses.pathway.horticulture.desc': '7 courses, 28 hrs',
    'nav.courses.featured.title':
        'Most popular: Dairy Farming for Increased Milk Production',
    'nav.courses.featured.desc': '12 lessons, 6 hrs. Rated 4.9 by 1,204 learners.',
    'nav.courses.featured.cta': 'Start learning',

    // ── Nav: Audience mega menu ──────────────────────────────
    'nav.audience.farmers': 'Farmers',
    'nav.audience.farmers.desc': 'Practical training for your crops and livestock',
    'nav.audience.groups': 'Farmer groups & cooperatives',
    'nav.audience.groups.desc': 'Bulk enrolment and shared dashboards',
    'nav.audience.extension': 'Extension officers',
    'nav.audience.extension.desc': 'Offline tools and trainable materials',
    'nav.audience.agripreneurs': 'Agripreneurs',
    'nav.audience.agripreneurs.desc': 'Business planning, markets, finance',
    'nav.audience.trainers': 'Lead farmers & trainers',
    'nav.audience.trainers.desc': 'ToT programs and facilitation guides',
    'nav.audience.students': 'Students & researchers',
    'nav.audience.students.desc': 'Reference content from KALRO programs',
    'nav.audience.feature.title': 'Bring KALRO Mkulima to your organisation',
    'nav.audience.feature.desc':
        'County governments, NGOs and cooperatives can enrol members in bulk, host field days, and track progress on a shared dashboard.',
    'nav.audience.feature.cta': 'Contact us',

    // ── Nav: Badges mega menu ────────────────────────────────
    'nav.badges.yourBadges': 'Your badges',
    'nav.badges.myBadges': 'My badges',
    'nav.badges.myBadges.desc': 'View, download and share',
    'nav.badges.verify': 'Verify a badge',
    'nav.badges.verify.desc': 'Enter a badge ID',
    'nav.badges.how': 'How badges work',
    'nav.badges.how.desc': 'Verifiable, shareable, recognised',
    'nav.badges.progress': 'Progress',
    'nav.badges.dashboard': 'My dashboard',
    'nav.badges.dashboard.desc': 'Progress, streaks and recommendations',
    'nav.badges.feature.title': 'Verify a badge',
    'nav.badges.feature.desc': 'Enter the badge ID printed under the QR code.',

    // ── Nav: More mega menu ──────────────────────────────────
    'nav.more.learnMore': 'Learn more',
    'nav.more.about': 'About KALRO Mkulima',
    'nav.more.about.desc': 'Mission, team and partners',
    'nav.more.callCentre': 'Call centre',
    'nav.more.callCentre.desc': 'Free advice: 0800 721 741',
    'nav.more.help': 'Help and FAQ',
    'nav.more.help.desc': 'Common questions answered',

    // ── Nav: auth buttons + user chip ────────────────────────
    'nav.login': 'Log in',
    'nav.register': 'Register free',
    'nav.dashboard': 'Go to dashboard',
    'nav.signOut': 'Sign out',
    'nav.notifications': 'Notifications (1 new)',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.account': 'Account',
    'nav.language': 'Language',
  },

  sw: {
    'hero.kicker': 'Jukwaa rasmi la KALRO la kujifunza mtandaoni',
    'hero.title.line1': 'Jifunze. Kua.',
    'hero.title.line2': 'Fanikiwa.',
    'hero.lead':
      'Mafunzo ya bure na ya vitendo kwa wakulima, maafisa ugani na wajasiriamali wa kilimo. Jifunze mtandaoni au nje ya mtandao, na upate beji za KALRO kadri unavyoendelea.',
    'hero.search.placeholder': 'Tafuta kwa zao, mifugo au mada',
    'hero.search.button': 'Tafuta',
    'hero.popular': 'Maarufu:',
    'hero.chip.maize': 'Mahindi',
    'hero.chip.dairy': 'Maziwa',
    'hero.chip.poultry': 'Kuku',
    'hero.chip.irrigation': 'Umwagiliaji',
    'hero.proof.free': 'Bure 100%',
    'hero.proof.offline': 'Inafanya kazi nje ya mtandao',
    'hero.proof.languages': 'Kiingereza na Kiswahili',

    'hero.panel.title': 'Mafunzo kwa muhtasari',
    'hero.panel.courses': 'Kozi',
    'hero.panel.learners': 'Wanafunzi',
    'hero.panel.counties': 'Kaunti',
    'hero.panel.badges': 'Beji',
    'hero.award.earned': 'Beji iliyopatikana leo',
    'hero.award.course': 'Mtaalam wa Maziwa, Ngazi ya 2',
    'hero.award.learner': 'Wanjiku, Nakuru',
    'hero.trust':
      'Imejengwa kwa utafiti wa Shirika la Utafiti wa Kilimo na Mifugo la Kenya',

    'utility.news':
      'Njia ya Kilimo-Kijanali: kozi 6, beji 1 ya njia.',
    'utility.news.link': 'Ona njia →',
    'utility.phone': '0800 721 741 (bila malipo)',
        // Inside translations.sw, add these keys alongside the hero ones:

    // ── Nav: top-level menu triggers ─────────────────────────
    'nav.courses': 'Kozi',
    'nav.audience': 'Kwa nani',
    'nav.badges': 'Beji',
    'nav.more': 'Zaidi',
    'nav.allCourses': 'Kozi zote',
    'nav.callCentre': 'Kituo cha simu',
    'nav.help': 'Msaada',

    // ── Nav: Courses mega menu ───────────────────────────────
    'nav.courses.subjects': 'Vinjari kwa somo',
    'nav.courses.crops': 'Mazao',
    'nav.courses.crops.desc': 'Mahindi, maharagwe, bustani, kahawa, chai',
    'nav.courses.livestock': 'Mifugo',
    'nav.courses.livestock.desc': 'Maziwa, nyama, kuku, mbuzi, nyuki',
    'nav.courses.natural': 'Maliasili',
    'nav.courses.natural.desc': 'Afya ya udongo, misitu ya kilimo, bayoanuwai',
    'nav.courses.water': 'Maji na Umwagiliaji',
    'nav.courses.water.desc': 'Umwagiliaji wa matone, kuvuna maji, pampu',
    'nav.courses.processing': 'Usindikaji wa Kilimo',
    'nav.courses.processing.desc': 'Kuongeza thamani, kuhifadhi, usalama wa chakula',
    'nav.courses.climate': 'Kilimo-Kijanali',
    'nav.courses.climate.desc': 'Ustahimilivu, kilimo cha kuhifadhi',
    'nav.courses.agribusiness': 'Biashara ya Kilimo',
    'nav.courses.agribusiness.desc': 'Masoko, fedha, vyama vya ushirika',
    'nav.courses.fullCatalogue': 'Orodha kamili',
    'nav.courses.fullCatalogue.desc': 'Kozi zote 150+',
    'nav.courses.pathwaysTitle': 'Njia za kujifunza',
    'nav.courses.pathway.csa': 'Kilimo-Kijanali',
    'nav.courses.pathway.csa.desc': 'Kozi 6, saa 24',
    'nav.courses.pathway.dairy': 'Mnyororo wa Thamani wa Maziwa',
    'nav.courses.pathway.dairy.desc': 'Kozi 5, saa 20',
    'nav.courses.pathway.agribusiness': 'Misingi ya Biashara ya Kilimo',
    'nav.courses.pathway.agribusiness.desc': 'Kozi 4, saa 16',
    'nav.courses.pathway.horticulture': 'Uzalishaji wa Bustani',
    'nav.courses.pathway.horticulture.desc': 'Kozi 7, saa 28',
    'nav.courses.featured.title':
        'Maarufu zaidi: Ufugaji wa Maziwa kwa Uzalishaji Zaidi wa Maziwa',
    'nav.courses.featured.desc':
        'Masomo 12, saa 6. Imekadiriwa 4.9 na wanafunzi 1,204.',
    'nav.courses.featured.cta': 'Anza kujifunza',

    // ── Nav: Audience mega menu ──────────────────────────────
    'nav.audience.farmers': 'Wakulima',
    'nav.audience.farmers.desc': 'Mafunzo ya vitendo kwa mazao na mifugo yako',
    'nav.audience.groups': 'Vikundi vya wakulima na vyama vya ushirika',
    'nav.audience.groups.desc': 'Usajili wa pamoja na dashibodi za pamoja',
    'nav.audience.extension': 'Maafisa ugani',
    'nav.audience.extension.desc': 'Zana za nje ya mtandao na nyenzo za kufundisha',
    'nav.audience.agripreneurs': 'Wajasiriamali wa kilimo',
    'nav.audience.agripreneurs.desc': 'Mipango ya biashara, masoko, fedha',
    'nav.audience.trainers': 'Wakulima viongozi na wakufunzi',
    'nav.audience.trainers.desc': 'Programu za ToT na miongozo ya kuwezesha',
    'nav.audience.students': 'Wanafunzi na watafiti',
    'nav.audience.students.desc': 'Nyenzo za marejeleo kutoka programu za KALRO',
    'nav.audience.feature.title': 'Leta KALRO Mkulima kwa taasisi yako',
    'nav.audience.feature.desc':
        'Serikali za kaunti, NGO na vyama vya ushirika vinaweza kusajili wanachama kwa pamoja, kuandaa siku za shamba, na kufuatilia maendeleo kwenye dashibodi ya pamoja.',
    'nav.audience.feature.cta': 'Wasiliana nasi',

    // ── Nav: Badges mega menu ────────────────────────────────
    'nav.badges.yourBadges': 'Beji zako',
    'nav.badges.myBadges': 'Beji zangu',
    'nav.badges.myBadges.desc': 'Tazama, pakua na shiriki',
    'nav.badges.verify': 'Thibitisha beji',
    'nav.badges.verify.desc': 'Weka kitambulisho cha beji',
    'nav.badges.how': 'Jinsi beji zinavyofanya kazi',
    'nav.badges.how.desc': 'Zinathibitika, zinashirikiwa, zinatambulika',
    'nav.badges.progress': 'Maendeleo',
    'nav.badges.dashboard': 'Dashibodi yangu',
    'nav.badges.dashboard.desc': 'Maendeleo, mfululizo na mapendekezo',
    'nav.badges.feature.title': 'Thibitisha beji',
    'nav.badges.feature.desc':
        'Weka kitambulisho cha beji kilichoandikwa chini ya msimbo wa QR.',

    // ── Nav: More mega menu ──────────────────────────────────
    'nav.more.learnMore': 'Jifunze zaidi',
    'nav.more.about': 'Kuhusu KALRO Mkulima',
    'nav.more.about.desc': 'Dhamira, timu na washirika',
    'nav.more.callCentre': 'Kituo cha simu',
    'nav.more.callCentre.desc': 'Ushauri wa bure: 0800 721 741',
    'nav.more.help': 'Msaada na Maswali',
    'nav.more.help.desc': 'Maswali ya kawaida yamejibiwa',

    // ── Nav: auth buttons + user chip ────────────────────────
    'nav.login': 'Ingia',
    'nav.register': 'Jisajili bure',
    'nav.dashboard': 'Nenda kwenye dashibodi',
    'nav.signOut': 'Toka',
    'nav.notifications': 'Arifa (1 mpya)',
    'nav.openMenu': 'Fungua menyu',
    'nav.closeMenu': 'Funga menyu',
    'nav.account': 'Akaunti',
    'nav.language': 'Lugha',
  },
};