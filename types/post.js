const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')
const UserType = require('./user')
const axios = require('axios')
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
        console.log(++counter)
        return axios.get('https://jsonplaceholder.typicode.com/users/'+root.userId)
          .then(r => r.data)
      }
    }
  })
})
