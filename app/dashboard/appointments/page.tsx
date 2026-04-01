'use client'

import { useEffect, useState } from 'react'
import {
  Calendar, Search, Filter, ChevronDown,
  CheckCircle, XCircle, Clock, RefreshCw,
  Plus, X, Phone, Mail, FileText, User, Loader2, Trash2,
} from 'lucide-react'

interface Appointment {
  id: string
  date: string
  time: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  patient: { id: string; name: string; email: string; phone: string }
  service: { id: string; name: string; duration: string; price?: number }
}

interface Service { id: string; name: string; duration: string; price?: number }

const statusConfig = {
  PENDING:   { label: 'Pending',   classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  CONFIRMED: { label: 'Confirmed', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  COMPLETED: { label: 'Completed', classes: 'bg-teal-50 text-teal-700 border-teal-200' },
  CANCELLED: { label: 'Cancelled', classes: 'bg-rose-50 text-rose-700 border-rose-200' },
}

const inputClass = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

const TIME_SLOTS = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM',
]

const emptyForm = { patientName: '', patientEmail: '', patientPhone: '', serviceId: '', date: '', time: '', notes: '' }

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // New appointment modal
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '100' })
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/appointments?${params}`)
      const data = await res.json()
      setAppointments(data.appointments ?? [])
      setTotal(data.total ?? 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [statusFilter])

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(d => setServices(d.services ?? []))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await fetchAppointments()
    setUpdating(null)
  }

  const handleSubmit = async () => {
    setFormError('')
    if (!form.patientName || !form.patientEmail || !form.patientPhone || !form.serviceId || !form.date || !form.time) {
      setFormError('Please fill in all required fields.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Failed to create appointment')
      }
      setShowModal(false)
      setForm(emptyForm)
      await fetchAppointments()
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm('Delete this appointment? This cannot be undone.')) return
    setDeleting(id)
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
    await fetchAppointments()
    setDeleting(null)
  }

  const filtered = appointments.filter((a) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      a.patient.name.toLowerCase().includes(q) ||
      a.patient.email.toLowerCase().includes(q) ||
      a.patient.phone.includes(q) ||
      a.service.name.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-1">{total} total appointments</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setFormError(''); setShowModal(true) }} className="btn-primary text-sm py-2 px-4">
          <Plus className="w-4 h-4" />
          New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient name, email, phone or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white cursor-pointer"
          >
            {['', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
              <option key={s} value={s}>{s ? s[0] + s.slice(1).toLowerCase() : 'All Statuses'}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <button onClick={fetchAppointments} className="btn-outline text-sm py-2.5 px-4">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Patient', 'Contact', 'Service', 'Date & Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((appt) => (
                  <>
                    <tr
                      key={appt.id}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-blue-700">
                              {appt.patient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{appt.patient.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-500 truncate max-w-[160px]">{appt.patient.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-500">{appt.patient.phone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700 font-medium">{appt.service.name}</p>
                        <p className="text-xs text-slate-400">{appt.service.duration}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-sm text-slate-700 font-medium">
                          {new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-slate-400">{appt.time}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig[appt.status].classes}`}>
                          {statusConfig[appt.status].label}
                        </span>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {appt.status === 'PENDING' && (
                            <button onClick={() => updateStatus(appt.id, 'CONFIRMED')} disabled={updating === appt.id}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors disabled:opacity-50">
                              Confirm
                            </button>
                          )}
                          {(appt.status === 'PENDING' || appt.status === 'CONFIRMED') && (
                            <>
                              <button onClick={() => updateStatus(appt.id, 'COMPLETED')} disabled={updating === appt.id}
                                className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold transition-colors disabled:opacity-50">
                                Complete
                              </button>
                              <button onClick={() => updateStatus(appt.id, 'CANCELLED')} disabled={updating === appt.id}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50">
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          {appt.status === 'COMPLETED' && <CheckCircle className="w-4 h-4 text-teal-400" />}
                          {appt.status === 'CANCELLED' && <XCircle className="w-4 h-4 text-slate-300" />}
                          <button
                            onClick={() => deleteAppointment(appt.id)}
                            disabled={deleting === appt.id}
                            className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors disabled:opacity-50"
                          >
                            {deleting === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded notes row */}
                    {expandedId === appt.id && appt.notes && (
                      <tr key={`${appt.id}-notes`} className="bg-slate-50/60">
                        <td colSpan={6} className="px-5 py-3">
                          <div className="flex items-start gap-2">
                            <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-slate-600 leading-relaxed"><span className="font-semibold text-slate-700">Notes: </span>{appt.notes}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedId === appt.id && !appt.notes && (
                      <tr key={`${appt.id}-nonotes`} className="bg-slate-50/60">
                        <td colSpan={6} className="px-5 py-2.5">
                          <p className="text-xs text-slate-400 italic">No notes for this appointment.</p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                <h2 className="font-display font-bold text-slate-900">New Appointment</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Patient info */}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Patient Information</p>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  <User className="w-3 h-3" /> Full Name *
                </label>
                <input value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} placeholder="John Smith" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    <Mail className="w-3 h-3" /> Email *
                  </label>
                  <input type="email" value={form.patientEmail} onChange={e => setForm({...form, patientEmail: e.target.value})} placeholder="john@example.com" className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    <Phone className="w-3 h-3" /> Phone *
                  </label>
                  <input type="tel" value={form.patientPhone} onChange={e => setForm({...form, patientPhone: e.target.value})} placeholder="+1 (555) 000-0000" className={inputClass} />
                </div>
              </div>

              {/* Appointment details */}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pt-2">Appointment Details</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Service *</label>
                <select value={form.serviceId} onChange={e => setForm({...form, serviceId: e.target.value})} className={inputClass}>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name} — {s.duration}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Time *</label>
                  <select value={form.time} onChange={e => setForm({...form, time: e.target.value})} className={inputClass}>
                    <option value="">Select time...</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  <FileText className="w-3 h-3" /> Notes
                </label>
                <textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Allergies, special requests, concerns..." className={`${inputClass} resize-none`} />
              </div>

              {formError && (
                <div className="px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                  {formError}
                </div>
              )}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={handleSubmit} disabled={saving} className="btn-primary text-sm py-2.5 flex-1 justify-center disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Calendar className="w-4 h-4" /> Book Appointment</>}
              </button>
              <button onClick={() => setShowModal(false)} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
