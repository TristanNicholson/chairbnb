import React from 'react';
import AddRemoveButtons from '../../UI/AddRemoveButtons/AddRemoveButtons';
import classes from './Accommodation.module.css';
import Dropdown from '../../UI/Dropdowns/Dropdown/Dropdown';

const accomodation = (props) => {
    let bedrooms = [];
    bedrooms.push('Studio');
    bedrooms.push('1 bedroom');
    for(let i=2; i <= 50; i++){
        bedrooms.push(i+' bedrooms');
    }
    return (
        <div className={classes.Accommodation}>
            <div className={classes.Title}>
                <h3>How many guests can your place accommodate?</h3>
            </div>
            <p>Check that you have enough beds to accommodate all your guests comfortably.</p>
            <div className={classes.Field}>
                <div className={classes.InputLabel}>Guests</div>
                <AddRemoveButtons
                    value={props.guests}
                    max={16}
                    addValue={props.addGuest}
                    removeValue={props.removeGuest}/>
            </div>
            <div className={classes.InfoHeader}>How many bedrooms can guests use?</div>
            <Dropdown 
                onSelect={props.selectBedrooms}
                value={props.bedrooms} 
                options={bedrooms}/>
            <div className={classes.InfoHeader}>How many beds can guests use?</div>
            <div className={classes.Field}>
                <div className={classes.InputLabel}>Beds</div>
                <AddRemoveButtons
                    value={props.beds}
                    max={50}
                    addValue={props.addBed}
                    removeValue={props.removeBed}/>
            </div>
            <div className={classes.InfoHeader}>How many bathrooms can guests use?</div>
            <p>Count bathrooms that don’t have a shower or bathtub as a half bathroom.</p>
            <div className={classes.Field}>
                <div className={classes.InputLabel}>Bathrooms</div>
                <AddRemoveButtons
                    value={props.baths}
                    max={30}
                    addValue={props.addBath}
                    removeValue={props.removeBath}/>
            </div>
        </div>
    );
};

export default accomodation;