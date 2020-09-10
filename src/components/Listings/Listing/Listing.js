import React from 'react';
import classes from './Listing.module.css';
import '../../../../node_modules/@splidejs/splide/dist/css/themes/splide-default.min.css';
import {connect} from 'react-redux';
import StarIcon from '../../../assets/icons/star-solid';
import {Splide, SplideSlide} from '@splidejs/react-splide';

const Listing = (props) => {
    const lengthOfStay = Math.ceil(Math.abs(new Date(props.checkOut) - new Date(props.checkIn)) / (1000 * 60 * 60 * 24));
    const sliderImages = props.listing.images.gallery.map((image)=>{
        return (
            <SplideSlide>
                <img src={image} alt={props.listing.name}></img>
            </SplideSlide>
        );
    });
    
    return (
        <div className={classes.Listing} 
            onMouseEnter={()=>props.mouseEnterLeave(props.listing._id, "enter")}
            onMouseLeave={()=>props.mouseEnterLeave(props.listing._id, "leave")}>
            <div className={classes.ListingImages}>
                <Splide
                    options={{
                        type: 'loop',
                        perPage    : 1,
                        height     : '190px',
                        cover      : true,
                        breakpoints: {
                            height: '6rem',
                        }
                    }}>
                    {sliderImages}
                </Splide>
            </div>
            <div className={classes.ListingSummary}>
                <div className={classes.ListingTitle}>
                    <p>{`${props.listing.roomType} in ${props.listing.address.neighborhood ? props.listing.address.neighborhood : props.listing.address.city}`}</p>
                    <h3>{props.listing.name}</h3>
                    <div className={classes.Separator}></div>
                    <div>{`${props.listing.accommodates} guests · ${props.listing.bedrooms} bedrooms · ${props.listing.beds} beds · ${props.listing.bathrooms} baths`}</div>
                </div>   
                <div className={classes.ListingPriceReview}>
                    <div className={classes.Reviews}>
                        <div className={classes.ReviewsIcon}>
                            <StarIcon/>
                        </div>
                        <div>{`${props.listing.ratings.overall/20.0} (50)`}</div>
                    </div>
                    <div className={classes.Price}>
                        <div className={classes.PricePerNight}><span>${props.listing.price}</span> / night</div>
                        <div className={classes.TotalPrice}>${props.listing.price*lengthOfStay} total</div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        checkIn: state.searchBar.checkInDate,
        checkOut: state.searchBar.checkOutDate
    }
}

export default connect(mapStateToProps)(Listing);