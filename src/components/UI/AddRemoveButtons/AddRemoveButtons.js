import React, {Component} from 'react';
import MinusIcon from '../../../assets/icons/minus-solid';
import PlusIcon from '../../../assets/icons/plus-solid';
import classes from './AddRemoveButtons.module.css';

const addRemoveButtons = (props) => {
    let addButtonStyle;
    let removeButtonStyle;

    if(props.value === 0){
        addButtonStyle = {};
        removeButtonStyle = {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'};
    }else if(props.value < props.max){
        addButtonStyle = {};
        removeButtonStyle = {};
    }else{
        addButtonStyle = {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'};
        removeButtonStyle = {};
    }

    return (
        <div className={classes.AddRemoveButtons}>
                <div 
                    onClick={props.value > 0 ? ()=>props.removeValue() : ()=>{}} 
                    className={classes.Button}
                    style={removeButtonStyle}>
                    <div><MinusIcon/></div>
                </div>
                <div>{props.value}</div>
                <div 
                    onClick={props.value < props.max ? ()=>props.addValue() : ()=>{}} 
                    className={classes.Button}
                    style={addButtonStyle}>
                    <div><PlusIcon/></div>
                </div>
        </div>
    );
}

export default addRemoveButtons;