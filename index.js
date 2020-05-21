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

const query = new GraphQLObjectType({
  name: 'ExampleAppRootSchema',
  description: 'Introducing complex schemas',
  fields: () => {
    return ({
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

graphql(schema, '{ posts {id, title} }').then((response) => {
  console.log(JSON.stringify(response))
})
