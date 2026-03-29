'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Smile, Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-500/30 transition-colors duration-300" />
              <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 p-1.5 rounded-full">
                <Smile className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white font-display">Denti</span>
              <span className="gradient-text font-display font-black">fy</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-cyan-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="btn-primary text-sm py-2.5 px-5 group"
            >
              Book Appointment
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="glass-dark border-t border-white/5 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              >
                <span className="font-medium">{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
