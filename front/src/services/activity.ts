import { IActivity } from '../models/Activity'
import { Axios } from './Axios'

export async function getActivities(): Promise<IActivity[]> {
  const { data } = await Axios.get('/api/activities')
  return data
}

export async function saveActivity(meal: IActivity) {
  await Axios.post('/api/activities', meal)
}
