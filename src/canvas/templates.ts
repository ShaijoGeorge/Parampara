import type { TemplateId } from '../domain/types'

export interface TemplateMeta {
  id: TemplateId
  name: string
  tag: string
  description: string
  accent: string
  paper: string
  styleKey: 'parchment' | 'plaque' | 'hourglass' | 'compact'
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'pedigree',
    name: 'Descendants Flow',
    tag: 'Top-Down Tree',
    description: 'Ancestors at top, generations cascade downward, spouses sit side-by-side with children centered.',
    accent: '#4f46e5',
    paper: 'linear-gradient(180deg, #fbfbfe 0%, #f3f4f9 100%)',
    styleKey: 'parchment',
  },
  {
    id: 'ancestry',
    name: 'Direct Lineage',
    tag: 'Bottom-Up Pedigree',
    description: 'Traces maternal and paternal bloodlines upward from chosen descendant to parents and grandparents.',
    accent: '#0d9488',
    paper: 'linear-gradient(180deg, #f6faf9 0%, #edf5f3 100%)',
    styleKey: 'plaque',
  },
  {
    id: 'hourglass',
    name: 'Balanced Hourglass',
    tag: 'Ancestors & Heirs',
    description: 'Centers on chosen generation: direct parents branch upward, heirs branch downward.',
    accent: '#d97706',
    paper: 'linear-gradient(180deg, #fdfbf7 0%, #fbf6ec 100%)',
    styleKey: 'hourglass',
  },
  {
    id: 'compact',
    name: 'Clan Bento Matrix',
    tag: 'High-Density Chart',
    description: 'Clean orthogonal hierarchical layout built for sprawling multi-generational lineages.',
    accent: '#2563eb',
    paper: 'linear-gradient(180deg, #f7f9fd 0%, #eef3fb 100%)',
    styleKey: 'compact',
  },
]

export function templateById(id: TemplateId): TemplateMeta {
  // Normalize legacy IDs
  const normalizedId = id === 'river' ? 'ancestry' : id === 'mandala' ? 'hourglass' : id
  return TEMPLATES.find((item) => item.id === normalizedId) ?? TEMPLATES[0]
}
