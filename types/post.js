const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')
const UserType = require('./user')
const axios = require('axios')
const DataLoader = require('dataloader')
const UsersLoader = new DataLoader((userIds) => {
  return axios(`https://jsonplaceholder.typicode.com/users`).then(d => d.data.filter(user => userIds.includes(user.id)))
})
var counter = 1;
module.exports = new GraphQLObjectType({
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
