"use client"

import { useState } from "react"
import "./styles/style.css"
import "./styles/themes.css"
import "./styles/variables.css"
import { getOperatorSymbol, formatNumber } from "./utils"
import ThemeToggle from "./components/ThemeToggle.jsx"
import Buttons from "./components/Buttons.jsx"
import Display from "./components/Display.jsx"
import History from "./components/History.jsx"

function App() {
  const [displayValue, setDisplayValue] = useState("0")
  const [history, setHistory] = useState("")
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [resetNext, setResetNext] = useState(false)

  const appendDigit = (digit) => {
    setDisplayValue((prev) => {
      if (resetNext) {
        setResetNext(false)
        return digit
      }
      if (prev === "0" && digit !== ".") return digit
      if (digit === "." && prev.includes(".")) return prev
      return prev + digit
    })
  }

  const handleAction = (action) => {
    if (action === "clear") {
      setDisplayValue("0")
      setHistory("")
      setFirstOperand(null)
      setOperator(null)
      setResetNext(false)
    }

    if (action === "backspace") {
      setDisplayValue((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)))
    }

    if (action === "calculate") {
      if (operator && firstOperand !== null) {
        const second = Number.parseFloat(displayValue)
        let result
        switch (operator) {
          case "+":
            result = firstOperand + second
            break
          case "-":
            result = firstOperand - second
            break
          case "*":
            result = firstOperand * second
            break
          case "/":
            result = second !== 0 ? firstOperand / second : "Erro"
            break
          default:
            return
        }
        const formatted = result === "Erro" ? "Erro" : formatNumber(result)
        setDisplayValue(formatted)
        setHistory(`${firstOperand} ${getOperatorSymbol(operator)} ${second} =`)
        setFirstOperand(null)
        setOperator(null)
        setResetNext(true)
      }
    }

    if (action === "sqrt") {
      const value = Number.parseFloat(displayValue)
      if (value < 0) {
        setDisplayValue("Erro")
      } else {
        const result = Math.sqrt(value)
        setDisplayValue(formatNumber(result))
        setHistory(`√(${value})`)
        setResetNext(true)
      }
    }

    if (action === "percent") {
      const value = Number.parseFloat(displayValue)
      const result = value / 100
      setDisplayValue(formatNumber(result))
      setHistory(`${value}%`)
      setResetNext(true)
    }
  }

  const handleOperation = (op) => {
    const current = Number.parseFloat(displayValue)
    setFirstOperand(current)
    setOperator(op)
    setHistory(`${current} ${getOperatorSymbol(op)}`)
    setResetNext(true)
  }

  return (
    <div className="container">
      <div className="calculator">
        <div className="calculator-header">
          <h1>Calculadora</h1>
          <ThemeToggle />
        </div>
        <div className="calculator-history">
          <History value={history} />
        </div>
        <div className="calculator-display">
          <Display value={displayValue} />
        </div>
        <Buttons onDigit={appendDigit} onAction={handleAction} onOperation={handleOperation} />
      </div>
    </div>
  )
}

export default App