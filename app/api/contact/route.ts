import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const contactSchema = z.object({
  name:    z.string().min(1),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
})

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
    }
    const msg = await prisma.contactMessage.create({ data: parsed.data })
    return NextResponse.json({ message: msg }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}
