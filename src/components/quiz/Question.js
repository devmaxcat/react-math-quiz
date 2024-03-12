import React from "react";

export default function QuizQuestion({ reportCorrect, correctAnswer, questionString, pushUserAnswer }) {
    return (
        <div className='question'>
            <div className='ask'>{questionString}</div>
            <input autoFocus key={Math.random()} className='input' type="number"
                onBlur={(e) => {
                    e.target.focus()
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        var value = parseFloat(e.target.value);
                        pushUserAnswer(e.target.value);
                        if (value === correctAnswer) {
                            reportCorrect(true);
                        } else {
                            reportCorrect(false);
                        }
                    }

                }}></input>
        </div>)
}