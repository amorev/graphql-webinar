var gql = require('graphql')
const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This is post object",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString }
  })
})

const query = new GraphQLObjectType({
  name: "Root_Schema",
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return [
          {
            id: "123",
            title: "Post title",
            description: "Post Description"
          }
        ]
      }
    }
  })
})






var schema = new GraphQLSchema({ query })

gql.graphql(schema, '{ posts { id, title} }', root).then((response) => {
  console.log(JSON.stringify(response))
})
