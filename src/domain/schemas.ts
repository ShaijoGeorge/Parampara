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

export interface PersonFormValues {
  givenName?: string
  familyName?: string
  gender?: 'female' | 'male' | 'other' | 'unspecified'
  livingPlace?: string
  isLate?: boolean
  birthYear?: number
  deathYear?: number
  age?: number
  notes?: string
  expectedChildren?: number
}

export const personFormSchema = z.object({
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  gender: genderSchema.optional(),
  livingPlace: z.string().optional(),
  isLate: z.boolean().optional(),
  birthYear: z.number().optional(),
  deathYear: z.number().optional(),
  age: z.number().optional(),
  notes: z.string().optional(),
  expectedChildren: z.number().optional(),
})

export const treeNameSchema = z
  .string()
  .trim()
  .max(80)
  .optional()
  .transform((val) => (val && val.length > 0 ? val : 'Untitled Family Tree'))

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
