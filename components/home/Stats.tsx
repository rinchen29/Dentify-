'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Users, Calendar, Star, Stethoscope, TrendingUp, Award,
  Heart, Smile, Shield,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Users, Calendar, Star, Stethoscope, TrendingUp, Award, Heart, Smile, Shield,
}

interface StatItem {
  id: string
  label: string
  description: string
  value: number
  suffix: string
  decimal: boolean
  icon: string
  iconBg: string
  iconColor: string
  numColor: string
  sortOrder: number
  isActive: boolean
}

function useCountUp(target: number, duration: number, shouldStart: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    let startTime: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, shouldStart])

  return count
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(stat.value, 2000, visible)
  const Icon = ICON_MAP[stat.icon] ?? Stethoscope

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const displayValue = stat.decimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString('en-IN')

  return (
    <div
      ref={ref}
      className="card p-6 lg:p-8 text-center group cursor-default"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center mx-auto mb-5`}>
        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
      </div>

      <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
        <span className={`font-display text-4xl lg:text-5xl font-bold ${stat.numColor}`}>
          {displayValue}
        </span>
        <span className={`font-display text-xl font-bold ${stat.numColor} opacity-70`}>
          {stat.suffix}
        </span>
      </div>

      <p className="text-slate-800 font-semibold text-sm mb-1">{stat.label}</p>
      <p className="text-slate-400 text-xs">{stat.description}</p>
    </div>
  )
}

const FALLBACK: StatItem[] = [
  { id: '1', label: 'Patients Treated', description: 'Satisfied patients and counting', value: 8000, suffix: '+', decimal: false, icon: 'Users', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', numColor: 'text-blue-900', sortOrder: 1, isActive: true },
  { id: '2', label: 'Years Experience', description: 'Decades of dental excellence', value: 15, suffix: '+', decimal: false, icon: 'Calendar', iconBg: 'bg-teal-50', iconColor: 'text-teal-700', numColor: 'text-teal-700', sortOrder: 2, isActive: true },
  { id: '3', label: 'Patient Rating', description: 'Consistently top-rated clinic', value: 49, suffix: '/5', decimal: true, icon: 'Star', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', numColor: 'text-amber-600', sortOrder: 3, isActive: true },
  { id: '4', label: 'Dental Services', description: 'Comprehensive care solutions', value: 25, suffix: '+', decimal: false, icon: 'Stethoscope', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', numColor: 'text-blue-900', sortOrder: 4, isActive: true },
]

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>([])

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        const active = (d.stats ?? []).filter((s: StatItem) => s.isActive)
        setStats(active.length > 0 ? active : FALLBACK)
      })
      .catch(() => setStats(FALLBACK))
  }, [])

  const display = stats.length > 0 ? stats : FALLBACK

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {display.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
