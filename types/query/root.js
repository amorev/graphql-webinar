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
const axios = require('axios')

module.exports = new GraphQLObjectType({
  name: 'ExampleAppRootSchema',
  description: 'Introducing complex schemas',
  fields: () => {
    return ({
      authors: {
        type: new GraphQLList(AuthorType),
        description: 'Authors list',
        resolve: async function () {
          let { data } = await axios('https://jsonplaceholder.typicode.com/users')
          return data
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: 'Posts list',
        resolve: async function () {
          let { data } = await axios('https://jsonplaceholder.typicode.com/posts')
          return data
        }
      }
    })
  }
})
