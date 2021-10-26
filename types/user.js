const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) }
  })
})
