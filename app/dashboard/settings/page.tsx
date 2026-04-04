'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Settings, Lock, Check, Loader2, Building2, Upload, X, Image,
  Mail, Users, Plus, Trash2, ShieldCheck, ShieldAlert,
} from 'lucide-react'
import { useSiteConfigRefetch } from '@/lib/SiteConfigContext'

const inputClass =
  'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'STAFF'
  createdAt: string
}

// ── Feedback banner ──────────────────────────────────────────────────────────

function Banner({ msg, isError }: { msg: string; isError?: boolean }) {
  if (!msg) return null
  return (
    <div className={`px-4 py-2.5 rounded-xl text-sm font-medium ${isError ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}`}>
      {msg}
    </div>
  )
}

export default function SettingsPage() {
  const refetch = useSiteConfigRefetch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Clinic config ──
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [clinicMsg, setClinicMsg] = useState('')
  const [clinicErr, setClinicErr] = useState(false)

  const [form, setForm] = useState({
    clinicName: '', tagline: '', phone: '', whatsapp: '',
    email: '', address: '', city: '', logoUrl: '' as string | null,
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  // ── Password change ──
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [pwErr, setPwErr] = useState(false)

  // ── Email change ──
  const [emailForm, setEmailForm] = useState({ newEmail: '', password: '' })
  const [emailSaving, setEmailSaving] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  // ── User access ──
  const [users, setUsers] = useState<User[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STAFF' })
  const [addingUser, setAddingUser] = useState(false)
  const [userMsg, setUserMsg] = useState('')
  const [userErr, setUserErr] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // ── Load clinic config ──
  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => {
        if (d.config) {
          const c = d.config
          setForm({ clinicName: c.clinicName, tagline: c.tagline, phone: c.phone, whatsapp: c.whatsapp, email: c.email, address: c.address, city: c.city, logoUrl: c.logoUrl ?? null })
          if (c.logoUrl) setLogoPreview(c.logoUrl)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // ── Load users ──
  const fetchUsers = () => {
    setUsersLoading(true)
    fetch('/api/users')
      .then(r => r.json())
      .then(d => { if (d.users) setUsers(d.users) })
      .finally(() => setUsersLoading(false))
  }
  useEffect(() => { fetchUsers() }, [])

  // ── Logo ──
  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 512 * 1024) { alert('Logo must be under 512 KB'); return }
    const reader = new FileReader()
    reader.onload = () => {
      const url = reader.result as string
      setLogoPreview(url)
      setForm(f => ({ ...f, logoUrl: url }))
    }
    reader.readAsDataURL(file)
  }
  const removeLogo = () => {
    setLogoPreview(null)
    setForm(f => ({ ...f, logoUrl: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ── Save clinic config ──
  const handleSaveClinic = async () => {
    setSaving(true); setClinicMsg(''); setClinicErr(false)
    try {
      const res = await fetch('/api/config', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      await refetch()
      setClinicMsg('Clinic settings saved successfully.')
      setTimeout(() => setClinicMsg(''), 4000)
    } catch {
      setClinicErr(true); setClinicMsg('Failed to save clinic settings.')
    } finally {
      setSaving(false)
    }
  }

  // ── Change password ──
  const handleChangePassword = async () => {
    setPwMsg(''); setPwErr(false)
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) { setPwErr(true); setPwMsg('All password fields are required.'); return }
    if (pwForm.next !== pwForm.confirm) { setPwErr(true); setPwMsg('New passwords do not match.'); return }
    if (pwForm.next.length < 6) { setPwErr(true); setPwMsg('New password must be at least 6 characters.'); return }
    setPwSaving(true)
    try {
      const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setPwMsg('Password updated. Please log in again with your new password.')
      setPwForm({ current: '', next: '', confirm: '' })
    } catch (e) {
      setPwErr(true); setPwMsg(e instanceof Error ? e.message : 'Failed to update password.')
    } finally {
      setPwSaving(false)
    }
  }

  // ── Change email ──
  const handleChangeEmail = async () => {
    setEmailMsg(''); setEmailErr(false)
    if (!emailForm.newEmail || !emailForm.password) { setEmailErr(true); setEmailMsg('Both fields are required.'); return }
    setEmailSaving(true)
    try {
      const res = await fetch('/api/auth/change-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(emailForm) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setEmailMsg('Email updated. Please log in again with your new email.')
      setEmailForm({ newEmail: '', password: '' })
    } catch (e) {
      setEmailErr(true); setEmailMsg(e instanceof Error ? e.message : 'Failed to update email.')
    } finally {
      setEmailSaving(false)
    }
  }

  // ── Add user ──
  const handleAddUser = async () => {
    setUserMsg(''); setUserErr(false)
    if (!newUser.name || !newUser.email || !newUser.password) { setUserErr(true); setUserMsg('All fields are required.'); return }
    setAddingUser(true)
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUserMsg(`User ${data.user.name} created successfully.`)
      setNewUser({ name: '', email: '', password: '', role: 'STAFF' })
      setShowAddUser(false)
      fetchUsers()
      setTimeout(() => setUserMsg(''), 4000)
    } catch (e) {
      setUserErr(true); setUserMsg(e instanceof Error ? e.message : 'Failed to create user.')
    } finally {
      setAddingUser(false)
    }
  }

  // ── Change role ──
  const handleRoleChange = async (id: string, role: string) => {
    await fetch(`/api/users/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }) })
    fetchUsers()
  }

  // ── Delete user ──
  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      fetchUsers()
    } catch (e) {
      setUserErr(true); setUserMsg(e instanceof Error ? e.message : 'Failed to delete user.')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage clinic config, account security, and user access</p>
      </div>

      {/* ── Clinic Identity ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-blue-700" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Clinic Identity</h2>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
              {logoPreview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                : <Image className="w-6 h-6 text-slate-300" />}
            </div>
            <div className="flex flex-col gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoFile} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline text-xs py-2 px-4">
                <Upload className="w-3.5 h-3.5" /> Upload Logo
              </button>
              {logoPreview && (
                <button type="button" onClick={removeLogo} className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 transition-colors">
                  <X className="w-3 h-3" /> Remove logo
                </button>
              )}
              <p className="text-[10px] text-slate-400">PNG, JPG, SVG · Max 512 KB</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Clinic Name</label>
            <input value={form.clinicName} onChange={e => setForm({ ...form, clinicName: e.target.value })} placeholder="Dentify" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Tagline</label>
            <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Your Smile Deserves the Best" className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Contact Info ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
            <Settings className="w-4 h-4 text-teal-600" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Contact Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">WhatsApp Number</label>
            <input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="919876543210" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@dentify.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Address</label>
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="B-12, Sector 18, Noida" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">City / State / PIN</label>
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Uttar Pradesh 201301" className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Save clinic ── */}
      <div className="flex items-center gap-3">
        <button onClick={handleSaveClinic} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> Save Clinic Settings</>}
        </button>
        <Banner msg={clinicMsg} isError={clinicErr} />
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
            <Lock className="w-4 h-4 text-rose-600" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Change Password</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Current Password</label>
            <input type="password" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">New Password</label>
            <input type="password" value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
            <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleChangePassword} disabled={pwSaving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">
            {pwSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Lock className="w-4 h-4" /> Update Password</>}
          </button>
          <Banner msg={pwMsg} isError={pwErr} />
        </div>
      </div>

      {/* ── Change Email ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
            <Mail className="w-4 h-4 text-violet-600" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Change Login Email</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">New Email Address</label>
            <input type="email" value={emailForm.newEmail} onChange={e => setEmailForm({ ...emailForm, newEmail: e.target.value })} placeholder="newemail@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm with Password</label>
            <input type="password" value={emailForm.password} onChange={e => setEmailForm({ ...emailForm, password: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleChangeEmail} disabled={emailSaving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">
            {emailSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Mail className="w-4 h-4" /> Update Email</>}
          </button>
          <Banner msg={emailMsg} isError={emailErr} />
        </div>
      </div>

      {/* ── User Access ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 pb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="font-display font-semibold text-slate-900">User Access</h2>
          </div>
          <button onClick={() => { setShowAddUser(!showAddUser); setUserMsg(''); setUserErr(false) }} className="btn-outline text-xs py-2 px-4">
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
        </div>

        {/* Add user form */}
        {showAddUser && (
          <div className="mb-5 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">New User</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Full Name</label>
                <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="Jane Doe" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Email</label>
                <input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="jane@dentify.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Password</label>
                <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="Min 6 characters" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className={inputClass}>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button onClick={handleAddUser} disabled={addingUser} className="btn-primary text-xs py-2 px-4 disabled:opacity-60">
                {addingUser ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating...</> : <><Plus className="w-3.5 h-3.5" /> Create User</>}
              </button>
              <button onClick={() => { setShowAddUser(false); setUserMsg('') }} className="btn-outline text-xs py-2 px-4">Cancel</button>
            </div>
          </div>
        )}

        <Banner msg={userMsg} isError={userErr} />

        {/* User list */}
        {usersLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2 mt-4">
            {users.map(u => (
              <div key={u.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-700">
                    {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{u.name}</p>
                  <p className="text-xs text-slate-400 truncate">{u.email}</p>
                </div>
                <select
                  value={u.role}
                  onChange={e => handleRoleChange(u.id, e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-blue-400"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="STAFF">Staff</option>
                </select>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${u.role === 'ADMIN' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  {u.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                  {u.role}
                </div>
                <button
                  onClick={() => handleDeleteUser(u.id, u.name)}
                  disabled={deletingId === u.id}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors disabled:opacity-50"
                >
                  {deletingId === u.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
