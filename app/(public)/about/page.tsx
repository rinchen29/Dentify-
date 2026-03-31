import Link from 'next/link'
import { ChevronRight, Target, Heart, Lightbulb, Star, Users, Calendar, Stethoscope } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description:
      'We never settle for good enough. Every procedure, every interaction, every smile is an opportunity to exceed expectations.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description:
      'We understand dental anxiety is real. Our entire team is trained to provide care with empathy, patience, and genuine warmth.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We continuously invest in the latest dental technologies to ensure our patients receive the most advanced care available.',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
]

const AVATAR_COLORS = [
  { bg: 'bg-blue-100',   text: 'text-blue-900',   specialty: 'text-blue-700' },
  { bg: 'bg-teal-100',   text: 'text-teal-900',   specialty: 'text-teal-600' },
  { bg: 'bg-violet-100', text: 'text-violet-900', specialty: 'text-violet-600' },
  { bg: 'bg-rose-100',   text: 'text-rose-900',   specialty: 'text-rose-600' },
  { bg: 'bg-amber-100',  text: 'text-amber-900',  specialty: 'text-amber-600' },
]

function getInitials(name: string) {
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
}

const stats = [
  { icon: Users, value: '8,000+', label: 'Happy Patients', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', numColor: 'text-blue-900' },
  { icon: Calendar, value: '15+', label: 'Years of Service', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', numColor: 'text-teal-700' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', numColor: 'text-amber-600' },
  { icon: Stethoscope, value: '25+', label: 'Services Offered', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', numColor: 'text-blue-900' },
]

export default async function AboutPage() {
  const teamMembers = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  }).catch(() => [])
  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-100 opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-50 opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-5 mx-auto">Our Story</div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            About{' '}
            <span className="text-blue-900">Dentify</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
            For over 15 years, Dentify has been at the forefront of dental innovation,
            combining clinical excellence with a genuine passion for patient wellbeing.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="section-badge mb-4">Our Mission</div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-5">
                Built on a Simple{' '}
                <span className="text-teal-600">Belief</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Dentify was founded on a simple belief: everyone deserves access to exceptional
                dental care delivered with compassion, transparency, and cutting-edge expertise.
                We&apos;ve built our practice around that belief every single day.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                From the moment you step through our doors, you&apos;ll experience a different kind
                of dental care — one where your comfort, questions, and goals are always our
                highest priority. We treat you like family because, to us, you are.
              </p>
              <Link href="/book" className="btn-primary group">
                Book a Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="card p-5 text-center">
                    <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <div className={`font-display text-2xl font-bold ${stat.numColor} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-xs">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4">What We Stand For</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Our Core{' '}
              <span className="text-blue-900">Values</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              These aren&apos;t just words on a wall — they guide every decision we make and every patient we treat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="card bg-white p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${value.iconBg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4">Meet the Experts</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Our Expert{' '}
              <span className="text-blue-900">Team</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Award-winning dentists with decades of combined experience and a shared passion
              for transforming smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => {
              const colors = AVATAR_COLORS[i % AVATAR_COLORS.length]
              return (
                <div key={member.id} className="card p-6 text-center">
                  <div className={`w-20 h-20 rounded-full ${colors.bg} flex items-center justify-center mx-auto mb-4 overflow-hidden`}>
                    {member.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className={`text-xl font-bold ${colors.text}`}>{getInitials(member.name)}</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className={`text-sm font-medium mb-2 ${colors.specialty}`}>{member.designation}</p>
                  {member.experience && (
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-slate-400 text-xs">{member.experience} Experience</span>
                    </div>
                  )}
                  {member.description && (
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{member.description}</p>
                  )}
                  <div className="flex items-center justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Join the{' '}
            <span className="text-teal-300">Dentify Family</span>?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Experience the Dentify difference for yourself. Book your first appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-white group">
              Book Appointment
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-white-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
