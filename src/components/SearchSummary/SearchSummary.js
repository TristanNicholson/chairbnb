import React from 'react';
import classes from './SearchSummary.module.css';
import FilterButton from '../UI/Buttons/FilterButton/FilterButton';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const searchSummary = (props) => {
    let searchSummary = `${props.listingsCount >= 300 ? '300+' : props.listingsCount} stay${props.listingsCount !== 1 ? 's':''}`;
    if(props.checkInDate){
        searchSummary += ' · ' + 
            `${MONTHS[(new Date(Date.parse(props.checkInDate))).getMonth()]}`+
            ` ${(props.checkInDate.slice(8,10))}`;

        if(props.checkOutDate){
            searchSummary += ' - ' +
                `${MONTHS[(new Date(Date.parse(props.checkOutDate))).getMonth()]}`+
                ` ${(props.checkOutDate.slice(8,10))}`;
        }

        if(props.guests.adults || props.guests.children){
            let guests = props.guests.adults + props.guests.children;
            let guestsString = guests > 1 ? 'guests' : 'guest';
            searchSummary += ' · ' + guests + ' ' + guestsString;
        }
    };

    return (
        <>
            <div className={classes.SearchSummary}>
                <section>
                    <div>{searchSummary}</div>
                    <h2>Stays in {props.location}</h2>
                </section>
                <div className={classes.Filters}>
                    <FilterButton name="Cancellation flexibility" clicked={()=>{}}/>
                    <FilterButton name="Type of place" clicked={()=>{}}/>
                    <FilterButton name="Price" clicked={()=>{}}/>
                    <FilterButton name="More filters" clicked={()=>{}}/>
                </div>
            </div>
        </>
    );
}

export default searchSummary;