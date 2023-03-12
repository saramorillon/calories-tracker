import { getMockRes } from '@jest-mock/express'
import mockdate from 'mockdate'
import { getMeals, postMeal } from '../../../src/controllers/meals'
import { prisma } from '../../../src/prisma'
import { getMockReq, mockAction } from '../../mocks'

mockdate.set('2023-01-01T00:00:00.000Z')

describe('getMeals', () => {
  beforeEach(() => {
    jest.spyOn(prisma.meal, 'findMany').mockResolvedValue([])
  })

  it('should get meals of current day', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getMeals(req, res)
    expect(prisma.meal.findMany).toHaveBeenCalledWith({ where: { date: '2023-01-01' } })
  })

  it('should return meals', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getMeals(req, res)
    expect(res.json).toHaveBeenCalledWith([])
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.meal, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { res } = getMockRes()
    await getMeals(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq()
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await getMeals(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.meal, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await getMeals(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})

describe('postMeal', () => {
  beforeEach(() => {
    jest.spyOn(prisma.meal, 'create').mockResolvedValue(undefined as never)
  })

  it('should fail if data are invalide', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should save meal for current day', async () => {
    const req = getMockReq({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(prisma.meal.create).toHaveBeenCalledWith({ data: { name: 'name', date: '2023-01-01' } })
  })

  it('should return 201 status', async () => {
    const req = getMockReq({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.meal, 'create').mockRejectedValue('error')
    const req = getMockReq({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq({ body: { name: 'name' } })
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.meal, 'create').mockRejectedValue('error')
    const req = getMockReq({ body: { name: 'name' } })
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await postMeal(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})
