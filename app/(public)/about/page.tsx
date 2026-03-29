import Link from 'next/link'
import { ChevronRight, Target, Heart, Lightbulb, Star, Users, Calendar, Stethoscope } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description:
      'We never settle for good enough. Every procedure, every interaction, every smile is an opportunity to exceed expectations.',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description:
      'We understand dental anxiety is real. Our entire team is trained to provide care with empathy, patience, and warmth.',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We continuously invest in the latest dental technologies to ensure our patients receive the best care available anywhere.',
    gradient: 'from-cyan-500 to-violet-500',
  },
]

const team = [
  {
    name: 'Dr. Alexandra Chen',
    specialty: 'Cosmetic Dentistry & Implants',
    experience: '18 Years',
    initials: 'AC',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Dr. Marcus Williams',
    specialty: 'Orthodontics & Aligners',
    experience: '12 Years',
    initials: 'MW',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Endodontics & Periodontics',
    experience: '10 Years',
    initials: 'PS',
    gradient: 'from-cyan-500 to-violet-500',
  },
]

const stats = [
  { icon: Users, value: '5,000+', label: 'Happy Patients', color: 'cyan' },
  { icon: Calendar, value: '15+', label: 'Years of Service', color: 'violet' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'cyan' },
  { icon: Stethoscope, value: '25+', label: 'Services Offered', color: 'violet' },
]

export default function AboutPage() {
  return (
    <main className="bg-[#030712] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[20%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-[20%] w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              Our Story
            </span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
            About{' '}
            <span className="gradient-text">Dentify</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            For over 15 years, Dentify has been at the forefront of dental innovation,
            combining clinical excellence with a genuine passion for patient wellbeing.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5">
                Our{' '}
                <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Dentify was founded on a simple belief: everyone deserves access to exceptional
                dental care delivered with compassion, transparency, and cutting-edge expertise.
                We&apos;ve built our practice around that belief every single day.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                From the moment you step through our doors, you&apos;ll experience a different kind
                of dental care — one where your comfort, questions, and goals are always our
                highest priority. We treat you like family because, to us, you are.
              </p>
              <Link href="/book" className="btn-primary text-sm group">
                Book a Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-3xl rounded-3xl" />
              <div className="relative glass rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5">
                        <Icon
                          className={`w-6 h-6 mx-auto mb-2 ${
                            stat.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                          }`}
                        />
                        <div
                          className={`font-display text-2xl font-black mb-1 ${
                            stat.color === 'cyan' ? 'gradient-text' : 'gradient-text-reverse'
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-slate-400 text-xs">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4">What We Stand For</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Our Core{' '}
              <span className="gradient-text">Values</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              These aren&apos;t just words on a wall — they guide every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="glass rounded-2xl p-6 border border-white/5 group hover:-translate-y-2 transition-transform duration-300 text-center"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4">Meet the Experts</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Our Expert{' '}
              <span className="gradient-text">Team</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Award-winning dentists with decades of combined experience and a shared passion
              for transforming smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass rounded-2xl p-6 border border-white/5 group hover:-translate-y-2 transition-transform duration-300 text-center"
              >
                {/* Avatar */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 shadow-xl`}
                >
                  <span className="text-white text-xl font-black">{member.initials}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-2">{member.specialty}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-slate-400 text-xs">{member.experience} Experience</span>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-0.5 mt-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Join the{' '}
            <span className="gradient-text">Dentify Family</span>?
          </h2>
          <p className="text-slate-400 mb-8">
            Experience the Dentify difference for yourself. Book your first appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">
              Book Appointment
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
