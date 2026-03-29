'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Calendar, Star, Stethoscope } from 'lucide-react'

interface StatItem {
  icon: React.ComponentType<{ className?: string }>
  value: number
  suffix: string
  decimal?: boolean
  label: string
  description: string
  color: 'cyan' | 'violet'
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Patients Treated',
    description: 'Satisfied patients and counting',
    color: 'cyan',
  },
  {
    icon: Calendar,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Decades of dental excellence',
    color: 'violet',
  },
  {
    icon: Star,
    value: 49,
    suffix: '/5',
    decimal: true,
    label: 'Patient Rating',
    description: 'Consistently top-rated clinic',
    color: 'cyan',
  },
  {
    icon: Stethoscope,
    value: 25,
    suffix: '+',
    label: 'Dental Services',
    description: 'Comprehensive care solutions',
    color: 'violet',
  },
]

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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const displayValue = stat.decimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString()

  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className="group relative glass rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default"
      style={{
        animationDelay: `${index * 150}ms`,
        boxShadow: visible
          ? stat.color === 'cyan'
            ? '0 0 0 1px rgba(6,182,212,0.1)'
            : '0 0 0 1px rgba(139,92,246,0.1)'
          : undefined,
      }}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          stat.color === 'cyan'
            ? 'bg-gradient-to-br from-cyan-500/5 to-transparent'
            : 'bg-gradient-to-br from-violet-500/5 to-transparent'
        }`}
      />

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
          stat.color === 'cyan'
            ? 'bg-cyan-500/10 border border-cyan-500/20'
            : 'bg-violet-500/10 border border-violet-500/20'
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            stat.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
          }`}
        />
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-0.5 mb-1">
        <span
          className={`font-display text-4xl lg:text-5xl font-black ${
            stat.color === 'cyan' ? 'gradient-text' : 'gradient-text-reverse'
          }`}
        >
          {displayValue}
        </span>
        <span
          className={`font-display text-2xl font-bold ${
            stat.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
          }`}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
      <p className="text-slate-500 text-xs">{stat.description}</p>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px ${
          stat.color === 'cyan'
            ? 'bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-violet-500/40 to-transparent'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
