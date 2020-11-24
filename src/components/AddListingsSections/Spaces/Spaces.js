import React from 'react';
import CheckBox from '../../UI/Checkbox/Checkbox';
import classes from './Spaces.module.css';

const spaces = (props) => {
    const spaceLabels = {
        'privateLivingRoom': 'Private living room',
        'hotTub': 'Hot tub',
        'kitchen': 'Kitchen',
        'pool': 'Pool',
        'washer': 'Washer',
        'dryer': 'Dryer',
        'gym': 'Gym',
        'parking': 'Parking'
    };

    const spaceDetails = {};

    const spaces = Object.keys(props.spaces).map((key)=>(
        <CheckBox 
                key={key}
                value={props.spaces[key]} 
                toggleValue={()=>props.toggleSpaces(key)}
                label={spaceLabels[key]}
                details={spaceDetails[key]}/>
    ));

    return (
        <div className={classes.Spaces}>
            <div className={classes.Title}>
                <h3>What spaces can guests use?</h3>
            </div>
            <p>Include common areas, but don’t add spaces that aren’t on your property.</p>
            {spaces}
        </div>
    );
};

export default spaces;