import 'reflect-metadata'
import { createConnection } from 'typeorm'

import cuisines from '../data/cuisines'
import restaurants from '../data/restaurants'

import Cuisine from '../src/entities/cuisine'
import Restaurant from '../src/entities/restaurant'

(async () => {
  try{
    const connection = await createConnection()

    await connection.createQueryBuilder().delete().from(Restaurant).execute()
    await connection.createQueryBuilder().delete().from(Cuisine).execute()

    await Cuisine.insert(cuisines)
    await Restaurant.insert(restaurants)
  } catch(error) {
    console.log(error)
  }
})()
