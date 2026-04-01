export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { createServiceSchema } from '@/lib/validations/service'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { appointments: true } } },
    })
    return NextResponse.json({ services })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createServiceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
    }
    const service = await prisma.service.create({ data: parsed.data })
    return NextResponse.json({ service }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
