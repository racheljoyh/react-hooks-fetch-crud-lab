import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // GET Request to fetch data
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  // PATCH Request to update "correctIndex"
  function handleAnswerChange({ id, correctIndex }) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  const questionsToDisplay = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdatedAnswer={handleAnswerChange}
    ></QuestionItem>
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> {questionsToDisplay}</ul>
    </section>
  );
}

export default QuestionList;
