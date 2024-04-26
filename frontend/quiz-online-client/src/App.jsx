import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import Admin from "./components/Admin";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";
import QuizResult from "./components/quiz/QuizResult";
import Home from "./components/Home";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div className="container-fluid mt-5 mb-5 ">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz-stepper" element={<QuizStepper />} />
            <Route path="/take-quiz" element={<Quiz />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-quiz" element={<AddQuestion />} />
            <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
            <Route path="/all-quizzes" element={<GetAllQuiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
