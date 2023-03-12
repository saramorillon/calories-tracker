import { useFetch } from '@saramorillon/hooks'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mealTypes } from '../../models/Meal'
import { getActivities } from '../../services/activity'
import { getMeals } from '../../services/meal'

export function Home(): JSX.Element {
  const navigate = useNavigate()

  const [meals] = useFetch(getMeals, [])
  const [activities] = useFetch(getActivities, [])

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

      <h2>🏃 Activités</h2>
      {activities.map((activity) => (
        <article key={activity.id} className="mb1 p2">
          {activity.name} <span className="right">⚡{activity.kcal} kcal</span>
        </article>
      ))}
      <button data-variant="outlined" style={{ width: '100%' }} onClick={() => navigate('/activity')}>
        <IconPlus /> Ajouter une activité
      </button>
    </>
  )
}
