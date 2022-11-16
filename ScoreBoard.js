import React      from 'react'
import ScoreTable from './ScoreTable'

export default function ScoreBoard(props) {
    const scores = props.scores

    return (
        <div className='score-board'>
            <h3 className='score-board-title'>Scores</h3>
            {
                scores.length != 0
                ?
                <ScoreTable scores={scores} />
                :
                <p>
                    This is looking a bit empty. Play some more games
                    and come back to check your scores.
                </p>
            }
            <div className='score-board-buttons'>
                <button onClick={props.newGame}>New Game</button>
                {scores.length != 0 && <button onClick={props.resetScores}>Reset Scores</button>}
            </div>
        </div>
    )
}