const axios = require("axios");
const getNewsTitles = require("./newsCompiler").getNewsTitles;

async function senseScore(userQuery) {
  try {
    console.log("Getting news titles for sentiment analysis...");
    const newsTitles = await getNewsTitles(userQuery);
    const data = {
      inputs: newsTitles,
    };

    // Send data for sentiment analysis
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API}`,
        },
      }
    );

    // Return the response data
    
    return response.data;
  } catch (error) {
    console.error("Error in senseScore:", error);
    throw error;
  }
}

module.exports = senseScore;