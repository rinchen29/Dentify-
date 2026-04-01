'use client'

import { useEffect, useState } from 'react'
import { Users, Calendar, CheckCircle, Clock, XCircle, TrendingUp, CalendarDays, RefreshCw, CalendarCheck } from 'lucide-react'

interface Stats {
  totalPatients: number
  totalAppointments: number
  todayAppointments: number
  pendingCount: number
  confirmedCount: number
  completedCount: number
  cancelledCount: number
  recentAppointments: {
    id: string
    date: string
    time: string
    status: string
    patient: { name: string; email: string }
    service: { name: string }
  }[]
}

const statusColors: Record<string, string> = {
  PENDING:   'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
  COMPLETED: 'bg-teal-50 text-teal-700 border-teal-200',
  CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard/stats')
      const data = await res.json()
      if (!data.error) setStats(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  const cards = [
    { label: 'Total Patients',       value: stats.totalPatients      ?? 0, icon: Users,        iconBg: 'bg-blue-50',   iconColor: 'text-blue-700',   numColor: 'text-blue-900',   href: '/dashboard/patients' },
    { label: 'Total Appointments',   value: stats.totalAppointments  ?? 0, icon: Calendar,     iconBg: 'bg-teal-50',   iconColor: 'text-teal-600',   numColor: 'text-teal-700',   href: '/dashboard/appointments' },
    { label: "Today's Appointments", value: stats.todayAppointments  ?? 0, icon: CalendarDays, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', numColor: 'text-violet-700', href: '/dashboard/appointments' },
    { label: 'Pending',              value: stats.pendingCount       ?? 0, icon: Clock,        iconBg: 'bg-amber-50',  iconColor: 'text-amber-600',  numColor: 'text-amber-700',  href: '/dashboard/appointments' },
    { label: 'Confirmed',            value: stats.confirmedCount     ?? 0, icon: CalendarCheck,iconBg: 'bg-blue-50',   iconColor: 'text-blue-600',   numColor: 'text-blue-700',   href: '/dashboard/appointments' },
    { label: 'Completed',            value: stats.completedCount     ?? 0, icon: CheckCircle,  iconBg: 'bg-teal-50',   iconColor: 'text-teal-600',   numColor: 'text-teal-700',   href: '/dashboard/appointments' },
    { label: 'Cancelled',            value: stats.cancelledCount     ?? 0, icon: XCircle,      iconBg: 'bg-rose-50',   iconColor: 'text-rose-600',   numColor: 'text-rose-700',   href: '/dashboard/appointments' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">All clinic activity at a glance</p>
        </div>
        <button onClick={fetchStats} className="btn-outline text-sm py-2 px-4">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, iconBg, iconColor, numColor, href }) => (
          <a key={label} href={href} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all">
            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <p className={`font-display text-2xl font-bold ${numColor}`}>{value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <h2 className="font-display font-semibold text-slate-900">Recent Appointments</h2>
          </div>
          <a href="/dashboard/appointments" className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            View all →
          </a>
        </div>
        <div className="divide-y divide-slate-50">
          {stats.recentAppointments.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">
              No appointments yet. They will appear here once patients start booking.
            </div>
          ) : (
            stats.recentAppointments.map((appt) => (
              <div key={appt.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <span className="text-blue-700 text-xs font-bold">
                    {appt.patient.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{appt.patient.name}</p>
                  <p className="text-xs text-slate-400 truncate">{appt.service.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-600 font-medium">
                    {new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-slate-400">{appt.time}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusColors[appt.status]}`}>
                  {appt.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
