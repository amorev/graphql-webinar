const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
  GraphQLSchema
} = require('graphql')

const query = require('./types/root')

var schema = new GraphQLSchema({ query })
const app = express()
app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000)
