import ClassPageTemplate, { ClassData } from '../ClassPageTemplate.tsx'

const yogaData: ClassData = {
  id: 'yoga',
  name: 'Power Yoga',
  tagline: 'Deep stretches, breathwork, and mindfulness that rebuild your body from the inside out. Find your edge — and push past it.',
  category: 'Flexibility & Mind',
  emoji: '🧘',
  accentColor: '#7C3AED',
  duration: '60 min',
  level: 'All Levels',
  calories: '300–400',
  description: 'Power Yoga at APEX is unlike any yoga you\'ve done before. We combine the discipline of Ashtanga with the intensity of power training to build a practice that strengthens your mind as much as your body. Each session flows through carefully sequenced poses that build heat, increase flexibility, and develop real functional strength. Whether you\'re brand new to yoga or a seasoned practitioner, our instructors adapt every class to meet you exactly where you are.',
  benefits: [
    'Dramatically improved flexibility and range of motion',
    'Stronger core, back, and stabilizer muscles',
    'Reduced stress, anxiety, and mental fatigue',
    'Better posture and injury prevention',
    'Increased body awareness and breath control',
    'Deeper sleep and faster recovery from workouts',
  ],
  instructor: {
    name: 'Priya Sharma',
    bio: '500-hr certified yoga instructor with 9 years of teaching experience. Trained in Mysore, India under master Ashtanga teachers. Specializes in power flows and therapeutic yoga.',
    initials: 'PS',
    classes: 2840,
    rating: 4.9,
  },
  schedule: [
    { day: 'Monday', time: '7:00 AM', spots: 12 },
    { day: 'Monday', time: '6:30 PM', spots: 3 },
    { day: 'Wednesday', time: '7:00 AM', spots: 8 },
    { day: 'Wednesday', time: '7:00 PM', spots: 14 },
    { day: 'Friday', time: '7:00 AM', spots: 5 },
    { day: 'Saturday', time: '9:00 AM', spots: 0 },
    { day: 'Sunday', time: '8:00 AM', spots: 10 },
  ],
  videos: [
    { title: 'Intro to Power Flow', duration: '12 min', locked: false },
    { title: 'Sun Salutation Mastery', duration: '28 min', locked: false },
    { title: 'Core-Focused Vinyasa', duration: '45 min', locked: true },
    { title: 'Hip Opener Deep Dive', duration: '38 min', locked: true },
    { title: 'Inversion Workshop', duration: '52 min', locked: true },
    { title: 'Morning Flow — 20 min', duration: '20 min', locked: true },
    { title: 'Evening Wind Down', duration: '30 min', locked: true },
    { title: 'Full Power Yoga Class', duration: '60 min', locked: true },
  ],
  reviews: [
    { name: 'Kavya Menon', initials: 'KM', rating: 5, plan: 'ELITE', body: 'Priya is absolutely phenomenal. I came in with chronic back pain and after 2 months of consistent classes, it\'s almost completely gone. This is not just yoga — it\'s therapy.' },
    { name: 'Aisha Patel', initials: 'AP', rating: 5, plan: 'ELITE', body: 'I\'ve tried yoga at 4 different studios and nothing compares to this. The sequencing is intelligent, the cues are precise, and the energy in live classes is electric.' },
    { name: 'Rohit Basu', initials: 'RB', rating: 5, plan: 'PRO', body: 'Started as a complete beginner and within 6 weeks I was doing poses I thought were impossible. The video library is extensive and Priya explains every pose beautifully.' },
  ],
}

export default function YogaPage() {
  return <ClassPageTemplate cls={yogaData} />
}