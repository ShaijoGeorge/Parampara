import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { personFormSchema, type PersonFormValues } from '../../domain/schemas'
import type { Person } from '../../domain/types'
import { compressPhoto } from '../../lib/photo'
import { Button } from '../../ui/Button'
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

  useEffect(() => {
    form.reset(toValues(person))
  }, [person, form])

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit((values) => onSave(values, person.photoDataUrl))}
    >
      <Field label="Given name">
        <TextInput {...form.register('givenName')} autoComplete="given-name" />
        {form.formState.errors.givenName ? (
          <p className="text-xs text-maroon">{form.formState.errors.givenName.message}</p>
        ) : null}
      </Field>
      <Field label="Family name">
        <TextInput {...form.register('familyName')} autoComplete="family-name" />
      </Field>
      <Field label="Gender">
        <Select {...form.register('gender')}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="unspecified">Unspecified</option>
        </Select>
      </Field>
      <Field label="Place of living">
        <TextInput {...form.register('livingPlace')} />
      </Field>
      <Field label="How many children (adds empty slots)">
        <TextInput
          type="number"
          min={0}
          max={20}
          {...form.register('expectedChildren', { valueAsNumber: true })}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...form.register('isLate')} />
        Mark as late
      </label>
      {isLate ? (
        <Field label="Year of passing">
          <TextInput
            type="number"
            {...form.register('deathYear', { valueAsNumber: true })}
          />
        </Field>
      ) : null}
      <Field label="Notes">
        <TextArea rows={3} {...form.register('notes')} />
      </Field>
      <Field label="Portrait">
        <input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files?.[0]
            if (!file) return
            const url = await compressPhoto(file)
            const values = form.getValues()
            onSave(values, url)
          }}
        />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save member</Button>
        {onDelete ? (
          <Button type="button" variant="ghost" onClick={onDelete}>
            Remove
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
    deathYear: person.deathYear,
    notes: person.notes ?? '',
    expectedChildren: person.expectedChildren ?? 0,
  }
}
