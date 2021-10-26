const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
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
        return axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(r => r.data)
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
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => {
        return axios.get('https://jsonplaceholder.typicode.com/users/'+args.id)
          .then(r => r.data)
      }
    }
  })
})
