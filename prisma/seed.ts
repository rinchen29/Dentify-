import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@1234', 12)
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@dentify.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@dentify.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✓ Admin user:', admin.email)

  // Services with full rich content
  const services = [
    {
      name: 'Teeth Whitening',
      icon: 'Sparkles',
      tagline: 'Radiant results, visible from the very first session',
      description: 'Our professional teeth whitening treatments use clinically proven, enamel-safe formulas to lift years of staining in a single visit. Whether you choose our in-chair laser whitening or take-home tray system, you\'ll achieve dramatic, long-lasting results.',
      includes: [
        'Pre-treatment shade assessment',
        'Custom-fitted whitening trays',
        'Professional-grade whitening gel',
        'Post-treatment sensitivity care',
        'Take-home maintenance kit',
      ],
      duration: '60–90 min',
      price: 299,
    },
    {
      name: 'Dental Implants',
      icon: 'Cpu',
      tagline: 'Permanent, natural-looking tooth replacement',
      description: 'Dental implants are the gold standard for replacing missing teeth. Using a titanium post surgically placed in the jawbone, we create a stable foundation for a lifelike crown that looks, feels, and functions exactly like your natural tooth.',
      includes: [
        '3D cone beam CT scan',
        'Surgical implant placement',
        'Custom porcelain crown fabrication',
        'Full osseointegration monitoring',
        'Lifetime structural warranty',
      ],
      duration: 'Multiple visits',
      price: 2500,
    },
    {
      name: 'Orthodontics',
      icon: 'AlignLeft',
      tagline: 'Straighter teeth, greater confidence',
      description: 'Whether you opt for traditional metal braces or our virtually invisible clear aligner system, our orthodontic treatments use advanced digital treatment planning to map your smile\'s transformation before we even begin.',
      includes: [
        'Digital iTero intraoral scan',
        'Custom treatment simulation',
        'Clear aligners or metal/ceramic braces',
        'Monthly progress monitoring',
        'Retainer included at completion',
      ],
      duration: '12–24 months',
      price: 3500,
    },
    {
      name: 'Root Canal',
      icon: 'Shield',
      tagline: 'Save your tooth, eliminate the pain',
      description: 'Modern root canal therapy is nothing to fear. Using microscope-assisted techniques and advanced rotary instrumentation, our endodontists clean, shape, and seal infected root canals — usually completing the procedure in a single comfortable visit.',
      includes: [
        'Digital periapical X-rays',
        'Rotary endodontic instrumentation',
        'Biocompatible root filling material',
        'Temporary and permanent restoration',
        'Post-treatment care instructions',
      ],
      duration: '60–120 min',
      price: 800,
    },
    {
      name: 'Dental Cleaning',
      icon: 'Wind',
      tagline: 'The foundation of lifelong oral health',
      description: 'Professional dental cleaning goes far beyond what a toothbrush can achieve. Our hygienists use ultrasonic scalers and hand instruments to remove calcified deposits, polish surfaces, and assess your gum health.',
      includes: [
        'Full oral health examination',
        'Supragingival and subgingival scaling',
        'Air-polishing stain removal',
        'Fluoride treatment',
        'Personalized home care coaching',
      ],
      duration: '45–60 min',
      price: 150,
    },
    {
      name: 'Cosmetic Dentistry',
      icon: 'Star',
      tagline: 'Artistry and science, perfectly combined',
      description: 'From ultra-thin porcelain veneers and composite bonding to full-arch rehabilitations, our cosmetic team blends artistic vision with clinical mastery to craft smiles that look naturally stunning and feel completely comfortable.',
      includes: [
        'Smile design consultation with mock-up',
        'Porcelain or composite veneers',
        'Dental bonding and contouring',
        'Gum line recontouring',
        'Complete smile makeover planning',
      ],
      duration: 'Varies',
      price: 1200,
    },
  ]

  for (const s of services) {
    await prisma.service.upsert({
      where: { name: s.name },
      update: { icon: s.icon, tagline: s.tagline, description: s.description, includes: s.includes, duration: s.duration, price: s.price },
      create: s,
    })
  }
  console.log(`✓ ${services.length} services seeded`)

  // Team members
  const teamData = [
    { name: 'Dr. Alexandra Chen', designation: 'Cosmetic Dentistry & Implants',  experience: '18 Years', description: 'Dr. Chen brings 18 years of expertise in smile transformations, combining artistry with advanced cosmetic and implant techniques.', sortOrder: 1 },
    { name: 'Dr. Marcus Williams', designation: 'Orthodontics & Aligners',       experience: '12 Years', description: 'Specialising in digital treatment planning and clear aligners, Dr. Williams has helped thousands achieve perfectly aligned smiles.', sortOrder: 2 },
    { name: 'Dr. Priya Sharma',   designation: 'Endodontics & Periodontics',     experience: '10 Years', description: 'Dr. Sharma is renowned for her gentle approach to complex root canal procedures and advanced gum care treatments.', sortOrder: 3 },
  ]
  for (const t of teamData) {
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } })
    if (!existing) await prisma.teamMember.create({ data: t })
  }
  console.log(`✓ ${teamData.length} team members seeded`)

  // Homepage stats
  const statsData = [
    { label: 'Patients Treated', description: 'Satisfied patients and counting', value: 8000, suffix: '+', decimal: false, icon: 'Users',       iconBg: 'bg-blue-50',  iconColor: 'text-blue-700',  numColor: 'text-blue-900',  sortOrder: 1 },
    { label: 'Years Experience', description: 'Decades of dental excellence',    value: 15,   suffix: '+', decimal: false, icon: 'Calendar',    iconBg: 'bg-teal-50',  iconColor: 'text-teal-700',  numColor: 'text-teal-700',  sortOrder: 2 },
    { label: 'Patient Rating',   description: 'Consistently top-rated clinic',  value: 49,   suffix: '/5',decimal: true,  icon: 'Star',        iconBg: 'bg-amber-50', iconColor: 'text-amber-600', numColor: 'text-amber-600', sortOrder: 3 },
    { label: 'Dental Services',  description: 'Comprehensive care solutions',   value: 25,   suffix: '+', decimal: false, icon: 'Stethoscope', iconBg: 'bg-blue-50',  iconColor: 'text-blue-700',  numColor: 'text-blue-900',  sortOrder: 4 },
  ]
  for (const s of statsData) {
    const existing = await prisma.stat.findFirst({ where: { label: s.label } })
    if (!existing) await prisma.stat.create({ data: s })
  }
  console.log(`✓ ${statsData.length} homepage stats seeded`)

  // Sample patients
  const patients = [
    { name: 'Sarah Miller',    email: 'sarah.miller@example.com', phone: '+1 (555) 100-0001' },
    { name: 'James Rodriguez', email: 'james.r@example.com',      phone: '+1 (555) 100-0002' },
    { name: 'Emily Kowalski',  email: 'emily.k@example.com',      phone: '+1 (555) 100-0003' },
  ]
  for (const p of patients) {
    await prisma.patient.upsert({ where: { email: p.email }, update: {}, create: p })
  }
  console.log(`✓ ${patients.length} sample patients seeded`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
