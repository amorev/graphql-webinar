const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql')
const AuthorType = require('./author')
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: new GraphQLList(PostType),
      resolve:async  (user) => {
        let promise = await axios('https://jsonplaceholder.typicode.com/posts?userId=' + user.id).then(r => r.data)
        return promise
      }
    }
  })
})
const DataLoader = require('dataloader')
const UsersLoader = new DataLoader((userIds) => {
  return axios(`https://jsonplaceholder.typicode.com/users`).then(d => d.data.filter(user => userIds.includes(user.id)))
})
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This is post object",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (root) => {
        return UsersLoader.load(root.userId)
      }
    }
  })
})


const axios = require('axios')

module.exports = new GraphQLObjectType({
  name: 'Root_Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(r => r.data.slice(0, 3))
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
