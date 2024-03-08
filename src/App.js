import React, { useState } from "react";
import Header from './Header'
import NotificationBar from './NotificationBar'
import Form from './Form'
import Quiz from './Quiz'

var page = 'info'

var operationFunctions = {
  operationNameToSymbol: function (operatorName) {
    switch (operatorName) {
      case 'Addition': return '+';
      case 'Subtraction': return '-';
      case 'Multiplication': return '*';
      case 'Division': return '/'
      default: return
    }
  },
  answerXYfromOperationName: function (operatorName, x, y) {
    switch (operatorName) {
      case 'Addition':
        return x + y;
      case 'Subtraction':
        return x - y;
      case 'Multiplication':
        return x * y;
      case 'Division':
        return x / y;
      default:
        return
    }
  },
}

function randomNumber() {
  return Math.round((Math.random() * 100) + 1)
}

class Notification {
  constructor(message, time, canClose, shouldQueue) {
    this.message = message;
    this.time = time;
    this.canClose = canClose
    this.shouldQueue = shouldQueue
  }
}

function App() {
  const [hasStarted, setStarted] = useState(false)
  const [quizData, setQuizData] = useState({
    username: 'Anonymous',
    amount: 5,
    type: 'Addition',
    correct: 5,
    questions: [],
    currentQuestion: 0,
  })
  console.log(quizData)
  const [notificationQueue, setNotificationQueue] = useState([])
  const startQuiz = function (event) {
    event.preventDefault()
    const { username, amount, type } = event.target.elements;
    // form validation
    if (username.value === '') {
      setNotificationQueue([...notificationQueue,
      new Notification('Please enter your name', 5, true, false)
      ])
      return
    }
    if (amount.value % 1 !== 0 || amount.value === '' || amount.value < 1) {
      setNotificationQueue([...notificationQueue,
      new Notification('Please enter a whole number', 5, true, false)
      ])
      return
    }
    //

    var generatedQuestions = [];

    for (let i = 0; amount.value > i; i++) {
      generatedQuestions.push({ x: randomNumber(), y: randomNumber() })
    }
    
    setQuizData({
      username: username.value,
      amount: amount.value,
      type: type.value,
      correct: amount.value,
      currentQuestion: 0,
      questions: generatedQuestions,

    })
    page = 'quiz';
  }
  const reportCorrect = function (isCorrect) {
    if (isCorrect) {
      setQuizData({ ...quizData, currentQuestion: quizData.currentQuestion + 1 })
    } else {
      setQuizData({ ...quizData, currentQuestion: quizData.currentQuestion + 1, correct: quizData.correct - 1 })
    }
  }
  return (
    <>
      <Header username={quizData.username} hasStarted={hasStarted} quizData={quizData} page={page} />
      <NotificationBar Queue={notificationQueue} SetQueue={setNotificationQueue} />

      <Form startQuiz={startQuiz} page={page} />
      <Quiz page={page} operatorFunctions={operationFunctions} quizData={quizData} hasStarted={hasStarted} setStarted={setStarted} currentQuestion={quizData.currentQuestion} reportCorrect={reportCorrect} />
    </>
  )
}

export default App;
