const express = require('express')
const graphqlHTTP = require('express-graphql')
const depthLimit = require('graphql-depth-limit')
const {
  GraphQLSchema
} = require('graphql')

const query = require('./types/query/root')
const schema = new GraphQLSchema({ query })

const app = express()
app.use('/', graphqlHTTP({
  schema: schema,
  validationRules: [depthLimit(2)],
  graphiql: true
}))

const port = 3000

app.listen(port)
console.log('GraphQL API server running at localhost: ' + port)
