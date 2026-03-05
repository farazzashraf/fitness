import { UserData } from './types'

export const defaultMemberData: Omit<UserData, 'plan'> & { plan: 'FREE' } = {
  name: 'Guest', plan: 'FREE', initials: 'G',
  streak: 0, classesThisMonth: 0, totalClasses: 0,
  caloriesBurned: 0, joinedDays: 0,
}

export const videos = [
  { id: 1, title: '45-Min HIIT Blast', instructor: 'Marcus Cole', duration: '45 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', watched: true, isFreeIntro: true },
  { id: 2, title: 'Power Yoga Flow', instructor: 'Priya Sharma', duration: '60 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', watched: true, isFreeIntro: true },
  { id: 3, title: 'Core Pilates 50', instructor: 'Sofia Reyes', duration: '50 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', watched: false, isFreeIntro: true },
  { id: 4, title: 'Squat Masterclass', instructor: 'Jake Monroe', duration: '22 min', category: 'Strength', emoji: '💪', color: '#C9FF00', watched: false, isFreeIntro: false },
  { id: 5, title: 'Full Iron Strength', instructor: 'Jake Monroe', duration: '75 min', category: 'Strength', emoji: '💪', color: '#C9FF00', watched: false, isFreeIntro: false },
  { id: 6, title: 'Hip Opener Deep Dive', instructor: 'Priya Sharma', duration: '38 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', watched: false, isFreeIntro: false },
  { id: 7, title: 'Tabata Protocol', instructor: 'Marcus Cole', duration: '25 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', watched: false, isFreeIntro: false },
  { id: 8, title: 'Advanced Core Challenge', instructor: 'Sofia Reyes', duration: '45 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', watched: false, isFreeIntro: false },
  { id: 9, title: 'Replay: Saturday Bootcamp', instructor: 'Team APEX', duration: '90 min', category: 'Replays', emoji: '📼', color: '#ef4444', watched: false, isFreeIntro: false },
]

export const liveClasses = [
  { title: 'HIIT Burn', instructor: 'Marcus Cole', time: 'Today, 7:00 PM', timeLeft: '2h 30m', spots: 4, emoji: '🔥', color: '#EA580C' },
  { title: 'Power Yoga', instructor: 'Priya Sharma', time: 'Today, 8:30 PM', timeLeft: '4h', spots: 8, emoji: '🧘', color: '#7C3AED' },
  { title: 'Morning HIIT', instructor: 'Marcus Cole', time: 'Tomorrow, 6:00 AM', timeLeft: '12h', spots: 6, emoji: '🔥', color: '#EA580C' },
]

export const progressData = [
  { week: 'W1', classes: 2 }, { week: 'W2', classes: 3 },
  { week: 'W3', classes: 1 }, { week: 'W4', classes: 4 },
  { week: 'W5', classes: 3 }, { week: 'W6', classes: 5 },
  { week: 'W7', classes: 4 }, { week: 'W8', classes: 8 },
]

export const recentActivity = [
  { action: 'Completed HIIT Burn', time: '2 hours ago', emoji: '🔥' },
  { action: 'Watched Squat Masterclass', time: 'Yesterday', emoji: '💪' },
  { action: 'Completed Power Yoga', time: '2 days ago', emoji: '🧘' },
  { action: 'Booked Iron Strength – Wed 7:30PM', time: '3 days ago', emoji: '📅' },
  { action: 'Completed Core Pilates', time: '4 days ago', emoji: '⚡' },
]