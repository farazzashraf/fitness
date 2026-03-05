import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setBp(w < 768 ? 'mobile' : w < 1100 ? 'tablet' : 'desktop')
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return bp
}