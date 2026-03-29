'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Cpu, AlignLeft, Shield, Wind, Star, ChevronRight, ChevronDown, Check } from 'lucide-react'

interface Service {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  name: string
  tagline: string
  description: string
  includes: string[]
  gradient: string
  duration: string
}

const services: Service[] = [
  {
    icon: Sparkles,
    name: 'Teeth Whitening',
    tagline: 'Radiant results, visible from the very first session',
    description:
      'Our professional teeth whitening treatments use clinically proven, enamel-safe formulas to lift years of staining in a single visit. Whether you choose our in-chair laser whitening or take-home tray system, you&apos;ll achieve dramatic, long-lasting results that over-the-counter products simply cannot match.',
    includes: [
      'Pre-treatment shade assessment',
      'Custom-fitted whitening trays',
      'Professional-grade whitening gel',
      'Post-treatment sensitivity care',
      'Take-home maintenance kit',
    ],
    gradient: 'from-cyan-400 to-cyan-600',
    duration: '60–90 minutes',
  },
  {
    icon: Cpu,
    name: 'Dental Implants',
    tagline: 'Permanent, natural-looking tooth replacement',
    description:
      'Dental implants are the gold standard for replacing missing teeth. Using a titanium post surgically placed in the jawbone, we create a stable foundation for a lifelike crown. The result: a replacement tooth that looks, feels, and functions exactly like your natural tooth — for life.',
    includes: [
      '3D cone beam CT scan',
      'Surgical implant placement',
      'Custom porcelain crown fabrication',
      'Full osseointegration monitoring',
      'Lifetime structural warranty',
    ],
    gradient: 'from-violet-400 to-violet-600',
    duration: '2–4 visits over 3–6 months',
  },
  {
    icon: AlignLeft,
    name: 'Orthodontics',
    tagline: 'Straighter teeth, greater confidence',
    description:
      'Whether you opt for traditional metal braces or our virtually invisible clear aligner system, our orthodontic treatments are designed to deliver precise, efficient results. Using advanced digital treatment planning, we map your smile&apos;s transformation before we even begin.',
    includes: [
      'Digital iTero intraoral scan',
      'Custom treatment simulation',
      'Clear aligners or metal/ceramic braces',
      'Monthly progress monitoring',
      'Retainer included at completion',
    ],
    gradient: 'from-cyan-500 to-violet-500',
    duration: '12–24 months',
  },
  {
    icon: Shield,
    name: 'Root Canal Therapy',
    tagline: 'Save your tooth, eliminate the pain',
    description:
      'Modern root canal therapy is nothing to fear. Using microscope-assisted techniques and advanced rotary instrumentation, our endodontists clean, shape, and seal infected root canals with exceptional precision — usually completing the procedure in a single comfortable visit.',
    includes: [
      'Digital periapical X-rays',
      'Rotary endodontic instrumentation',
      'Biocompatible root filling material',
      'Temporary and permanent restoration',
      'Post-treatment care instructions',
    ],
    gradient: 'from-violet-500 to-cyan-500',
    duration: '60–120 minutes',
  },
  {
    icon: Wind,
    name: 'Dental Cleaning',
    tagline: 'The foundation of lifelong oral health',
    description:
      'Professional dental cleaning goes far beyond what a toothbrush can achieve. Our dental hygienists use ultrasonic scalers and hand instruments to remove calcified deposits, polish surfaces, and assess your gum health — leaving your mouth feeling completely refreshed.',
    includes: [
      'Full oral health examination',
      'Supragingival and subgingival scaling',
      'Air-polishing stain removal',
      'Fluoride treatment',
      'Personalized home care coaching',
    ],
    gradient: 'from-cyan-400 to-cyan-600',
    duration: '45–60 minutes',
  },
  {
    icon: Star,
    name: 'Cosmetic Dentistry',
    tagline: 'Artistry and science, perfectly combined',
    description:
      'A complete smile makeover can be truly life-changing. From ultra-thin porcelain veneers and composite bonding to full-arch rehabilitations, our cosmetic team blends artistic vision with clinical mastery to craft smiles that look naturally stunning and feel completely comfortable.',
    includes: [
      'Smile design consultation with mock-up',
      'Porcelain or composite veneers',
      'Dental bonding and contouring',
      'Gum line recontouring',
      'Complete smile makeover planning',
    ],
    gradient: 'from-violet-400 to-violet-600',
    duration: 'Varies by treatment plan',
  },
]

const faqs = [
  {
    question: 'How often should I visit the dentist?',
    answer:
      'We recommend a professional check-up and cleaning every 6 months for most patients. However, some patients with gum disease, a history of cavities, or other conditions may benefit from more frequent visits — typically every 3–4 months. Your dentist will advise you on the ideal schedule for your specific needs.',
  },
  {
    question: 'Is teeth whitening safe for my enamel?',
    answer:
      'Yes, when performed by dental professionals, teeth whitening is a safe and well-studied procedure. We use carefully calibrated concentrations of hydrogen peroxide that have been shown to effectively whiten teeth without permanently damaging enamel. Some patients experience temporary sensitivity, which typically resolves within 24–48 hours. We always conduct a pre-treatment assessment to ensure whitening is appropriate for you.',
  },
  {
    question: 'How long do dental implants last?',
    answer:
      'With proper care, dental implants can last a lifetime. The titanium implant post, once fully integrated with the jawbone, is remarkably stable and durable. The crown on top typically lasts 10–15+ years before it may need replacement due to normal wear. The key to implant longevity is excellent oral hygiene and regular dental check-ups.',
  },
  {
    question: 'Are clear aligners as effective as traditional braces?',
    answer:
      'For many orthodontic cases — including mild to moderate crowding, spacing, and bite issues — clear aligners are just as effective as traditional braces. They offer the significant advantages of being virtually invisible and removable. For very complex orthodontic cases, traditional braces may be recommended. During your consultation, we&apos;ll assess which option will give you the best outcome.',
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="h-px bg-white/5 mb-4" />
          <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#030712] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[10%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-[10%] w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-6 mx-auto">
            What We Offer
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
            Our{' '}
            <span className="gradient-text">Services</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive dental care under one roof — from preventive treatments to
            full smile transformations, delivered by award-winning specialists.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 lg:py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.name}
                  className="glass rounded-2xl p-6 lg:p-8 border border-white/5 group hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-white mb-0.5">
                        {service.name}
                      </h2>
                      <p className="text-cyan-400 text-sm font-medium">{service.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Includes */}
                  <div className="mb-5">
                    <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-1.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duration + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-slate-400 text-xs">{service.duration}</span>
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                    >
                      Book Now
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-[#0f172a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              We believe in complete transparency. Every treatment is individually
              priced and fully explained before you commit to anything. Contact us
              for a detailed quote tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-sm">
                Get a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/book" className="btn-ghost text-sm">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto">Common Questions</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
