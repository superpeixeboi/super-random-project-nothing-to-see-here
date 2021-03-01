/* eslint-disable no-console */
jest.mock('../src/entities/restaurant', jest.fn)
jest.mock('../src/entities/cuisine', jest.fn)

import restaurant from '../src/middleware/restaurant'

describe('The restaurants middleware', () => {
  it('works with no parameters', () => {
    return restaurant.validateQuery({ query: {} }, undefined, (err) => {
      expect(err).toBe(undefined)
    })
  })

  it('breaks with a bad parameter', () => {
    return restaurant.validateQuery({ query: { badPar: 1 } }, undefined, (err) => {
      expect(err[0].message).toBe('should NOT have additional properties')
    })
  })

  it('breaks with a bad value for price', () => {
    return restaurant.validateQuery({ query: { price: 'not a price' } }, undefined, (err) => {
      expect(err[0].message).toBe('should match pattern \"^\\d+(\\.\\d+)?$\"')
    })
  })

  it('breaks with a bad value for customerRating', () => {
    return restaurant.validateQuery({ query: { customerRating: '100' } }, undefined, (err) => {
      expect(err[0].message).toBe('should be equal to one of the allowed values')
    })
  })
})
