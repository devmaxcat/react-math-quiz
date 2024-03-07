import React from 'react'
import Profile from './Profile'

export default function Header({username}) {
  return (
    <div>
      <Profile username={username} />
    </div>
  )
}
