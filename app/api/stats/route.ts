import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const statSchema = z.object({
  label:       z.string().min(1),
  description: z.string().min(1),
  value:       z.number().int().min(0),
  suffix:      z.string(),
  decimal:     z.boolean().default(false),
  icon:        z.string().min(1),
  iconBg:      z.string().min(1),
  iconColor:   z.string().min(1),
  numColor:    z.string().min(1),
  sortOrder:   z.number().int().default(0),
  isActive:    z.boolean().default(true),
})

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json({ stats })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = statSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
    }
    const stat = await prisma.stat.create({ data: parsed.data })
    return NextResponse.json({ stat }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 })
  }
}
