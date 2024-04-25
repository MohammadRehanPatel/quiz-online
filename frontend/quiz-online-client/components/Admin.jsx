import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-2">
      <h2 className="mt-5">Welcome to Admin Home Page</h2>
      <hr />
      <nav className="nav flex-column">
        <Link to={"/create-quiz"} className="nav-link">
          Create a New Quiz
        </Link>
        <Link to={"/all-quizzes"} className="nav-link">
          Manage existing Quizes
        </Link>
      </nav>
    </section>
  );
};

export default Admin;
