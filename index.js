const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const express = require('express')
const { graphqlHTTP } = require('express-graphql')

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

const AuthorType = new GraphQLObjectType({
  "name": "Author",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
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
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve: function () {
          return [
            {
              id: "123",
              name: "title1"
            },
            {
              id: "1232",
              name: "title2"
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

const app = express();
app.use('/', graphqlHTTP({ schema: schem, graphiql: true }))
app.listen(5000)
