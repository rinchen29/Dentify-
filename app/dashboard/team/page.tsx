'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, Loader2, Upload, Users } from 'lucide-react'

interface Member {
  id: string
  name: string
  designation: string
  imageUrl: string | null
  experience: string | null
  description: string | null
  sortOrder: number
  isActive: boolean
}

const inputClass =
  'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

const emptyForm = {
  name: '', designation: '', imageUrl: null as string | null,
  experience: '', description: '', sortOrder: '0', isActive: true,
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const AVATAR_COLORS = [
  { bg: 'bg-blue-100',   text: 'text-blue-900' },
  { bg: 'bg-teal-100',   text: 'text-teal-900' },
  { bg: 'bg-violet-100', text: 'text-violet-900' },
  { bg: 'bg-rose-100',   text: 'text-rose-900' },
  { bg: 'bg-amber-100',  text: 'text-amber-900' },
]

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/team')
      const data = await res.json()
      setMembers(data.members ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMembers() }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setImagePreview(null)
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (m: Member) => {
    setEditId(m.id)
    setForm({
      name:        m.name,
      designation: m.designation,
      imageUrl:    m.imageUrl,
      experience:  m.experience ?? '',
      description: m.description ?? '',
      sortOrder:   m.sortOrder.toString(),
      isActive:    m.isActive,
    })
    setImagePreview(m.imageUrl)
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1024 * 1024) { alert('Image must be under 1 MB'); return }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setImagePreview(dataUrl)
      setForm(f => ({ ...f, imageUrl: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setForm(f => ({ ...f, imageUrl: null }))
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        name:        form.name,
        designation: form.designation,
        imageUrl:    form.imageUrl ?? null,
        experience:  form.experience || null,
        description: form.description || null,
        sortOrder:   parseInt(form.sortOrder) || 0,
        isActive:    form.isActive,
      }
      const url    = editId ? `/api/team/${editId}` : '/api/team'
      const method = editId ? 'PATCH' : 'POST'
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      await fetchMembers()
      setShowForm(false)
      setEditId(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    setDeletingId(id)
    await fetch(`/api/team/${id}`, { method: 'DELETE' })
    await fetchMembers()
    setDeletingId(null)
  }

  const toggleActive = async (m: Member) => {
    await fetch(`/api/team/${m.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !m.isActive }),
    })
    await fetchMembers()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="text-slate-500 text-sm mt-1">Shown on the About page — {members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-display font-semibold text-slate-900">
              {editId ? 'Edit Member' : 'Add Team Member'}
            </h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* Photo upload */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Profile Photo</p>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                  {imagePreview ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 text-xs font-medium text-center leading-tight px-2">
                      {form.name ? getInitials(form.name) : <Users className="w-6 h-6 text-slate-300" />}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline text-xs py-2 px-4">
                    <Upload className="w-3.5 h-3.5" /> Upload Photo
                  </button>
                  {imagePreview && (
                    <button type="button" onClick={removeImage} className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700">
                      <X className="w-3 h-3" /> Remove photo
                    </button>
                  )}
                  <p className="text-[10px] text-slate-400">PNG, JPG · Max 1 MB</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Priya Sharma" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Designation *</label>
                  <input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="Cosmetic Dentistry & Implants" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Years of Experience</label>
                  <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 10 Years (optional)" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} placeholder="0" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Short Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    placeholder="A short bio about this team member..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-blue-700" />
                    <span className="text-sm text-slate-700">Show on About page</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={handleSave}
                disabled={!form.name || !form.designation || saving}
                className="btn-primary text-sm py-2.5 px-6 disabled:opacity-50"
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  : <><Check className="w-4 h-4" /> {editId ? 'Save Changes' : 'Add Member'}</>
                }
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm py-2.5 px-5">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cards grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium mb-1">No team members yet</p>
          <p className="text-slate-400 text-sm mb-4">Add your first team member to display them on the About page.</p>
          <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
            <Plus className="w-4 h-4" /> Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {members.map((m, i) => {
            const colorSet = AVATAR_COLORS[i % AVATAR_COLORS.length]
            return (
              <div key={m.id} className={`bg-white rounded-2xl border p-5 transition-all ${m.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-full ${colorSet.bg} flex items-center justify-center shrink-0 overflow-hidden`}>
                    {m.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className={`text-base font-bold ${colorSet.text}`}>{getInitials(m.name)}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-slate-900 text-sm">{m.name}</p>
                    <p className="text-xs text-blue-700 font-medium mt-0.5">{m.designation}</p>
                    {m.experience && (
                      <p className="text-xs text-slate-400 mt-0.5">{m.experience} Experience</p>
                    )}
                    {m.description && (
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{m.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                  <button onClick={() => toggleActive(m)} className="flex items-center gap-1.5">
                    {m.isActive
                      ? <span className="text-xs font-medium text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">Visible</span>
                      : <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">Hidden</span>
                    }
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      disabled={deletingId === m.id}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                    >
                      {deletingId === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
