import React from 'react';
import Listing from './Listing/Listing';
import classes from './Listings.module.css';

const listings = (props) => {
    const listings = props.listings.map(listing=>{
        return (
            <Listing key={listing._id} listing={listing} mouseEnterLeave={props.mouseEnterLeave}/>
        );
    });

    return (
        <div className={classes.Listings}>
            {listings}
        </div>
    );
};

export default listings;