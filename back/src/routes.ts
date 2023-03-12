import { Router } from 'express'
import { getActivities, postActivity } from './controllers/activities'
import { getApp } from './controllers/app'
import { getMeals, postMeal } from './controllers/meals'
import { getSession, login, logout } from './controllers/session'
import { getWaters, postWater } from './controllers/waters'
import { session } from './middlewares/session'

export function routes() {
  const router = Router()

  router.post('/login', login)
  router.get('/app', getApp)

  router.use(session)

  router.get('/session', getSession)
  router.get('/logout', logout)

  router.get('/meals', getMeals)
  router.post('/meals', postMeal)

  router.get('/activities', getActivities)
  router.post('/activities', postActivity)

  router.get('/waters', getWaters)
  router.post('/waters', postWater)

  return router
}
