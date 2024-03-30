const Review = require("../models/reviewModel");

// Helper function to generate the current date and time
function getCurrentDateTime() {
  const date = new Date();
  const formattedDate = date.toISOString().replace(/\.000Z$/, ""); // Remove milliseconds and time zone offset
  return formattedDate;
}

// Helper function to generate the current time
function getCurrentTime() {
  const date = new Date();
  const time = date.toTimeString().split(" ")[0];
  return time;
}

const reviewResolvers = {
  Query: {
    getReview: async (_, { id }) => {
      try {
        return await Review.findById(id);
      } catch (err) {
        throw new Error(`Error retrieving review: ${err.message}`);
      }
    },
    getReviews: async () => {
      try {
        return await Review.find();
      } catch (err) {
        throw new Error(`Error retrieving reviews: ${err.message}`);
      }
    },
  },
  Mutation: {
    createReview: async (_, args) => {
      try {
        const { username, email, review } = args;
        const currentDateTime = getCurrentDateTime();
        const currentTime = getCurrentTime();
        const newReview = new Review({
          username,
          email,
          review,
          date: currentDateTime,
          time: currentTime,
        });
        await newReview.save();
        return newReview;
      } catch (err) {
        throw new Error(`Error creating review: ${err.message}`);
      }
    },
    updateReview: async (_, args) => {
      try {
        const { id, username, email, review } = args;
        const currentDateTime = getCurrentDateTime();
        const currentTime = getCurrentTime();
        const updatedReview = await Review.findByIdAndUpdate(
          id,
          { username, email, review, date: currentDateTime, time: currentTime },
          { new: true }
        );
        return updatedReview;
      } catch (err) {
        throw new Error(`Error updating review: ${err.message}`);
      }
    },
    deleteReview: async (_, { id }) => {
      try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) throw new Error("Review not found");
        return deletedReview;
      } catch (err) {
        throw new Error(`Error deleting review: ${err.message}`);
      }
    },
  },
};

module.exports = reviewResolvers;
