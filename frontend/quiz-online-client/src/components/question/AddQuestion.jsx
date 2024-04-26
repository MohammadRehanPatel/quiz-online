import React, { useEffect, useState } from "react";
import { createQuestion, getSubjects } from "../../../utils/QuizService";
import { Link } from "react-router-dom";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectData = await getSubjects();
      console.log(subjectData);
      setSubjectOptions(subjectData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChoice = async () => {
    const lastChoice = choices[choices.length - 1];
    const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
    const newChoiceLetter = String.fromCharCode(
      lastChoiceLetter.charCodeAt(0) + 1
    );
    const newChoice = `${newChoiceLetter}.`;
    setChoices([...choices, newChoice]);
  };

  const handleRemoveChoice = async (index) => {
    setChoices(choices.filter((choice, i) => i !== index));
  };

  const handleChoiceChange = async (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(
      correctAnswers.map((answer, i) => (i === index ? value : answer))
    );
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers: correctAnswers.map((answer) => {
          const choiceLetter = answer.charAt(0).toUpperCase();
          const choiceIndex = choiceLetter.charCodeAt(0) - 65;
          return choiceIndex >= 0 && choiceIndex < choices.length
            ? choiceLetter
            : null;
        }),
        subject,
      };
      await createQuestion(result);
      setQuestion("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  return (
    <div className="container mt-2 ">
      <div className="row justify-content-center">
        <div className="col-md-12 mt-5">
          <div className="card">
            <div className="card-header bg-primary text-white ">
              <h5 className="card-title">Add New Question</h5>
            </div>
            <div className="card-body  ">
              <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-info">
                    Select Subject
                  </label>
                  <select
                    id="subject"
                    className="form-control bg-info-subtle "
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value={""}>Select a subject..</option>
                    <option value={"New"}>Add New Subject</option>
                    {subjectOptions?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {subject === "New" && (
                  <div className="mb-3">
                    <label
                      htmlFor="new-subject"
                      className="form-label text-info "
                    >
                      Add a New Subject
                    </label>
                    <input
                      id="new-subject"
                      label="Enter the new subject:"
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Type here..."
                      className="form-control bg-info-subtle"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={handleAddSubject}
                    >
                      Add Subject
                    </button>
                  </div>
                )}
                <div className="mb-2">
                  <label htmlFor="question" className="form-label text-info ">
                    Question
                  </label>
                  <textarea
                    className="form-control bg-info-subtle"
                    name="question"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="question-type"
                    className="form-label text-info"
                  >
                    Question Type
                  </label>
                  <select
                    className="form-control bg-info-subtle"
                    value={questionType}
                    name="question-type"
                    onChange={(e) => setQuestionType(e.target.value)}
                    id="question-type"
                  >
                    <option value={"single"}>Single Answer</option>
                    <option value={"multiple"}>Multiple Answers</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="choices" className="form-label text-info ">
                    Choices
                  </label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3 ">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) =>
                          handleChoiceChange(index, e.target.value)
                        }
                        className="form-control bg-info-subtle"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm "
                        onClick={() => handleRemoveChoice(index)}
                      >
                        Remove{" "}
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleAddChoice}
                  >
                    Add Choice
                  </button>
                </div>

                {questionType === "single" && (
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label text-info">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={correctAnswers[0]}
                      onChange={(e) =>
                        handleCorrectAnswerChange(0, e.target.value)
                      }
                      className="form-control bg-info-subtle"
                    />
                  </div>
                )}
                {questionType === "multiple" && (
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label text-info">
                      Correct Answer (s)
                    </label>
                    {correctAnswers.map((answer, index) => (
                      <div className="mb-2">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) =>
                            handleCorrectAnswerChange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            Remove{" "}
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleAddCorrectAnswer}
                    >
                      Add Correct Answer
                    </button>
                  </div>
                )}
                {!correctAnswers.length && (
                  <p>Please enter at least one correct answer.</p>
                )}
                <div className="btn-group">
                  <button
                    className="btn btn-outline-success  mr-2"
                    type="submit"
                  >
                    Save Question
                  </button>
                  <Link
                    to={"/all-quizzes"}
                    className="btn btn-outline-primary mr-2"
                  >
                    Back to Existing question
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
