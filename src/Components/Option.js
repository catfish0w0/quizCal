import React from "react";
import "./Option.css";
import { nanoid } from 'nanoid'

export default function Option(props) {
    const word = props.word;
    let styles = {backgroundColor:"transparent"};

    if (!props.isFinished) {
        styles = {
            backgroundColor: props.selection === word ? "#D6DBF5":"transparent"
        }
    } else {
        if (props.isCorrect) {
            styles = {
                backgroundColor: "#94D7A2"
            }
        } else {
            styles = {
                backgroundColor : props.selection === word ? "#F8BCBC" :"transparent",
                opacity:0.6
            }
        }

    }

    const id = nanoid();
    return (
        <React.Fragment>
            <input 
                type="radio" 
                id={id}
                name="selection"
                value={word}
                onClick={(e) => {
                    props.hold(e)
                }}
            /> 
            <label style={styles} htmlFor={id} className="button" >{ word }</label>
        </React.Fragment>
    )
}