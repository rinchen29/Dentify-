'use client'

import Link from 'next/link'
import { ChevronRight, ShieldCheck, Award, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712]">
      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-blob"
          style={{ animationDuration: '7s' }}
        />
        <div
          className="absolute top-[-5%] right-[-5%] w-80 h-80 bg-violet-500/20 rounded-full blur-[120px] animate-blob"
          style={{ animationDuration: '7s', animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-cyan-600/10 rounded-full blur-[100px] animate-blob"
          style={{ animationDuration: '7s', animationDelay: '4s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in fill-mode-both">
              <span className="text-cyan-400 text-xs">✦</span>
              <span className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                Trusted by 5,000+ Patients
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-up fill-mode-both"
              style={{ animationDelay: '100ms' }}
            >
              <span className="text-white">Elevate Your</span>
              <br />
              <span className="text-white">Smile to </span>
              <span className="gradient-text">Perfection</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-up fill-mode-both"
              style={{ animationDelay: '200ms' }}
            >
              Experience world-class dental care with cutting-edge technology
              and a team of expert professionals dedicated to your brightest smile.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-up fill-mode-both"
              style={{ animationDelay: '300ms' }}
            >
              <Link href="/book" className="btn-primary text-base group">
                Book Appointment
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/services" className="btn-ghost text-base">
                Explore Services
              </Link>
            </div>

            {/* Trust Row */}
            <div
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6 justify-center lg:justify-start animate-fade-up fill-mode-both"
              style={{ animationDelay: '400ms' }}
            >
              {[
                { icon: ShieldCheck, label: 'ISO Certified' },
                { icon: Award, label: '15+ Years' },
                { icon: Star, label: '5-Star Rated' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Decorative Visual */}
          <div
            className="relative flex items-center justify-center animate-fade-in fill-mode-both"
            style={{ animationDelay: '300ms' }}
          >
            {/* Main Glass Card */}
            <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
              {/* Radial glow behind card */}
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-violet-500/10 to-transparent blur-2xl rounded-full scale-150" />

              <div className="relative glass rounded-3xl p-8 shadow-2xl border border-white/10">
                {/* Tooth SVG Illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-400/20 blur-xl rounded-full" />
                    <svg
                      viewBox="0 0 120 140"
                      className="relative w-32 h-40 drop-shadow-lg"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="toothBody" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e0f7fa" />
                          <stop offset="100%" stopColor="#b2ebf2" />
                        </linearGradient>
                      </defs>
                      {/* Tooth crown */}
                      <path
                        d="M20 45 C15 20 10 5 30 5 C40 5 50 15 60 15 C70 15 80 5 90 5 C110 5 105 20 100 45 C97 60 93 80 88 100 C85 115 82 135 75 135 C68 135 65 118 60 118 C55 118 52 135 45 135 C38 135 35 115 32 100 C27 80 23 60 20 45 Z"
                        fill="url(#toothBody)"
                        stroke="url(#toothGrad)"
                        strokeWidth="2"
                      />
                      {/* Highlight */}
                      <path
                        d="M35 15 C40 10 50 8 55 12 C50 20 40 25 35 20 Z"
                        fill="white"
                        opacity="0.6"
                      />
                      {/* Root lines */}
                      <line x1="52" y1="118" x2="50" y2="128" stroke="url(#toothGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                      <line x1="68" y1="118" x2="70" y2="128" stroke="url(#toothGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    </svg>
                  </div>
                </div>

                {/* Clinic info */}
                <div className="text-center">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Premium Dental Care
                  </h3>
                  <p className="text-slate-400 text-sm">Advanced treatments, gentle touch</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                    <span className="text-slate-300 text-sm ml-1 font-semibold">4.9</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card: Appointment */}
              <div
                className="absolute -left-4 top-1/4 glass rounded-2xl p-3 shadow-xl border border-white/10 animate-float"
                style={{ animationDuration: '3s' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Next Available</p>
                    <p className="text-cyan-400 text-xs">Today, 2:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card: Rating */}
              <div
                className="absolute -right-4 bottom-1/4 glass rounded-2xl p-3 shadow-xl border border-white/10 animate-float"
                style={{ animationDuration: '3s', animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">5,000+ Reviews</p>
                    <p className="text-violet-400 text-xs">★ 4.9/5 Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
