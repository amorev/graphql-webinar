const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const PostType = require('./post')
const AuthorType = require('./author')

module.exports = new GraphQLObjectType({
  name: 'ExampleAppRootSchema',
  description: 'Introducing complex schemas',
  fields: () => {
    return ({
      authors: {
        type: new GraphQLList(AuthorType),
        description: 'Authors list',
        resolve: function () {
          return require('../data/mock').authors
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: 'Posts list',
        resolve: function () {
          return require('../data/mock').posts
        }
      }
    })
  }
})
