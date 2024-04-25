import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../utils/QuizService";

const UpdateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;

    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value);
  };
  const handleQuestionUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      //TODo:  navigate back to all question page
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container">
      <h4 className="mt-5" style={{ color: "GrayText" }}>
        Update Quiz Question
      </h4>
      <div className="col-md-8">
        <form action="" onSubmit={handleQuestionUpdate}>
          <div className="form-group">
            <label className="text-info" htmlFor="questionInput">
              Question:
            </label>
            <textarea
              className="form-control"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="form-control">
            <label className="text-info" htmlFor="choices">
              Choices:
            </label>
            {choices.map((choice, index) => (
              <input
                type="text"
                className="form-control mb-4"
                key={index}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>
          <div className="form-control">
            <label className="text-info" htmlFor="correct-answers">
              Currect Answer (s):
            </label>
            <input
              type="text"
              className="form-control mb-4"
              value={correctAnswers}
              onChange={handleCorrectAnswerChange}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-sm btn-outline-warning">
              Update Question
            </button>
            {/* Todo: Add A link back to all Questions */}
            <Link to={"/all-quizzes"} className="btn btn-outline-primary mr-2">
              Back to all question
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateQuestion;
