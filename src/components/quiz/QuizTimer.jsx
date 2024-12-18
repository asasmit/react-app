import React, { useEffect, useState } from 'react';

const QuizTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div>
      <h4>Time Left: {timeLeft} seconds</h4>
    </div>
  );
};

export default QuizTimer;
