import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../prisma'

const schema = {
  post: z.object({
    name: z.string(),
    kcal: z.number(),
  }),
}

export async function getActivities(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_activities')
  try {
    const [date] = new Date().toISOString().split('T')
    const activities = await prisma.activity.findMany({ where: { date } })
    success()
    res.json(activities)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}

export async function postActivity(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('post_activity')
  try {
    const { name, kcal } = schema.post.parse(req.body)
    const [date] = new Date().toISOString().split('T')
    await prisma.activity.create({ data: { name, kcal, date } })
    success()
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}
