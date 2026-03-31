const ITEMS = [
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'Root Canal Therapy',
  'Cosmetic Dentistry',
  'Dental Cleaning',
  'Same-Day Appointments',
  'Pain-Free Treatment',
]

const DOT = <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block mx-4 shrink-0" />

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-blue-900 overflow-hidden py-3.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-xs font-semibold tracking-[0.12em] uppercase text-blue-200"
          >
            {item}
            {DOT}
          </span>
        ))}
      </div>
    </div>
  )
}
