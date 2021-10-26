const {
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')
const PostType = require('./post')
const AuthorType = require('./author')

module.exports = new GraphQLObjectType({
  name: 'Root_Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return require('../mockdata').posts
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return require('../mockdata').authors
      }
    }
  })
})
