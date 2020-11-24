import React from 'react';
import classes from './Checkout.module.css';
import Reviews from '../UI/Reviews/Reviews';
import DatePicker from '../../components/UI/DatePicker/DatePicker';
import GuestPicker from '../../components/UI/GuestsPicker/GuestsPicker';

const checkout = (props) => {
    let calendar;
    if(props.showCalendar){
        calendar = <DatePicker
            checkInDate={props.checkInDate}
            checkOutDate={props.checkOutDate}
            dateClicked={props.dateClicked}/>
    }
    let guests;
    if(props.showGuests){
        guests = <GuestPicker
            addGuest={props.addGuest}
            removeGuest={props.removeGuest}
            guests={props.guests}/>;
    }

    let checkInDate = 'Add Date';
    if(props.checkInDate){
        checkInDate = props.checkInDate;
    }

    let checkOutDate = 'Add Date';
    if(props.checkOutDate){
        checkOutDate = props.checkOutDate;
    }

    let guestsLabel = 'Add Guests';

    if(props.guests.adults || props.guests.children){
        let totalGuests = props.guests.adults + props.guests.children;
        guestsLabel = totalGuests === 1 ? '1 guest' : totalGuests + ' guests';
        if(props.guests.infants){
            let infants = props.guests.infants === 1 ? '1 infant' : props.guests.infants + ' infants';
            guestsLabel += ', ' + infants;
        }
    }

    return (
        <div className={classes.CheckoutDiv}>
            <div className={classes.PriceReviews}>
                <div className={classes.Price}>
                    <span>${props.home.price}</span>{" /night"}
                </div>
                <div className={classes.Reviews}>
                    <Reviews listing={props.home}/>
                </div>   
            </div>
            <div className={classes.Search}>
                <div className={classes.Dates} onClick={props.toggleShowCalendar}>
                    <div className={classes.CheckIn}>
                        <div><strong>CHECK-IN</strong></div>
                        <div>{checkInDate}</div>
                    </div>
                    <div className={classes.CheckOut}>
                        <div><strong>CHECK-OUT</strong></div>
                        <div>{checkOutDate}</div>
                    </div>
                </div>
                <div className={classes.Guests} onClick={props.toggleShowGuests}>
                    <div><strong>GUESTS</strong></div>
                    <div>{guestsLabel}</div>
                </div>
                <div className={classes.CalendarGuestsContainer}>
                    {calendar}
                    {guests}
                </div>
            </div>
            <div className={classes.CheckAvailability} 
                onClick={()=>props.createBooking(props.home._id, props.checkInDate, props.checkOutDate, props.guests)}>
                <div>Check Availability</div>
            </div>
        </div>
    );
};

export default checkout;
