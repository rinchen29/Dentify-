'use client'

import { useState, useEffect, useRef } from 'react'
import { Settings, Lock, Check, Loader2, Building2, Upload, X, Image } from 'lucide-react'
import { useSiteConfigRefetch } from '@/lib/SiteConfigContext'

const inputClass =
  'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white'

export default function SettingsPage() {
  const refetch = useSiteConfigRefetch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    clinicName: '', tagline: '', phone: '', whatsapp: '',
    email: '', address: '', city: '', logoUrl: '' as string | null,
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => {
        if (d.config) {
          const c = d.config
          setForm({
            clinicName: c.clinicName,
            tagline:    c.tagline,
            phone:      c.phone,
            whatsapp:   c.whatsapp,
            email:      c.email,
            address:    c.address,
            city:       c.city,
            logoUrl:    c.logoUrl ?? null,
          })
          if (c.logoUrl) setLogoPreview(c.logoUrl)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 512 * 1024) {
      alert('Logo must be under 512 KB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setLogoPreview(dataUrl)
      setForm(f => ({ ...f, logoUrl: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setForm(f => ({ ...f, logoUrl: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })
      // Refresh context so Navbar/Footer/Hero update immediately
      await refetch()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      // Clear password fields
      setPwForm({ current: '', next: '', confirm: '' })
    } finally {
      setSaving(false)
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
        <p className="text-slate-500 text-sm mt-1">Changes apply instantly across the entire website</p>
      </div>

      {/* ── Clinic Identity ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-blue-700" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Clinic Identity</h2>
        </div>

        {/* Logo upload */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Logo</label>
          <div className="flex items-center gap-4">
            {/* Preview */}
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
              ) : (
                <Image className="w-6 h-6 text-slate-300" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-outline text-xs py-2 px-4"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Logo
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
            <p className="text-[10px] text-slate-400 mt-1">Shown on Navbar, Hero, Footer, Contact page</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">WhatsApp Number</label>
            <input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="919876543210 (no + or spaces)" className={inputClass} />
            <p className="text-[10px] text-slate-400 mt-1">Digits only — used for wa.me link</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@dentify.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Address Line 1</label>
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="B-12, Sector 18, Noida" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">City / State / PIN</label>
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Uttar Pradesh 201301" className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Security ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
            <Lock className="w-4 h-4 text-rose-600" />
          </div>
          <h2 className="font-display font-semibold text-slate-900">Change Password</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Current Password</label>
            <input type="password" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
          <div />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">New Password</label>
            <input type="password" value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
            <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="••••••••" className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Save ── */}
      <div className="flex items-center gap-3 pb-8">
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
          {saving
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            : saved
            ? <><Check className="w-4 h-4" /> Saved!</>
            : 'Save Changes'
          }
        </button>
        {saved && (
          <span className="text-teal-600 text-sm font-medium animate-fade-in">
            ✓ Applied to Navbar, Footer, and all pages.
          </span>
        )}
      </div>
    </div>
  )
}
