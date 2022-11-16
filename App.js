import React      from "react"
import ScoreBoard from './ScoreBoard'
import Game       from './Game'

export default function App() {
    const [showingScore, setShowingScore] = React.useState(true)
    const [scores, setScores]             = React.useState(
        () => JSON.parse(localStorage.getItem("scores")) || []
    )

    React.useEffect(() => {
        localStorage.setItem("scores", JSON.stringify(scores))
    }, [scores])
    
    function startNewGame() {
        setShowingScore(false)
    }

    function showScores() {
        setShowingScore(true)
    }

    function resetScores() {
        setScores([])
    }

    function handleGameFinished(score) {
        setScores(prevScores => [...prevScores, score])
    }
   
    return (
        <main>
            {
                showingScore
                ?
                <ScoreBoard scores={scores} newGame={startNewGame} resetScores={resetScores} />
                :
                <Game onFinish={handleGameFinished} showScores={showScores} />
            }
        </main>
    )
}