import React from 'react';
import classes from './MobileSearchModal.module.css';
import TimesCircleIcon from '../../../assets/icons/cancel-custom';
import { Link } from 'react-router-dom';

const FIELD_LABEL = {
    'checkInActive': 'Select Check in Date',
    'checkOutActive': 'Select Check out Date',
    'guestsActive': 'Select Number of Guests'
};
const mobileSearchModal = props => {
    let nextButtonLabel = props.activeCategory === 'guestsActive' ? 'Search' : 'Next';
    let nextOrFinish = props.activeCategory === 'guestsActive' ? props.finish : props.goToNext;

    if(props.activeCategory === 'guestsActive'){
        nextOrFinish = (
        <Link 
            to={{
                pathname: '/homes',
                search: `?location=${props.searchData.location}`+
                    `&checkInDate=${props.searchData.checkInDate}`+
                    `&checkOutDate=${props.searchData.checkOutDate}`+
                    `&adults=${props.searchData.guests.adults}`+
                    `&children=${props.searchData.guests.children}`+
                    `&infants=${props.searchData.guests.infants}`
            }}
            style={{ textDecoration: 'none' }}>

            <div className={classes.SearchButton}>Search</div>
        </Link>);
    }else{
        nextOrFinish = <div onClick={nextOrFinish}>Next</div>;
    }

    return (
        <>
        <div className={classes.ModalBackground}>
        </div>
        <div className={classes.MobileSearchModal}>
            <div className={classes.SearchInfo}>
                <div>{props.summary}</div>
                <div>{FIELD_LABEL[props.activeCategory]}</div>
            </div>
            {props.children}
            <div className={classes.NavButtons}>
                <div onClick={props.goBack}>Back</div>
                {nextOrFinish}
            </div>
            <div onClick={props.exitModal} className={classes.ExitModal}>
                <div><TimesCircleIcon/></div>
            </div>
        </div>
        </>
    );
}

export default mobileSearchModal;