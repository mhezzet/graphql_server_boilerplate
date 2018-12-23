import { makeExecutableSchema } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
export { default as Post } from './model'

export const PostSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
