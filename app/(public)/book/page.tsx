'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Sparkles, Cpu, AlignLeft, Shield, Wind, Star, Stethoscope,
  ChevronRight, ChevronLeft, Check,
  Calendar, Clock, User, Phone, Mail, FileText, Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApiService {
  id: string
  name: string
  description?: string
  duration: string
  price?: number
  isActive: boolean
}

interface BookingData {
  serviceId: string
  serviceName: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

// ─── Icon map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string }> = {
  'whitening': { icon: Sparkles, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  'implant':   { icon: Cpu,       iconBg: 'bg-blue-50',  iconColor: 'text-blue-700' },
  'orthodon':  { icon: AlignLeft, iconBg: 'bg-teal-50',  iconColor: 'text-teal-600' },
  'root':      { icon: Shield,    iconBg: 'bg-rose-50',  iconColor: 'text-rose-600' },
  'cleaning':  { icon: Wind,      iconBg: 'bg-sky-50',   iconColor: 'text-sky-600' },
  'cosmetic':  { icon: Star,      iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
}

function getServiceIcon(name: string) {
  const lower = name.toLowerCase()
  for (const [key, val] of Object.entries(iconMap)) {
    if (lower.includes(key)) return val
  }
  return { icon: Stethoscope, iconBg: 'bg-slate-50', iconColor: 'text-slate-600' }
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
]

const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Schedule' },
  { number: 3, label: 'Details' },
  { number: 4, label: 'Confirm' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-4 right-4 h-px bg-slate-200 z-0" />
        <div
          className="absolute top-4 left-4 h-px bg-blue-900 z-0 transition-all duration-500"
          style={{ width: `${((current - 1) / (steps.length - 1)) * (100 - 8)}%` }}
        />
        {steps.map((step) => (
          <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                current > step.number
                  ? 'bg-blue-900 border-blue-900 text-white'
                  : current === step.number
                  ? 'bg-white border-blue-900 text-blue-900'
                  : 'bg-white border-slate-200 text-slate-400'
              )}
            >
              {current > step.number ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.number}
            </div>
            <span className={cn('text-xs font-medium hidden sm:block', current >= step.number ? 'text-slate-900' : 'text-slate-400')}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Step 1 ──────────────────────────────────────────────────────────────────

function Step1Service({
  services, loadingServices, selected, onSelect,
}: {
  services: ApiService[]
  loadingServices: boolean
  selected: string
  onSelect: (id: string, name: string) => void
}) {
  if (loadingServices) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-1.5">Select Your Service</h2>
      <p className="text-slate-500 text-sm mb-6">Choose the dental treatment you&apos;d like to book.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const { icon: Icon, iconBg, iconColor } = getServiceIcon(service.name)
          const isSelected = selected === service.id
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id, service.name)}
              className={cn(
                'relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-blue-900 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
              )}
            >
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('font-semibold text-sm mb-0.5', isSelected ? 'text-blue-900' : 'text-slate-900')}>
                  {service.name}
                </p>
                {service.description && (
                  <p className="text-slate-400 text-xs leading-relaxed">{service.description}</p>
                )}
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-400 text-xs">{service.duration}</span>
                  {service.price && (
                    <span className="text-slate-400 text-xs ml-2">· ₹{service.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 2 ──────────────────────────────────────────────────────────────────

function Step2Schedule({
  selectedDate, selectedTime, onDateSelect, onTimeSelect,
}: {
  selectedDate: string; selectedTime: string
  onDateSelect: (date: string) => void; onTimeSelect: (time: string) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    return days
  }, [firstDay, daysInMonth])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) } else setViewMonth(viewMonth - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) } else setViewMonth(viewMonth + 1)
  }

