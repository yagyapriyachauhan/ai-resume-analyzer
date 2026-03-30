require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("./routes");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true, // auto uploads folder bana dega
  })
);

// ✅ Test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Routes
app.use("/api", routes);

// ❌ Error handling middleware (add this)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
console.log("API KEY:", process.env.GROQ_API_KEY);