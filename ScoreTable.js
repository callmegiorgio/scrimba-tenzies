import React from 'react'
import { formatDate, secondsToHms } from './utils'
import { nanoid } from 'nanoid'

function Score(props) {
    const date = new Date(props.timestamp)

    const scoreStyles = {}

    if (props.position >= 1 && props.position <= 3) {
        scoreStyles.fontSize = '18px'
        scoreStyles.fontWeight = 'bold'
    }
    else {
        scoreStyles.fontSize = '16px'
    }

    return (
        <tr>
            <td>{props.position}</td>
            <td style={scoreStyles}>{props.score}</td>
            <td>{formatDate(date)}</td>
            <td>{props.rollCount}</td>
            <td>{secondsToHms(props.secondsElapsed)}</td>
        </tr>
    )
}

export default function ScoreTable(props) {
    function compareScore(a, b) {
        if (a.score != b.score)
            return a.score - b.score
        
        return a.timestamp - b.timestamp
    }

    const scores = props.scores

    scores.sort(compareScore).reverse()

    const scoreElements = scores.map(
        (score, index) => <Score key={nanoid()} position={index + 1} {...score} />
    )

    return (
        <table className='score-table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Rolls</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {scoreElements}
            </tbody>
        </table>
    )
}