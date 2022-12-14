import React from "react"
import { nanoid } from "nanoid"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dotElements = []

    for (let i = 0; i < props.value; i++) {
        // https://dev.to/ekeijl/creating-dice-using-css-grid-j4
        dotElements.push(<span key={nanoid()} className="die-dot"></span>)
    }

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {dotElements}
        </div>
    )
}