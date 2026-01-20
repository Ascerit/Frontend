const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const API_KEY = "b573193d8f9046c48b429830e816d137";

app.get("/news", async (req, res) => {
  const query = req.query.q || "bitcoin";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error request News API" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
