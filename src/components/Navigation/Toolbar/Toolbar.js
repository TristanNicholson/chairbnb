import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import '../../../assets/img/airbnb_logo.png';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <Logo/>
        </header> 
    );
};

export default toolbar;