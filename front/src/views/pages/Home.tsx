import { useFetch } from '@saramorillon/hooks'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mealTypes } from '../../models/Meal'
import { getMeals } from '../../services/meal'

export function Home(): JSX.Element {
  const navigate = useNavigate()

  const [meals] = useFetch(getMeals, [])

  return (
    <>
      <h2>🍔 Repas</h2>
      {meals.map((meal) => (
        <article key={meal.id} className="mb1 p2">
          {mealTypes[meal.name]} <span className="right">⚡50 kcal</span>
        </article>
      ))}
      <button data-variant="outlined" style={{ width: '100%' }} onClick={() => navigate('/meal')}>
        <IconPlus /> Ajouter un repas
      </button>
    </>
  )
}
