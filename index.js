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

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
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
            body: "Post Body"
          }
        ]
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return [
          {
            id: "123",
            name: "Author name"
          }
        ]
      }
    }
  })
})






var schema = new GraphQLSchema({ query })

gql.graphql(schema, '{ posts { id, title, body}, authors { id, name } }', root).then((response) => {
  console.log(JSON.stringify(response))
})
