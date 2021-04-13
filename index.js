const {
  graphql,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')
const axios = require('axios')

const { graphqlHTTP } = require('express-graphql')
const express = require('express')

const posts = [
  {
    id: '123',
    title: 'Awesome post1',
    body: 'Awesome text1',
    author_id: '123',
    user_id: 1
  },
  {
    id: '321',
    title: 'Awesome post2',
    body: 'Awesome text2',
    author_id: '321',
    user_id: 1
  },
  {
    id: '322',
    title: 'Awesome post3',
    body: 'Awesome text3',
    author_id: '321',
    user_id: 2
  },
  {
    id: '323',
    title: 'Awesome post4',
    body: 'Awesome text4',
    author_id: '321',
    user_id: 3
  }
]

let authors = [
  {
    id: '123',
    name: 'anton morev'
  },
  {
    id: '321',
    name: 'ivan ivanov'
  }
]

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (author) => {
        return posts.filter(p => p.author_id === author.id)
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  'name': 'Post',
  description: 'This is a post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (root) => {
        return authors.find(a => a.id === root.author_id)
      }
    },
    body: { type: GraphQLString }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => {
        return posts.filter(p => p.user_id === user.id)
      }
    },
    address: {
      type: new GraphQLObjectType({
        name: 'userAddress',
        fields: () => ({
          street: {
            type: GraphQLString
          },
          city: {
            type: GraphQLString
          },
        })
      })
    }
  })
})

const query = new GraphQLObjectType({
  name: 'OurAppRootSchema',
  description: '..',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(UserType),
        resolve: () => {
          return axios.get('https://jsonplaceholder.typicode.com/users')
            .then(r => r.data)
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        args: {
          filter: {
            type: new GraphQLInputObjectType({
              name: 'AuthorsFilter',
              fields: () => ({
                id: {
                  type: GraphQLString
                },
                name: {
                  type: GraphQLString
                }
              })
            })
          }
        },
        resolve: function (root, args) {
          if (args.filter && args.filter.name) {
            return authors.filter(a => {
              return a.name.indexOf(args.filter.name) !== -1
            })
          }
          return authors
        }
      },
      author: {
        type: AuthorType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, args) {
          return authors.find(a => a.id === args.id)
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: 'Posts list',
        resolve: function () {
          return posts
        }
      },
      post: {
        type: PostType,
        resolve: function () {
          return posts[0]
        }
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'OurAppRootSchemaMutation',
  description: '..',
  fields: () => {
    return {
      author: {
        type: AuthorType,
        args: {
          author: {
            type: new GraphQLNonNull(new GraphQLInputObjectType({
              name: 'AuthorCreate',
              fields: () => ({
                id: {
                  type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                  type: new GraphQLNonNull(GraphQLString)
                }
              })
            }))
          }
        },
        resolve: function (root, args) {
          authors.push(args.author)
          return args.author
        }
      }
    }
  }
})

const schema = new GraphQLSchema({ query, mutation })

const app = express()
console.log(graphqlHTTP)
app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}))
app.post('/upload-file', (req ,res) => {
  // стандартная form-data
  // сохраняем файл

  res.json({'url':"http://sdafsdfsd.sfsdf"})
})
app.listen(3000)
