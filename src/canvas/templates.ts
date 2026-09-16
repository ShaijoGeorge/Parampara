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
    name: 'Classical Descendants',
    tag: 'Top-Down Tree',
    description: 'Ancestors at top, generations flow downward, spouses sit side-by-side with children centered.',
    accent: '#7d1634',
    paper: 'linear-gradient(160deg, #fdfbf7 0%, #f4eee2 100%)',
    styleKey: 'parchment',
  },
  {
    id: 'ancestry',
    name: 'Direct Ancestry Chart',
    tag: 'Bottom-Up Pedigree',
    description: 'Traces maternal and paternal bloodlines upward from chosen descendant to parents and grandparents.',
    accent: '#0c6b65',
    paper: 'linear-gradient(160deg, #f7faf9 0%, #e6f2ee 100%)',
    styleKey: 'plaque',
  },
  {
    id: 'hourglass',
    name: 'Balanced Hourglass',
    tag: 'Ancestors & Heirs',
    description: 'Centers on the chosen generation: parents branch upward, children branch downward.',
    accent: '#c9a227',
    paper: 'linear-gradient(160deg, #fdfaf2 0%, #faedd3 100%)',
    styleKey: 'hourglass',
  },
  {
    id: 'compact',
    name: 'Compact Clan Matrix',
    tag: 'High-Density Chart',
    description: 'Crisp orthogonal hierarchical layout built for sprawling lineages with dozens of family branches.',
    accent: '#1f4e79',
    paper: 'linear-gradient(160deg, #f4f6fb 0%, #e3e8f4 100%)',
    styleKey: 'compact',
  },
]

export function templateById(id: TemplateId): TemplateMeta {
  // Normalize legacy IDs
  const normalizedId = id === 'river' ? 'ancestry' : id === 'mandala' ? 'hourglass' : id
  return TEMPLATES.find((item) => item.id === normalizedId) ?? TEMPLATES[0]
}
