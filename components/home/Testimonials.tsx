'use client'

import { Star, Quote } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

interface Testimonial {
  name: string
  initials: string
  role: string
  text: string
  rating: number
  avatarBg: string
  avatarText: string
  treatment: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    role: 'Verified Patient',
    text: 'Absolutely transformed my confidence. The team is incredibly professional and gentle. Best dental experience I\'ve ever had! The whitening results were stunning.',
    rating: 5,
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-800',
    treatment: 'Teeth Whitening',
  },
  {
    name: 'James R.',
    initials: 'JR',
    role: 'Verified Patient',
    text: 'The dental implant procedure exceeded every expectation. Clean, modern clinic with the latest technology. The staff made the whole process completely painless.',
    rating: 5,
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-800',
    treatment: 'Dental Implants',
  },
  {
    name: 'Emily K.',
    initials: 'EK',
    role: 'Verified Patient',
    text: 'I was terrified of dentists until I came here. The staff made me feel so comfortable. My implants look completely natural — the difference in my life is remarkable.',
    rating: 5,
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-800',
    treatment: 'Orthodontics',
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div
      className="card p-6 group"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-7 h-7 text-blue-200 fill-blue-100" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Treatment tag */}
      <span className="inline-block text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-0.5 mb-3">
        {testimonial.treatment}
      </span>

      {/* Review text */}
      <p className="text-slate-600 text-sm leading-relaxed mb-5">
        {testimonial.text}
      </p>

      {/* Patient info */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className={`w-10 h-10 rounded-full ${testimonial.avatarBg} flex items-center justify-center shrink-0`}>
          <span className={`text-xs font-bold ${testimonial.avatarText}`}>{testimonial.initials}</span>
        </div>
        <div>
          <p className="text-slate-900 font-semibold text-sm">{testimonial.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-slate-400 text-xs">{testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <div className="section-badge mb-4">Patient Stories</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            What Our{' '}
            <span className="text-blue-900">Patients Say</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Hear directly from the thousands of
            patients who&apos;ve transformed their smiles with Dentify.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Summary row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 animate-on-scroll">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-blue-100 text-blue-800', 'bg-teal-100 text-teal-800', 'bg-violet-100 text-violet-800'].map(
                (cls, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${cls} border-2 border-white flex items-center justify-center`}
                  >
                    <span className="text-[9px] font-bold">{['SM', 'JR', 'EK'][i]}</span>
                  </div>
                )
              )}
            </div>
            <span className="text-slate-600 text-sm font-medium">8,000+ happy patients</span>
          </div>

          <div className="w-px h-5 bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-600 text-sm font-medium">4.9/5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
