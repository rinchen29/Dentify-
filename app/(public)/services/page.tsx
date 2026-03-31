'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles, Cpu, AlignLeft, Shield, Wind, Star,
  Heart, Zap, Smile, Eye, Baby, Syringe, Stethoscope,
  ChevronRight, ChevronDown, Check, Loader2,
} from 'lucide-react'

// ─── Icon registry (matches CRM) ─────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Cpu, AlignLeft, Shield, Wind, Star,
  Heart, Zap, Smile, Eye, Baby, Syringe, Stethoscope,
}

const ICON_STYLE: Record<string, { bg: string; color: string; accent: string }> = {
  Sparkles:    { bg: 'bg-amber-50',   color: 'text-amber-600',   accent: 'text-amber-600' },
  Cpu:         { bg: 'bg-blue-50',    color: 'text-blue-700',    accent: 'text-blue-700' },
  AlignLeft:   { bg: 'bg-teal-50',    color: 'text-teal-600',    accent: 'text-teal-600' },
  Shield:      { bg: 'bg-rose-50',    color: 'text-rose-600',    accent: 'text-rose-600' },
  Wind:        { bg: 'bg-sky-50',     color: 'text-sky-600',     accent: 'text-sky-600' },
  Star:        { bg: 'bg-violet-50',  color: 'text-violet-600',  accent: 'text-violet-600' },
  Heart:       { bg: 'bg-pink-50',    color: 'text-pink-600',    accent: 'text-pink-600' },
  Zap:         { bg: 'bg-orange-50',  color: 'text-orange-600',  accent: 'text-orange-600' },
  Smile:       { bg: 'bg-yellow-50',  color: 'text-yellow-600',  accent: 'text-yellow-600' },
  Eye:         { bg: 'bg-indigo-50',  color: 'text-indigo-600',  accent: 'text-indigo-600' },
  Baby:        { bg: 'bg-cyan-50',    color: 'text-cyan-600',    accent: 'text-cyan-600' },
  Syringe:     { bg: 'bg-lime-50',    color: 'text-lime-600',    accent: 'text-lime-600' },
  Stethoscope: { bg: 'bg-slate-50',   color: 'text-slate-600',   accent: 'text-slate-500' },
}

function getStyle(icon?: string) {
  return ICON_STYLE[icon ?? ''] ?? { bg: 'bg-slate-50', color: 'text-slate-600', accent: 'text-slate-500' }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiService {
  id: string
  name: string
  icon?: string
  tagline?: string
  description?: string
  includes: string[]
  duration: string
  price?: number
  isActive: boolean
}

const faqs = [
  { question: 'How often should I visit the dentist?', answer: 'We recommend a professional check-up and cleaning every 6 months for most patients. Some patients with gum disease or a history of cavities may benefit from more frequent visits — typically every 3–4 months.' },
  { question: 'Is teeth whitening safe for my enamel?', answer: 'Yes, when performed by dental professionals, teeth whitening is a safe and well-studied procedure. We use carefully calibrated concentrations of hydrogen peroxide that whiten teeth without permanently damaging enamel.' },
  { question: 'How long do dental implants last?', answer: 'With proper care, dental implants can last a lifetime. The titanium implant post, once fully integrated with the jawbone, is remarkably stable. The crown on top typically lasts 10–15+ years.' },
  { question: 'Are clear aligners as effective as traditional braces?', answer: 'For many cases — including mild to moderate crowding and spacing — clear aligners are just as effective as traditional braces, with the added benefit of being virtually invisible and removable.' },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="card bg-white overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left group">
        <span className="font-display font-semibold text-slate-900 group-hover:text-blue-900 transition-colors pr-4 text-sm sm:text-base">
          {faq.question}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-700' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <div className="h-px bg-slate-100 mb-4" />
          <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [services, setServices] = useState<ApiService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(d => setServices((d.services ?? []).filter((s: ApiService) => s.isActive)))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50" />
          <div className="absolute -bottom-20 -left-24 w-80 h-80 rounded-full bg-teal-50 opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-5 mx-auto">What We Offer</div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            Our Dental <span className="text-blue-900">Services</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive dental care under one roof — from preventive treatments to
            full smile transformations, delivered by award-winning specialists.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No services available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map(service => {
                const Icon = ICON_MAP[service.icon ?? ''] ?? Stethoscope
                const style = getStyle(service.icon)
                return (
                  <div key={service.id} className="card p-6 lg:p-8 group">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${style.color}`} strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold text-slate-900 mb-0.5 group-hover:text-blue-900 transition-colors">
                          {service.name}
                        </h2>
                        {service.tagline && (
                          <p className={`text-sm font-medium ${style.accent}`}>{service.tagline}</p>
                        )}
                      </div>
                    </div>

                    {service.description && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                    )}

                    {service.includes.length > 0 && (
                      <div className="mb-5">
                        <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-3">What&apos;s Included</p>
                        <ul className="space-y-2">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex items-center gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-teal-700" strokeWidth={3} />
                              </div>
                              <span className="text-slate-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          <span className="text-slate-400 text-xs">{service.duration}</span>
                        </div>
                        {service.price && (
                          <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-lg">
                            From ₹{service.price.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <Link href="/book" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/btn">
                        Book Now
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card bg-white p-8 text-center">
            <div className="section-badge mb-4 mx-auto">Transparent Pricing</div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">No Hidden Fees, Ever</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Every treatment is individually priced and fully explained before you commit to anything. Contact us for a detailed quote tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">Get a Quote <ChevronRight className="w-4 h-4" /></Link>
              <Link href="/book" className="btn-outline">Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto">Common Questions</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Frequently Asked <span className="text-blue-900">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
