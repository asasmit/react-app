import React, { useState, useEffect } from "react";
import axios from "axios";
import { containerStyle, headerStyle, resultStyle, loadingStyle } from "./ResultPageStyle";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/results/`);
        
        if (response.data.message && response.data.message === "No questions available") {
          setError("No questions to show.");
          setLoading(false);
        } else {
          setResults(response.data.questions);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch results.");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p style={loadingStyle}>Loading results...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Quiz Results</h1>
      
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} style={resultStyle}>
            <h3> Question: {result.question_text}</h3>
            <p><strong>Correct Answer:</strong> {result.correct_option}</p>
            <p><strong>Your Answer:</strong> {result.given_answers.map((answer, idx) => (
              <span key={idx}>
                {answer.given_answer ? answer.given_answer : "No answer given"}{" "}
                <span style={{ color: answer.is_correct ? "green" : "red" }}>
                  ({answer.is_correct ? "Correct" : "Incorrect"})
                </span>
              </span>
            ))}</p>
          </div>
        ))
      ) : (
        <p>No results available.</p>
      )}
    </div>
  );
};

export default ResultsPage;