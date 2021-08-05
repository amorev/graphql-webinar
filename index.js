const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const PostType = new GraphQLObjectType({
  "name": "Post",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    body: {
      type: GraphQLString
    },
  })
})

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      posts: {
        type: new GraphQLList(PostType),
        resolve: function () {
          return [
            {
              id: "123",
              title: "title1",
              body: "body1"
            },
            {
              id: "1232",
              title: "title2",
              body: "body2"
            }
          ]
        }
      }
    }
  }
})

const schem = new GraphQLSchema({
  query
})

graphql(schem, '{ posts { id, title, body } }').then(r => {
  console.log(JSON.stringify(r))
})

/*
type Post {
  id: String!
}
type Query {
  posts: [PostType]
}
 */
