import React from 'react';
import classes from './MobileSearchModal.module.css';
import TimesCircleIcon from '../../../assets/icons/cancel-custom';

const FIELD_LABEL = {
    'checkInActive': 'Select Check in Date',
    'checkOutActive': 'Select Check out Date',
    'guestsActive': 'Select Number of Guests'
};
const mobileSearchModal = props => {
    let nextButtonLabel = props.activeCategory === 'guestsActive' ? 'Search' : 'Next';

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
                <div onClick={props.goToNext}>{nextButtonLabel}</div>
            </div>
            <div onClick={props.exitModal} className={classes.ExitModal}>
                <div><TimesCircleIcon/></div>
            </div>
        </div>
        </>
    );
}

export default mobileSearchModal;