import React from 'react'

export default function Form({ startQuiz, page }) {
    if (page === 'info') {
        return (
            <form onSubmit={startQuiz} className='info'>
                <div className='options'>
                    <label>Username</label>
                    <input id="username" />

                </div>
                <div className='options'>
                    <label>Amount</label>
                    <input id="amount" type="number" step='any' />
                </div>
                <div className='options'>  
                <label>Type</label>
                <select id="type">
                    <option value="Addition">Addition</option>
                    <option value="Subtraction">Subtraction</option>
                    <option value="Multiplication">Multiplication</option>
                    <option value="Division">Division</option>
                </select></div>

                <input type="submit" value="next" />
            </form>
        )
    } else {
        return (null)
    }

}
