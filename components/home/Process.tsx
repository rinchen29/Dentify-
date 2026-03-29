'use client'

import { Calendar, MessageCircle, Smile, ArrowRight } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book Online',
    description:
      'Choose your service, pick a convenient date and time, and confirm your appointment in under 2 minutes.',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Consultation',
    description:
      'Meet with our dental expert for a thorough assessment. We discuss your goals, health history, and create a personalized plan.',
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    number: '03',
    icon: Smile,
    title: 'Treatment & Smile',
    description:
      'Receive precise, comfortable treatment using the latest technology. Walk out with a healthier, more radiant smile.',
    gradient: 'from-violet-400 to-violet-600',
  },
]

export default function Process() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#0f172a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-badge mb-4">
            Simple Process
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Getting the smile you deserve is easier than you think.
            Three simple steps to a healthier, brighter you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-px">
            <div className="w-full h-full border-t border-dashed border-slate-700" />
            {/* Arrow at 50% */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="relative text-center animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Number badge */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg opacity-40 rounded-full scale-125`}
                      />
                      {/* Icon circle */}
                      <div
                        className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0f172a] border border-white/10 flex items-center justify-center">
                        <span className="text-xs font-black text-slate-400">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
