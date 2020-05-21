const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
})

const query = new GraphQLObjectType({
  name: 'ExampleAppRootSchema',
  description: 'Introducing complex schemas',
  fields: () => {
    return ({
      authors: {
        type: new GraphQLList(AuthorType),
        description: 'Authors list',
        resolve: function () {
          return [
            {
              id: '1',
              name: 'Anton'
            }
          ]
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: 'Posts list',
        resolve: function () {
          return [
            {
              id: '123',
              title: 'Post about GraphQL',
              body: 'Awesome text about GraphQL'
            }
          ]
        }
      }
    })
  }
})

const schema = new GraphQLSchema({ query })

graphql(schema, '{ posts {id, title}, authors {id} }').then((response) => {
  console.log(JSON.stringify(response))
})
