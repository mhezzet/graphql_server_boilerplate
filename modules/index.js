import { mergeSchemas } from 'apollo-server-express'
import { UserSchema, User } from './user'
import { Post, PostSchema } from './post'

export const schema = mergeSchemas({
  schemas: [UserSchema, PostSchema]
})

export const models = {
  User,
  Post
}
