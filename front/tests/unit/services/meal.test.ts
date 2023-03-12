import { Axios } from '../../../src/services/Axios'
import { getMeals, saveMeal } from '../../../src/services/meal'

jest.mock('../../../src/services/Axios')

describe('getMeals', () => {
  beforeEach(() => {
    jest.spyOn(Axios, 'get').mockResolvedValue({ data: 'meals' })
  })

  it('should get meals', async () => {
    await getMeals()
    expect(Axios.get).toHaveBeenCalledWith('/api/meals')
  })

  it('should return meals', async () => {
    const result = await getMeals()
    expect(result).toBe('meals')
  })
})

describe('saveMeal', () => {
  it('should save meal', async () => {
    await saveMeal({ id: 0, name: 'name' })
    expect(Axios.post).toHaveBeenCalledWith('/api/meals', { id: 0, name: 'name' })
  })
})
