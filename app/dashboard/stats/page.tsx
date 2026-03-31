'use client'

import { useEffect, useState } from 'react'
import {
  Users, Calendar, Star, Stethoscope, TrendingUp, Award,
  Heart, Smile, Shield, Plus, Pencil, Trash2, Check, X, Loader2,
} from 'lucide-react'

// ─── Icon registry ────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  { name: 'Users',        label: 'Patients',  Icon: Users },
  { name: 'Calendar',     label: 'Calendar',  Icon: Calendar },
  { name: 'Star',         label: 'Rating',    Icon: Star },
  { name: 'Stethoscope',  label: 'Services',  Icon: Stethoscope },
  { name: 'TrendingUp',   label: 'Growth',    Icon: TrendingUp },
  { name: 'Award',        label: 'Award',     Icon: Award },
  { name: 'Heart',        label: 'Care',      Icon: Heart },
  { name: 'Smile',        label: 'Smiles',    Icon: Smile },
  { name: 'Shield',       label: 'Safety',    Icon: Shield },
]

const COLOR_OPTIONS = [
  { label: 'Blue',   bg: 'bg-blue-50',   color: 'text-blue-700',   num: 'text-blue-900' },
  { label: 'Teal',   bg: 'bg-teal-50',   color: 'text-teal-600',   num: 'text-teal-700' },
  { label: 'Amber',  bg: 'bg-amber-50',  color: 'text-amber-600',  num: 'text-amber-600' },
  { label: 'Violet', bg: 'bg-violet-50', color: 'text-violet-600', num: 'text-violet-700' },
  { label: 'Rose',   bg: 'bg-rose-50',   color: 'text-rose-600',   num: 'text-rose-700' },
  { label: 'Green',  bg: 'bg-green-50',  color: 'text-green-700',  num: 'text-green-800' },
]

function getIconComponent(name: string): React.ElementType {
  return ICON_OPTIONS.find(o => o.name === name)?.Icon ?? Stethoscope
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  id: string
  label: string
  description: string
  value: number
  suffix: string
  decimal: boolean
  icon: string
  iconBg: string
  iconColor: string
  numColor: string
  sortOrder: number
  isActive: boolean
}

const inputClass = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

