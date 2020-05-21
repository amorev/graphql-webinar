var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    bye: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  bye: () => {
    return 'Bye world';
  }
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello, bye }', root).then((response) => {
  console.log(response);
});
