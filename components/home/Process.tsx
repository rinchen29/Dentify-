'use client'

import Link from 'next/link'
import { Calendar, MessageCircle, Smile, ArrowRight } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book Online',
    description:
      'Choose your service, pick a convenient date and time, and confirm your appointment in under 2 minutes.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    numColor: 'text-blue-200',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Consultation',
    description:
      'Meet with our dental expert for a thorough assessment. We discuss your goals, health history, and create a personalized plan.',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    numColor: 'text-teal-100',
  },
  {
    number: '03',
    icon: Smile,
    title: 'Treatment & Smile',
    description:
      'Receive precise, comfortable treatment using the latest technology. Walk out with a healthier, more radiant smile.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    numColor: 'text-blue-200',
  },
]

export default function Process() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-badge mb-4">Simple Process</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How It{' '}
            <span className="text-blue-900">Works</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Getting the smile you deserve is easier than you think.
            Three simple steps to a healthier, brighter you.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative text-center animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Giant faded number */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 font-display text-8xl font-black ${step.numColor} select-none pointer-events-none leading-none`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 flex justify-center mb-5">
                  <div className={`w-16 h-16 rounded-2xl ${step.iconBg} border-2 border-white shadow-md flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${step.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 animate-on-scroll">
          <Link href="/book" className="btn-primary group">
            Book Your Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
