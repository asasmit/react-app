import React from 'react';

const AnswerChoice = ({ choice, onAnswer }) => {
  return (
    <div>
      <button onClick={() => onAnswer(choice)}>{choice}</button>
    </div>
  );
};

export default AnswerChoice;
