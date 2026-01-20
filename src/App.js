import React, { useState } from "react";
import "./App.css";
import logo from "./news.jpg";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("");
  const [viewMode, setViewMode] = useState("card");

  const fetchArticles = async () => {
    if (!query.trim()) {
      setStatus("Enter keyword");
      return;
    }

    setStatus("Loading...");
    try {
      const response = await fetch(
        `http://localhost:5000/news?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        setStatus("Nothing found");
        setArticles([]);
        return;
      }

      setArticles(data.articles);
      setStatus("");
    } catch (err) {
      setStatus("Error loading data");
    }
  };

  const renderArticles = () =>
    articles.map((article, index) => {
      const date = new Date(article.publishedAt);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      if (viewMode === "list") {
        return (
          <div key={index} className="list-item">
            <p>
              <strong>{article.title}</strong> - {article.source.name}
            </p>
            <img
              src={article.urlToImage || ""}
              alt=""
              style={{ width: "20%", borderRadius: "6px" }}
            />
            <p>{article.description || ""}</p>
            <p>{formattedDate}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </div>
        );
      } else {
        return (
          <div key={index} className="card">
            <img src={article.urlToImage || ""} alt="" />
            <h3>{article.title}</h3>
            <p>{article.description || ""}</p>
            <p>{formattedDate}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </div>
        );
      }
    });

  return (
    <>
    <div className="container">
       <img src={logo} alt="Logo" className="logo" />
      <h1>News API Search</h1>

      <div className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter the word"
        />
        <button onClick={fetchArticles}>Search</button>
      </div>

      <div className="format-switch">
        <button onClick={() => setViewMode("list")}>List</button>
        <button onClick={() => setViewMode("card")}>Cards</button>
      </div>

      <div id="status">{status}</div>
      <div id="results">{renderArticles()}</div>
    </div>
    <footer>
        <p>&copy; 2026 Kirils Redkovs. All rights reserved.</p>
        <nav>
          <a href="/privacy">Privacy Policy</a> |{" "}
          <a href="/terms">Terms of Service</a> |{" "}
          <a href="/contact">Contact Us</a>
        </nav>
      </footer>
    </>
  );
}

export default App;
