const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
})
