import React, { useState } from "react";

const AnswerOptions = ({
  question,
  isChecked,
  handleAnswerChange,
  handleCheckboxChange,
}) => {
  if (!question) {
    return <div className="">No Question Available</div>;
  }
  const { id, questionType, choices } = question;

  if (questionType === "single") {
    return (
      <div>
        {choices.sort().map((choice, index) => (
          <div className="form-check mb-3" key={choice}>
            <input
              type="radio"
              className="form-check-input"
              id={choice}
              value={choice}
              checked={isChecked(question.id, choice)}
              onChange={() => handleAnswerChange(id, choice)}
            />
            <label htmlFor="" className="form-check-label ms-2">
              {choice}
            </label>
          </div>
        ))}
      </div>
    );
  } else if (questionType === "multiple") {
    return (
      <div className="">
        <p>Select all that applay:</p>
        {choices.sort().map((choice, index) => (
          <div className="form-check mb-3" key={choice}>
            <input
              type="checkbox"
              className="form-check-input"
              name={question.id}
              id={choice}
              value={choice}
              checked={isChecked(question.id, choice)}
              onChange={() => handleCheckboxChange(id, choice)}
            />
            <label htmlFor="" className="form-check-label ms-2">
              {choice}
            </label>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerOptions;
