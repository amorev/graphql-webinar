const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')
const AuthorType = require('./author')
const axios = require('axios')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: async function (post) {
        let url = `https://jsonplaceholder.typicode.com/users/${post.userId}`
        return (await axios(url)).data
      }
    },
    body: { type: GraphQLString },
  })
})
