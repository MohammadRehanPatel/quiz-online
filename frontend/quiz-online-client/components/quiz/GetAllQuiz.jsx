import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: "", choices: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
      setIsQuestionDeleted(true);
      setDeleteSuccessMessage("Question Deleted Successfully!");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setDeleteSuccessMessage("");
    }, 3000);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <section className="container">
        <div className="row mt-5">
          <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
            <h4>All Quiz Questions</h4>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            {/* Todo : add a link to navigate to add New Question form */}
            <Link to={"/create-quiz"}>
              <FaPlus /> Add Question
            </Link>
          </div>
        </div>
        <hr />
        {isQuestionDeleted && (
          <div className="alert alert-success">{deleteSuccessMessage}</div>
        )}
        {questions.map((question, index) => (
          <div className="" key={index}>
            <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${
              question.question
            }`}</h4>
            <ul>
              {question.choices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
            <p className="text-success">
              Correct Answer: {question.correctAnswers}
            </p>
            <div className="btn-group mb-4">
              {/* Todo : add a link to navigate to Update Question form */}
              <Link to={`/update-quiz/${question.id}`}>
                <button className="btn btn-sm btn-outline-warning mr-2">
                  Edit Question
                </button>
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(question.id)}
              >
                Delete Question
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GetAllQuiz;
