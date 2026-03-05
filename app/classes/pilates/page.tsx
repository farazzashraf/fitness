import ClassPageTemplate, { ClassData } from '../ClassPageTemplate.tsx'

const pilatesData: ClassData = {
  id: 'pilates',
  name: 'Core Pilates',
  tagline: 'Precision movements that sculpt your core, correct your posture, and build the kind of lean, functional strength that lasts.',
  category: 'Strength & Posture',
  emoji: '⚡',
  accentColor: '#0891B2',
  duration: '50 min',
  level: 'Beginner',
  calories: '250–350',
  description: 'Core Pilates at APEX is built on the classical Joseph Pilates method, modernized for today\'s body. We focus on the powerhouse -your core, lower back, hips, and glutes -using slow, controlled movements that activate deep stabilizing muscles most exercise ignores. The result is a stronger foundation for everything else you do: better posture, reduced back pain, improved athletic performance, and a noticeably leaner silhouette. Perfect for beginners and ideal as a complement to any other training.',
  benefits: [
    'Deep core strength -not just abs, but full stabilizer system',
    'Corrected posture and reduced chronic back pain',
    'Longer, leaner muscle tone without bulk',
    'Improved balance, coordination and body control',
    'Injury prevention and rehabilitation support',
    'Perfect complement to any other fitness routine',
  ],
  instructor: {
    name: 'Sofia Reyes',
    bio: 'Classical Pilates instructor certified through Balanced Body. 8 years of teaching with specialization in posture correction and rehabilitation Pilates. Former professional dancer with deep understanding of body mechanics.',
    initials: 'SR',
    classes: 2190,
    rating: 4.9,
  },
  schedule: [
    { day: 'Monday', time: '9:00 AM', spots: 14 },
    { day: 'Tuesday', time: '10:00 AM', spots: 8 },
    { day: 'Wednesday', time: '9:00 AM', spots: 12 },
    { day: 'Thursday', time: '6:30 PM', spots: 5 },
    { day: 'Friday', time: '9:00 AM', spots: 10 },
    { day: 'Saturday', time: '11:00 AM', spots: 3 },
    { day: 'Sunday', time: '10:00 AM', spots: 11 },
  ],
  videos: [
    { title: 'Pilates for Absolute Beginners', duration: '20 min', locked: false },
    { title: 'The 5 Core Principles', duration: '18 min', locked: false },
    { title: '50-Min Full Core Class', duration: '50 min', locked: true },
    { title: 'Posture Correction Series', duration: '35 min', locked: true },
    { title: 'Lower Back Relief Flow', duration: '28 min', locked: true },
    { title: 'Glute Activation Special', duration: '32 min', locked: true },
    { title: 'Advanced Core Challenge', duration: '45 min', locked: true },
    { title: 'Pilates + Stretch Fusion', duration: '55 min', locked: true },
  ],
  reviews: [
    { name: 'Lakshmi Reddy', initials: 'LR', rating: 5, plan: 'ELITE', body: 'Sofia is the most technically precise instructor I\'ve ever had. I came in with a herniated disc and her modified sequences gave me relief when nothing else did. Absolute life changer.' },
    { name: 'Meera Iyer', initials: 'MI', rating: 5, plan: 'PRO', body: 'I was nervous about Pilates -thought it would be too easy. I was humbled in the first 10 minutes. The core burn is unlike anything else. My posture has completely transformed in 3 months.' },
    { name: 'Ananya Singh', initials: 'AS', rating: 5, plan: 'PRO', body: 'Best decision I ever made. I was doing heavy lifting for years but completely neglecting my core. Since adding Pilates twice a week my lifts have gone up and my back pain has disappeared.' },
  ],
}

export default function PilatesPage() {
  return <ClassPageTemplate cls={pilatesData} />
}