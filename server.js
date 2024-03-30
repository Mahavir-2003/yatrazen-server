const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require('cors');

// Import GraphQL schemas
const feedbackSchema = require("./graphql/schema/feedbackSchema");
const hotelSchema = require("./graphql/schema/hotelSchema");
const reviewSchema = require("./graphql/schema/reviewSchema");

// Import database connection function
const connect = require("./db/connection");

// Import utilities
const senseScore = require("./utils/senseScore");
const getAllNews = require("./utils/newsCompiler").getAllNews;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware for API key authentication
const apiKeyMiddleware = (req, res, next) => {
  const apiKeyHeader = req.headers["x-api-key"];
  const apiKeyQuery = req.query.api_key;
  const validAPIKey = process.env.YATRAZEN_API;

  if (!apiKeyHeader && !apiKeyQuery) {
    const docsUrl = getDocsUrl(req);
    return res.status(403).json({ error: "Missing API Key", docs: docsUrl });
  }

  if (apiKeyHeader === validAPIKey || apiKeyQuery === validAPIKey) {
    return next();
  }

  const docsUrl = getDocsUrl(req);
  return res.status(403).json({ error: "Invalid API Key", docs: docsUrl });
};

// Function to get the documentation URL based on the environment
const getDocsUrl = (req) => {
  const port =
    process.env.NODE_ENV === "production" ? "" : `:${req.socket.localPort}`;
  return `${req.protocol}://${req.hostname}${port}/docs`;
};

// Serve documentation page
app.use("/docs", (req, res) => {
  res.sendFile(__dirname + "/docs.html");
});

// Apply API key middleware to routes requiring authentication
app.use(apiKeyMiddleware);

// Route for getting sense score
app.get("/senseScore/:userQuery", async (req, res) => {
  try {
    const userQuery = req.params.userQuery;
    const result = await senseScore(userQuery);
    const newsData = await getAllNews(userQuery);
    res.json({
      status: "Success",
      message: "Sense Score of Top 50 NEWS Headlines",
      score: result,
      news: newsData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GraphQL endpoints
app.use(
  "/graphql/feedback",
  graphqlHTTP({ schema: feedbackSchema, graphiql: true })
);
app.use("/graphql/hotel", graphqlHTTP({ schema: hotelSchema, graphiql: true }));
app.use(
  "/graphql/review",
  graphqlHTTP({ schema: reviewSchema, graphiql: true })
);

// Home route
app.use("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

// Connect to database
connect();
