import React from 'react';
import StarIcon from '../../../assets/icons/star-solid';
import classes from './Reviews.module.css';

const reviews = props => {
    let reviews = <div className={classes.Reviews}>No reviews</div>;

    if(props.listing.totalReviews > 0 && props.listing.totalReviews < 5){
        reviews = (
            <div className={classes.Reviews}>
                {`${props.listing.totalReviews} review${props.listing.totalReviews > 1? 's':''}`}
            </div>
        );
    }
    if(props.listing.totalReviews > 5){
        reviews = (
            <div className={classes.Reviews}>
                <div className={classes.ReviewsIcon}>
                    <StarIcon/>
                </div>
                <div>{`${props.listing.ratings.overall/20.0} (${props.listing.totalReviews})`}</div>
            </div>
        );
    }
    return reviews;
}

export default reviews;