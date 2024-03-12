import React from 'react'

export default function Form({ startQuiz, page, quizData }) {
    if (page === 'info') {
        return (
            <form onSubmit={startQuiz} className='info'>
                <h1>Options</h1>
                <p>Create a timed flashcard math-quiz to test your knowledge</p>
                <div className='options'>
                    <label>Username</label>
                    <input id="username" defaultValue={quizData.username} onInput={(e) => { e.target.removeAttribute('aria-invalid') }} />

                </div>
                <div className='options'>
                    <label>Amount</label>
                    <input defaultValue={quizData.amount} id="amount" type="number" step='any' onInput={(e) => { e.target.removeAttribute('aria-invalid') }} />
                </div>
                <div className='options' >
                    <label>Type</label>
                    <select id="type" defaultValue={quizData.type}  onInput={(e) => { e.target.removeAttribute('aria-invalid') }}>
                        <option value="Addition">Addition</option>
                        <option value="Subtraction">Subtraction</option>
                        <option value="Multiplication">Multiplication</option>
                        <option value="Division">Division</option>
                    </select>
                </div>
                <div className='options'>
                    <label>Harder Math</label>
                    <div className={'check-slider ' + quizData.hard} onClick={(e) => {
                        e.currentTarget.classList.toggle('false')
                        e.currentTarget.classList.toggle('true')
                        e.currentTarget.querySelector('input').click()
                    }}>
                        <input id='hard' defaultChecked={quizData.hard} type='checkbox' onClick={(e) => {
                            e.stopPropagation()
                        }} />
                        <div className='handle'>

                        </div>
                    </div>

                </div>

                <input type="submit" value="Next" />
            </form>
        )
    } else {
        return (null)
    }

}
