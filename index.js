const { graphql, buildSchema } = require('graphql')

const schem = buildSchema(`
  type Query {
    hello: String,
    bye: String,
    greet (name: String!): String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  },
  bye: () => {
    return 'Bye world!'
  },
  greet: (args) => {
    return 'Hello, ' + args.name
  }
}

graphql(schem, '{ hello, bye, greet(name: "Anton")}', root).then((r) => {
  console.log(r)
})
