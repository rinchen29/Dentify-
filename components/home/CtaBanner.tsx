'use client'

import Link from 'next/link'
import { ArrowRight, Phone, CalendarCheck } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'
import { useSiteConfig } from '@/lib/SiteConfigContext'

export default function CtaBanner() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 })
  const config = useSiteConfig()

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-white/8" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.04]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">

        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-7">
          <CalendarCheck className="w-3.5 h-3.5 text-teal-300" />
          <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
            Free Consultation Available
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight">
          Ready for Your{' '}
          <span className="text-teal-300">Perfect Smile</span>?
        </h2>

        {/* Subtext */}
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Book your consultation today and take the first step towards a healthier,
          more beautiful smile. Our expert team is ready to welcome you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/book" className="btn-white group">
            Book Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="btn-white-outline group">
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Call Us: {config.phone}
          </a>
        </div>

        {/* Trust note */}
        <p className="text-white/40 text-xs">
          No commitment required &middot; Same-day appointments available &middot; Insurance accepted
        </p>
      </div>
    </section>
  )
}
