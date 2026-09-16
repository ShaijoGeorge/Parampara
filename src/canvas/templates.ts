import type { TemplateId } from '../domain/types'

export interface TemplateMeta {
  id: TemplateId
  name: string
  tag: string
  description: string
  accent: string
  paper: string
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'pedigree',
    name: 'Heritage pedigree',
    tag: 'Classic',
    description: 'Generations flow downward, spouses sit side by side.',
    accent: '#8b1e3f',
    paper: 'linear-gradient(160deg, #fff6e8 0%, #f3d5b5 100%)',
  },
  {
    id: 'river',
    name: 'Ancestral river',
    tag: 'Wide',
    description: 'A left-to-right current of lineage, built for long families.',
    accent: '#0f7a73',
    paper: 'linear-gradient(120deg, #e7f6f3 0%, #d5ebe3 100%)',
  },
  {
    id: 'mandala',
    name: 'Lotus mandala',
    tag: 'Radial',
    description: 'The root sits at the centre; each generation opens like a bloom.',
    accent: '#c45c26',
    paper: 'linear-gradient(160deg, #ffe7d2 0%, #f6c1c8 100%)',
  },
  {
    id: 'compact',
    name: 'Compact clan',
    tag: 'Dense',
    description: 'Tight cards for large families, still fully pannable.',
    accent: '#1f4e79',
    paper: 'linear-gradient(160deg, #eef3fb 0%, #d9e2f2 100%)',
  },
]

export function templateById(id: TemplateId): TemplateMeta {
  return TEMPLATES.find((item) => item.id === id) ?? TEMPLATES[0]
}
