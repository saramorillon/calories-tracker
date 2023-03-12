import { useForm } from '@saramorillon/hooks'
import { IconDeviceFloppy } from '@tabler/icons'
import React from 'react'
import { IActivity } from '../../models/Activity'
import { saveActivity } from '../../services/activity'

const empty: IActivity = {
  id: 0,
  name: '',
  kcal: 0,
}

export function Activity() {
  const { submit, values, onChange } = useForm(saveActivity, empty)

  return (
    <form onSubmit={submit}>
      <label>
        <input value={values.name} onChange={(e) => onChange('name', e.target.value)} placeholder="Nom" />
      </label>

      <label>
        <input
          value={values.kcal}
          onChange={(e) => onChange('kcal', Number(e.target.value))}
          placeholder="Calories (kcal)"
        />
      </label>

      <button data-variant="primary" className="right">
        <IconDeviceFloppy /> Enregistrer
      </button>
    </form>
  )
}
