import React, { useState, useEffect } from 'react'
// The logic for this is silly, I'm sure there's a better way
export default function Timer({ hasStarted, quizData, page }) {
    const [time, setTime] = useState(0)
    var formattedTime = new Date(time * 1000).toISOString().slice(14, 19)

    if ((quizData.currentQuestion < quizData.questions.length) && !hasStarted && page === 'quiz' && time !== 0) { // Part of this might end up being redundant but it's interesting to look at.
        setTime(0)
    }

    useEffect(() => {
        let timer;
       
        if (hasStarted) {
            timer = setInterval(() => {setTime(time + 1)}, 1000)
        } 
        return () =>  clearInterval(timer)
    }, [hasStarted, time])

   

    return (
        <div className='timer quiz-info-box'>
            {formattedTime}
        </div>
    )
}
