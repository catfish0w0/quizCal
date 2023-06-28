import React from "react";
import "./StartPage.css";

export default function StartPage(props) {
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>This is a Quiz about AD twisted Fate. 
                You have 5 minutes to answer 4 random questions</p>
            <p>Hope you can finish it on time! Haha</p>
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}