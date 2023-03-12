import { useFetch } from '@saramorillon/hooks'
import { IconGlass, IconGlassFull, IconPlus } from '@tabler/icons'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { mealTypes } from '../../models/Meal'
import { getActivities } from '../../services/activity'
import { getMeals } from '../../services/meal'
import { getWaters, saveWater } from '../../services/water'

export function Home(): JSX.Element {
  const navigate = useNavigate()

  const [meals] = useFetch(getMeals, [])
  const [activities] = useFetch(getActivities, [])
  const [waters, , refresh] = useFetch(getWaters, [])

  const addWater = useCallback(() => {
    void saveWater().then(refresh)
  }, [refresh])

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

      <h2>
        💧 Eau
        <small className="right">
          {waters.reduce((acc, curr) => acc + curr.ml / 1000, 0).toLocaleString('fr-FR')} L
        </small>
      </h2>
      {waters.map((water) => (
        <mark key={water.id} className="mr1 p1" aria-label={`${water.ml} mL`}>
          <IconGlassFull />
        </mark>
      ))}
      <button data-variant="outlined" onClick={addWater} aria-label="Ajouter de l'eau">
        <IconGlass />
      </button>
    </>
  )
}
