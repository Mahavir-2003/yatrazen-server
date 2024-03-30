const axios = require("axios");
require("dotenv").config();

const apiUrl = "https://api.newscatcherapi.com/v2/search";
const apiKey = process.env.NEWSCATCHER_API_KEY;

const commonParams = {
  lang: "en",
  sort_by: "date",
  topic: "travel",
  page_size: "100",
  page: "1",
};

const getAllNews = async (query) => {
  const params = {
    ...commonParams,
    q: `(${query}) AND (welcomed OR celebrated OR loved OR succeeded OR joyful OR victorious OR flourished OR thrived OR admired OR honored OR delighted OR enthusiastic OR grateful OR content OR excited OR happy OR optimistic OR radiant OR triumphant OR prosperous OR killed OR robbed OR arrested OR hated OR failed OR rejected OR betrayed OR suffered OR lost OR misfortune OR despair OR depressed OR miserable OR abandoned OR lonely OR defeated OR desperate OR forsaken OR ruined OR wretched)`,
  };

  try {
    const response = await axios.get(apiUrl, {
      params,
      headers: { "x-api-key": apiKey },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

const getNewsTitles = async (query) => {
  try {
    let { articles } = await getAllNews(query);

    if (articles === undefined || articles.length === 0) {
      articles = [
        {
          title:
            "NEUTRAL NEWS: No news found for the given query. Please try again.",
        },
      ];
    }

    const formattedTitles = articles
      .slice(0, 20)
      .map(({ title }) => `"${title}"`)
      .join(", ");
    return (
      formattedTitles ||
      "NEUTRAL NEWS: No news found for the given query. Please try again."
    );
  } catch (error) {
    console.error("Error fetching news titles:", error);
    throw error;
  }
};

module.exports = { getNewsTitles, getAllNews };
