import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { getActivities } from '../../../../src/services/activity'
import { getMeals } from '../../../../src/services/meal'
import { getWaters, saveWater } from '../../../../src/services/water'
import { Home } from '../../../../src/views/pages/Home'
import { mockActivity, mockMeal, mockNavigate, mockWater, wait } from '../../../mocks'

jest.mock('../../../../src/services/meal')
jest.mock('../../../../src/services/activity')
jest.mock('../../../../src/services/water')

describe('Home', () => {
  beforeEach(() => {
    jest.mocked(getMeals).mockResolvedValue([mockMeal()])
    jest.mocked(getActivities).mockResolvedValue([mockActivity()])
    jest.mocked(getWaters).mockResolvedValue([mockWater()])
    jest.mocked(saveWater).mockResolvedValue(undefined)
  })

  it('should get meals', async () => {
    render(<Home />)
    await wait()
    expect(getMeals).toHaveBeenCalled()
  })

  it('should render meals', async () => {
    render(<Home />)
    await wait()
    expect(screen.getByText('🍲 Déjeuner')).toBeInTheDocument()
  })

  it('should open meal page when clicking on meal button', async () => {
    const navigate = mockNavigate()
    render(<Home />)
    fireEvent.click(screen.getByText('Ajouter un repas'))
    await wait()
    expect(navigate).toHaveBeenCalledWith('/meal')
  })

  it('should get activities', async () => {
    render(<Home />)
    await wait()
    expect(getActivities).toHaveBeenCalled()
  })

  it('should render activities', async () => {
    render(<Home />)
    await wait()
    expect(screen.getByText('Sport')).toBeInTheDocument()
  })

  it('should open activity page when clicking on activity button', async () => {
    const navigate = mockNavigate()
    render(<Home />)
    fireEvent.click(screen.getByText('Ajouter une activité'))
    await wait()
    expect(navigate).toHaveBeenCalledWith('/activity')
  })

  it('should get water', async () => {
    render(<Home />)
    await wait()
    expect(getWaters).toHaveBeenCalled()
  })

  it('should render water', async () => {
    render(<Home />)
    await wait()
    expect(screen.getByLabelText('250 mL')).toBeInTheDocument()
  })

  it('should save water and refresh when click on water button', async () => {
    render(<Home />)
    await wait()
    jest.mocked(getWaters).mockClear()
    fireEvent.click(screen.getByLabelText("Ajouter de l'eau"))
    await wait()
    expect(saveWater).toHaveBeenCalled()
    expect(getWaters).toHaveBeenCalled()
  })
})
