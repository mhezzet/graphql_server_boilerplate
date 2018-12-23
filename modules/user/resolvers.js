import { UserInputError } from 'apollo-server-express'
import { signUpInputValidation, loginInputValidation } from './validators'
import _ from 'lodash'

/**
|--------------------------------------------------
| me
|--------------------------------------------------
*/

async function me(
  parent,
  args,
  { models: { User }, middlewares: { authorization } }
) {
  const { id } = authorization()

  const user = await User.findById(id)
  if (!user) throw new UserInputError('user not found')

  return user
}

/**
|--------------------------------------------------
| register
|--------------------------------------------------
*/

async function register(parent, args, { models: { User } }) {
  const { email } = args

  const { error } = signUpInputValidation(args)
  if (error) throw new UserInputError(error.details[0].message)

  let user = await User.findOne({ email })
  if (user) throw new UserInputError('email is already exist')

  user = new User(args)
  await user.save()

  const token = user.genToken()

  return { user: _.omit(user, ['password']), token }
}

/**
|--------------------------------------------------
| authenticate
|--------------------------------------------------
*/

async function token(parent, args, { models: { User } }) {
  const { email, password } = args

  const { error } = loginInputValidation(args)
  if (error) throw new UserInputError(error.details[0].message)

  const user = await User.findOne({ email })
  if (!user) throw new UserInputError('invaild email or password')

  const validPassword = await user.validPassword(password)
  if (!validPassword) throw new UserInputError('invaild email or password')

  const token = user.genToken()

  return token
}

export default {
  Query: {
    me,
    token,
    register
  }
}
