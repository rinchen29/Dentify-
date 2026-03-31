'use client'

import { useEffect, useState } from 'react'
import {
  Stethoscope, Plus, Pencil, Trash2, Check, X,
  ToggleLeft, ToggleRight, Loader2,
  Sparkles, Cpu, AlignLeft, Shield, Wind, Star,
  Heart, Zap, Smile, Eye, Baby, Syringe,
} from 'lucide-react'

// ─── Icon registry ────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  { name: 'Sparkles',    label: 'Whitening',   Icon: Sparkles },
  { name: 'Cpu',         label: 'Implants',    Icon: Cpu },
  { name: 'AlignLeft',   label: 'Orthodontics',Icon: AlignLeft },
  { name: 'Shield',      label: 'Root Canal',  Icon: Shield },
  { name: 'Wind',        label: 'Cleaning',    Icon: Wind },
  { name: 'Star',        label: 'Cosmetic',    Icon: Star },
  { name: 'Heart',       label: 'Care',        Icon: Heart },
  { name: 'Zap',         label: 'Emergency',   Icon: Zap },
  { name: 'Smile',       label: 'Checkup',     Icon: Smile },
  { name: 'Eye',         label: 'Exam',        Icon: Eye },
  { name: 'Baby',        label: 'Pediatric',   Icon: Baby },
  { name: 'Syringe',     label: 'Anaesthesia', Icon: Syringe },
  { name: 'Stethoscope', label: 'General',     Icon: Stethoscope },
]

const ICON_STYLE: Record<string, { bg: string; color: string }> = {
  Sparkles:    { bg: 'bg-amber-50',   color: 'text-amber-600' },
  Cpu:         { bg: 'bg-blue-50',    color: 'text-blue-700' },
  AlignLeft:   { bg: 'bg-teal-50',    color: 'text-teal-600' },
  Shield:      { bg: 'bg-rose-50',    color: 'text-rose-600' },
  Wind:        { bg: 'bg-sky-50',     color: 'text-sky-600' },
  Star:        { bg: 'bg-violet-50',  color: 'text-violet-600' },
  Heart:       { bg: 'bg-pink-50',    color: 'text-pink-600' },
  Zap:         { bg: 'bg-orange-50',  color: 'text-orange-600' },
  Smile:       { bg: 'bg-yellow-50',  color: 'text-yellow-600' },
  Eye:         { bg: 'bg-indigo-50',  color: 'text-indigo-600' },
  Baby:        { bg: 'bg-cyan-50',    color: 'text-cyan-600' },
  Syringe:     { bg: 'bg-lime-50',    color: 'text-lime-600' },
  Stethoscope: { bg: 'bg-slate-50',   color: 'text-slate-600' },
}

function getIconComponent(name: string) {
  return ICON_OPTIONS.find(o => o.name === name)?.Icon ?? Stethoscope
}

function getIconStyle(name?: string | null) {
  return ICON_STYLE[name ?? ''] ?? { bg: 'bg-slate-50', color: 'text-slate-600' }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string
  name: string
  icon?: string
  tagline?: string
  description?: string
  includes: string[]
  duration: string
  price?: number
  isActive: boolean
  _count: { appointments: number }
}

const inputClass = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

