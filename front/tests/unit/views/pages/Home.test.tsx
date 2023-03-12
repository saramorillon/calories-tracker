import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { getActivities } from '../../../../src/services/activity'
import { getMeals } from '../../../../src/services/meal'
import { Home } from '../../../../src/views/pages/Home'
import { mockActivity, mockMeal, mockNavigate, wait } from '../../../mocks'

jest.mock('../../../../src/services/meal')
jest.mock('../../../../src/services/activity')

describe('Home', () => {
  beforeEach(() => {
    jest.mocked(getMeals).mockResolvedValue([mockMeal()])
    jest.mocked(getActivities).mockResolvedValue([mockActivity()])
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
})
