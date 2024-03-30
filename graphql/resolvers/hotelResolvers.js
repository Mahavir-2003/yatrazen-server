// hotelResolvers.js
const Hotel = require("../models/hotelsModel");

const hotelResolvers = {
  Query: {
    getHotel: async (_, { id }) => {
      try {
        const hotel = await Hotel.findById(id);
        return hotel;
      } catch (err) {
        throw new Error("Error retrieving hotel");
      }
    },
    getHotels: async () => {
      // Changed from getHotel to getHotels
      try {
        const hotels = await Hotel.find();
        return hotels;
      } catch (err) {
        throw new Error("Error retrieving hotels");
      }
    },
  },
  Mutation: {
    createHotel: async (_, args) => {
      try {
        const hotel = new Hotel(args);
        await hotel.save();
        return hotel;
      } catch (err) {
        throw new Error("Error creating hotel");
      }
    },
    updateHotel: async (_, args) => {
      try {
        const hotel = await Hotel.findByIdAndUpdate(args.id, args, {
          new: true,
        });
        return hotel;
      } catch (err) {
        throw new Error("Error updating hotel");
      }
    },
    deleteHotel: async (_, { id }) => {
      try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
          throw new Error("Hotel not found");
        }
        return deletedHotel;
      } catch (err) {
        throw new Error(`Error deleting hotel: ${err.message}`);
      }
    },
  },
};

module.exports = hotelResolvers;
