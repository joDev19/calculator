import { useEffect, useState } from 'react'
import './App.css'
const Calculator = () => {
  
  const [currentOperation, setcurrentOperation] = useState("")
  let [currentNumber, setCurrentNumber] = useState("0")
  let [result, setResult] = useState(0)
  let [calcul, setCalcul] = useState(false)
  const handleClickNumber = (nbr) => {
    nbr = nbr.target.textContent
    setCurrentNumber(() => Number((currentNumber+nbr)).toString());
    //setCurrentNumber(() => Number(currentNumber).toString())
  }
  const handleAddDecimalToLastNumberInCalculs = () => {
    const last = currentNumber[currentNumber.length -1]
    if(Number.isInteger(Number(last)))
      setCurrentNumber(() => currentNumber + ".")
  }
  const handleOperatorClick = (e) => {
    setcurrentOperation(() => {
      return currentOperation + currentNumber + ' ' + e.target.textContent
    })
  }
  useEffect(()=> {
    setCurrentNumber("0")
    
    if(calcul){
      if(Number.isInteger(eval(currentOperation))){
        setResult(eval(currentOperation))
      }else{
        setResult(eval(currentOperation).toFixed(4))
      }
      setCalcul(false)
    }
  }, [currentOperation])

  const handleEquals = () => {
    setCalcul(true);
    setcurrentOperation(() => {
      return currentOperation + currentNumber 
    })

    // console.log(currentOperation)
    // setcurrentOperation(() => currentOperation + " = " + result)

  }
  const handleReset = () => {
    setcurrentOperation("")
    setCurrentNumber("0")
    setResult(0)
  }
  return (<>
    <div className="border w-96 mx-auto">
      Calculator
      <div className="screen display h-22 border-y mb-2 p-5">
        {currentOperation} {result != 0 && " = "+result}
      </div>
      <div>
        {currentNumber}
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {[{ letter: 'zero', nb: 0 }, { letter: 'one', nb: 1 }, { letter: 'two', nb: 2 }, { letter: 'three', nb: 3 }, { letter: 'four', nb: 4 }, { letter: 'five', nb: 5 }, { letter: 'six', nb: 6 }, { letter: 'seven', nb: 7 }, { letter: 'eight', nb: 8 }, { letter: 'none', nb: 9 }].map(el =>
          <button key={el.letter} id={el.letter} className='w-22 h-22 border rounded' onClick={handleClickNumber}>{el.nb}</button>
        )}
        <button id="decimal" className='w-22 h-22 border rounded' onClick={handleAddDecimalToLastNumberInCalculs}>.</button>
        <button id="add" className='w-22 h-22 border rounded' onClick={handleOperatorClick}>+</button>
        <button id="subtract" className='w-22 h-22 border rounded' onClick={handleOperatorClick}>-</button>
        <button id="multiply" className='w-22 h-22 border rounded' onClick={handleOperatorClick}>/</button>
        <button id="divide" className='w-22 h-22 border rounded' onClick={handleOperatorClick}>*</button>
        <button id="equals" className='w-22 h-22 border rounded' onClick={handleEquals}>=</button>
        <button id="clean" className='w-22 h-22 border rounded' onClick={handleReset}>AC</button>
      </div>
    </div>
  </>)
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calculator />
    </>
  )
}

export default App
