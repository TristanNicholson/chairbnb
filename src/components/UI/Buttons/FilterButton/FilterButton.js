import React from 'react';
import classes from './FilterButton.module.css';

const filterButton = (props) => {
    return (
        <button className={classes.FilterButton} onClick={props.clicked}>
            {props.name}
        </button>
    );
};

export default filterButton;