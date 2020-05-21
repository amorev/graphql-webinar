const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')
const AuthorType = require('./author')
const { authors } = require('../data/mock')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: function (post) {
        return authors.find(e => e.id === post.author_id)
      }
    },
    body: { type: GraphQLString },
  })
})
