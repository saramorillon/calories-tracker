import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { Header } from '../../../../src/views/components/Header'

mockdate.set('2023-01-01T00:00:00.000Z')

describe('Header', () => {
  it('should render current date', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: '1 janvier 2023' })).toHaveAttribute('href', '/')
  })
})
