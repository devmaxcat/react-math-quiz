import {React, useState } from 'react'
import QuizQuestion from './Question';
import Results from './Results';

export default function Quiz({ quizData, page, currentQuestion, hasStarted, reportCorrect, setStarted, startQuiz, returnBack }) {
    const [userAnswers, setUserAnswers] = useState([])
    
    function pushUserAnswer(ans) {
       setUserAnswers([...userAnswers, ans])
    }
    if (page === 'quiz') {
        var questions = quizData.questions
        if (questions.length > 0 && currentQuestion < questions.length) {
            if (currentQuestion === 0 && !hasStarted) {
                return (
                    <div className='prequiz'>
                        <div>Answer every question to the best of your ability, you will be timed.</div>
                        <button onClick={() => { setStarted(true); setUserAnswers([]) }}>Start Quiz</button>
                    </div>
                )
            }


            var correctAnswer = questions[currentQuestion].answer

            return (
                <QuizQuestion pushUserAnswer={pushUserAnswer} reportCorrect={reportCorrect} correctAnswer={correctAnswer} questionString={questions[currentQuestion].ask} />
            )
        } else {
            setStarted(false)
            return (
                <Results userAnswers={userAnswers} reportCorrect={reportCorrect} quizData={quizData} returnBack={returnBack} />
            )

        }

    } else {
        return (null)
    }

}