  const isDateDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t || d.getDay() === 0
  }

  const formatDate = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, '0')
    const d2 = String(day).padStart(2, '0')
    return `${viewYear}-${m}-${d2}`
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-1.5">Choose Date &amp; Time</h2>
      <p className="text-slate-500 text-sm mb-6">Select your preferred appointment date and time.</p>

      <div className="card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-slate-900 font-semibold text-sm">{monthName}</span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="text-center text-slate-400 text-xs py-1 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />
            const dateStr = formatDate(day)
            const disabled = isDateDisabled(day)
            const isSelected = selectedDate === dateStr
            return (
              <button
                key={dateStr}
                onClick={() => !disabled && onDateSelect(dateStr)}
                disabled={disabled}
                className={cn(
                  'aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all duration-150',
                  disabled
                    ? 'text-slate-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900 cursor-pointer'
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-slate-700 text-sm font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          Available Time Slots
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeSelect(slot)}
              className={cn(
                'px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 border',
                selectedTime === slot
                  ? 'bg-blue-900 border-blue-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50'
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 3 ──────────────────────────────────────────────────────────────────

function Step3Details({
  data, onChange,
}: {
  data: Pick<BookingData, 'name' | 'email' | 'phone' | 'notes'>
  onChange: (field: keyof BookingData, value: string) => void
}) {
  const inputClass =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200 text-sm'

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-1.5">Your Information</h2>
      <p className="text-slate-500 text-sm mb-6">We&apos;ll use these details to confirm your appointment.</p>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <User className="w-3.5 h-3.5 text-blue-700" />
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input type="text" required value={data.name} onChange={(e) => onChange('name', e.target.value)} placeholder="John Smith" className={inputClass} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-700" />
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input type="email" required value={data.email} onChange={(e) => onChange('email', e.target.value)} placeholder="john@example.com" className={inputClass} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input type="tel" required value={data.phone} onChange={(e) => onChange('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            Additional Notes
          </label>
          <textarea rows={3} value={data.notes} onChange={(e) => onChange('notes', e.target.value)} placeholder="Any allergies, concerns, or special requests..." className={`${inputClass} resize-none`} />
        </div>
      </div>
    </div>
  )
}

// ─── Step 4 ──────────────────────────────────────────────────────────────────

function Step4Confirmation({ data, onReset }: { data: BookingData; onReset: () => void }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-5">
        <Check className="w-10 h-10 text-teal-600" strokeWidth={2.5} />
      </div>
      <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
      <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
        Your appointment has been successfully booked. We&apos;ll be in touch at{' '}
        <span className="text-blue-700 font-medium">{data.email}</span>.
      </p>
      <div className="card p-6 text-left max-w-md mx-auto mb-6">
        <h3 className="text-slate-700 font-bold text-xs uppercase tracking-widest mb-4">Booking Summary</h3>
        <div className="space-y-3">
          {[
            { label: 'Service', value: data.serviceName },
            { label: 'Date', value: formatDateDisplay(data.date) },
            { label: 'Time', value: data.time },
            { label: 'Patient', value: data.name },
            { label: 'Email', value: data.email },
            { label: 'Phone', value: data.phone },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4 pb-2 border-b border-slate-50 last:border-0 last:pb-0">
              <span className="text-slate-400 text-xs uppercase tracking-wide shrink-0">{label}</span>
              <span className="text-slate-900 text-sm text-right font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/" className="btn-primary">
          Back to Home
          <ChevronRight className="w-4 h-4" />
        </a>
        <button onClick={onReset} className="btn-outline">Book Another</button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [apiServices, setApiServices] = useState<ApiService[]>([])
  const [loadingServices, setLoadingServices] = useState(true)

  const [booking, setBooking] = useState<BookingData>({
    serviceId: '', serviceName: '', date: '', time: '',
    name: '', email: '', phone: '', notes: '',
  })

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setApiServices((data.services ?? []).filter((s: ApiService) => s.isActive)))
      .catch(() => setApiServices([]))
      .finally(() => setLoadingServices(false))
  }, [])

  const updateField = (field: keyof BookingData, value: string) => {
    setBooking((prev) => ({ ...prev, [field]: value }))
  }

  const selectService = (id: string, name: string) => {
    setBooking((prev) => ({ ...prev, serviceId: id, serviceName: name }))
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return booking.serviceId !== ''
      case 2: return booking.date !== '' && booking.time !== ''
      case 3: return booking.name.trim() !== '' && booking.email.trim() !== '' && booking.phone.trim() !== ''
      default: return true
    }
  }

  const handleNext = async () => {
    if (step < 3) { setStep(step + 1); return }

    // Step 3 → submit to API
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: booking.serviceId,
          date: booking.date,
          time: booking.time,
          patientName: booking.name,
          patientEmail: booking.email,
          patientPhone: booking.phone,
          notes: booking.notes || undefined,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Failed to book appointment. Please try again.')
      }

      setSubmitted(true)
      setStep(4)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setStep(1)
    setSubmitted(false)
    setSubmitError('')
    setBooking({ serviceId: '', serviceName: '', date: '', time: '', name: '', email: '', phone: '', notes: '' })
  }

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-24 w-80 h-80 rounded-full bg-blue-100 opacity-40" />
          <div className="absolute -bottom-16 -left-20 w-72 h-72 rounded-full bg-teal-50 opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-4 mx-auto">
            <Calendar className="w-3.5 h-3.5" />
            Online Booking
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Book Your{' '}
            <span className="text-blue-900">Appointment</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Schedule your visit in under 2 minutes. Choose your service, pick a time, and you&apos;re done.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 pb-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted && <ProgressBar current={step} />}

          <div className="card p-6 lg:p-8 shadow-sm">
            {step === 1 && (
              <Step1Service
                services={apiServices}
                loadingServices={loadingServices}
                selected={booking.serviceId}
                onSelect={selectService}
              />
            )}
            {step === 2 && (
              <Step2Schedule
                selectedDate={booking.date} selectedTime={booking.time}
                onDateSelect={(d) => updateField('date', d)} onTimeSelect={(t) => updateField('time', t)}
              />
            )}
            {step === 3 && (
              <Step3Details
                data={{ name: booking.name, email: booking.email, phone: booking.phone, notes: booking.notes }}
                onChange={updateField}
              />
            )}
            {step === 4 && submitted && <Step4Confirmation data={booking} onReset={handleReset} />}

            {/* Error message */}
            {submitError && (
              <div className="mt-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        'rounded-full transition-all duration-300',
                        s === step ? 'w-6 h-2 bg-blue-900' : s < step ? 'w-2 h-2 bg-blue-300' : 'w-2 h-2 bg-slate-200'
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                  className={cn('btn-primary text-sm', (!canProceed() || submitting) && 'opacity-40 cursor-not-allowed hover:transform-none hover:shadow-none')}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</>
                  ) : (
                    <>{step === 3 ? 'Confirm Booking' : 'Continue'}<ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
