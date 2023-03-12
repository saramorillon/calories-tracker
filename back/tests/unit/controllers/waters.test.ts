import { getMockRes } from '@jest-mock/express'
import mockdate from 'mockdate'
import { getWaters, postWater } from '../../../src/controllers/waters'
import { prisma } from '../../../src/prisma'
import { getMockReq, mockAction } from '../../mocks'

mockdate.set('2023-01-01T00:00:00.000Z')

describe('getWaters', () => {
  beforeEach(() => {
    jest.spyOn(prisma.water, 'findMany').mockResolvedValue([])
  })

  it('should get waters of current day', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getWaters(req, res)
    expect(prisma.water.findMany).toHaveBeenCalledWith({ where: { date: '2023-01-01' } })
  })

  it('should return waters', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getWaters(req, res)
    expect(res.json).toHaveBeenCalledWith([])
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.water, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { res } = getMockRes()
    await getWaters(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq()
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await getWaters(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.water, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await getWaters(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})

describe('postWater', () => {
  beforeEach(() => {
    jest.spyOn(prisma.water, 'create').mockResolvedValue(undefined as never)
  })

  it('should save water for current day', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await postWater(req, res)
    expect(prisma.water.create).toHaveBeenCalledWith({ data: { date: '2023-01-01', ml: 250 } })
  })

  it('should return 201 status', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await postWater(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.water, 'create').mockRejectedValue('error')
    const req = getMockReq()
    const { res } = getMockRes()
    await postWater(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq()
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await postWater(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.water, 'create').mockRejectedValue('error')
    const req = getMockReq()
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await postWater(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})
