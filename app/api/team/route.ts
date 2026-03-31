import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const teamSchema = z.object({
  name:        z.string().min(1),
  designation: z.string().min(1),
  imageUrl:    z.string().optional().nullable(),
  experience:  z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  sortOrder:   z.number().int().default(0),
  isActive:    z.boolean().default(true),
})

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json({ members })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = teamSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
    }
    const member = await prisma.teamMember.create({ data: parsed.data })
    return NextResponse.json({ member }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}
