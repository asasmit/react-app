import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import QuizPage from './pages/quizpage';
import ResultsPage from './pages/resultspage';

const App = () => {
  return (
      <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />}/>
                <Route path="/quiz" element={<QuizPage />}/>
                <Route path="/results" element={<ResultsPage />}/>
              </Routes>
      </Router>
  );
};

export default App;