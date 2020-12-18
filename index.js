const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql')

const connector = require('./db/connector')
const PersonType = require('./types/all').PersonType

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    persons: {
      type: new GraphQLList(PersonType),
      resolve: function () {
        return connector.getPersons()
      }
    }
  })
})

const schema = new GraphQLSchema({ query })

var graphqlHTTP = require('express-graphql')
var express = require('express')

const app = express()
app.use('/', graphqlHTTP.graphqlHTTP({
  schema: schema,
  graphiql: true,
}))
app.listen(3000)
