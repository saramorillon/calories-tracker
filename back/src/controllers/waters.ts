import { Request, Response } from 'express'
import { prisma } from '../prisma'

export async function getWaters(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_waters')
  try {
    const [date] = new Date().toISOString().split('T')
    const waters = await prisma.water.findMany({ where: { date } })
    success()
    res.json(waters)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}

export async function postWater(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('post_water')
  try {
    const [date] = new Date().toISOString().split('T')
    await prisma.water.create({ data: { date, ml: 250 } })
    success()
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}
