const { graphql, buildSchema } = require('graphql')

const schem = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  }
}

graphql(schem, '{ hello }', root).then((r) => {
  console.log(r)
})
