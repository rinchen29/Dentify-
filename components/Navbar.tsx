'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { useSiteConfig } from '@/lib/SiteConfigContext'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const config = useSiteConfig()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const phoneHref = `tel:${config.phone.replace(/\s+/g, '')}`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            {config.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={config.logoUrl} alt={config.clinicName} className="w-8 h-8 rounded-xl object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C9 2 7 4 7 6c0 1 .3 2 .8 3L6 19c0 1.1.9 2 2 2 .8 0 1.5-.5 1.8-1.2L12 14l2.2 5.8c.3.7 1 1.2 1.8 1.2 1.1 0 2-.9 2-2l-1.8-10c.5-1 .8-2 .8-3 0-2-2-4-5-4z" />
                </svg>
              </div>
            )}
            <span className="font-display font-bold text-xl text-blue-900 tracking-tight">
              {config.clinicName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={phoneHref}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {config.phone}
            </a>
            <Link href="/book" className="btn-primary text-sm py-2 px-5">
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-900'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-slate-100">
              <a href={phoneHref} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600">
                <Phone className="w-3.5 h-3.5" />
                {config.phone}
              </a>
            </div>
            <div className="pt-1">
              <Link href="/book" className="btn-primary text-sm w-full justify-center">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
