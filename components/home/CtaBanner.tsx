'use client'

import Link from 'next/link'
import { ChevronRight, Phone } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'
import type { CSSProperties } from 'react'

interface DecorativeDot {
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  delay: string
}

const decorativeDots: DecorativeDot[] = [
  { top: '15%', left: '8%', size: 6, color: 'bg-cyan-400/40', delay: '0s' },
  { top: '25%', right: '12%', size: 4, color: 'bg-violet-400/40', delay: '0.5s' },
  { bottom: '20%', left: '15%', size: 5, color: 'bg-cyan-500/30', delay: '1s' },
  { bottom: '30%', right: '8%', size: 3, color: 'bg-violet-500/30', delay: '1.5s' },
  { top: '50%', left: '5%', size: 4, color: 'bg-cyan-400/20', delay: '2s' },
  { top: '60%', right: '5%', size: 6, color: 'bg-violet-400/20', delay: '2.5s' },
]

export default function CtaBanner() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-[#0f172a]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradients */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />

        {/* Animated blobs */}
        <div
          className="absolute top-[-20%] left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] animate-blob"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-20%] right-[10%] w-72 h-72 bg-violet-500/10 rounded-full blur-[80px] animate-blob"
          style={{ animationDuration: '8s', animationDelay: '3s' }}
        />

        {/* Floating decorative dots */}
        {decorativeDots.map((dot, i) => {
          const style: CSSProperties = {
            top: dot.top,
            bottom: dot.bottom,
            left: dot.left,
            right: dot.right,
            width: dot.size * 4,
            height: dot.size * 4,
            animationDelay: dot.delay,
          }
          return (
            <div
              key={i}
              className={`absolute rounded-full ${dot.color} animate-float`}
              style={style}
            />
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-10 lg:p-14 border border-white/10 shadow-2xl animate-on-scroll">
          {/* Badge */}
          <div className="section-badge mb-6 mx-auto">
            Get Started Today
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight">
            Ready for Your{' '}
            <span className="gradient-text">Dream Smile</span>?
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book your consultation today and take the first step towards a
            healthier, more beautiful smile. Our team is ready to welcome you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-base group">
              Book Appointment
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="tel:+12125550100" className="btn-ghost text-base group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Call Us Now
            </a>
          </div>

          {/* Trust note */}
          <p className="text-slate-600 text-xs mt-6">
            No commitment required. Free initial consultation available.
          </p>
        </div>
      </div>
    </section>
  )
}
