import { Router } from 'express'
import { getActivities, postActivity } from '../../src/controllers/activities'
import { getApp } from '../../src/controllers/app'
import { getMeals, postMeal } from '../../src/controllers/meals'
import { getSession, login, logout } from '../../src/controllers/session'
import { getWaters, postWater } from '../../src/controllers/waters'
import { session } from '../../src/middlewares/session'
import { routes } from '../../src/routes'

jest.mock('express')
jest.mock('../../src/controllers/app')
jest.mock('../../src/controllers/session')
jest.mock('../../src/middlewares/session')

function mockRouter() {
  return {
    get: jest.fn(),
    post: jest.fn(),
    use: jest.fn(),
  } as unknown as Router
}

describe('routes', () => {
  beforeEach(() => {
    jest.mocked(Router).mockReturnValue(mockRouter())
  })

  it('should create routes', () => {
    const router = routes()
    expect(router.post).toHaveBeenCalledWith('/login', login)
    expect(router.get).toHaveBeenCalledWith('/app', getApp)
    expect(router.use).toHaveBeenCalledWith(session)
    expect(router.get).toHaveBeenCalledWith('/session', getSession)
    expect(router.get).toHaveBeenCalledWith('/logout', logout)
    expect(router.get).toHaveBeenCalledWith('/meals', getMeals)
    expect(router.post).toHaveBeenCalledWith('/meals', postMeal)
    expect(router.get).toHaveBeenCalledWith('/activities', getActivities)
    expect(router.post).toHaveBeenCalledWith('/activities', postActivity)
    expect(router.get).toHaveBeenCalledWith('/waters', getWaters)
    expect(router.post).toHaveBeenCalledWith('/waters', postWater)
  })

  it('should return router', () => {
    const routerMock = mockRouter()
    jest.mocked(Router).mockReturnValue(routerMock)
    const router = routes()
    expect(router).toBe(routerMock)
  })
})
