import React, { useState, useEffect } from 'react'

var timer = null;

export default function Timer({ hasStarted, quizData }) {
    const [time, setTime] = useState(0)
    var formattedTime = new Date(time * 1000).toISOString().slice(14, 19)

    useEffect(() => {
        let timer;
        if (hasStarted) {
            timer = setInterval(() => {setTime(time + 1)}, 1000)
        }
        return () => clearInterval(timer)
    }, [hasStarted, time])


    return (
        <div className='timer quiz-info-box'>
            {formattedTime}
        </div>
    )
}
