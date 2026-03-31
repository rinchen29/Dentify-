'use client'

import Link from 'next/link'
import { Sparkles, Cpu, AlignLeft, Shield, Wind, Star, ArrowRight } from 'lucide-react'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

interface Service {
  icon: React.ElementType
  name: string
  description: string
  iconBg: string
  iconColor: string
  tag: string
}

const services: Service[] = [
  {
    icon: Sparkles,
    name: 'Teeth Whitening',
    description:
      'Achieve a radiant, confident smile with our advanced professional whitening treatments. Stunning results in a single visit.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    tag: 'Most Popular',
  },
  {
    icon: Cpu,
    name: 'Dental Implants',
    description:
      'Permanent tooth replacement that looks, feels, and functions like your natural teeth. Titanium precision, natural aesthetics.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    tag: 'Permanent Solution',
  },
  {
    icon: AlignLeft,
    name: 'Orthodontics',
    description:
      'Straighten your teeth with modern braces and clear aligner options. Precision alignment for every smile type.',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    tag: 'Braces & Aligners',
  },
  {
    icon: Shield,
    name: 'Root Canal',
    description:
      'Pain-free root canal therapy to save infected teeth and restore oral health. Gentle, effective, and long-lasting.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    tag: 'Pain-Free',
  },
  {
    icon: Wind,
    name: 'Dental Cleaning',
    description:
      'Professional cleaning to remove plaque, tartar, and protect your gums. The foundation of great oral health.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    tag: 'Preventive Care',
  },
  {
    icon: Star,
    name: 'Cosmetic Dentistry',
    description:
      'Transform your smile with veneers, bonding, and complete smile makeovers. Where artistry meets precision.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    tag: 'Smile Makeover',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <div
      className="card p-6 group relative overflow-hidden"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Top tag */}
      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-0.5">
          {service.tag}
        </span>
      </div>

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5`}>
        <Icon className={`w-6 h-6 ${service.iconColor}`} strokeWidth={2} />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
        {service.name}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/link"
      >
        Learn More
        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
      </Link>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

export default function Services() {
  const sectionRef = useAnimateOnScroll<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <div className="section-badge mb-4">Our Expertise</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive{' '}
            <span className="text-blue-900">Dental Services</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From routine cleanings to complete smile transformations — we offer
            expert dental care tailored to your unique needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <Link href="/services" className="btn-outline inline-flex">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
