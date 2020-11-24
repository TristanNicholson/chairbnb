import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import '../../../assets/img/airbnb_logo.png';
import '../NavMenu/NavMenu';
import NavMenu from '../NavMenu/NavMenu';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div></div>
            <div><Logo/></div>
            <div 
                className={classes.NavMenu}>
                    <NavMenu/>
            </div>
        </header> 
    );
};

export default toolbar;