'use client'

import { useEffect, useState } from 'react'
import { BarChart2, TrendingUp, Users, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Stats {
  totalPatients: number
  totalAppointments: number
  todayAppointments: number
  pendingCount: number
  completedCount: number
  cancelledCount: number
  recentAppointments: {
    id: string
    date: string
    time: string
    status: string
    patient: { name: string }
    service: { name: string }
  }[]
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
  COMPLETED: 'bg-teal-50 text-teal-700 border-teal-200',
  CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  if (!stats) return null

  const confirmedCount = stats.totalAppointments - stats.pendingCount - stats.completedCount - stats.cancelledCount
  const completionRate = stats.totalAppointments > 0
    ? Math.round((stats.completedCount / stats.totalAppointments) * 100)
    : 0
  const cancellationRate = stats.totalAppointments > 0
    ? Math.round((stats.cancelledCount / stats.totalAppointments) * 100)
    : 0

  const statusBreakdown = [
    { label: 'Pending',   count: stats.pendingCount,   icon: Clock,        color: 'text-amber-600', bg: 'bg-amber-50',  bar: 'bg-amber-400' },
    { label: 'Confirmed', count: confirmedCount,        icon: Calendar,     color: 'text-blue-600',  bg: 'bg-blue-50',   bar: 'bg-blue-500' },
    { label: 'Completed', count: stats.completedCount,  icon: CheckCircle,  color: 'text-teal-600',  bg: 'bg-teal-50',   bar: 'bg-teal-500' },
    { label: 'Cancelled', count: stats.cancelledCount,  icon: XCircle,      color: 'text-rose-600',  bg: 'bg-rose-50',   bar: 'bg-rose-400' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 text-sm">Clinic performance at a glance</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients',      value: stats.totalPatients,      icon: Users,        bg: 'bg-blue-50',   color: 'text-blue-700',   num: 'text-blue-900' },
          { label: 'Total Appointments',  value: stats.totalAppointments,  icon: Calendar,     bg: 'bg-teal-50',   color: 'text-teal-600',   num: 'text-teal-800' },
          { label: 'Completion Rate',     value: `${completionRate}%`,     icon: TrendingUp,   bg: 'bg-violet-50', color: 'text-violet-600', num: 'text-violet-800' },
          { label: 'Cancellation Rate',   value: `${cancellationRate}%`,   icon: XCircle,      bg: 'bg-rose-50',   color: 'text-rose-500',   num: 'text-rose-700' },
        ].map(({ label, value, icon: Icon, bg, color, num }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className={`font-display text-2xl font-bold ${num}`}>{value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-700" />
            Appointment Status Breakdown
          </h2>
          <div className="space-y-4">
            {statusBreakdown.map(({ label, count, icon: Icon, color, bg, bar }) => {
              const pct = stats.totalAppointments > 0 ? (count / stats.totalAppointments) * 100 : 0
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{count}</span>
                      <span className="text-xs text-slate-400">{Math.round(pct)}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${bar} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            Quick Stats
          </h2>
          <div className="space-y-3">
            {[
              { label: "Today's appointments", value: stats.todayAppointments, highlight: true },
              { label: 'Pending review',        value: stats.pendingCount },
              { label: 'Completed sessions',    value: stats.completedCount },
              { label: 'Cancelled bookings',    value: stats.cancelledCount },
              { label: 'Avg. per patient',      value: stats.totalPatients > 0 ? (stats.totalAppointments / stats.totalPatients).toFixed(1) : '—' },
            ].map(({ label, value, highlight }) => (
              <div key={label} className={`flex items-center justify-between py-2.5 px-3 rounded-xl ${highlight ? 'bg-blue-50' : 'bg-slate-50'}`}>
                <span className={`text-sm ${highlight ? 'text-blue-800 font-medium' : 'text-slate-600'}`}>{label}</span>
                <span className={`text-sm font-bold ${highlight ? 'text-blue-900' : 'text-slate-900'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent appointments table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-display font-semibold text-slate-900">Recent Activity</h2>
          <a href="/dashboard/appointments" className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            View all →
          </a>
        </div>
        <div className="divide-y divide-slate-50">
          {stats.recentAppointments.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">No appointments yet.</div>
          ) : (
            stats.recentAppointments.map((appt) => (
              <div key={appt.id} className="px-6 py-3.5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
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
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[appt.status]}`}>
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
