import { getMockRes } from '@jest-mock/express'
import mockdate from 'mockdate'
import { getActivities, postActivity } from '../../../src/controllers/activities'
import { prisma } from '../../../src/prisma'
import { getMockReq, mockAction } from '../../mocks'

mockdate.set('2023-01-01T00:00:00.000Z')

describe('getActivities', () => {
  beforeEach(() => {
    jest.spyOn(prisma.activity, 'findMany').mockResolvedValue([])
  })

  it('should get activities of current day', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getActivities(req, res)
    expect(prisma.activity.findMany).toHaveBeenCalledWith({ where: { date: '2023-01-01' } })
  })

  it('should return activities', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getActivities(req, res)
    expect(res.json).toHaveBeenCalledWith([])
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.activity, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { res } = getMockRes()
    await getActivities(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq()
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await getActivities(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.activity, 'findMany').mockRejectedValue('error')
    const req = getMockReq()
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await getActivities(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})

describe('postActivity', () => {
  beforeEach(() => {
    jest.spyOn(prisma.activity, 'create').mockResolvedValue(undefined as never)
  })

  it('should fail if data are invalide', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should save activity for current day', async () => {
    const req = getMockReq({ body: { name: 'name', kcal: 50 } })
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(prisma.activity.create).toHaveBeenCalledWith({ data: { name: 'name', kcal: 50, date: '2023-01-01' } })
  })

  it('should return 201 status', async () => {
    const req = getMockReq({ body: { name: 'name', kcal: 50 } })
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should send 500 on failure', async () => {
    jest.spyOn(prisma.activity, 'create').mockRejectedValue('error')
    const req = getMockReq({ body: { name: 'name', kcal: 50 } })
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should log success', async () => {
    const req = getMockReq({ body: { name: 'name', kcal: 50 } })
    const { success } = mockAction(req.logger)
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(success).toHaveBeenCalled()
  })

  it('should log failure', async () => {
    jest.spyOn(prisma.activity, 'create').mockRejectedValue('error')
    const req = getMockReq({ body: { name: 'name', kcal: 50 } })
    const { failure } = mockAction(req.logger)
    const { res } = getMockRes()
    await postActivity(req, res)
    expect(failure).toHaveBeenCalledWith('error')
  })
})
