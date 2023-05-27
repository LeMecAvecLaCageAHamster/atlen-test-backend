import cors from 'cors'
import express from 'express'
import { config } from './config'
import { ProductController } from './controllers/product.controller'
import { ExceptionsHandler } from './middlewares/exceptions.handler'
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/products', ProductController)

/**
 * For every other route, throw an exception
 */
app.all('*', UnknownRoutesHandler)
app.use(ExceptionsHandler)

app.listen(config.API_PORT, () => console.log('API running...'))
