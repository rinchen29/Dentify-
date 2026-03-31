import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { createAppointmentSchema } from '@/lib/validations/appointment'

// GET /api/appointments — list all (admin) or create
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const skip = (page - 1) * limit

    const where = status ? { status: status as never } : {}

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          patient: { select: { id: true, name: true, email: true, phone: true } },
          service: { select: { id: true, name: true, duration: true, price: true } },
        },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ])

    return NextResponse.json({ appointments, total, page, limit })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST /api/appointments — public booking form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createAppointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const { patientName, patientEmail, patientPhone, serviceId, date, time, notes } = parsed.data

    // Upsert patient
    const patient = await prisma.patient.upsert({
      where: { email: patientEmail },
      update: { name: patientName, phone: patientPhone },
      create: { name: patientName, email: patientEmail, phone: patientPhone },
    })

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        serviceId,
        date: new Date(date),
        time,
        notes,
        status: 'PENDING',
      },
      include: {
        patient: true,
        service: true,
      },
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
