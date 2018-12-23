import Joi from 'joi'

const email = Joi.string()
  .email()
  .min(4)
  .max(50)
  .required()

const name = Joi.string()
  .min(4)
  .max(50)
  .required()

const password = Joi.string()
  .min(3)
  .max(1024)
  .required()

export function signUpInputValidation(signUpInput) {
  const signUpInputSchema = { email, name, password }
  return Joi.validate(signUpInput, signUpInputSchema)
}

export function loginInputValidation(loginInput) {
  const logisInputSchema = { email, password }
  return Joi.validate(loginInput, logisInputSchema)
}
