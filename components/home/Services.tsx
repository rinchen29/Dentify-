'use client'

import Link from 'next/link'
import { Sparkles, Cpu, AlignLeft, Shield, Wind, Star, ArrowRight } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

interface Service {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  name: string
  description: string
  gradient: string
}

const services: Service[] = [
  {
    icon: Sparkles,
    name: 'Teeth Whitening',
    description:
      'Achieve a radiant, movie-star smile with our advanced whitening treatments. Professional-grade results in a single visit.',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: Cpu,
    name: 'Dental Implants',
    description:
      'Permanent tooth replacement that looks, feels, and functions like natural teeth. Titanium precision, natural aesthetics.',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    icon: AlignLeft,
    name: 'Orthodontics',
    description:
      'Straighten your teeth discreetly with modern braces and clear aligner options. Precision alignment for every smile.',
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    icon: Shield,
    name: 'Root Canal',
    description:
      'Pain-free root canal therapy to save infected teeth and restore oral health. Gentle, effective, and lasting treatment.',
    gradient: 'from-violet-500 to-cyan-500',
  },
  {
    icon: Wind,
    name: 'Dental Cleaning',
    description:
      'Professional cleaning to remove plaque, tartar, and keep your gums healthy. The foundation of great oral health.',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: Star,
    name: 'Cosmetic Dentistry',
    description:
      'Transform your smile with veneers, bonding, and complete smile makeovers. Artistry meets precision dentistry.',
    gradient: 'from-violet-400 to-violet-600',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon

  return (
    <div
      className="service-card group relative glass rounded-2xl p-6 border border-white/5 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-bold text-white mb-2">
        {service.name}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group/link"
      >
        Learn More
        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
      </Link>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export default function Services() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#0f172a] overflow-hidden"
    >
      {/* Subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-500/5 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <div className="section-badge mb-4">
            Our Expertise
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From routine cleanings to complete smile transformations — we offer
            comprehensive dental care tailored to your unique needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <Link href="/services" className="btn-ghost inline-flex">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
