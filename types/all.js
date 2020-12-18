const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const connector = require('../db/connector')
const dataloader = require('dataloader')

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

const CityLoader = new dataloader(async (cityIds) => {
  const cities = await connector.getCitiesByIds(cityIds)
  const result = []
  cityIds.forEach(id => {
    result.push(cities.find(c => c.id === id))
  })
  return result
})

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    variants: {
      type: new GraphQLList(ProductVariantType),
      resolve: product => {
        return db.fetchVariants(product.id)
      }
    },
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
      product :(root, args) => {
        return db.fetchProduct(args.id)
      },
      family: {
        type: FamilyType,
        resolve: person => {
          if (!person.mother_id && !person.father_id) {
            return null
          }
          return {
            mother: connector.getPersonById(person.mother_id),
            father: connector.getPersonById(person.father_id)
          }
        }
      },
      children: {
        type: new GraphQLList(PersonType),
        resolve: person => {
          return connector.getChildren(person.id)
        }
      },
      city: {
        type: CityType,
        resolve: (person) => {
          return CityLoader.load(person.city_id)
        }
      }
    })
  }
)

module.exports = {
  PersonType
}
