import { IMeal } from '../models/Meal'
import { Axios } from './Axios'

export async function getMeals(): Promise<IMeal[]> {
  const { data } = await Axios.get('/api/meals')
  return data
}

export async function saveMeal(meal: IMeal) {
  await Axios.post('/api/meals', meal)
}
