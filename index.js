var { graphql, buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    bye: String,
    talk (name: String!): String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!'
  },
  bye: () => {
    return 'Bye world'
  },
  talk: (args) => {
    return 'Talk: ' + args.name
  }
}

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello, bye, talk }', root).then((response) => {
  console.log(response)
})
