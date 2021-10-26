var gql = require('graphql')

var schema = gql.buildSchema(`
  type Query {
    hello: String,
    bye: String,
    talk (name: String!): String
  }
`);

var root = {
  hello: () => {
    return 'Hello World!'
  },
  bye: () => {
    return 'Bye` World!'
  },
  talk: (args) => {
    return 'Talk: ' + args.name
  }
}

gql.graphql(schema, '{ hello, bye, talk(name: "Anton") }', root).then((response) => {
  console.log(response)
})
