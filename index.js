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
let posts = [
  {
    id: "123",
    title: "title1",
    authorId: "123",
    body: "body1"
  },
  {
    id: "1232",
    authorId: "1232",
    title: "title2",
    body: "body2"
  }
]
let authors = [
  {
    id: "123",
    name: "title1"
  },
  {
    id: "1232",
    name: "title2"
  }
]

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
    author: {
      type: AuthorType,
      resolve: (root) => {
        let find = authors.find(e => e.id === root.authorId)
        return find
      }
    }
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
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (root) => {
        const authorId = root.id
        return posts.filter(e => e.authorId === authorId)
      }
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

          return posts
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve: function () {

          return authors
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
