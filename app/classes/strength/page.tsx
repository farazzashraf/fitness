import ClassPageTemplate, { ClassData } from '../ClassPageTemplate.tsx'

const strengthData: ClassData = {
  id: 'strength',
  name: 'Iron Strength',
  tagline: 'Progressive overload training designed to maximize muscle gain and raw strength. Built for those who are serious about results.',
  category: 'Weight Training',
  emoji: '💪',
  accentColor: '#C9FF00',
  duration: '75 min',
  level: 'Advanced',
  calories: '400–600',
  description: 'Iron Strength is APEX\'s most advanced program — a structured, progressive resistance training class built around the fundamental compound movements: squat, deadlift, bench, and overhead press. Each 12-week training block is periodized to systematically increase load and volume, ensuring continuous adaptation and muscle growth. Classes are small (max 10 members) to allow for individual coaching, form correction, and real progressive overload tracking. This is serious training for serious athletes.',
  benefits: [
    'Scientifically programmed progressive overload',
    'Expert coaching on the 4 major compound lifts',
    'Real muscle hypertrophy and strength gains',
    'Periodized 12-week training blocks',
    'Individual form coaching in small class sizes',
    'Improved bone density and metabolic rate',
  ],
  instructor: {
    name: 'Jake Monroe',
    bio: 'NSCA-certified strength and conditioning specialist with 11 years of coaching experience. Former powerlifting competitor with competition bests of 220kg squat, 180kg bench, and 260kg deadlift. Coached 3 national-level athletes.',
    initials: 'JM',
    classes: 1980,
    rating: 5.0,
  },
  schedule: [
    { day: 'Monday', time: '6:00 AM', spots: 4 },
    { day: 'Monday', time: '7:30 PM', spots: 2 },
    { day: 'Wednesday', time: '6:00 AM', spots: 6 },
    { day: 'Wednesday', time: '7:30 PM', spots: 0 },
    { day: 'Friday', time: '6:00 AM', spots: 3 },
    { day: 'Friday', time: '7:30 PM', spots: 5 },
    { day: 'Saturday', time: '7:00 AM', spots: 1 },
  ],
  videos: [
    { title: 'Squat Mechanics Deep Dive', duration: '22 min', locked: false },
    { title: 'Deadlift Form Masterclass', duration: '26 min', locked: false },
    { title: 'Full Iron Strength Session', duration: '75 min', locked: true },
    { title: 'Bench Press Progression', duration: '30 min', locked: true },
    { title: 'Overhead Press & Shoulders', duration: '35 min', locked: true },
    { title: 'Week 1 Block A — Full Session', duration: '70 min', locked: true },
    { title: 'Accessory Work Library', duration: '40 min', locked: true },
    { title: 'Deload Week Protocol', duration: '45 min', locked: true },
  ],
  reviews: [
    { name: 'Marcus Cole', initials: 'MC', rating: 5, plan: 'ELITE', body: 'Jake is the real deal. His programming is the most intelligent I\'ve followed in 10 years of lifting. My squat went from 120kg to 160kg in one 12-week block. Absolutely insane results.' },
    { name: 'Rahul Verma', initials: 'RV', rating: 5, plan: 'ELITE', body: 'I\'ve had personal trainers cost me ₹15,000/month who gave me worse programming than this. The small class size means Jake actually watches your form every rep. Worth every rupee of ELITE.' },
    { name: 'Karan Malhotra', initials: 'KM', rating: 5, plan: 'PRO', body: 'The video library alone transformed my lifting. Spent years doing squats wrong and hurting my knees. After watching Jake\'s squat masterclass and fixing my form, zero knee pain and massive PRs.' },
  ],
}

export default function StrengthPage() {
  return <ClassPageTemplate cls={strengthData} />
}