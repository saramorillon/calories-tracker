import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import { IActivity } from '../src/models/Activity'
import { IApp } from '../src/models/App'
import { IMeal } from '../src/models/Meal'
import { ISession } from '../src/models/Session'
import { IWater } from '../src/models/Water'

export async function wait() {
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)))
}

const { location } = window

export function mockLocation(fns: Partial<Location>): void {
  Object.defineProperty(window, 'location', { value: { ...location, ...fns }, writable: false })
}

export function restoreLocation(): void {
  Object.defineProperty(window, 'location', { value: location, writable: false })
}

export function mockNavigate(): jest.Mock {
  const navigate = jest.fn()
  jest.mocked(useNavigate).mockReturnValue(navigate)
  return navigate
}

export function mockSession(session: Partial<ISession> = {}): ISession {
  return {
    username: 'username',
    ...session,
  }
}

export function mockApp(app: Partial<IApp> = {}): IApp {
  return {
    name: 'name',
    version: 'version',
    author: {
      name: 'author name',
      url: 'author url',
    },
    repository: {
      url: 'repository url',
    },
    ...app,
  }
}

export function mockMeal(meal: Partial<IMeal> = {}): IMeal {
  return {
    id: 1,
    name: 'lunch',
    ...meal,
  }
}

export function mockActivity(activity: Partial<IActivity> = {}): IActivity {
  return {
    id: 1,
    name: 'Sport',
    kcal: 50,
    ...activity,
  }
}

export function mockWater(water: Partial<IWater> = {}): IWater {
  return {
    id: 1,
    ml: 250,
    ...water,
  }
}
