export type Tab = 'overview' | 'videos' | 'live' | 'progress' | 'nutrition' | 'community' | 'ai' | 'pt'

export interface UserData {
  name: string
  email?: string
  plan: 'PRO' | 'ELITE' | 'ADMIN'
  initials: string
  streak: number
  classesThisMonth: number
  totalClasses: number
  caloriesBurned: number
  joinedDays: number
  attendance: { day: string; attended: boolean | null }[]
}