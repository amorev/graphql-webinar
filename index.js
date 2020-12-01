var { graphql, buildSchema } = require('graphql')
var graphqlHTTP = require('express-graphql')
var express = require('express')

const app = express()

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type City {
    id: ID!
    title: String
  }
  type Author {
      name: String
      city: City
  }
  type Query {
    hello: String
    bye: String
    cities: [City]
    authors: [Author]
    books: [String]
    users: [String]
    talk (name: String!): String
  }
`)

const cities = [
  {
    id: 1,
    title: 'Moscow'
  },
  {
    id: 2,
    title: 'Ulyanovsk',
  }
]

const authors = [
  {
    id: 1,
    name: 'Anton',
    city_id: 1
  },
  {
    id: 2,
    name: 'Ivan',
    city_id: 2
  },
]

// The root provides a resolver function for each API endpoint
var root = {
  Author: {
    city (args, author) {
      console.log(args, author)
      return {}
    },
  },
  hello: () => {
    return 'Hello world!'
  },
  cities: () => {
    return cities
  },
  authors: () => {
    return authors
  }
}

app.use('/', graphqlHTTP.graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(3000)
