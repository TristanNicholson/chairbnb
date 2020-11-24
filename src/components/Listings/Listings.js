import React from 'react';
import Listing from './Listing/Listing';
import classes from './Listings.module.css';

const listings = (props) => {
    const listings = props.listings.map(listing=>{
        let key = listing.booking ? listing.booking._id + listing._id : listing._id;
        return (
            <Listing 
                reRender={ props.reRender ? props.reRender : ()=>{}}
                manage={props.manage} 
                key={key} 
                listing={listing} 
                mouseEnterLeave={props.mouseEnterLeave}
                booking={props.booking}
                hosting={props.hosting}
                guest={props.guest}/>
        );
    });

    return (
        <div className={classes.Listings}>
            {listings}
        </div>
    );
};

export default listings;