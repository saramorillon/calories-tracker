import { getActivities, saveActivity } from '../../../src/services/activity'
import { Axios } from '../../../src/services/Axios'

jest.mock('../../../src/services/Axios')

describe('getActivities', () => {
  beforeEach(() => {
    jest.spyOn(Axios, 'get').mockResolvedValue({ data: 'activities' })
  })

  it('should get activities', async () => {
    await getActivities()
    expect(Axios.get).toHaveBeenCalledWith('/api/activities')
  })

  it('should return activities', async () => {
    const result = await getActivities()
    expect(result).toBe('activities')
  })
})

describe('saveActivity', () => {
  it('should save activity', async () => {
    await saveActivity({ id: 0, name: 'name', kcal: 50 })
    expect(Axios.post).toHaveBeenCalledWith('/api/activities', { id: 0, name: 'name', kcal: 50 })
  })
})