const emptyForm = {
  name: '', icon: '', tagline: '', description: '',
  includes: [] as string[], duration: '', price: '', isActive: true,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [newInclude, setNewInclude] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      setServices(data.services ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setNewInclude('')
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (s: Service) => {
    setEditId(s.id)
    setForm({
      name: s.name,
      icon: s.icon ?? '',
      tagline: s.tagline ?? '',
      description: s.description ?? '',
      includes: [...s.includes],
      duration: s.duration,
      price: s.price?.toString() ?? '',
      isActive: s.isActive,
    })
    setNewInclude('')
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const addInclude = () => {
    const val = newInclude.trim()
    if (!val || form.includes.includes(val)) return
    setForm(f => ({ ...f, includes: [...f.includes, val] }))
    setNewInclude('')
  }

  const removeInclude = (i: number) => {
    setForm(f => ({ ...f, includes: f.includes.filter((_, idx) => idx !== i) }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        name: form.name,
        icon: form.icon || undefined,
        tagline: form.tagline || undefined,
        description: form.description || undefined,
        includes: form.includes,
        duration: form.duration,
        price: form.price ? parseFloat(form.price) : undefined,
        isActive: form.isActive,
      }
      const url = editId ? `/api/services/${editId}` : '/api/services'
      const method = editId ? 'PATCH' : 'POST'
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      await fetchServices()
      setShowForm(false)
      setEditId(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    await fetchServices()
    setDeletingId(null)
  }

  const toggleActive = async (s: Service) => {
    await fetch(`/api/services/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !s.isActive }),
    })
    await fetchServices()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-1">{services.length} services configured</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* ── Create / Edit Form ── */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
          {/* Form header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-display font-semibold text-slate-900">
              {editId ? 'Edit Service' : 'New Service'}
            </h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* ── Basic Info ── */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Basic Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Service Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Teeth Whitening" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Duration *</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 60–90 min" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Price (₹ INR)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="299" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Status</label>
                  <select value={form.isActive ? 'true' : 'false'} onChange={e => setForm({ ...form, isActive: e.target.value === 'true' })} className={inputClass}>
                    <option value="true">Active — shown on website</option>
                    <option value="false">Inactive — hidden from website</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Tagline</label>
                  <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="e.g. Radiant results, visible from the very first session" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Full description shown on the services page..." className={`${inputClass} resize-none`} />
                </div>
              </div>
            </div>

            {/* ── Icon Picker ── */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Icon</p>
              <p className="text-xs text-slate-400 mb-3">Choose an icon to represent this service on the website.</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {ICON_OPTIONS.map(({ name, label, Icon }) => {
                  const style = getIconStyle(name)
                  const isSelected = form.icon === name
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setForm({ ...form, icon: name })}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-150 ${
                        isSelected
                          ? 'border-blue-900 bg-blue-50 shadow-sm'
                          : 'border-slate-200 hover:border-blue-200 hover:bg-blue-50/40'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${style.color}`} />
                      </div>
                      <span className={`text-[10px] font-medium leading-tight text-center ${isSelected ? 'text-blue-900' : 'text-slate-500'}`}>
                        {label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-blue-900 flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              {form.icon && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                  Selected: <span className="font-semibold text-slate-600">{ICON_OPTIONS.find(o => o.name === form.icon)?.label}</span>
                  <button type="button" onClick={() => setForm({ ...form, icon: '' })} className="text-rose-400 hover:text-rose-600 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </p>
              )}
            </div>

            {/* ── What's Included ── */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What&apos;s Included (Bullet Points)</p>
              <p className="text-xs text-slate-400 mb-3">These appear as a checklist on the public services page.</p>

              {/* Existing items */}
              {form.includes.length > 0 && (
                <div className="space-y-2 mb-3">
                  {form.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                      <div className="w-4 h-4 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-teal-700" strokeWidth={3} />
                      </div>
                      <span className="flex-1 text-sm text-slate-700">{item}</span>
                      <button type="button" onClick={() => removeInclude(i)} className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new item */}
              <div className="flex gap-2">
                <input
                  value={newInclude}
                  onChange={e => setNewInclude(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addInclude() } }}
                  placeholder="Add a bullet point and press Enter or click Add..."
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={addInclude}
                  disabled={!newInclude.trim()}
                  className="btn-primary text-sm py-2.5 px-4 disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* ── Actions ── */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button onClick={handleSave} disabled={!form.name || !form.duration || saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> {editId ? 'Save Changes' : 'Create Service'}</>}
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm py-2.5 px-5">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Services Table ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Service', 'Tagline', 'Duration', 'Price', 'Includes', 'Bookings', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {services.map(s => {
                const IconComponent = getIconComponent(s.icon ?? '')
                const style = getIconStyle(s.icon)
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Service name + icon */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${style.color}`} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">{s.name}</p>
                      </div>
                    </td>

                    {/* Tagline */}
                    <td className="px-4 py-4 max-w-[200px]">
                      <p className="text-xs text-slate-500 truncate">{s.tagline || <span className="text-slate-300 italic">No tagline</span>}</p>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{s.duration}</td>

                    {/* Price */}
                    <td className="px-4 py-4 text-sm text-slate-700 font-medium whitespace-nowrap">
                      {s.price ? `₹${s.price.toLocaleString('en-IN')}` : '—'}
                    </td>

                    {/* Includes count */}
                    <td className="px-4 py-4">
                      {s.includes.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg">
                          <Check className="w-3 h-3" />
                          {s.includes.length} items
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300 italic">None</span>
                      )}
                    </td>

                    {/* Bookings */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-blue-700">{s._count.appointments}</span>
                    </td>

                    {/* Status toggle */}
                    <td className="px-4 py-4">
                      <button onClick={() => toggleActive(s)} className="flex items-center gap-1.5">
                        {s.isActive
                          ? <><ToggleRight className="w-5 h-5 text-teal-500" /><span className="text-xs font-medium text-teal-600">Active</span></>
                          : <><ToggleLeft className="w-5 h-5 text-slate-400" /><span className="text-xs font-medium text-slate-400">Inactive</span></>
                        }
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          disabled={deletingId === s.id}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === s.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
