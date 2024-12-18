import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"100vw",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "" }}>
        Welcome to the Quiz App
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "grey" }}>
        Test your knowledge and challenge yourself!
      </p>

      <Link to="/quiz">
        <button
          style={{
            padding: "10px 15px",
            fontSize: "1.2rem",
            backgroundColor: "#4CAF50",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.1s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default HomePage;