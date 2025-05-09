class display {
    constructor() {
        this.displayElement = document.getElementById("display")
        this.historyElement = document.getElementById("history-display")
        this.currenValue = 0
        this.history = ""
    }

    updateDisplay(value = this.currenValue) {
        this.currenValue = value
        this.displayElement.textContent = value
    }

    updateHistory(value = this.history) {
        this.currenValue = value
        this.historyElement.textContent = value
    }

    clear() {
        this.updateDisplay("0")
        this.updateHistory("")
    }

    appendDigit(digit) {
        if (this.currenValue === "0" && digit !== "."){
            this.updateDisplay(digit)
        } 

        else if (digit === "." && this.currenValue.includes(".")) {
            return
        }

        else {
            this.updateDisplay(this.currenValue + digit)
        }
    }

    removeLastDigit() {
        if (this.currenValue.lenght === 1) {
            this.updateDisplay("0")
        } else {
            this.updateDisplay(this.currenValue.slice(0, -1))
        }
    }
}