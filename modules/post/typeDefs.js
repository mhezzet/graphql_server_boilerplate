import { gql } from 'apollo-server-core'

export default gql`
  type Query {
    post(id: ID): String
    posts: String
  }

  type Mutation {
    addPost(email: String, username: String): String
  }

  type Post {
    id: ID!
    title: String!
    body: String!
  }
`
