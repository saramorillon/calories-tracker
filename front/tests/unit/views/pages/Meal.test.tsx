import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { saveMeal } from '../../../../src/services/meal'
import { Meal } from '../../../../src/views/pages/Meal'
import { wait } from '../../../mocks'

jest.mock('../../../../src/services/meal')

describe('Meal', () => {
  beforeEach(() => {
    jest.mocked(saveMeal).mockResolvedValue(undefined)
  })

  it('should save meal when clicking on button', async () => {
    render(<Meal />)
    await wait()
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'lunch' } })
    fireEvent.click(screen.getByText('Enregistrer'))
    await wait()
    expect(saveMeal).toHaveBeenCalledWith({ id: 0, name: 'lunch' })
  })
})
