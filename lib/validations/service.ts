import { z } from 'zod'

export const createServiceSchema = z.object({
  name:        z.string().min(2, 'Name is required'),
  icon:        z.string().optional(),
  tagline:     z.string().optional(),
  description: z.string().optional(),
  includes:    z.array(z.string()).default([]),
  duration:    z.string().min(1, 'Duration is required'),
  price:       z.number().positive().optional(),
  isActive:    z.boolean().default(true),
})

export const updateServiceSchema = createServiceSchema.partial()

export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
