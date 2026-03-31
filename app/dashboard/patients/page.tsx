'use client'

import { useEffect, useState } from 'react'
import {
  Users, Search, RefreshCw, Plus, Phone, Mail,
  Calendar, Pencil, Trash2, X, User, MapPin,
  FileText, Loader2, ChevronDown,
} from 'lucide-react'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth?: string
  address?: string
  notes?: string
  createdAt: string
  _count: { appointments: number }
  appointments: { id: string; date: string; time: string; status: string; service: { name: string } }[]
}

const inputClass = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'
const emptyForm = { name: '', email: '', phone: '', dateOfBirth: '', address: '', notes: '' }

const statusColors: Record<string, string> = {
  PENDING:   'bg-amber-50 text-amber-700',
  CONFIRMED: 'bg-blue-50 text-blue-700',
  COMPLETED: 'bg-teal-50 text-teal-700',
  CANCELLED: 'bg-rose-50 text-rose-500',
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '100' })
      if (search) params.set('search', search)
      const res = await fetch(`/api/patients?${params}`)
      const data = await res.json()
      setPatients(data.patients ?? [])
      setTotal(data.total ?? 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPatients() }, [search])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  const openEdit = (p: Patient) => {
    setEditId(p.id)
    setForm({
      name: p.name,
      email: p.email,
      phone: p.phone,
      dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
      address: p.address ?? '',
      notes: p.notes ?? '',
    })
    setFormError('')
    setShowModal(true)
  }

  const handleSave = async () => {
    setFormError('')
    if (!form.name || !form.email || !form.phone) {
      setFormError('Name, email and phone are required.')
      return
    }
    setSaving(true)
    try {
      const body = {
        ...form,
        dateOfBirth: form.dateOfBirth ? form.dateOfBirth : undefined,
        address: form.address || undefined,
        notes: form.notes || undefined,
      }
      const url = editId ? `/api/patients/${editId}` : '/api/patients'
      const method = editId ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Failed to save patient')
      }
      setShowModal(false)
      await fetchPatients()
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete patient "${name}"? This will also delete all their appointments.`)) return
    setDeletingId(id)
    await fetch(`/api/patients/${id}`, { method: 'DELETE' })
    await fetchPatients()
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-500 text-sm mt-1">{total} registered patients</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
        <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput) }} className="flex-1 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>
          <button type="submit" className="btn-primary text-sm py-2.5 px-5">Search</button>
          {search && <button type="button" onClick={() => { setSearch(''); setSearchInput('') }} className="btn-outline text-sm py-2.5 px-4">Clear</button>}
        </form>
        <button onClick={fetchPatients} className="btn-outline text-sm py-2.5 px-4">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No patients found.</p>
          <p className="text-slate-400 text-xs mt-1">Patients are added when they book an appointment, or manually via the Add Patient button.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Patient', 'Contact', 'Date of Birth', 'Address', 'Appointments', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map((patient) => (
                  <>
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === patient.id ? null : patient.id)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-blue-700 text-xs font-bold">
                              {patient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{patient.name}</p>
                            <p className="text-xs text-slate-400">
                              Since {new Date(patient.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-500 truncate max-w-[160px]">{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-500">{patient.phone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.dateOfBirth
                          ? new Date(patient.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : <span className="text-slate-300 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-500 max-w-[140px] truncate block">
                          {patient.address || <span className="text-slate-300">—</span>}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-500" />
                          <span className="text-sm font-semibold text-teal-700">{patient._count.appointments}</span>
                          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${expandedId === patient.id ? 'rotate-180' : ''}`} />
                        </div>
                      </td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(patient)} className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(patient.id, patient.name)}
                            disabled={deletingId === patient.id}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === patient.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded: appointment history + notes */}
                    {expandedId === patient.id && (
                      <tr key={`${patient.id}-expanded`} className="bg-slate-50/60">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Appointment history */}
                            <div>
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Appointment History</p>
                              {patient.appointments.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No appointments yet.</p>
                              ) : (
                                <div className="space-y-1.5">
                                  {patient.appointments.map(a => (
                                    <div key={a.id} className="flex items-center justify-between bg-white rounded-xl border border-slate-100 px-3 py-2">
                                      <div>
                                        <p className="text-xs font-semibold text-slate-800">{a.service.name}</p>
                                        <p className="text-xs text-slate-400">
                                          {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {a.time}
                                        </p>
                                      </div>
                                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>
                                        {a.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Notes */}
                            {patient.notes && (
                              <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Clinical Notes</p>
                                <p className="text-xs text-slate-600 bg-white rounded-xl border border-slate-100 px-3 py-2.5 leading-relaxed">
                                  {patient.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <h2 className="font-display font-bold text-slate-900">{editId ? 'Edit Patient' : 'Add Patient'}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    <User className="w-3 h-3" /> Full Name *
                  </label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      <Mail className="w-3 h-3" /> Email *
                    </label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      <Phone className="w-3 h-3" /> Phone *
                    </label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      <Calendar className="w-3 h-3" /> Date of Birth
                    </label>
                    <input type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      <MapPin className="w-3 h-3" /> Address
                    </label>
                    <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="123 Main St, City" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    <FileText className="w-3 h-3" /> Clinical Notes
                  </label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Allergies, medical history, special notes..." className={`${inputClass} resize-none`} />
                </div>
              </div>

              {formError && (
                <div className="px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                  {formError}
                </div>
              )}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 flex-1 justify-center disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><User className="w-4 h-4" /> {editId ? 'Save Changes' : 'Add Patient'}</>}
              </button>
              <button onClick={() => setShowModal(false)} className="btn-outline text-sm py-2.5 px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
