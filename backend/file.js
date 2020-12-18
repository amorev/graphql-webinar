const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    
`;

const resolvers = {
  Query: {
    uploads: (parent, args) => {},
  },
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then(file => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        return file;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
