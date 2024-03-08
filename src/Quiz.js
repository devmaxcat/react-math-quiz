import React, { useEffect } from 'react'

function QuizQuestion({reportCorrect, correctAnswer, questionString}) {
  
    return (
    <div className='question'>
    <div className='ask'>{questionString}</div>
    <input autoFocus key={Math.random()} className='input' 
    onBlur={(e) => {
        e.target.focus()
    }}
    onKeyUp={(e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
          var value = parseFloat(e.target.value);
          if (value === correctAnswer) {
              reportCorrect(true);
          } else {
              reportCorrect(false);
          }
      }
     
    }}></input>
  </div>)
}

function Results({quizData, returnBack, reportCorrect}) {
    return (
    <div className='results'>
        <span>{quizData.correct}</span>
        <button onClick={() => {reportCorrect('retry')}}>Try again</button>
        <button onClick={() => {returnBack()}}>Options</button>
    </div>)
}

export default function Quiz({quizData, page, currentQuestion, hasStarted, reportCorrect, operatorFunctions, setStarted, startQuiz, returnBack}) {
    
    if (page === 'quiz') {
        var questions = quizData.questions
        if (questions.length > 0 && currentQuestion < questions.length) {
            if (currentQuestion === 0 && !hasStarted) {
                return (
                    <div className='prequiz'>
                        <div>Answer every question to the best of your ability, you will be timed.</div>
                        <button onClick={() => {setStarted(true)}}>Start Quiz</button>
                    </div>
                )
            }
            var questionString = `${questions[currentQuestion].x} ${operatorFunctions.operationNameToSymbol(quizData.type)} ${questions[currentQuestion].y} `

            var correctAnswer = operatorFunctions.answerXYfromOperationName(quizData.type, questions[currentQuestion].x, questions[currentQuestion].y)
            
            return (
               <QuizQuestion reportCorrect={reportCorrect} correctAnswer={correctAnswer} questionString={questionString} />
              )
        } else {
            setStarted(false)
            return (
                <Results reportCorrect={reportCorrect} quizData={quizData} returnBack={returnBack}/>
            )
           
        }
       
    } else {
        return (null)
    }
  
}
