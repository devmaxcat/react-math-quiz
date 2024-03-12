import React from 'react';
import ModuleFunctions from '../../ModuleFunctions'

function QuestionRecap({ question, userAnswers, questionIndex }) {
    var userAnswer = userAnswers[questionIndex];
    
    return (
        <div className='recap-question' key={Math.random()}>
            <span className='ask'>{question.ask} = <span>{question.answer}</span></span>

            <span>Your Answer: <span className={'user-answer ' + (question.answer === parseFloat(userAnswer))}>{(userAnswer.length > 0) ? userAnswer : '?'}</span></span>
        </div>
    )
}

export default function Results({ quizData, returnBack, reportCorrect, userAnswers }) {
    var messageText = ModuleFunctions.getMessageFromPercent(quizData.correct / quizData.amount);
    var percentageText = Math.round((quizData.correct / quizData.amount) * 100) + '%';
    var date =   new Date();
    var dateText = `${date.toLocaleDateString()} @ ${date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}`;
    
    return (
        <div className='outer-results'>
            <div className='inner-results-big'>
                <div className='results'>
                    <span className='message'>{messageText}</span>
                    <span className='percentage'>{percentageText}</span>
                    <span>{quizData.correct}/{quizData.amount}</span>
                    <div className='buttons'>
                        <button onClick={() => { reportCorrect('retry') }}>Try again</button>
                        <button className='secondary' onClick={() => { returnBack() }}>Options</button>
                    </div>
                    <span className='date'>{dateText}</span>
                </div>
            </div>

            <div className='recap'>
                <h2>Your answers</h2>
                {quizData.questions.map((question, index) => (
                    <QuestionRecap userAnswers={userAnswers} question={question} questionIndex={index} />
                ))}
            </div>
        </div>
    );
}