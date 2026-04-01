import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Always use the first (and only) config row
async function getOrCreateConfig() {
  const existing = await prisma.siteConfig.findFirst()
  if (existing) return existing
  return prisma.siteConfig.create({ data: {} })
}

export async function GET() {
  try {
    const config = await getOrCreateConfig()
    return NextResponse.json({ config })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch config', detail: message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const config = await getOrCreateConfig()
    const updated = await prisma.siteConfig.update({
      where: { id: config.id },
      data: {
        clinicName: body.clinicName,
        tagline:    body.tagline,
        phone:      body.phone,
        whatsapp:   body.whatsapp,
        email:      body.email,
        address:    body.address,
        city:       body.city,
        logoUrl:    body.logoUrl ?? null,
      },
    })
    return NextResponse.json({ config: updated })
  } catch {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}
