'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronRight } from 'lucide-react'
import { useSiteConfig } from '@/lib/SiteConfigContext'

const hours = [
  { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 4:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
]

const inputClass =
  'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200 text-sm'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const config = useSiteConfig()

  const contactInfo = [
    {
      icon: MapPin, label: 'Location',
      lines: [config.address, config.city],
      iconBg: 'bg-blue-50', iconColor: 'text-blue-700',
    },
    {
      icon: Phone, label: 'Phone',
      lines: [config.phone],
      href: `tel:${config.phone.replace(/\s+/g, '')}`,
      iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
    },
    {
      icon: Mail, label: 'Email',
      lines: [config.email],
      href: `mailto:${config.email}`,
      iconBg: 'bg-blue-50', iconColor: 'text-blue-700',
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fd.get('name') as string,
          email:   fd.get('email') as string,
          phone:   fd.get('phone') as string || undefined,
          subject: fd.get('subject') as string || undefined,
          message: fd.get('message') as string,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-14 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-24 w-80 h-80 rounded-full bg-blue-100 opacity-50" />
          <div className="absolute -bottom-16 -left-20 w-72 h-72 rounded-full bg-teal-50 opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-5 mx-auto">Get in Touch</div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Contact{' '}
            <span className="text-blue-900">Us</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Have a question or want to book an appointment? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-6 lg:p-8">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 btn-outline text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input type="text" name="name" required placeholder="John Smith" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input type="email" name="email" required placeholder="john@example.com" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      <input type="tel" name="phone" placeholder="+91 98765 43210" className={inputClass} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                      <select
                        name="subject"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200 text-sm"
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book an Appointment</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="emergency">Dental Emergency</option>
                        <option value="billing">Billing Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">

              {/* Contact details */}
              <div className="card p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${item.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                          {item.lines.map((line) =>
                            item.href ? (
                              <a key={line} href={item.href} className="block text-slate-800 text-sm font-medium hover:text-blue-700 transition-colors">
                                {line}
                              </a>
                            ) : (
                              <p key={line} className="text-slate-800 text-sm font-medium">{line}</p>
                            )
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  className="mt-5 flex items-center gap-3 w-full bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Hours */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <h3 className="font-display text-lg font-bold text-slate-900">Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">{h.day}</span>
                      <span className={`text-sm font-medium ${h.open ? 'text-slate-900' : 'text-slate-400'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card overflow-hidden">
                <div className="h-40 bg-blue-50 relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(30,58,138,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.15) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-900 rotate-45" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-900 text-sm font-semibold mb-0.5">{config.clinicName}</p>
                  <p className="text-slate-400 text-xs mb-3">{config.address}, {config.city}</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    View on Google Maps
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
