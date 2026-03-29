'use client'

import { Star } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

interface Testimonial {
  name: string
  initials: string
  role: string
  text: string
  rating: number
  avatarGradient: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    role: 'Verified Patient',
    text: 'Absolutely transformed my confidence. The team is incredibly professional and gentle. Best dental experience I&apos;ve ever had! The whitening results were stunning.',
    rating: 5,
    avatarGradient: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'James R.',
    initials: 'JR',
    role: 'Verified Patient',
    text: 'The teeth whitening results exceeded my expectations. Clean, modern clinic with the latest technology. The staff made the whole process completely painless.',
    rating: 5,
    avatarGradient: 'from-violet-400 to-violet-600',
  },
  {
    name: 'Emily K.',
    initials: 'EK',
    role: 'Verified Patient',
    text: 'I was terrified of dentists until I came here. The staff made me feel so comfortable. My implants look completely natural and the difference in my life is remarkable.',
    rating: 5,
    avatarGradient: 'from-cyan-500 to-violet-500',
  },
]

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  return (
    <div
      className="group relative glass rounded-2xl p-6 border border-white/5 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Hover background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />

      {/* Opening Quote */}
      <div className="relative mb-4">
        <span className="font-display text-6xl font-black leading-none gradient-text opacity-60 select-none">
          &ldquo;
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-white/80 text-sm leading-relaxed mb-6">
        {testimonial.text}
      </p>

      {/* Patient Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center shrink-0 shadow-lg`}
        >
          <span className="text-white text-xs font-bold">{testimonial.initials}</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-slate-400 text-xs">{testimonial.role}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <div className="section-badge mb-4">
            Patient Stories
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our{' '}
            <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Hear directly from the thousands of
            patients who&apos;ve transformed their smiles with Dentify.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust Summary */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 animate-on-scroll">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {['from-cyan-400 to-cyan-600', 'from-violet-400 to-violet-600', 'from-cyan-500 to-violet-500'].map(
                (gradient, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} border-2 border-[#030712] flex items-center justify-center`}
                  >
                    <span className="text-white text-[9px] font-bold">+</span>
                  </div>
                )
              )}
            </div>
            <span className="text-slate-400 text-sm">5,000+ happy patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-400 text-sm">4.9/5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
