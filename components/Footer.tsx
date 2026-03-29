import Link from 'next/link'
import { Smile, Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book Appointment' },
]

const serviceLinks = [
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'Root Canal',
  'Dental Cleaning',
  'Cosmetic Dentistry',
]

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: Logo + Tagline + Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md" />
                <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 p-1.5 rounded-full">
                  <Smile className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-lg font-bold">
                <span className="text-white font-display">Denti</span>
                <span className="gradient-text font-display font-black">fy</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Elevating smiles with precision, care, and cutting-edge dental technology. Your journey to perfect oral health starts here.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">
                  123 Dental Avenue, Suite 400<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="tel:+12125550100"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  +1 (212) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="mailto:hello@dentify.com"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  hello@dentify.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">
                  Mon – Fri: 8:00 AM – 7:00 PM<br />
                  Sat: 9:00 AM – 4:00 PM<br />
                  Sun: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dentify. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built with{' '}
            <span className="text-rose-400">♥</span>{' '}
            for better smiles everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
