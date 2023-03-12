import { Axios } from '../../../src/services/Axios'
import { getWaters, saveWater } from '../../../src/services/water'

jest.mock('../../../src/services/Axios')

describe('getWaters', () => {
  beforeEach(() => {
    jest.spyOn(Axios, 'get').mockResolvedValue({ data: 'waters' })
  })

  it('should get waters', async () => {
    await getWaters()
    expect(Axios.get).toHaveBeenCalledWith('/api/waters')
  })

  it('should return waters', async () => {
    const result = await getWaters()
    expect(result).toBe('waters')
  })
})

describe('saveWater', () => {
  it('should save water', async () => {
    await saveWater()
    expect(Axios.post).toHaveBeenCalledWith('/api/waters')
  })
})
