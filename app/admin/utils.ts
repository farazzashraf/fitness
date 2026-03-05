export const planColor = (p: string) => p === 'ELITE' ? '#A78BFA' : p === 'PRO' ? '#C9FF00' : '#444'
export const statusColor = (s: string) => s === 'active' ? '#C9FF00' : s === 'at-risk' ? '#F59E0B' : '#EF4444'
export const statusBg = (s: string) => s === 'active' ? 'rgba(201,255,0,0.08)' : s === 'at-risk' ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)'
export const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

import { useState, useEffect } from 'react'

export function useIsMobile(bp = 768) {
    const [mobile, setMobile] = useState(false)
    useEffect(() => {
        const check = () => setMobile(window.innerWidth < bp)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [bp])
    return mobile
}
