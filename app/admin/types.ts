export type Tab = 'overview' | 'customers' | 'subscriptions' | 'analytics' | 'churn' | 'ai-assistant'

export interface Customer {
    id: string
    name: string
    email: string
    plan: 'PRO' | 'ELITE'
    joined: string
    lastActive: string
    status: 'active' | 'churned' | 'at-risk'
    classes: number
    spend: number
    initials: string
}
