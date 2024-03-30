const Feedback = require("../models/feedbackModel");

const feedbackResolvers = {
  Query: {
    getFeedback: async (_, { id }) => {
      try {
        return await Feedback.findById(id);
      } catch (err) {
        throw new Error("Error retrieving feedback");
      }
    },
    getFeedbacks: async () => {
      try {
        return await Feedback.find();
      } catch (err) {
        throw new Error("Error retrieving feedbacks");
      }
    },
  },
  Mutation: {
    createFeedback: async (_, args) => {
      try {
        const feedback = await Feedback.create(args);
        return feedback;
      } catch (err) {
        throw new Error("Error creating feedback");
      }
    },
    updateFeedback: async (_, args) => {
      try {
        const { id, ...updateData } = args;
        const feedback = await Feedback.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        return feedback;
      } catch (err) {
        throw new Error("Error updating feedback");
      }
    },
    deleteFeedback: async (_, { id }) => {
      try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
          throw new Error("Feedback not found");
        }
        return deletedFeedback;
      } catch (err) {
        throw new Error(`Error deleting feedback: ${err.message}`);
      }
    },
  },
};

module.exports = feedbackResolvers;
