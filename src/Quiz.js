import React from 'react'

function QuizQuestion({reportCorrect, correctAnswer, questionString}) {
    return (
    <div className='question'>
    <div className='ask'>{questionString}</div>
    <input className='input' onKeyUp={(e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
          var value = parseFloat(e.target.value);
          if (value === correctAnswer) {
              reportCorrect(true)
          } else {
              reportCorrect(false)
          }
      }
     
    }}></input>
  </div>)
}

function ResultScreen({quizData}) {
    return (
    <div className='results'>
        <span>{quizData.correct}</span>
    </div>)
}

export default function Quiz({quizData, page, currentQuestion, reportCorrect, operatorFunctions}) {
   
    if (page === 'quiz') {
        var questions = quizData.questions
        if (questions.length > 0 && currentQuestion < questions.length) {
            var questionString = `${questions[currentQuestion].x} ${operatorFunctions.operationNameToSymbol(quizData.type)} ${questions[currentQuestion].y} `
            var correctAnswer = operatorFunctions.answerXYfromOperationName(quizData.type, questions[currentQuestion].x, questions[currentQuestion].y)
            return (
               <QuizQuestion reportCorrect={reportCorrect} correctAnswer={correctAnswer} questionString={questionString} />
              )
        } else {
            return (
                <ResultScreen quizData={quizData} />
            )
           
        }
       
    } else {
        return (null)
    }
  
}
