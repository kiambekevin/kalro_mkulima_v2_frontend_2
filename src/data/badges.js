// src/data/badges.js

/**
 * Per-subject badge identity. `variant` is used by the Rosette component
 * (r-course / r-pathway / r-trainer) and `tint` is the primary colour
 * used for the ribbon and centre circle in the generated PNG.
 */
export const badgeSubjects = {
  livestock:    { label: 'Livestock',         icon: 'fa-solid fa-cow',            tint: '#23804A', accent: '#F0B429' },
  crops:        { label: 'Crops',             icon: 'fa-solid fa-wheat-awn',      tint: '#1B6639', accent: '#F0B429' },
  natural:      { label: 'Natural Resources', icon: 'fa-solid fa-tree',           tint: '#123B26', accent: '#F0B429' },
  water:        { label: 'Water & Irrigation',icon: 'fa-solid fa-droplet',        tint: '#1E6FA8', accent: '#F0B429' },
  processing:   { label: 'Agro-Processing',   icon: 'fa-solid fa-jar',            tint: '#8B5A36', accent: '#F0B429' },
  climate:      { label: 'Climate-Smart',     icon: 'fa-solid fa-cloud-sun-rain', tint: '#2F9A5A', accent: '#F0B429' },
  agribusiness: { label: 'Agribusiness',      icon: 'fa-solid fa-chart-line',     tint: '#B7801A', accent: '#123B26' },
  default:      { label: 'KALRO Course',      icon: 'fa-solid fa-award',          tint: '#123B26', accent: '#F0B429' },
};

export function subjectTheme(slug) {
  return badgeSubjects[slug] ?? badgeSubjects.default;
}