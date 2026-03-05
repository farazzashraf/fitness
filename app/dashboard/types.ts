export type Tab = 'overview' | 'videos' | 'live' | 'progress' | 'nutrition' | 'community' | 'ai'

export interface UserData {
  name: string
  email?: string
  plan: 'FREE' | 'PRO' | 'ELITE' | 'ADMIN'
  initials: string
  streak: number
  classesThisMonth: number
  totalClasses: number
  caloriesBurned: number
  joinedDays: number
}