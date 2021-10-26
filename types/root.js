const {
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')
const PostType = require('./post')
const AuthorType = require('./author')
const UserType = require('./user')
const axios = require('axios')

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
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return axios.get('https://jsonplaceholder.typicode.com/users')
          .then(r => r.data)
      }
    }
  })
})
