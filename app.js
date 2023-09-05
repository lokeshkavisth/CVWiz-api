const express = require("express");
const dotenv = require("dotenv");

const router = require("./routes/resumes.routes");
const db = require("./config/database");

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

// start the server after successful database connection
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Connect to the database
db.query("SELECT 'Database connection successful' AS message")
  .then(([results]) => {
    if (
      results &&
      results[0] &&
      results[0].message === "Database connection successful"
    ) {
      console.log("Database connection successful");
      startServer(); // Start the server
    } else {
      console.error(
        "Database connection failed: Unexpected result from the query"
      );
    }
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Use middleware for API routes
app.use("/api/resume", router);
