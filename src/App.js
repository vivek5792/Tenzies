
import react from "react";
import Die from "./components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  
  const [dice, setDice] = react.useState(allNewDice)
  const [tenzies, setTenzies] = react.useState(false)
  const [noOfRolls,setNoOfRolls]=react.useState(0)



  react.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)     
         }
  }, dice)

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
 
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice(dice.map(die => {
      // using if condtion
      // if(die.id==id){
      // return {...die,isHeld:!die.isHeld}
      // }else{
      //   return die
      // }
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }))
  }
  function roll() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
      setNoOfRolls(oldNumber=>oldNumber+1)
  } else {
      setTenzies(false)
      setDice(allNewDice())
   localStorage.setItem("noOfRolls",noOfRolls)
  }
  
  }

  const diceElements = dice.map((die) => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  })
  return (
    <main>
      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={roll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    {tenzies&& <div>It took you {noOfRolls} rolls</div>}   
    </main>
  )
}