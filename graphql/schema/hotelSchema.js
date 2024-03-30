const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
const { Query, Mutation } = require("../resolvers/hotelResolvers"); // Corrected import statement

const hotelType = new GraphQLObjectType({
  name: "Hotel",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    location: { type: GraphQLString },
  },
});

const hotelQueryType = new GraphQLObjectType({
  name: "HotelQuery",
  fields: {
    getHotel: {
      type: hotelType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Query.getHotel(_, args),
    },
    getHotels: {
      type: GraphQLList(hotelType),
      resolve: () => Query.getHotels(),
    },
  },
});

const hotelMutationType = new GraphQLObjectType({
  name: "HotelMutation",
  fields: {
    createHotel: {
      type: hotelType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        location: { type: GraphQLString },
      },
      resolve: (_, args) => Mutation.createHotel(_, args),
    },
    updateHotel: {
      type: hotelType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        location: { type: GraphQLString },
      },
      resolve: (_, args) => Mutation.updateHotel(_, args),
    },
    deleteHotel: {
      type: hotelType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Mutation.deleteHotel(_, args),
    },
  },
});

const hotelSchema = new GraphQLSchema({
  query: hotelQueryType,
  mutation: hotelMutationType,
});

module.exports = hotelSchema;
