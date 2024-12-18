import React from 'react';

const QuestionCard = ({ question, onAnswer, onNext }) => {
  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h3>{question.text}</h3>
      <div>
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              onAnswer(key); // Send selected option
              onNext(); // Move to next question
            }}
          >
            {key}. {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;