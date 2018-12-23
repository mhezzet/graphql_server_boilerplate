import express from 'express'
import config from 'config'
import apolloConnect from './startup/apolloServer'
import middlewares from './startup/middlewares'
import database from './startup/database'
import logger from './utils/logging'

const app = express()

middlewares(app)
database()
apolloConnect(app)

app.listen(3000, () => {
  logger.info(`💭 running env: ${config.get('env')}`)
  logger.info(`🚀 Server ready @port: ${config.get('PORT')}`)
})
