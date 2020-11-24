import React from 'react';
import classes from './Amenities.module.css';
import CarbonDetector from '../../assets/icons/amenities/carbon-detector';
import Breakfast from '../../assets/icons/amenities/coffee';
import Desk from '../../assets/icons/amenities/desk';
import PrivateEntrance from '../../assets/icons/amenities/door';
import BedroomLock from '../../assets/icons/amenities/door-lock';
import Extinguisher from '../../assets/icons/amenities/fire-extinguisher';
import Fireplace from '../../assets/icons/amenities/fireplace';
import FirstAid from '../../assets/icons/amenities/first-aid-kit';
import Shampoo from '../../assets/icons/amenities/gel';
import HairDryer from '../../assets/icons/amenities/hair-dryer';
import Closet from '../../assets/icons/amenities/hanger';
import Heater from '../../assets/icons/amenities/heater';
import Iron from '../../assets/icons/amenities/iron';
import SmokeDetector from '../../assets/icons/amenities/smoke-detector';
import Essentials from '../../assets/icons/amenities/spa';
import TV from '../../assets/icons/amenities/tv-monitor';
import AirConditioning from '../../assets/icons/amenities/weather';
import WiFi from '../../assets/icons/amenities/wifi-solid';

const ICONS = {
    'Essentials': <Essentials/>,
    'Wifi': <WiFi/>,
    'TV': <TV/>,
    'Heat': <Heater/>,
    'Air conditioning': <AirConditioning/>,
    'Iron': <Iron/>,
    'Shampoo': <Shampoo/>,
    'Hair dryer': <HairDryer/>,
    'Breakfast': <Breakfast/>,
    'Desk': <Desk/>,
    'Fireplace': <Fireplace/>,
    'Closet': <Closet/>,
    'Private entrance': <PrivateEntrance/>,
    'Smoke detector': <SmokeDetector/>,
    'Carbon monoxide detector': <CarbonDetector/>,
    'First aid kit': <FirstAid/>,
    'Fire extinguisher': <Extinguisher/>,
    'Lock on bedroom door': <BedroomLock/>
};
const amenities = (props) => {
    let amenities = props.amenities.map((el)=>{
        return (
            <div>
                <div>
                    <div className={classes.Icon}>{ICONS[el]}</div>
                    <div>{el}</div>
                </div>
            </div>
        );
    });
    return (
        <div className={classes.Amenities}>
            {amenities}
        </div>
    );
}

export default amenities;