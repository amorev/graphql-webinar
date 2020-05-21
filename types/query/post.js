const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
  })
})
