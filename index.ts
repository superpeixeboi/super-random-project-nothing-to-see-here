import 'reflect-metadata'
import * as express from 'express'
import { createConnection } from 'typeorm'

import router from './src/router'

(async () => {
  try{
    await createConnection()
    const app = express()
    const port = process.env.PORT || 3000
    
    app.use(router)
    
    app.listen(port, () => console.log(`Running on port ${port}`))
  } catch(error) {
    console.log(error)
  }
})()
