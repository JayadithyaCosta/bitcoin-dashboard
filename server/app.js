const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const mongoURI =
  "mongodb+srv://jam:jPoSsZd3iPSouaeb@cluster0.0jc9gmd.mongodb.net/";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const historicalRoutes = require("./routes/historical");
const updateRoutes = require("./routes/update");

app.use("/api/historical", historicalRoutes);
app.use("/api/update", updateRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
