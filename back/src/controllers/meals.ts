import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../prisma'

const schema = {
  post: z.object({
    name: z.string(),
  }),
}

export async function getMeals(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_meals')
  try {
    const [date] = new Date().toISOString().split('T')
    const meals = await prisma.meal.findMany({ where: { date } })
    success()
    res.json(meals)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}

export async function postMeal(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('post_meal')
  try {
    const { name } = schema.post.parse(req.body)
    const [date] = new Date().toISOString().split('T')
    await prisma.meal.create({ data: { name, date } })
    success()
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(failure(error))
  }
}
