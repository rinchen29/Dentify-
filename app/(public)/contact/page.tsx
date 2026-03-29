'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronRight } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    lines: ['123 Dental Avenue, Suite 400', 'New York, NY 10001'],
    color: 'cyan',
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+1 (212) 555-0100'],
    href: 'tel:+12125550100',
    color: 'violet',
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['hello@dentify.com'],
    href: 'mailto:hello@dentify.com',
    color: 'cyan',
  },
]

const hours = [
  { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 4:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="bg-[#030712] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[20%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-[20%] w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-6 mx-auto">Get in Touch</div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact{' '}
            <span className="gradient-text">Us</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have a question or want to book an appointment? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-6 lg:p-8 border border-white/5">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 text-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 btn-ghost text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Smith"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all duration-200 text-sm"
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
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact Details */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-display text-lg font-bold text-white mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            item.color === 'cyan'
                              ? 'bg-cyan-500/10 border border-cyan-500/20'
                              : 'bg-violet-500/10 border border-violet-500/20'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              item.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.lines.map((line) =>
                            item.href ? (
                              <a
                                key={line}
                                href={item.href}
                                className="block text-white text-sm hover:text-cyan-400 transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              <p key={line} className="text-white text-sm">
                                {line}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/12125550100"
                  className="mt-5 flex items-center gap-3 w-full bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Hours */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-display text-lg font-bold text-white">Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{h.day}</span>
                      <span
                        className={`text-sm font-medium ${
                          h.open ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-slate-800/50 to-slate-900/50 relative flex items-center justify-center">
                  {/* Fake map grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center shadow-glow-cyan">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-cyan-400 to-violet-400 rotate-45" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white text-sm font-medium mb-1">Dentify Dental Clinic</p>
                  <p className="text-slate-500 text-xs mb-3">123 Dental Avenue, Suite 400, New York</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors"
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
