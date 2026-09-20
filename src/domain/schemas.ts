import { z } from 'zod'

export const genderSchema = z.enum(['female', 'male', 'other', 'unspecified'])

export const templateIdSchema = z.enum([
  'pedigree',
  'ancestry',
  'hourglass',
  'compact',
  'river',
  'mandala',
])

export const personFormSchema = z.object({
  givenName: z.string().trim().min(1, 'A given name is required').max(80),
  familyName: z.string().trim().max(80),
  gender: genderSchema,
  livingPlace: z.string().trim().max(120),
  isLate: z.boolean(),
  birthYear: z.number().int().min(1000).max(2100).optional(),
  deathYear: z.number().int().min(1000).max(2100).optional(),
  age: z.number().int().min(0).max(150).optional(),
  notes: z.string().max(500).optional(),
  expectedChildren: z.number().int().min(0).max(20),
})

export type PersonFormValues = z.infer<typeof personFormSchema>

export const treeNameSchema = z
  .string()
  .trim()
  .min(1, 'Give this tree a name')
  .max(80)

export const exportPayloadSchema = z.object({
  version: z.literal(1),
  exportedAt: z.number(),
  bundle: z.object({
    tree: z.object({
      id: z.string(),
      name: z.string(),
      rootPersonId: z.string().nullable(),
      templateId: templateIdSchema,
      createdAt: z.number(),
      updatedAt: z.number(),
    }),
    people: z.array(z.unknown()),
    edges: z.array(z.unknown()),
  }),
})
