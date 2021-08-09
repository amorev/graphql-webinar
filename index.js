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
    authorId: 1,
    body: "body1"
  },
  {
    id: "1232",
    authorId: 2,
    title: "title2",
    body: "body2"
  },
  {
    id: "1232",
    authorId: 2,
    title: "title2",
    body: "body2"
  },
  {
    id: "1232",
    authorId: 2,
    title: "title2",
    body: "body2"
  },
  {
    id: "1232",
    authorId: 2,
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
let queriesCount = 0;
function getAuthor (id) {
  console.log('make query:', ++queriesCount)
  return client.query("SELECT * FROM authors where id = $1", [id])
    .then(res => {
      return res.rows[0]
    })
}

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
        return getAuthor(root.authorId)
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
          console.log('make query:', ++queriesCount)
          return posts
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve: function () {
          console.log('make query:', ++queriesCount)
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
          return getAuthor(args.id)
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
