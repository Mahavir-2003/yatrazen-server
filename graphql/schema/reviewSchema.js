const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const reviewResolvers = require("../resolvers/reviewResolves");

const reviewType = new GraphQLObjectType({
  name: "Review",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    review: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
  },
});

const reviewSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      getReview: {
        type: reviewType,
        args: { id: { type: GraphQLID } },
        resolve: (_, args) => reviewResolvers.Query.getReview(_, args),
      },
      getReviews: {
        type: new GraphQLList(reviewType),
        resolve: () => reviewResolvers.Query.getReviews(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createReview: {
        type: reviewType,
        args: {
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          review: { type: GraphQLString },
        },
        resolve: (_, args) => reviewResolvers.Mutation.createReview(_, args),
      },
      updateReview: {
        type: reviewType,
        args: {
          id: { type: GraphQLID },
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          review: { type: GraphQLString },
        },
        resolve: (_, args) => reviewResolvers.Mutation.updateReview(_, args),
      },
      deleteReview: {
        type: reviewType,
        args: { id: { type: GraphQLID } },
        resolve: (_, args) => reviewResolvers.Mutation.deleteReview(_, args),
      },
    },
  }),
});

module.exports = reviewSchema;