const emptyForm = {
  label: '', description: '', value: '', suffix: '+',
  decimal: false, icon: 'Users',
  iconBg: 'bg-blue-50', iconColor: 'text-blue-700', numColor: 'text-blue-900',
  sortOrder: '0', isActive: true,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data.stats ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (s: Stat) => {
    setEditId(s.id)
    setForm({
      label: s.label,
      description: s.description,
      value: s.value.toString(),
      suffix: s.suffix,
      decimal: s.decimal,
      icon: s.icon,
      iconBg: s.iconBg,
      iconColor: s.iconColor,
      numColor: s.numColor,
      sortOrder: s.sortOrder.toString(),
      isActive: s.isActive,
    })
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const setColor = (opt: typeof COLOR_OPTIONS[0]) => {
    setForm(f => ({ ...f, iconBg: opt.bg, iconColor: opt.color, numColor: opt.num }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        label:       form.label,
        description: form.description,
        value:       parseInt(form.value) || 0,
        suffix:      form.suffix,
        decimal:     form.decimal,
        icon:        form.icon,
        iconBg:      form.iconBg,
        iconColor:   form.iconColor,
        numColor:    form.numColor,
        sortOrder:   parseInt(form.sortOrder) || 0,
        isActive:    form.isActive,
      }
      const url = editId ? `/api/stats/${editId}` : '/api/stats'
      const method = editId ? 'PATCH' : 'POST'
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      await fetchStats()
      setShowForm(false)
      setEditId(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this stat? This cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/stats/${id}`, { method: 'DELETE' })
    await fetchStats()
    setDeletingId(null)
  }

  const toggleActive = async (s: Stat) => {
    await fetch(`/api/stats/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !s.isActive }),
    })
    await fetchStats()
  }

  const displayValue = (s: Stat) =>
    s.decimal ? `${(s.value / 10).toFixed(1)}${s.suffix}` : `${s.value.toLocaleString('en-IN')}${s.suffix}`

  const selectedColor = COLOR_OPTIONS.find(c => c.bg === form.iconBg)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Homepage Stats</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the statistics shown on the public homepage</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Stat
        </button>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-display font-semibold text-slate-900">
              {editId ? 'Edit Stat' : 'New Stat'}
            </h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* Basic Info */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Stat Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Label *</label>
                  <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="e.g. Patients Treated" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Description *</label>
                  <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="e.g. Satisfied patients and counting" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Value *</label>
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="e.g. 8000" className={inputClass} />
                  <p className="text-[10px] text-slate-400 mt-1">For a rating like 4.9, enter 49 and enable Decimal below.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Suffix</label>
                  <input value={form.suffix} onChange={e => setForm({ ...form, suffix: e.target.value })} placeholder="e.g. + or /5" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} placeholder="0" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Options</label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.decimal} onChange={e => setForm({ ...form, decimal: e.target.checked })} className="w-4 h-4 rounded accent-blue-700" />
                    <span className="text-sm text-slate-700">Decimal mode (divides value by 10 for display)</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-blue-700" />
                    <span className="text-sm text-slate-700">Active — shown on homepage</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Icon</p>
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                {ICON_OPTIONS.map(({ name, label, Icon }) => {
                  const isSelected = form.icon === name
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setForm({ ...form, icon: name })}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${
                        isSelected ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${form.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${form.iconColor}`} />
                      </div>
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-blue-900' : 'text-slate-500'}`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Colour Theme</p>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map(opt => {
                  const isSelected = opt.bg === form.iconBg
                  const PreviewIcon = getIconComponent(form.icon)
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setColor(opt)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${
                        isSelected ? 'border-blue-900' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg ${opt.bg} flex items-center justify-center`}>
                        <PreviewIcon className={`w-3.5 h-3.5 ${opt.color}`} />
                      </div>
                      <span className={`text-xs font-medium ${opt.num}`}>{opt.label}</span>
                      {isSelected && <Check className="w-3 h-3 text-blue-900" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Preview */}
            {form.label && form.value && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Preview</p>
                <div className="inline-block card p-5 text-center min-w-[140px]">
                  <div className={`w-12 h-12 rounded-2xl ${form.iconBg} flex items-center justify-center mx-auto mb-3`}>
                    {(() => { const I = getIconComponent(form.icon); return <I className={`w-6 h-6 ${form.iconColor}`} /> })()}
                  </div>
                  <div className={`font-display text-2xl font-bold ${form.numColor} mb-1`}>
                    {form.decimal
                      ? `${(parseInt(form.value || '0') / 10).toFixed(1)}${form.suffix}`
                      : `${parseInt(form.value || '0').toLocaleString('en-IN')}${form.suffix}`
                    }
                  </div>
                  <p className="text-slate-800 font-semibold text-xs mb-0.5">{form.label}</p>
                  <p className="text-slate-400 text-[10px]">{form.description}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={handleSave}
                disabled={!form.label || !form.description || !form.value || saving}
                className="btn-primary text-sm py-2.5 px-6 disabled:opacity-50"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> {editId ? 'Save Changes' : 'Create Stat'}</>}
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm py-2.5 px-5">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Stats Table ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        </div>
      ) : stats.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-sm mb-4">No stats yet. Add your first stat to display on the homepage.</p>
          <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
            <Plus className="w-4 h-4" /> Add First Stat
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Stat', 'Value', 'Description', 'Sort', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.map(s => {
                const IconComponent = getIconComponent(s.icon)
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${s.iconColor}`} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{s.label}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`font-display text-lg font-bold ${s.numColor}`}>{displayValue(s)}</span>
                    </td>
                    <td className="px-4 py-4 max-w-[200px]">
                      <p className="text-xs text-slate-500 truncate">{s.description}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{s.sortOrder}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleActive(s)} className="flex items-center gap-1.5">
                        {s.isActive
                          ? <span className="text-xs font-medium text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">Active</span>
                          : <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">Hidden</span>
                        }
                      </button>
                    </td>
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
