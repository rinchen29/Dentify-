export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { newEmail, password } = await req.json()

    if (!newEmail || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user?.password) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: newEmail } })
    if (existing) {
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 })
    }

    await prisma.user.update({ where: { id: user.id }, data: { email: newEmail } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update email' }, { status: 500 })
  }
}
