import React from 'react';
import classes from './TextInput.module.css';

const textInput = (props) => {
    return (
        <div className={classes.TextInput}>
            {props.max ? <div><div>50</div></div> : null}
            <input 
                value={props.value}
                onChange={props.change}>
            </input> 
        </div>
    );
}

export default textInput;