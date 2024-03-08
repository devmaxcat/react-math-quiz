import React from 'react'

export default function Form({ startQuiz, page }) {
    if (page === 'info') {
        return (
            <form onSubmit={startQuiz} className='info'>
                <h1>Options</h1>
                <p>Create a timed flashcard math-quiz to test your knowledge</p>
                <div className='options'>
                    <label>Username</label>
                    <input id="username" onInput={(e) => {e.target.removeAttribute('aria-invalid')}} />

                </div>
                <div className='options'>
                    <label>Amount</label>
                    <input defaultValue={5} id="amount" type="number" step='any' onInput={(e) => {e.target.removeAttribute('aria-invalid')}} />
                </div>
                <div className='options' >  
                <label>Type</label>
                <select id="type" onInput={(e) => {e.target.removeAttribute('aria-invalid')}}>
                    <option value="Addition">Addition</option>
                    <option value="Subtraction">Subtraction</option>
                    <option value="Multiplication">Multiplication</option>
                    <option value="Division">Division</option>
                </select></div>

                <input type="submit" value="Next" />
            </form>
        )
    } else {
        return (null)
    }

}
