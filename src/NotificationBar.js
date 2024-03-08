import React, { useState } from 'react'
var timeout;
export default function NotificationBar({ Queue }) {
  const [index, setIndex] = useState(0);

  const notification = Queue[index] ? Queue[index] : { message: '' }
  


  if (Queue.length > index) {
    timeout = setTimeout(() => {
      setIndex(index + 1)
    }, notification.time * 1000)

  }
  if (!notification.shouldQueue && Queue.length > index) {
    clearTimeout(timeout)
    if (Queue.length - 1 > index) {
      setIndex(index + 1);
    }

  }
  return (
    <div key={index} className='notification' style={{ animationDelay: `0s, ${notification.time - 1}s` }}>
      {notification.message}
    </div>
  )
}
