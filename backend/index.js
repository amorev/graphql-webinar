const { ApolloServer, gql, PubSub } = require('apollo-server')

const pubsub = new PubSub();
// Hardcoded data store
const books = [
  {
    title: 'The Awakening',
    year: 2020,
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    year: 2019,
    author: 'Paul Auster',
  },
]

// Schema definition
const typeDefs = gql`
    type Book {
        title: String
        author: String
        year: Int
    }

    type Query {
        books (year: Int): [Book]
    }
    
    type Mutation {
        books (year: Int!, author: String!, title: String!): String
    }
    
    type Subscription {
        newBook: Book
    }
`

// Resolver map
const resolvers = {
  Subscription: {
    newBook: {
      subscribe: () => {
        return pubsub.asyncIterator(['newBook'])
      }
    }
  },
  Query: {
    books (parent, args) {
      let resultBooks = books
      if (args.year)
        resultBooks = resultBooks.filter(b => b.year === args.year)
      return resultBooks
    }
  },
  Mutation: {
    books (parent, args) {
      books.push(args)
      pubsub.publish('newBook', {
        newBook: args
      })
      return ""
    }
  }
}

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers })

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
