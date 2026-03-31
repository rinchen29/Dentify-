import Link from 'next/link'
import { Sparkles, Cpu, AlignLeft, Shield, Wind, Star, Stethoscope, Smile, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'

// Icon + colour theme cycling for DB services that may not have an icon string
const THEMES = [
  { iconBg: 'bg-amber-50',  iconColor: 'text-amber-600',  Icon: Sparkles    },
  { iconBg: 'bg-blue-50',   iconColor: 'text-blue-700',   Icon: Cpu         },
  { iconBg: 'bg-teal-50',   iconColor: 'text-teal-600',   Icon: AlignLeft   },
  { iconBg: 'bg-rose-50',   iconColor: 'text-rose-600',   Icon: Shield      },
  { iconBg: 'bg-sky-50',    iconColor: 'text-sky-600',    Icon: Wind        },
  { iconBg: 'bg-violet-50', iconColor: 'text-violet-600', Icon: Star        },
  { iconBg: 'bg-green-50',  iconColor: 'text-green-600',  Icon: Stethoscope },
  { iconBg: 'bg-pink-50',   iconColor: 'text-pink-600',   Icon: Smile       },
]

// Static fallback if DB is empty
const FALLBACK = [
  { name: 'Teeth Whitening',   description: 'Achieve a radiant, confident smile with our advanced professional whitening treatments. Stunning results in a single visit.',         tagline: 'Most Popular'       },
  { name: 'Dental Implants',   description: 'Permanent tooth replacement that looks, feels, and functions like your natural teeth. Titanium precision, natural aesthetics.',       tagline: 'Permanent Solution' },
  { name: 'Orthodontics',      description: 'Straighten your teeth with modern braces and clear aligner options. Precision alignment for every smile type.',                       tagline: 'Braces & Aligners'  },
  { name: 'Root Canal',        description: 'Pain-free root canal therapy to save infected teeth and restore oral health. Gentle, effective, and long-lasting.',                  tagline: 'Pain-Free'          },
  { name: 'Dental Cleaning',   description: 'Professional cleaning to remove plaque, tartar, and protect your gums. The foundation of great oral health.',                        tagline: 'Preventive Care'    },
  { name: 'Cosmetic Dentistry',description: 'Transform your smile with veneers, bonding, and complete smile makeovers. Where artistry meets precision.',                          tagline: 'Smile Makeover'     },
]

interface ServiceItem {
  name: string
  description: string | null
  tagline: string | null
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const theme = THEMES[index % THEMES.length]
  const Icon = theme.Icon
  return (
    <div className="card p-6 group relative overflow-hidden">
      {/* Tag */}
      {item.tagline && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-0.5">
            {item.tagline}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center mb-5`}>
        <Icon className={`w-6 h-6 ${theme.iconColor}`} strokeWidth={2} />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
        {item.name}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-5">
        {item.description ?? 'Professional dental care tailored to your needs.'}
      </p>

      {/* Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/link"
      >
        Learn More
        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
      </Link>

      {/* Bottom accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

export default async function Services() {
  let items: ServiceItem[] = []

  try {
    const rows = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      take: 6,
      select: { name: true, description: true, tagline: true },
    })
    if (rows.length > 0) items = rows
  } catch {
    // DB unavailable — fall through to static fallback
  }

  if (items.length === 0) items = FALLBACK

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
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
          {items.map((item, index) => (
            <ServiceCard key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline inline-flex">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
