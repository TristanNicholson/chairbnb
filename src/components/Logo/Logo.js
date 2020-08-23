import React from 'react';
import classes from './Logo.module.css';
import airbnbLogo from '../../assets/img/airbnb_logo.png';

const logo = props => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={airbnbLogo} alt="Airbnb" />
        </div>
    );
}

export default logo;