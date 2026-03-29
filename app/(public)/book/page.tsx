'use client'

import { useState, useMemo } from 'react'
import {
  Sparkles,
  Cpu,
  AlignLeft,
  Shield,
  Wind,
  Star,
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  name: string
  description: string
  duration: string
  gradient: string
}

interface BookingData {
  service: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    id: 'whitening',
    icon: Sparkles,
    name: 'Teeth Whitening',
    description: 'Professional whitening for a brighter smile',
    duration: '60–90 min',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    id: 'implants',
    icon: Cpu,
    name: 'Dental Implants',
    description: 'Permanent tooth replacement solution',
    duration: 'Multiple visits',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    id: 'orthodontics',
    icon: AlignLeft,
    name: 'Orthodontics',
    description: 'Straighter teeth with braces or aligners',
    duration: '12–24 months',
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    id: 'rootcanal',
    icon: Shield,
    name: 'Root Canal',
    description: 'Pain-free treatment to save your tooth',
    duration: '60–120 min',
    gradient: 'from-violet-500 to-cyan-500',
  },
  {
    id: 'cleaning',
    icon: Wind,
    name: 'Dental Cleaning',
    description: 'Professional cleaning and oral health check',
    duration: '45–60 min',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    id: 'cosmetic',
    icon: Star,
    name: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and smile makeovers',
    duration: 'Varies',
    gradient: 'from-violet-400 to-violet-600',
  },
]

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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-4 left-4 right-4 h-px bg-white/10 z-0" />
        <div
          className="absolute top-4 left-4 h-px bg-gradient-to-r from-cyan-500 to-violet-500 z-0 transition-all duration-500"
          style={{ width: `${((current - 1) / (steps.length - 1)) * (100 - 8)}%` }}
        />

        {steps.map((step) => (
          <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                current > step.number
                  ? 'bg-gradient-to-br from-cyan-400 to-violet-400 border-transparent text-white shadow-glow-cyan-sm'
                  : current === step.number
                  ? 'bg-[#0f172a] border-cyan-500 text-cyan-400'
                  : 'bg-[#0f172a] border-white/10 text-slate-600'
              )}
            >
              {current > step.number ? (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                'text-xs font-medium hidden sm:block',
                current >= step.number ? 'text-white' : 'text-slate-600'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Step Components ─────────────────────────────────────────────────────────

function Step1Service({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Select Your Service
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Choose the dental treatment you&apos;d like to book an appointment for.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selected === service.id
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={cn(
                'relative flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 group',
                isSelected
                  ? 'border-cyan-500/50 bg-cyan-500/10 shadow-glow-cyan-sm'
                  : 'border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0',
                  service.gradient
                )}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'font-semibold text-sm mb-0.5 transition-colors',
                    isSelected ? 'text-cyan-300' : 'text-white'
                  )}
                >
                  {service.name}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-slate-600 text-xs">{service.duration}</span>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center">
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

function Step2Schedule({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: {
  selectedDate: string
  selectedTime: string
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    return days
  }, [firstDay, daysInMonth])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const isDateDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t || d.getDay() === 0 // disable past dates and Sundays
  }

  const formatDate = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, '0')
    const d2 = String(day).padStart(2, '0')
    return `${viewYear}-${m}-${d2}`
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Choose Date &amp; Time
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Select your preferred appointment date and time slot.
      </p>

      {/* Calendar */}
      <div className="glass rounded-2xl p-5 border border-white/5 mb-5">
        {/* Month Nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-white font-semibold text-sm">{monthName}</span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="text-center text-slate-600 text-xs py-1 font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
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
                    ? 'text-slate-700 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-glow-cyan-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer'
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <p className="text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
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
                  ? 'bg-gradient-to-br from-cyan-500 to-violet-500 border-transparent text-white shadow-glow-cyan-sm'
                  : 'bg-white/3 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/10'
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

function Step3Details({
  data,
  onChange,
}: {
  data: Pick<BookingData, 'name' | 'email' | 'phone' | 'notes'>
  onChange: (field: keyof BookingData, value: string) => void
}) {
  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-200 text-sm'

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Your Information
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        We&apos;ll use these details to confirm your appointment and send reminders.
      </p>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="John Smith"
            className={inputClass}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Additional Notes
          </label>
          <textarea
            rows={3}
            value={data.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Any allergies, concerns, or special requests..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  )
}

function Step4Confirmation({
  data,
  onReset,
}: {
  data: BookingData
  onReset: () => void
}) {
  const serviceName = services.find((s) => s.id === data.service)?.name ?? data.service

  return (
    <div className="text-center">
      {/* Animated checkmark */}
      <div className="relative inline-flex mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-400/20 blur-xl rounded-full scale-150" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-glow-cyan mx-auto">
          <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h2 className="font-display text-3xl font-bold text-white mb-2">
        Booking Confirmed!
      </h2>
      <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
        Your appointment has been successfully booked. We&apos;ve sent a confirmation
        to <span className="text-cyan-400">{data.email}</span>.
      </p>

      {/* Summary Card */}
      <div className="glass rounded-2xl p-6 border border-white/10 text-left max-w-md mx-auto mb-6">
        <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
          Booking Summary
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Service', value: serviceName },
            { label: 'Date', value: formatDateDisplay(data.date) },
            { label: 'Time', value: data.time },
            { label: 'Patient', value: data.name },
            { label: 'Email', value: data.email },
            { label: 'Phone', value: data.phone },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-slate-500 text-xs uppercase tracking-wide shrink-0">
                {label}
              </span>
              <span className="text-white text-sm text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/" className="btn-primary text-sm">
          Back to Home
          <ChevronRight className="w-4 h-4" />
        </a>
        <button onClick={onReset} className="btn-ghost text-sm">
          Book Another
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [booking, setBooking] = useState<BookingData>({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const updateField = (field: keyof BookingData, value: string) => {
    setBooking((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return booking.service !== ''
      case 2:
        return booking.date !== '' && booking.time !== ''
      case 3:
        return (
          booking.name.trim() !== '' &&
          booking.email.trim() !== '' &&
          booking.phone.trim() !== ''
        )
      default:
        return true
    }
  }

  const handleNext = () => {
    if (step === 3) {
      setSubmitted(true)
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  const handleReset = () => {
    setStep(1)
    setSubmitted(false)
    setBooking({
      service: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    })
  }

  return (
    <main className="bg-[#030712] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[20%] w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-[20%] w-60 h-60 bg-violet-500/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-4 mx-auto">
            <Calendar className="w-3.5 h-3.5" />
            Online Booking
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            Book Your{' '}
            <span className="gradient-text">Appointment</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Schedule your visit in under 2 minutes. Choose your service, pick a time, and you&apos;re done.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          {!submitted && <ProgressBar current={step} />}

          {/* Card */}
          <div className="glass rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl">
            {step === 1 && (
              <Step1Service
                selected={booking.service}
                onSelect={(id) => updateField('service', id)}
              />
            )}
            {step === 2 && (
              <Step2Schedule
                selectedDate={booking.date}
                selectedTime={booking.time}
                onDateSelect={(d) => updateField('date', d)}
                onTimeSelect={(t) => updateField('time', t)}
              />
            )}
            {step === 3 && (
              <Step3Details
                data={{
                  name: booking.name,
                  email: booking.email,
                  phone: booking.phone,
                  notes: booking.notes,
                }}
                onChange={updateField}
              />
            )}
            {step === 4 && submitted && <Step4Confirmation data={booking} onReset={handleReset} />}

            {/* Navigation */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    step === 1
                      ? 'text-slate-700 cursor-not-allowed'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        'rounded-full transition-all duration-300',
                        s === step
                          ? 'w-6 h-2 bg-gradient-to-r from-cyan-500 to-violet-500'
                          : s < step
                          ? 'w-2 h-2 bg-cyan-500/50'
                          : 'w-2 h-2 bg-white/10'
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={cn(
                    'btn-primary text-sm',
                    !canProceed() && 'opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-none'
                  )}
                >
                  {step === 3 ? 'Confirm Booking' : 'Continue'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
