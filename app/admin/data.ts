import { Customer } from './types'

export const revenueData = [
    { month: 'Jul', revenue: 284000, members: 9800 },
    { month: 'Aug', revenue: 312000, members: 10200 },
    { month: 'Sep', revenue: 298000, members: 10600 },
    { month: 'Oct', revenue: 341000, members: 11100 },
    { month: 'Nov', revenue: 389000, members: 11700 },
    { month: 'Dec', revenue: 421000, members: 12100 },
    { month: 'Jan', revenue: 398000, members: 12000 },
    { month: 'Feb', revenue: 445000, members: 12200 },
    { month: 'Mar', revenue: 478000, members: 12400 },
]

export const churnData = [
    { month: 'Jul', churn: 4.2, retention: 95.8 },
    { month: 'Aug', churn: 3.8, retention: 96.2 },
    { month: 'Sep', churn: 4.5, retention: 95.5 },
    { month: 'Oct', churn: 3.2, retention: 96.8 },
    { month: 'Nov', churn: 2.9, retention: 97.1 },
    { month: 'Dec', churn: 2.4, retention: 97.6 },
    { month: 'Jan', churn: 3.1, retention: 96.9 },
    { month: 'Feb', churn: 2.7, retention: 97.3 },
    { month: 'Mar', churn: 2.2, retention: 97.8 },
]

export const classAttendance = [
    { name: 'Power Yoga', sessions: 3840, color: '#7C3AED' },
    { name: 'HIIT Burn', sessions: 4210, color: '#EA580C' },
    { name: 'Core Pilates', sessions: 2980, color: '#0891B2' },
    { name: 'Iron Strength', sessions: 3120, color: '#C9FF00' },
]

export const planDistribution = [
    { name: 'PRO', value: 8200, color: '#C9FF00' },
    { name: 'ELITE', value: 4200, color: '#A78BFA' },
]

export const trafficData = [
    { day: 'Mon', visits: 1240, signups: 48 },
    { day: 'Tue', visits: 1580, signups: 62 },
    { day: 'Wed', visits: 1320, signups: 51 },
    { day: 'Thu', visits: 1890, signups: 74 },
    { day: 'Fri', visits: 2100, signups: 89 },
    { day: 'Sat', visits: 2640, signups: 112 },
    { day: 'Sun', visits: 2280, signups: 96 },
]

export const customers: Customer[] = [
    { id: 'C001', name: 'Aisha Patel', email: 'aisha@gmail.com', plan: 'ELITE', joined: '12 Aug 2024', lastActive: '2h ago', status: 'active', classes: 84, spend: 39992, initials: 'AP' },
    { id: 'C002', name: 'David Kim', email: 'david.k@outlook.com', plan: 'PRO', joined: '3 Mar 2024', lastActive: '1d ago', status: 'active', classes: 121, spend: 29988, initials: 'DK' },
    { id: 'C003', name: 'Lakshmi Reddy', email: 'lakshmi.r@gmail.com', plan: 'ELITE', joined: '19 Oct 2024', lastActive: '5h ago', status: 'active', classes: 56, spend: 24995, initials: 'LR' },
    { id: 'C004', name: 'Rohan Mehta', email: 'rohan.m@gmail.com', plan: 'PRO', joined: '7 Jan 2025', lastActive: '3d ago', status: 'at-risk', classes: 12, spend: 4998, initials: 'RM' },
    { id: 'C006', name: 'Marcus Cole', email: 'marcus.c@gmail.com', plan: 'ELITE', joined: '1 Jun 2024', lastActive: 'Just now', status: 'active', classes: 198, spend: 44991, initials: 'MC' },
    { id: 'C007', name: 'Priya Nair', email: 'priya.n@gmail.com', plan: 'PRO', joined: '15 Nov 2024', lastActive: '6h ago', status: 'active', classes: 44, spend: 9996, initials: 'PN' },
    { id: 'C009', name: 'Sofia Reyes', email: 'sofia.r@gmail.com', plan: 'ELITE', joined: '28 Sep 2024', lastActive: '1h ago', status: 'active', classes: 77, spend: 29995, initials: 'SR' },
    { id: 'C010', name: 'Jake Monroe', email: 'jake.m@gmail.com', plan: 'PRO', joined: '4 Feb 2025', lastActive: '2d ago', status: 'active', classes: 28, spend: 4998, initials: 'JM' },
]

export const atRiskReasons = [
    { customer: 'Rohan Mehta', reason: 'Login frequency dropped 80%', days: 3, plan: 'PRO' },
]
