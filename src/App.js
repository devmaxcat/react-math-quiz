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

function generateQuestions(amount) {
  var generatedQuestions = [];

  for (let i = 0; amount > i; i++) {
    generatedQuestions.push({ x: randomNumber(), y: randomNumber() })
  }

  return generatedQuestions
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
  const goToOptions = function(event) {
   
    setQuizData({...quizData})
    page = 'info'
  }
  const startQuiz = function (event) {
    setStarted(false)
    event.preventDefault()
    const { username, amount, type } = event.target.elements ;
    // form validation
    if (username.value === '') {
      username.setAttribute('aria-invalid', 'true')
      setNotificationQueue([...notificationQueue,
      new Notification('Please enter your name', 5, true, false)
      ])
      return
    }
    if (amount.value % 1 !== 0 || amount.value === '' || amount.value < 1) {
      amount.setAttribute('aria-invalid', 'true')
      setNotificationQueue([...notificationQueue,
      new Notification('Please enter a whole number', 5, true, false)
      ])
      return
    }
    //

   
    
    setQuizData({
      username: username.value,
      amount: amount.value,
      type: type.value,
      correct: amount.value,
      currentQuestion: 0,
      questions: generateQuestions(amount.value),

    })
    page = 'quiz';
  }
  const reportCorrect = function (isCorrect) {
    if (isCorrect === 'retry') {
      setQuizData({ ...quizData, currentQuestion: 0, correct: quizData.amount, questions: generateQuestions(quizData.amount) })
      setStarted(false)
      return
    }
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
      <main>
      <Form startQuiz={startQuiz} page={page} />
      <Quiz startQuiz={startQuiz} returnBack={goToOptions}  page={page} operatorFunctions={operationFunctions} quizData={quizData} hasStarted={hasStarted} setStarted={setStarted} currentQuestion={quizData.currentQuestion} reportCorrect={reportCorrect} />
      </main>
    
    </>
  )
}

export default App;
