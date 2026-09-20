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
]

export function templateById(_id?: TemplateId): TemplateMeta {
  return TEMPLATES[0]!
}
