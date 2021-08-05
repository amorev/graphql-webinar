const { graphql, buildSchema } = require('graphql')

const schem = buildSchema(`
  type Query {
    hello: String,
    bye: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  },
  bye: () => {
    return 'Bye world!'
  }
}

graphql(schem, '{ hello, bye }', root).then((r) => {
  console.log(r)
})
