'use client'

import { signOut } from 'next-auth/react'
import { LogOut, Bell, User, Menu } from 'lucide-react'
import { useSiteConfig } from '@/lib/SiteConfigContext'

interface Props {
  user: { name?: string | null; email?: string | null }
  onMenuOpen?: () => void
}

export default function DashboardHeader({ user, onMenuOpen }: Props) {
  const config = useSiteConfig()
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-200 transition-all"
        >
          <Menu className="w-4 h-4" />
        </button>

        <h1 className="font-display font-semibold text-slate-900 text-sm hidden lg:block">
          Good day, {user?.name ?? 'Admin'} · <span className="text-slate-400 font-normal">{config.clinicName}</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-200 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-white" />
        </button>

        {/* Avatar + email */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-100">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-700" />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">
            {user?.email}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-all"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
