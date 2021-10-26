const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: "Post",
  description: "This is post object",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString }
  })
})
