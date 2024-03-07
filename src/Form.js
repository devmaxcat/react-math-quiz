import React from 'react'

export default function Form({ startQuiz, page }) {
    if (page === 'info') {
        return (
            <form onSubmit={startQuiz} className='info'>
                <div className='options-one'>
                    <input id="username" />
                    <input id="amount" type="number" step='any' />
                </div>

                <select id="type">
                    <option value="Addition">Addition</option>
                    <option value="Subtraction">Subtraction</option>
                    <option value="Multiplication">Multiplication</option>
                    <option value="Division">Division</option>
                </select>
                <input type="submit" value="next" />
            </form>
        )
    } else {
        return (null)
    }

}
