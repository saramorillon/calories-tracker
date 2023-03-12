import { Router } from 'express'
import { getApp } from './controllers/app'
import { getMeals, postMeal } from './controllers/meals'
import { getSession, login, logout } from './controllers/session'
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

  return router
}
