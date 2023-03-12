import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { getMeals } from '../../../../src/services/meal'
import { Home } from '../../../../src/views/pages/Home'
import { mockMeal, mockNavigate, wait } from '../../../mocks'

jest.mock('../../../../src/services/meal')

describe('Home', () => {
  beforeEach(() => {
    jest.mocked(getMeals).mockResolvedValue([mockMeal()])
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
})
