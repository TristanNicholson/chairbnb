import React from 'react';
import classes from './Amenities.module.css';
import CheckBox from '../../UI/Checkbox/Checkbox';

const amenities = (props) => {
    const amenityLabels = {
        'essentials': 'Essentials',
        'wifi': 'Wifi',
        'tv': 'TV',
        'heat': 'Heat',
        'airConditioning': 'Air conditioning',
        'iron': 'Iron',
        'shampoo': 'Shampoo',
        'hairDryer': 'Hair dryer',
        'breakfast': 'Breakfast',
        'desk': 'Desk',
        'fireplace': 'Fireplace',
        'closet': 'Closet',
        'privateEntrance': 'Private entrance'
    };

    const safetyAmenityLabels = {
        'smokeDetector': 'Smoke detector',
        'carbonDetector': 'Carbon monoxide detector',
        'firstAid': 'First aid kit',
        'extinguisher': 'Fire extinguisher',
        'bedroomLock': 'Lock on bedroom door'
    }

    const amenityDetails = {
        'essentials': 'Towels, bed sheets, soap, toilet paper, and pillows'
    };

    const safetyAmenityDetails = {
        'smokeDetector': 'Check your local laws, which may require a working smoke detector in every room',
        'carbonDetector': 'Check your local laws, which may require a working carbon monoxide detector in every room',
        'bedroomLock': 'Private room can be locked for safety and privacy'
    };

    let amenities = Object.keys(props.amenities).map((key)=>(
        <CheckBox 
                key={key}
                value={props.amenities[key]} 
                toggleValue={()=>props.toggleAmenities(key)}
                label={amenityLabels[key]}
                details={amenityDetails[key]}/>
    ));

    let safetyAmenities = Object.keys(props.safetyAmenities).map((key)=>(
        <CheckBox 
                key={key}
                value={props.safetyAmenities[key]} 
                toggleValue={()=>props.toggleAmenities(key)}
                label={safetyAmenityLabels[key]}
                details={safetyAmenityDetails[key]}/>
    ));

    return (
        <div className={classes.Amenities}>
            <div className={classes.Title}>
                <h3>What amenities do you offer?</h3>
            </div>
            <p>These are just the amenities guests usually expect, but you can add even more after you publish.</p>
            {amenities}
            <div className={classes.InputLabel}>Safety amenities</div>
            {safetyAmenities}
        </div>
    );
};

export default amenities;