const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const cities = [
  {
    id: 1,
    title: 'Moscow',
    country_id: 1,
  },
  {
    id: 2,
    title: 'New York',
    country_id: 2
  }
]

const authors = [
  {
    id: 1,
    name: 'Anton',
    city_id: 1,
    family: {
      mother: 2,
      father: 3,
      brothers: [4,5],
      sisters: [6,7]
    }
  },
  {
    id: 2,
    name: 'Ivan',
    city_id: 2
  },
  {
    id: 3,
    name: 'Ivan 3',
    city_id: 2
  },
  {
    id: 4,
    name: 'Ivan 4',
    city_id: 2
  },
  {
    id: 5,
    name: 'Ivan 5',
    city_id: 2
  },
  {
    id: 6,
    name: 'Ivan 6',
    city_id: 2
  },
  {
    id: 7,
    name: 'Ivan 7',
    city_id: 2
  },

]

const contries = [
  {
    id: 1,
    title: 'Russia',
    president_id: 1,
  },
  {
    id: 2,
    title: 'USA',
    president_id: 1,
  }
]

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    president: {
      type: PersonType,
      resolve: (country) => {
        return authors.find(a => a.id === country.president_id)
      }
    },
  })
})

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    country: {
      type: CountryType,
      resolve: (city) => {
        return contries.find(c => c.id === city.country_id)
      }
    }
  })
})

const FamilyType = new GraphQLObjectType({
  name: 'FamilyType',
  fields: () => ({
    mother: {
      type: PersonType
    },
    father: {
      type: PersonType
    },
    brothers: {
      type: new GraphQLList(PersonType)
    },
    sisters: {
      type: new GraphQLList(PersonType)
    }
  })
})

const PersonType = new GraphQLObjectType(
  {
    name: 'Person',
    description: 'Person  model in our GraphQL Server',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      family: {
        type: FamilyType,
        resolve: person => {
          if (!person.family) {
            return {}
          }
          return {
            mother: authors.find(e => e.id === person.family.mother),
            father: authors.find(e => e.id === person.family.father),
          }
        }
      },
      city: {
        type: CityType,
        resolve: (author) => {
          return cities.find(city => city.id === author.city_id)
        }
      }
    })
  }
)

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authors: {
      type: new GraphQLList(PersonType),
      resolve: function () {
        return authors
      }
    }
  })
})

const schema = new GraphQLSchema({ query })

var graphqlHTTP = require('express-graphql')
var express = require('express')

const app = express()
app.use('/', graphqlHTTP.graphqlHTTP({
  schema: schema,
  graphiql: true,
}))
app.listen(3000)
