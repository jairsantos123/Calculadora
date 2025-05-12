import { display } from './display.js'
import { getOperatorSymbol } from 'utils.js'
import { formatNumber } from 'utils.js'


class Calculator {
    constructor() {
        this.display = new Display()
        this.currentOperand = "0"
        this.previusOperand = ""
        this.operation = null
        this.shouldResetDisplay = false
        this.lastResult = null

        this.initEventListneners()
    }

    initEventListneners() {
        document.querySelectorAll("data-number").forEach((button) => {
            button.addEventListener("click", () => {
                this.appendNumber(button.dataset.number)
            })
        })

        document.querySelectorAll("data-operation").forEach((button) => {
            button.addEventListener("click", () => {
                this.chooseOperation(button.dataset.operation)
            })
        })

        document.querySelectorAll("data-action").forEach((button) => {
            button.addEventListener("click", () => {
                const action = button.dataset.action

                switch (action) {
                    case "clear":
                        this.clear()
                        break;

                    case "calculate":
                        this.calculate()
                        break;

                    case "backspace":
                        this.backspace()
                        break;

                    case "percent":
                        this.percent()
                        break;

                    case "sqrt":
                        this.squareRoot()
                        break;
                }

            })
        })
        appendNumber(number) {
            if (this.shouldResetDisplay) {
                this.display.updateDisplay("")
                this.shouldResetDisplay = false
            }

            this.display.appendDigit(number)
            this.currentOperand = this.display.currentValue
        }

        chooseOperation(operation) {
            if (this.currentOperand === "erro")
                return

            if (this.operation !== null && !this.shouldResetDisplay) {
                this.calculate()
            }

            this.previusOperand = this.currentOperand
            this.operation = operation
            this.shouldResetDisplay = true

            this.display.updateHistory(`${this.previusOperand} ${getOperatorSymbol(this.operation)}`)
        }
    }