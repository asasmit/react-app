import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  containerStyle,
  headerStyle,
  errorStyle,
  questionTitleStyle,
  marksStyle,
  optionsContainerStyle,
  optionStyle,
  labelStyle,
  radioStyle,
  submitButtonStyle,
  getAnotherButtonStyle,
  noQuestionStyle,
  loadingStyle, 
} from "./QuizPageStyle";


const QuizPage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    try {
      console.log("hiiiii")
      const response = await axios('http://16.171.41.73:8000/api/question/');
      console.log("API Response:", response);
      const data = response.data;
      
      if (!data || data.detail === "No questions available." || Object.keys(data).length === 0) {
        setError("No questions left!");
        setQuestionData(null);
        return; 
      }
      
      // Check for unsuccessful response
      if (response.status !== 200) { 
        if (response.status === 404) {
          setError("No questions left!"); 
        } else {
          setError(`HTTP error! status: ${response.status}`); 
        }
        setQuestionData(null);
        return; 
      }
      
      setQuestionData(data);
      setError(null); 
      
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch question.");
    }
  };
  

  const submit = async (questionData, selectedOption) => {
    if (!selectedOption) {
      setError("Please select an option before submitting.");
      return;
    }

    try {
      const response = await axios.post('http://16.171.41.73:8000/api/submit/', {
        question_id: questionData.uid,
        option: selectedOption,
      });

      console.log(response.data);
      fetchQuiz();
    } catch (err) {
      console.error(err);
      setError("Failed to submit.");
    }
  };

  useEffect(() => {
    fetchQuiz(); 
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };


  const goToResults = () => {
    navigate("/results");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>All the very best! Quiz.</h1>

      {error && <p style={errorStyle}>{error}</p>}

      {loading && <p style={loadingStyle}>Loading question...</p>}

      {questionData ? (
        <div style={{ width: "100%" }}>
          <h2 style={questionTitleStyle}>{questionData.question}</h2>
          <p style={marksStyle}>
            Marks: <strong>{questionData.marks}</strong>
          </p>

          <div style={optionsContainerStyle}>
            {questionData.options.map((option, index) => (
              <div key={index} style={optionStyle}>
                <label style={labelStyle}>
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option.option}
                    checked={selectedOption === option.option}
                    onChange={() => handleOptionSelect(option.option)}
                    style={radioStyle}
                  />
                  {option.option}
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={() => submit(questionData, selectedOption)}
            style={submitButtonStyle}
            disabled={!selectedOption} 
          >
            Submit
          </button>
          <br />

          <button onClick={fetchQuiz} style={getAnotherButtonStyle}>
            Get Another Question
          </button>
        </div>
      ) : (
        <p style={noQuestionStyle}>No questions to show!</p>
      )}

      <button onClick={goToResults} style={getAnotherButtonStyle}>
        Go to Results
      </button>
    </div>
  );
};

export default QuizPage;