import { gql } from 'apollo-server-core'

export default gql`
  type Query {
    me: User
    register(email: String!, password: String!, name: String!): signUpResolver
    token(email: String!, password: String): String
  }

  type signUpResolver {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
`
