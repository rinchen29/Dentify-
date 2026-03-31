'use client'

import { Check, Zap, Heart, Clock, Microscope } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

const features = [
  'State-of-the-art Equipment & Technology',
  'Pain-Free Procedures & Gentle Care',
  'Expert & Experienced Dental Team',
  'Flexible Scheduling & Same-Day Appointments',
]

const cards = [
  {
    icon: Zap,
    title: 'Advanced Technology',
    description:
      'We invest in the latest dental technology — from 3D imaging to laser treatments — for faster, more precise, and more comfortable care.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    border: 'hover:border-blue-200',
  },
  {
    icon: Heart,
    title: 'Patient-First Approach',
    description:
      'Every decision we make centers on your comfort, health, and confidence. We listen, explain, and treat every patient like family.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    border: 'hover:border-rose-200',
  },
  {
    icon: Microscope,
    title: 'Evidence-Based Dentistry',
    description:
      'All our treatments follow the latest clinical guidelines and research. You receive proven, effective care grounded in science.',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    border: 'hover:border-teal-200',
  },
]

export default function WhyUs() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-surface-teal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <div className="animate-on-scroll">
            <div className="section-badge-teal mb-4">Why Choose Us</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight">
              Why Patients Choose{' '}
              <span className="text-teal-600">Dentify</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              We combine clinical excellence with a warm, welcoming environment.
              When you choose Dentify, you&apos;re choosing a team that genuinely
              cares about every step of your oral health journey.
            </p>

            {/* Feature list */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 animate-on-scroll"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-teal-700" strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Operating hours pill */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Open Mon – Sat</p>
                <p className="text-xs text-slate-500">8:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right — cards */}
          <div
            className="relative animate-on-scroll space-y-4"
            style={{ animationDelay: '150ms' }}
          >
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className={`card bg-white p-5 flex items-start gap-4 ${card.border}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Badge */}
            <div className="hidden lg:flex absolute -bottom-4 -right-4 bg-blue-900 text-white rounded-2xl px-4 py-3 shadow-lg items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-semibold">Accepting New Patients</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
