import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { personFormSchema, type PersonFormValues } from '../../domain/schemas'
import type { Person } from '../../domain/types'
import { compressPhoto } from '../../lib/photo'
import { Button } from '../../ui/Button'
import { GenderBadge } from '../../ui/GenderIcon'
import { Field, Select, TextArea, TextInput } from '../../ui/Field'

export function MemberForm({
  person,
  onSave,
  onDelete,
}: {
  person: Person
  onSave: (values: PersonFormValues, photoDataUrl?: string) => void
  onDelete?: () => void
}) {
  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: toValues(person),
  })

  const isLate = useWatch({ control: form.control, name: 'isLate' })
  const currentGender = useWatch({ control: form.control, name: 'gender' }) ?? person.gender

  useEffect(() => {
    form.reset(toValues(person))
  }, [person, form])

  return (
    <form
      className="space-y-3.5 text-neutral-900 dark:text-neutral-100"
      onSubmit={form.handleSubmit((values) => onSave(values, person.photoDataUrl))}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <Field label="Given name">
          <TextInput {...form.register('givenName')} autoComplete="given-name" />
          {form.formState.errors.givenName ? (
            <p className="text-xs text-rose-500 mt-1">{form.formState.errors.givenName.message}</p>
          ) : null}
        </Field>
        <Field label="Family name">
          <TextInput {...form.register('familyName')} autoComplete="family-name" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Field label="Gender">
          <div className="flex items-center gap-2">
            <GenderBadge gender={currentGender} size="md" />
            <Select {...form.register('gender')} className="flex-1">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="unspecified">Unspecified</option>
            </Select>
          </div>
        </Field>
        <Field label="Place of living">
          <TextInput {...form.register('livingPlace')} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Field label="Age (optional)">
          <TextInput
            type="number"
            min={0}
            max={150}
            placeholder="e.g. 42"
            {...form.register('age', { valueAsNumber: true })}
          />
        </Field>
        <Field label="Birth Year (optional)">
          <TextInput
            type="number"
            placeholder="e.g. 1982"
            {...form.register('birthYear', { valueAsNumber: true })}
          />
        </Field>
      </div>

      <Field label="Expected children slots">
        <TextInput
          type="number"
          min={0}
          max={20}
          {...form.register('expectedChildren', { valueAsNumber: true })}
        />
      </Field>

      <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] p-3">
        <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
          <input
            type="checkbox"
            className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            {...form.register('isLate')}
          />
          <span>Departed / Late Ancestor</span>
        </label>
        {isLate ? (
          <div className="mt-2.5 pt-2.5 border-t border-black/[0.06] dark:border-white/[0.06]">
            <Field label="Year of Passing">
              <TextInput
                type="number"
                placeholder="e.g. 1984"
                {...form.register('deathYear', { valueAsNumber: true })}
              />
            </Field>
          </div>
        ) : null}
      </div>

      <Field label="Biographical notes">
        <TextArea rows={2} placeholder="Stories, titles, ancestral notes..." {...form.register('notes')} />
      </Field>

      <Field label="Portrait photo">
        <div className="flex items-center gap-3">
          {person.photoDataUrl ? (
            <img
              src={person.photoDataUrl}
              alt="Portrait"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10"
            />
          ) : null}
          <input
            type="file"
            accept="image/*"
            className="text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border file:border-black/[0.08] dark:file:border-white/[0.08] file:bg-white dark:file:bg-[#181820] file:text-xs file:font-semibold file:text-neutral-700 dark:file:text-neutral-300 hover:file:bg-black/5 cursor-pointer"
            onChange={async (event) => {
              const file = event.target.files?.[0]
              if (!file) return
              const url = await compressPhoto(file)
              const values = form.getValues()
              onSave(values, url)
            }}
          />
        </div>
      </Field>

      <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
        <Button type="submit" variant="primary" size="md">
          Save Details
        </Button>
        {onDelete ? (
          <Button type="button" variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30" onClick={onDelete}>
            Delete Member
          </Button>
        ) : null}
      </div>
    </form>
  )
}

function toValues(person: Person): PersonFormValues {
  return {
    givenName: person.givenName,
    familyName: person.familyName,
    gender: person.gender,
    livingPlace: person.livingPlace,
    isLate: person.isLate,
    birthYear: person.birthYear,
    deathYear: person.deathYear,
    age: person.age,
    notes: person.notes ?? '',
    expectedChildren: person.expectedChildren ?? 0,
  }
}
