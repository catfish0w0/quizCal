import React from "react";
import "./Question.css";
import Option from "./Option";
import { nanoid } from 'nanoid'

export default function Question(props) {
    const prompt = props.prompt;
    const optionElements = props.options.map(option => {
        const id = nanoid();
        return <Option 
        key={id}
        word={option.word}
        isCorrect={option.isCorrect}
        prompt={prompt}
        selection={props.selection}
        hold={holdHandler}
        isFinished={props.isFinished}
        />
    })

    function holdHandler(event) {
        if (!props.isFinished) {
            props.hold(event, prompt)
        }
    }

    return (
        <div className="question">
            <h1>{prompt}</h1>
            {optionElements}
            <hr></hr>
        </div>
    )
}