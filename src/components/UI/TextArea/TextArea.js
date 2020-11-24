import React from 'react';
import classes from './TextArea.module.css';

const textArea = (props) => {
    return (
        <div className={classes.TextArea}>
            <div>{props.maxLength - props.text.length}</div>
            <textarea name={props.tag} rows='8' value={props.text} onChange={(e)=>props.changeInput(e,props.tag)}>
            </textarea>
        </div>
    );
}

export default textArea;