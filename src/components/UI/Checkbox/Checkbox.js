import React from 'react';
import EmptyBox from '../../../assets/icons/square-regular';
import CheckBox from '../../../assets/icons/check-square-solid';
import classes from './Checkbox.module.css';

const checkBox = (props) => {
    let check = <EmptyBox/>;
    if(props.value){
        check = <CheckBox/>;
    }

    return (
        <div className={classes.CheckBox} onClick={props.toggleValue}>
            <div className={classes.Box}>
                {check}
            </div>
            <div className={classes.Info}>
                <div>{props.label}</div>
                <p>{props.details}</p>
            </div>
        </div>
    );
};

export default checkBox;