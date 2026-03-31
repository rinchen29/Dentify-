'use client'

import Link from 'next/link'
import { ChevronRight, ShieldCheck, Award, Star } from 'lucide-react'
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">

      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.045]" style={{
          backgroundImage: 'radial-gradient(circle, #1e3a8a 1.2px, transparent 1.2px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-blue-50/60 to-transparent" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full -translate-x-1/3 translate-y-1/3"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 65%)' }}
        />
      </div>

      {/* Main layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center w-full">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col items-start gap-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-teal-50 border border-teal-200/60 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
              <span className="text-teal-700 text-[11px] font-bold tracking-[0.14em] uppercase">
                Trusted by 8,000+ Patients
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-slate-900 leading-[1.05] tracking-tight">
              <span className="block text-[3rem] sm:text-[4.2rem] lg:text-[3.9rem] xl:text-[4.8rem]">Your Smile</span>
              <span className="block text-[3rem] sm:text-[4.2rem] lg:text-[3.9rem] xl:text-[4.8rem]">Deserves</span>
              <span className="block text-[3rem] sm:text-[4.2rem] lg:text-[3.9rem] xl:text-[4.8rem] text-teal-600">The Best.</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed max-w-[430px]">
              World-class dental care powered by cutting-edge technology
              and a compassionate team dedicated to your healthiest,
              most confident smile.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/book" className="btn-primary group">
                Book Appointment
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/services" className="btn-outline">
                Explore Services
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {[
                { icon: ShieldCheck, label: 'ISO Certified' },
                { icon: Award,       label: '15+ Years' },
                { icon: Star,        label: '5-Star Rated' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                  <Icon className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Simple dental visual ── */}
          <div className="hidden lg:flex flex-col items-center gap-10">

            {/* Tooth circle */}
            <div
              className="w-[380px] h-[380px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 50%, #0f766e 100%)',
                boxShadow: '0 24px 64px rgba(30,58,138,0.25)',
              }}
            >
              {/* Outer soft ring */}
              <div className="w-[340px] h-[340px] rounded-full border border-white/10 flex items-center justify-center">
                {/* Tooth SVG */}
                <svg viewBox="0 0 160 180" className="w-40 h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Crown */}
                  <path
                    d="M20 60 C20 28 44 8 80 8 C116 8 140 28 140 60 C140 82 132 96 124 108 C118 118 116 132 112 152 C110 162 104 172 96 172 C88 172 84 162 80 148 C76 162 72 172 64 172 C56 172 50 162 48 152 C44 132 42 118 36 108 C28 96 20 82 20 60 Z"
                    fill="white"
                    opacity="0.95"
                  />
                  {/* Highlight on left side */}
                  <path
                    d="M34 48 C34 32 46 18 62 14"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Centre groove */}
                  <line x1="80" y1="12" x2="80" y2="100" stroke="rgba(30,58,138,0.08)" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Stats row — no absolute positioning, no overflow */}
            <div className="flex items-center gap-0 bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              {[
                { value: '8,000+', label: 'Patients' },
                { value: '4.9★',   label: 'Rating'   },
                { value: '15+',    label: 'Years Exp' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="px-7 py-4 text-center">
                    <p className="font-display text-xl font-bold text-blue-900 leading-none">{stat.value}</p>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px h-10 bg-slate-100" />}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
