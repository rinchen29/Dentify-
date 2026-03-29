'use client'

import { Check, Zap, Heart } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

const features = [
  'State-of-the-art Equipment',
  'Pain-Free Procedures',
  'Expert Dental Team',
  'Flexible Appointment Scheduling',
]

const cards = [
  {
    icon: Zap,
    title: 'Advanced Technology',
    description:
      'We invest in the latest dental technology — from 3D imaging to laser treatments — to deliver faster, more precise, and more comfortable care.',
    gradient: 'from-cyan-400 to-cyan-600',
    glow: 'cyan',
  },
  {
    icon: Heart,
    title: 'Patient-First Approach',
    description:
      'Every decision we make centers on your comfort, health, and confidence. We listen, we explain, and we treat you like family.',
    gradient: 'from-violet-400 to-violet-600',
    glow: 'violet',
  },
]

export default function WhyUs() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="animate-on-scroll">
            <div className="section-badge mb-4">
              Why Us
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Why Choose{' '}
              <span className="gradient-text">Dentify</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              We combine clinical excellence with a warm, welcoming environment.
              When you choose Dentify, you&apos;re choosing a team that genuinely
              cares about every aspect of your oral health journey.
            </p>

            {/* Feature List */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center shrink-0 shadow-glow-cyan-sm">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-200 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="relative animate-on-scroll" style={{ animationDelay: '200ms' }}>
            {/* Blurred orb behind cards */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-3xl rounded-full" />
            </div>

            <div className="relative space-y-4">
              {cards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="glass rounded-2xl p-6 border border-white/5 group hover:-translate-y-1 transition-transform duration-300"
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white mb-1.5">
                          {card.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover glow border */}
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        card.glow === 'cyan'
                          ? 'shadow-[inset_0_0_0_1px_rgba(6,182,212,0.2)]'
                          : 'shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]'
                      }`}
                    />
                  </div>
                )
              })}

              {/* Decorative badge */}
              <div className="absolute -right-4 -bottom-4 glass rounded-2xl px-4 py-3 border border-white/10 shadow-xl hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs font-semibold">Accepting New Patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
