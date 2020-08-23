import React from 'react';
import classes from './GuestsPicker.module.css';
import { removeGuest } from '../../../store/actions/searchBar';
import MinusIcon from '../../../assets/icons/minus-solid';
import PlusIcon from '../../../assets/icons/plus-solid';

const guestsPicker = props => {
    return (
        <>
            <div className={classes.GuestsPicker} id="SearchBar">
                <div className={classes.GuestsCategory}>
                    <div className={classes.GuestsInfo}>
                        <div className={classes.GuestsCategoryLabel}>Adults</div>
                        <div className={classes.GuestsCategoryInfo}>Ages 13 or Above</div>
                    </div>
                    <div className={classes.GuestsChangeNumber}>
                        <div 
                            onClick={()=>props.removeGuest('adults')} 
                            className={classes.Button}
                            style={props.guests.adults === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                            <div><MinusIcon/></div>
                        </div>
                        <div>{props.guests.adults}</div>
                        <div 
                            onClick={()=>props.addGuest('adults')} 
                            className={classes.Button}
                            style={props.guests.adults === 16 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                                <div><PlusIcon/></div></div>
                    </div>
                </div>
                <div className={classes.GuestsCategory}>
                    <div className={classes.GuestsInfo}>
                        <div className={classes.GuestsCategoryLabel}>Children</div>
                        <div className={classes.GuestsCategoryInfo}>Ages 2-12</div>
                    </div>
                    <div className={classes.GuestsChangeNumber}>
                        <div 
                            onClick={()=>props.removeGuest('children')} 
                            className={classes.Button}
                            style={props.guests.children === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                                <div><MinusIcon/></div></div>
                        <div>{props.guests.children}</div>
                        <div 
                            onClick={()=>props.addGuest('children')} 
                            className={classes.Button}
                            style={props.guests.children === 5 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                                <div><PlusIcon/></div></div>
                    </div>
                </div>
                <div className={classes.GuestsCategory}>
                    <div className={classes.GuestsInfo}>
                        <div className={classes.GuestsCategoryLabel}>Infants</div>
                        <div className={classes.GuestsCategoryInfo}>Under 2</div>
                    </div>
                    <div className={classes.GuestsChangeNumber}>
                        <div 
                            onClick={()=>props.removeGuest('infants')} 
                            className={classes.Button}
                            style={props.guests.infants === 0 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                                <div><MinusIcon/></div></div>
                        <div>{props.guests.infants}</div>
                        <div 
                            onClick={()=>props.addGuest('infants')} 
                            className={classes.Button}
                            style={props.guests.infants === 5 ? {borderColor: '#ccc', color: '#ddd', cursor: 'not-allowed'} : {}}>
                                <div><PlusIcon/></div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default guestsPicker;