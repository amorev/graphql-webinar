const {
  graphql,
  GraphQLSchema
} = require('graphql')

const query = require('./types/query/root')
const schema = new GraphQLSchema({ query })

graphql(schema, '{ posts {id, title, author { id, name }}, authors {id} }').then((response) => {
  console.log(JSON.stringify(response))
})
