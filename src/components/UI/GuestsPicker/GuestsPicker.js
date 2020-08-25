import React from 'react';
import classes from './GuestsPicker.module.css';
import MinusIcon from '../../../assets/icons/minus-solid';
import PlusIcon from '../../../assets/icons/plus-solid';

const guestsPicker = props => {
    const categoryLabel = ['Adults', 'Children', 'Infants'];
    const categoryInfo = ['Ages 13 or Above', 'Ages 2-12', 'Under 2'];
    const category = ['adults', 'children', 'infants'];
    const buttonInactiveStyles = [
        [props.guests.adults === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {},
            props.guests.adults === 16 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}],
        [props.guests.children === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {},
            props.guests.children === 5 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}],
        [props.guests.infants === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {},
            props.guests.infants === 5 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}]
    ];

    const guests = [0,1,2].map(i=>{
        return (
            <div className={classes.GuestsCategory} style={i === 2 ? {borderBottom: 'none'} : {}}>
                <div className={classes.GuestsInfo}>
                    <div className={classes.GuestsCategoryLabel}>{categoryLabel[i]}</div>
                    <div className={classes.GuestsCategoryInfo}>{categoryInfo[i]}</div>
                </div>
                <div className={classes.GuestsChangeNumber}>
                    <div 
                        onClick={()=>props.removeGuest(category[i])} 
                        className={classes.Button}
                        style={buttonInactiveStyles[i][0]}>
                        <div><MinusIcon/></div>
                    </div>
                    <div>{props.guests[category[i]]}</div>
                    <div 
                        onClick={()=>props.addGuest(category[i])} 
                        className={classes.Button}
                        style={buttonInactiveStyles[i][1]}>
                            <div><PlusIcon/></div></div>
                </div>
            </div>
        );
    });
    return (
        <>
            <div className={classes.GuestsPicker} id="SearchBar">
                {guests}
            </div>
        </>
    );
};

export default guestsPicker;