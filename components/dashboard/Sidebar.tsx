'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Calendar, Users, Stethoscope,
  Settings, ChevronRight, X, BarChart2, TrendingUp, Mail, UserCheck,
} from 'lucide-react'
import { useSiteConfig } from '@/lib/SiteConfigContext'

const navItems = [
  { href: '/dashboard',              label: 'Overview',       icon: LayoutDashboard },
  { href: '/dashboard/appointments', label: 'Appointments',   icon: Calendar },
  { href: '/dashboard/patients',     label: 'Patients',       icon: Users },
  { href: '/dashboard/services',     label: 'Services',       icon: Stethoscope },
  { href: '/dashboard/team',         label: 'Team Members',   icon: UserCheck },
  { href: '/dashboard/messages',     label: 'Messages',       icon: Mail },
  { href: '/dashboard/stats',        label: 'Homepage Stats', icon: TrendingUp },
  { href: '/dashboard/analytics',    label: 'Analytics',      icon: BarChart2 },
  { href: '/dashboard/settings',     label: 'Settings',       icon: Settings },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const config = useSiteConfig()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center shrink-0 overflow-hidden">
            {config.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={config.logoUrl} alt={config.clinicName} className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C9 2 7 4 7 6c0 1 .3 2 .8 3L6 19c0 1.1.9 2 2 2 .8 0 1.5-.5 1.8-1.2L12 14l2.2 5.8c.3.7 1 1.2 1.8 1.2 1.1 0 2-.9 2-2l-1.8-10c.5-1 .8-2 .8-3 0-2-2-4-5-4z" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-display font-bold text-blue-900 text-base leading-tight">{config.clinicName}</p>
            <p className="text-xs text-slate-400 leading-tight">CRM Dashboard</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-blue-700 transition-colors"
        >
          <ChevronRight className="w-3 h-3 rotate-180" />
          Back to Website
        </Link>
      </div>
    </div>
  )
}

export default function DashboardSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen?: boolean
  onClose?: () => void
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 shrink-0 hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="relative z-50 w-72 bg-white h-full shadow-xl flex flex-col">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  )
}
