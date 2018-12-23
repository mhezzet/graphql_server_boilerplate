import mongoose from 'mongoose'
import config from 'config'
import Joi from 'joi'
import joiBind from 'joi-objectid'
import logger from '../utils/logging'

export default async function() {
  try {
    await mongoose.connect(
      config.get('DB_URI'),
      { useCreateIndex: true }
    )
    logger.info(`🎉 connected to ${config.get('env')} db`)
  } catch (error) {
    logger.error(`${error}`)
  }

  Joi.objectId = joiBind(Joi)
}
