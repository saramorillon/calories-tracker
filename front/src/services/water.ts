import { IWater } from '../models/Water'
import { Axios } from './Axios'

export async function getWaters(): Promise<IWater[]> {
  const { data } = await Axios.get('/api/waters')
  return data
}

export async function saveWater() {
  await Axios.post('/api/waters')
}
