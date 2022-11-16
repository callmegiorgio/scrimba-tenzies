import React    from 'react'
import Die      from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { secondsToHms } from './utils'

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

/**
 * Calculates a score based on how many rolls and seconds
 * it took to win the game.
 * 
 * The returned score is a maximum of 1000 if both `rollCount`
 * and `secondsElapsed` are 0, and is reduced if `rollCount`
 * and `secondsElapsed` is greater than 0. However, the score
 * is never less than 0.
 * 
 * If either `rollCount` or `secondsElapsed` is less than 0,
 * the returned score is as though they were both 0, that is,
 * the score is 1000.
 * 
 * @param {Integer} rollCount 
 * @param {Integer} secondsElapsed 
 * @returns A score
 */
 function calculateScore(rollCount, secondsElapsed)
 {
     const penalty = Math.ceil(Math.max(rollCount + secondsElapsed, 0) * 5)
 
     return Math.max(1000 - penalty, 0)
 }

export default function Game(props) {
    const [dice, setDice]                     = React.useState(allNewDice())
    const [tenzies, setTenzies]               = React.useState(false)
    const [rollCount, setRollCount]           = React.useState(0)
    const [secondsElapsed, setSecondsElapsed] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    React.useEffect(() => {
        if (!tenzies) {
            setSecondsElapsed(0)
            
            const timerId = window.setInterval(() => {
                setSecondsElapsed(prevSecondsElapsed => prevSecondsElapsed + 1)
            }, 1000)

            return () => window.clearInterval(timerId)
        }
        else {
            const score = {
                timestamp: new Date().getTime(),
                rollCount: rollCount,
                secondsElapsed: secondsElapsed,
                score: calculateScore(rollCount, secondsElapsed)
            }

            props.onFinish(score)
        }
    }, [tenzies])
    
    function rollDice() {
        if (!tenzies) {
            setRollCount(prevCount => prevCount + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setRollCount(0)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return (
                die.id === id
                ? Object.assign({}, die, { isHeld: !die.isHeld })
                : die
            )
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div className='game'>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="game-buttons">
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                {
                    tenzies &&
                    <button
                        className="roll-dice"
                        onClick={props.showScores}
                    >
                        Scores
                    </button>
                }
            </div>
            <div className='game-counter'>
                <p className="game-rolls">Rolls: {rollCount}</p>
               <p className="game-time">{secondsToHms(secondsElapsed)}</p>
            </div>
        </div>
    )
}