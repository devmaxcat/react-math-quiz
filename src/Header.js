import React from 'react'
import Profile from './Profile'
import Timer from './Timer'

export default function Header({ username, hasStarted, quizData, page }) {
  var progressPercent = hasStarted ? ((quizData.currentQuestion / quizData.questions.length) * 100) + '%' : '100%'
  return (
    <div className='header'>
      <div className='top'>
      <span className='title'>Math Quiz</span>
        <Profile username={username} />
       
      </div>
      <div className={'bottom ' + (page === 'quiz')}>
        <div>{quizData.currentQuestion}/{quizData.questions.length}</div>
        <Timer hasStarted={hasStarted} quizData={quizData} />
        <div>{quizData.type}</div>
      </div>
    <div className='progressBar' style={{width: progressPercent}}>

    </div>
    </div>
  )
}
