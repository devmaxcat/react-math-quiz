// This file contains excess functions that I don't want free-floating in the component files, also nice because they can be accessed anywhere when needed.
const Module = {
    generateQuestions: function (amount, type, hard) {
        var generatedQuestions = [];
      
        for (let i = 0; amount > i; i++) {
          let [x, y] = this.generateRandomNumbers(type, hard)
          // I just realized that storing X and Y in the question actually ends up being redundant.
          generatedQuestions.push({ x: x, y: y, answer: this.answerXYfromOperationName(type, x, y), ask: `${x} ${this.operationNameToSymbol(type)} ${y} ` })
        }
      
        return generatedQuestions
      },
    generateRandomNumbers: function (type, isHard) {
        if (type === 'Division') {
            let divsor = this.randomNumber(1, isHard ? 100 : 10)
            let dividend = divsor * this.randomNumber(1, isHard ? 100 : 10)
            return [dividend, divsor]
        } 
        else if(type === 'Multiplication') {
            return [this.randomNumber(1,isHard ? 100 : 10), this.randomNumber(1, isHard ? 100 : 10)]
        }
        else {
            return [this.randomNumber(1, isHard ? 1000 : 100), this.randomNumber(1, isHard ? 1000 : 100)]
        }
    },
    randomNumber: function (lower, upper) {
        return Math.round((Math.random() * upper) + lower)
    },
    getMessageFromPercent: function (percent) {

        if (percent >= .9) { return 'Great work!' }
        if (percent >= .8) { return 'Good job!' }
        if (percent >= .7) { return 'Keep it up!' }
        if (percent >= .6) { return 'Almost there!' }
        if (percent >= .5) { return 'Getting closer.' }
        if (percent <= .4) { return 'Maybe next time?' }

    },
    operationNameToSymbol: function (operatorName) {
        switch (operatorName) {
            case 'Addition': return '+';
            case 'Subtraction': return '-';
            case 'Multiplication': return '*';
            case 'Division': return '/'
            default: return
        }
    },
    answerXYfromOperationName: function (operatorName, x, y) {
        switch (operatorName) {
            case 'Addition':
                return x + y;
            case 'Subtraction':
                return x - y;
            case 'Multiplication':
                return x * y;
            case 'Division':
                return x / y;
            default:
                return
        }
    },
}

export default Module
