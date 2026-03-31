import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const stat = await prisma.stat.update({ where: { id: params.id }, data: body })
    return NextResponse.json({ stat })
  } catch {
    return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.stat.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete stat' }, { status: 500 })
  }
}
