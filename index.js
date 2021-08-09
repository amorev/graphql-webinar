const {
  graphql,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')
const { Client } = require('pg')
const client = new Client({
  user: 'root',
  host: process.env.PG_HOST,
  database: 'GQL_Lesson',
  password: process.env.PG_PASS,
  port: 5432,
})

client.connect()

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
      type: new GraphQLNonNull(GraphQLInt)
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
          return client.query('SELECT * from authors')
            .then(res => {
              const authors = res.rows
              console.log(authors)
              return authors;
            })
        }
      },
      author: {
        type: AuthorType,
        args: {
            id:  {
              type: GraphQLInt
            }
        },
        resolve: function (root, args) {
          console.log(args)
          return client.query("SELECT * FROM authors where id = $1", [args.id])
            .then(res => {
              return res.rows[0]
            })
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
