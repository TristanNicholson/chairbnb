import React from 'react';
import classes from './Location.module.css';
import TextInput from '../../UI/TextInput/TextInput';

const location = (props) => {
    return (
        <div className={classes.Location}>
            <div className={classes.Title}>
                <h3>Where's your place located?</h3>
            </div>
            <p>Check that you have enough beds to accommodate all your guests comfortably.</p>
            <div className={classes.InputLabel}>Country</div>
            <div className={classes.InputWhole}>
                <TextInput value={props.country} change={props.countryChange}/>
            </div>
            <div className={classes.InputLabel}>Street Address</div>
            <div className={classes.InputWhole}>
                <TextInput value={props.street} change={props.streetChange}/>
            </div>
            <div className={classes.InputLabel}>Apt,suite (optional)</div>
            <div className={classes.InputWhole}>
                <TextInput value={props.apt} change={props.aptChange}/>
            </div>
            <div className={classes.FieldHalf}>
                <div>
                    <div className={classes.InputLabel}>City</div>
                    <div className={classes.InputHalf}>
                        <TextInput value={props.city} change={props.cityChange}/>
                    </div>
                </div>
                <div>
                    <div className={classes.InputLabel}>State</div>
                    <div className={classes.InputHalf}>
                        <TextInput value={props.state} change={props.stateChange}/>
                    </div>
                </div> 
            </div>
            <div className={classes.InputLabel}>Zipcode</div>
            <div className={classes.InputWhole}>
                <TextInput value={props.zip} change={props.zipChange}/>
            </div>
        </div>
    );
}

export default location;