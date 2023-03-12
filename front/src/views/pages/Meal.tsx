import { useForm } from '@saramorillon/hooks'
import { IconDeviceFloppy } from '@tabler/icons'
import React from 'react'
import { IMeal, mealTypes } from '../../models/Meal'
import { saveMeal } from '../../services/meal'

const empty: IMeal = {
  id: 0,
  name: 'breakfast',
}

export function Meal() {
  const { submit, values, onChange } = useForm(saveMeal, empty)

  return (
    <form onSubmit={submit}>
      <label>
        <select value={values.name} onChange={(e) => onChange('name', e.target.value)} placeholder="Nom">
          {Object.entries(mealTypes).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <button data-variant="primary" className="right">
        <IconDeviceFloppy /> Enregistrer
      </button>
    </form>
  )
}
