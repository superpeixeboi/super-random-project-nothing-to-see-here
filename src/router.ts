import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import { Router } from 'express'

import restaurant from './middleware/restaurant'

const { validateQuery, find } = restaurant

const router = Router()

router.use(morgan('tiny'))
router.use(cors({ 'origin': '*', 'methods': 'GET' }))
router.use(bodyParser.json())

// restaurant
router.route('/restaurant').get(validateQuery, find)

// error handler
router.use(handleError)

export default router

function handleError(error, req, res, next) {
  if (error.message) return res.status(500).send(error.message)
  if (error.constructor === Array) return res.status(400).send(error)
}
