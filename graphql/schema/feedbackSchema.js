const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { Query, Mutation } = require("../resolvers/feedbackResolvers"); // Destructure Query and Mutation from feedbackResolvers

const feedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    feedback: { type: GraphQLString },
    imgUri: { type: GraphQLList(GraphQLString) },
    location: { type: GraphQLString }, // Add location field  
  },
});

const feedbackQueryType = new GraphQLObjectType({
  name: "FeedbackQuery",
  fields: {
    getFeedback: {
      type: feedbackType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Query.getFeedback(_, args), // Use destructured Query
    },
    getFeedbacks: {
      type: GraphQLList(feedbackType),
      resolve: () => Query.getFeedbacks(), // Use destructured Query
    },
  },
});

const feedbackMutationType = new GraphQLObjectType({
  name: "FeedbackMutation",
  fields: {
    createFeedback: {
      type: feedbackType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        feedback: { type: GraphQLString },
        imgUri: { type: GraphQLList(GraphQLString) }, // Corrected field name
        location: { type: GraphQLString }, // Add location field
      },
      resolve: (_, args) => Mutation.createFeedback(_, args), // Use destructured Mutation
    },
    updateFeedback: {
      type: feedbackType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        feedback: { type: GraphQLString },
        imgUri: { type: GraphQLList(GraphQLString) },
        location: { type: GraphQLString }, // Add location field
      },
      resolve: (_, args) => Mutation.updateFeedback(_, args), // Use destructured Mutation
    },
    deleteFeedback: {
      type: feedbackType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Mutation.deleteFeedback(_, args), // Use destructured Mutation
    },
  },
});

const mainSchema = new GraphQLSchema({
  query: feedbackQueryType,
  mutation: feedbackMutationType,
});

module.exports = mainSchema;
