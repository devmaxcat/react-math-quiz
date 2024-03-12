import React, { useState } from "react";

import Header from './header/Header'
import NotificationBar from './header/NotificationBar'
import Form from './Form'
import Quiz from './quiz/Quiz'

import GlobalModule from '../ModuleFunctions'

var page = 'info' // I really don't like the idea of doing this, but I struggled with finding a solution to having multiple pages without using external packages.
// Scalability? wait nevermind...

class Notification {
  constructor(message, time, canClose, shouldQueue) {
    this.message = message;
    this.time = time;
    this.canClose = canClose;
    this.shouldQueue = shouldQueue;
  }
}

function App() {
  const [hasStarted, setStarted] = useState(false)

  const [quizData, setQuizData] = useState({ // These are comparable to the default settings
    username: '',
    amount: 5,
    type: 'Addition',
    correct: 5,
    questions: [],
    currentQuestion: 0,
    hard: false,
  });

  const [notificationQueue, setNotificationQueue] = useState([]);

  const notify = function (notification) {
    setNotificationQueue([...notificationQueue, notification]);
  }

  const goToOptions = function (event) { // for back buttons
    setQuizData({ ...quizData });
    page = 'info';
  }

  const startQuiz = function (event) { // handles state for starting another set of flashcards
    event.preventDefault();

    setStarted(false); // this state variable usually makes unnecessary re-renders, but I do need it in edge-cases, I think some refactoring would help remove the issue.

    const { username, amount, type, hard } = event.target.elements;

    // form validation
    if (username.value === '') {
      username.setAttribute('aria-invalid', 'true');
      notify(new Notification('Please enter your name', 5, true, false));
      return;
    }
    if (amount.value % 1 !== 0 || amount.value === '' || amount.value < 1) {
      amount.setAttribute('aria-invalid', 'true');
      notify(new Notification('Amount must be a whole number that is greater than zero', 5, true, false))
      return;
    }
    if (amount.value > 100) {
      amount.setAttribute('aria-invalid', 'true');
      notify(new Notification('Question amount must be less than 100.', 5, true, false))
      return;
    }
    //

    setQuizData({
      username: username.value,
      amount: amount.value,
      type: type.value,
      correct: amount.value,
      currentQuestion: 0,
      questions: GlobalModule.generateQuestions(amount.value, type.value, hard.checked),
      hard: hard.checked

    });

    page = 'quiz';
  }

  const reportCorrect = function (isCorrect) {
    if (isCorrect === 'retry') {
      setQuizData({ ...quizData, currentQuestion: 0, correct: quizData.amount, questions: GlobalModule.generateQuestions(quizData.amount, quizData.type, quizData.hard) });
      setStarted(false);
      return // stop!
    }
    if (isCorrect) {
      setQuizData({ ...quizData, currentQuestion: quizData.currentQuestion + 1 })
    } else {
      setQuizData({ ...quizData, currentQuestion: quizData.currentQuestion + 1, correct: quizData.correct - 1 })
    }
  }

  return (
    <>
      <Header page={page} username={quizData.username} hasStarted={hasStarted} quizData={quizData} />
      <NotificationBar Queue={notificationQueue} SetQueue={setNotificationQueue} />
      <main>
        <Form startQuiz={startQuiz} page={page} quizData={quizData} />
        <Quiz startQuiz={startQuiz} returnBack={goToOptions} page={page} quizData={quizData} hasStarted={hasStarted} setStarted={setStarted} currentQuestion={quizData.currentQuestion} reportCorrect={reportCorrect} />
      </main>

    </>
  )
}

export default App;
