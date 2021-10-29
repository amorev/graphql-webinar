const { ApolloServer, gql, PubSub } = require('apollo-server')
const pubsub = new PubSub()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }

    type Subscription {
        newBook: Book
    }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
  Subscription: {
    newBook: {
      subscribe: () => pubsub.asyncIterator(['NEW_BOOK'])
    }
  }
}

setInterval(() => {
  console.log('trigger')
  pubsub.publish('NEW_BOOK', {
    newBook: {
      title: 'Book new',
      author: 'author of new book'
    }
  })
}, 10000)

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, subscriptions: {
  path: '/graphql'
  } })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
