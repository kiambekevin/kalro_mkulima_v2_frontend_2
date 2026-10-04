// src/data/fieldDays.js

export const fieldDays = [
  {
    id: 'fd-001',
    title: 'Dairy feeding demonstration',
    county: 'Nakuru',
    venue: 'KALRO Naivasha Research Centre',
    date: '2025-04-12',
    time: '9:00 AM – 1:00 PM',
    topic: 'livestock',
    host: 'Dr. Margaret Otieno',
    spots: 40,
    booked: 27,
  },
  {
    id: 'fd-002',
    title: 'Climate-smart maize field day',
    county: 'Kakamega',
    venue: 'Bukura ATC demo plots',
    date: '2025-04-18',
    time: '8:30 AM – 2:00 PM',
    topic: 'crops',
    host: 'KALRO Kakamega',
    spots: 60,
    booked: 41,
  },
  {
    id: 'fd-003',
    title: 'Drip irrigation installation clinic',
    county: 'Machakos',
    venue: 'KALRO Katumani',
    date: '2025-04-24',
    time: '9:00 AM – 3:00 PM',
    topic: 'water',
    host: 'KALRO Katumani',
    spots: 30,
    booked: 22,
  },
  {
    id: 'fd-004',
    title: 'Beehive construction & colony transfer',
    county: 'Kitui',
    venue: 'Kitui Farmers Training Centre',
    date: '2025-05-02',
    time: '9:00 AM – 1:00 PM',
    topic: 'livestock',
    host: 'KALRO Kibwezi',
    spots: 25,
    booked: 18,
  },
];

/** Utility — next N upcoming events sorted by date */
export function upcomingFieldDays(limit = 3) {
  const today = new Date().toISOString().slice(0, 10);
  return fieldDays
    .filter((d) => d.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}