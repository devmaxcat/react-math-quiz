import React from 'react'
import Profile from './Profile'

export default function Header({username}) {
  return (
    <div className='header'>
      <Profile username={username} />
    </div>
  )
}
