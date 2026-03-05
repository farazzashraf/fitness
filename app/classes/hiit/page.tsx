import ClassPageTemplate, { ClassData } from '../ClassPageTemplate.tsx'

const hiitData: ClassData = {
  id: 'hiit',
  name: 'HIIT Burn',
  tagline: 'Max-effort intervals that torch fat and skyrocket your metabolism for hours after class. This one is not for the faint-hearted.',
  category: 'Cardio & Endurance',
  emoji: '🔥',
  accentColor: '#EA580C',
  duration: '45 min',
  level: 'Intermediate',
  calories: '500–700',
  description: 'HIIT Burn is APEX\'s most popular -and most brutal -class. Using a science-backed work-to-rest ratio of 40:20, you\'ll push through explosive intervals of bodyweight movements, plyometrics, and functional cardio. The result? You torch calories during the workout and keep burning for up to 36 hours after due to the EPOC (excess post-exercise oxygen consumption) effect. No equipment needed. Just you, your heart rate, and a willingness to be uncomfortable.',
  benefits: [
    'Burns 500–700 calories per session',
    'Elevated metabolism for 24–36 hours post-workout',
    'Improved cardiovascular endurance and VO2 max',
    'Builds explosive power and athletic performance',
    'No equipment required -do it anywhere',
    'Efficient -maximum results in minimum time',
  ],
  instructor: {
    name: 'Marcus Cole',
    bio: 'Former D1 athlete and certified strength & conditioning coach. 7 years of HIIT coaching with clients ranging from beginners to professional athletes. Known for motivating classes that push every member to their limit.',
    initials: 'MC',
    classes: 3210,
    rating: 4.8,
  },
  schedule: [
    { day: 'Tuesday', time: '6:00 AM', spots: 6 },
    { day: 'Tuesday', time: '7:00 PM', spots: 2 },
    { day: 'Thursday', time: '6:00 AM', spots: 9 },
    { day: 'Thursday', time: '7:00 PM', spots: 11 },
    { day: 'Saturday', time: '8:00 AM', spots: 0 },
    { day: 'Saturday', time: '10:00 AM', spots: 4 },
    { day: 'Sunday', time: '9:00 AM', spots: 7 },
  ],
  videos: [
    { title: 'HIIT Foundations', duration: '15 min', locked: false },
    { title: 'Beginner Full Body Burn', duration: '30 min', locked: false },
    { title: '45-Min HIIT Blast', duration: '45 min', locked: true },
    { title: 'Lower Body Inferno', duration: '40 min', locked: true },
    { title: 'Upper Body Circuit', duration: '35 min', locked: true },
    { title: 'Tabata Protocol', duration: '25 min', locked: true },
    { title: 'Athletic Performance HIIT', duration: '50 min', locked: true },
    { title: 'Full Body HIIT Challenge', duration: '45 min', locked: true },
  ],
  reviews: [
    { name: 'David Kim', initials: 'DK', rating: 5, plan: 'PRO', body: 'Marcus is an absolute machine as an instructor. His energy is unmatched and he somehow makes you push harder than you thought possible. Lost 8kg in 3 months just from HIIT Burn alone.' },
    { name: 'Shreya Kapoor', initials: 'SK', rating: 5, plan: 'ELITE', body: 'I was scared to try HIIT but the foundations video eased me in perfectly. Now I do the live classes 3x a week and the transformation has been unreal. My resting heart rate dropped 12 BPM.' },
    { name: 'James Okafor', initials: 'JO', rating: 4, plan: 'PRO', body: 'Best HIIT content I\'ve found online. The 45-min full class is my weekly benchmark -I track how many rounds I can complete and the progress over months is incredibly motivating.' },
  ],
}

export default function HIITPage() {
  return <ClassPageTemplate cls={hiitData} />
}