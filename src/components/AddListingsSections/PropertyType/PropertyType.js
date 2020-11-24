import React from 'react';
import classes from './PropertyType.module.css';
import DropdownBox from '../../UI/Dropdowns/Dropdown/Dropdown';
import DropdownBox2 from '../../UI/Dropdowns/Dropdown2/Dropdown';
import RadioButtons from '../../UI/RadioButtons/RadioButtons';

const propertyType = (props) => {
    const propertyTypes = {
        'Please select one': [],
        'Apartment': ['Apartment', 'Condominium', 'Loft', 'Serviced apartment'],
        'House': ['House', 'Bungalow', 'Cabin', 'Chalet', 'Cottage', 'Cycladic house', 'Dammuso',
            'Dome house', 'Earth house', 'Farm stay', 'Houseboat', 'Hut', 'Lighthouse', "Shepherd's hut",
            'Tiny house', 'Townhome', 'Villa'],
        'Secondary unit': ['Guesthouse', 'Guest suite', 'Farm stay'],
        'Unique space': ['Barn', 'Boat', 'Bus', 'Camper/RV', 'Campsite', 'Castle', 'Cave', 'Dome house',
            'Earth House', 'Farmstay', 'Houseboat', 'Hut', 'Igloo', 'Island', 'Lighthouse',
            'Plane', "Shepherd's hut", 'Tent', 'Tiny House', 'Tipi', 'Train', 'Treehouse', 'Windmill',
            'Yurt'],
        'Bed and breakfast': ['Bed and breakfast', 'Farm stay', 'Nature lodge'],
        'Boutique hotel': ['Boutique hotel', 'Aparthotel', 'Hostel', 'Hotel', 'Nature lodge', 'Resort',
            'Serviced apartment']
    }

    return (
        <div className={classes.PropertyType}>
            <div className={classes.Title}>
                <h3>What kind of place are you listing?</h3>
            </div>
            <div className={classes.Info}>
                <div className={classes.InfoHeader}>First, let's narrow things down</div>
                <div className={classes.InfoInput}>
                    <DropdownBox 
                        onSelect={props.categorySelect}
                        value={props.category} 
                        options={['Apartment', 'House', 'Secondary unit', 'Unique space', 'Bed and breakfast', 'Boutique hotel']}/>
                </div>
                <div className={classes.InfoHeader}>Now choose a property type</div>
                <div className={classes.InfoInput}>
                    <DropdownBox2 
                        onSelect={props.typeSelect}
                        value={props.type}
                        options={propertyTypes[props.category]}/>
                </div>
            </div>
            <div className={classes.Info}>
                <div className={classes.InfoHeader} style={{marginBottom: '20px'}}>What will guests have?</div>
                <div className={classes.InfoInput}>
                    <RadioButtons 
                        onSelect={props.roomTypeSelect}
                        value={props.roomType}
                        values={['Entire place', 'Private room', 'Shared room']}
                        details={['Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.',
                            'Guests have their own private room for sleeping. Other areas could be shared.',
                            'Guests sleep in a bedroom or a common area that could be shared with others.']}/>
                </div>
            </div>
        </div>
    )
}

export default propertyType;