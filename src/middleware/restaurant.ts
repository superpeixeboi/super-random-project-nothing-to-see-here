import { validateOrReject } from 'class-validator'
import { MoreThanOrEqual, LessThanOrEqual, ILike, In } from 'typeorm'
import Ajv from 'ajv'

import Restaurant from '../entities/restaurant'
import Cuisine from '../entities/cuisine'
import querySchema from './querySchema'

const isQueryValid = new Ajv().compile(querySchema)

async function find(req, res, next) {
  try {
    if (req.query.name) req.query.name = ILike(`%${req.query.name}%`)
    if (req.query.customerRating) req.query.customerRating = MoreThanOrEqual(req.query.customerRating)
    if (req.query.price) req.query.price = LessThanOrEqual(req.query.price)
    if (req.query.distance) req.query.distance = LessThanOrEqual(req.query.distance)

    if (req.query.cuisine) {
      const cuisines = await Cuisine.find({ name: ILike(`%${req.query.cuisine}%`) })
      req.query.cuisineId = In(cuisines.map(cuisine => cuisine.id))
    }

    const restaurants = await Restaurant.find({ 
      where: req.query, 
      relations: ['cuisine'], 
      order: { distance: 'ASC', customerRating: 'DESC', price: 'ASC' },
      take: 5
    })
    
    res.status(200).send(restaurants)
  } catch(error) {
    next(error)
  }
}

async function validateQuery(req, res, next) {
  if (!isQueryValid(req.query)) return next(isQueryValid.errors)
  next()
}

export default { find, validateQuery }
