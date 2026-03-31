import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { updatePatientSchema } from '@/lib/validations/patient'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        appointments: {
          include: { service: true },
          orderBy: { date: 'desc' },
        },
      },
    })

    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    return NextResponse.json({ patient })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const parsed = updatePatientSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
    }

    const data = {
      ...parsed.data,
      dateOfBirth: parsed.data.dateOfBirth ? new Date(parsed.data.dateOfBirth) : undefined,
    }

    const patient = await prisma.patient.update({ where: { id: params.id }, data })
    return NextResponse.json({ patient })
  } catch {
    return NextResponse.json({ error: 'Failed to update patient' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.patient.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 })
  }
}
