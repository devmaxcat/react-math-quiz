import React from 'react'
import Profile from './Profile'
import Timer from './Timer'

export default function Header({ username, hasStarted, quizData }) {
  return (
    <div className='header'>
      <div className='top'>
        <Profile username={username} />
      </div>
      <div className='bottom'>
        <Timer hasStarted={hasStarted} quizData={quizData} />
      </div>

    </div>
  )
}
