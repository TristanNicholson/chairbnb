import React, { Component } from 'react';
import classes from './Listing.module.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Reviews from '../../UI/Reviews/Reviews';
import { withRouter } from "react-router-dom";
import * as actions from '../../../store/actions/index';
import Carousel from '../../UI/Carousel/Carousel';

let INSTANCE_COUNT = 0;

class Listing extends Component {
    state = {
        show: true,
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        instance: INSTANCE_COUNT++,
        width: window.clientWidth
    };

    componentDidMount(){
        window.addEventListener('resize', this.resizeHandler);
    }

    resizeHandler = () => {
        this.setState({...this.state, width: document.body.clientWidth});
    }

    deleteHandler = async () => {
        await actions.deleteListing(this.props.listing._id);
        this.setState({show: false});
    }

    activateHandler = async () => {
        await actions.activateListing(this.props.listing._id);
        setTimeout(() => {
            this.props.onFetchListings(this.props.userId.toString());
        }, 500);
    }

    acceptBookingHandler = async () => {
        await this.props.onAcceptBooking(this.props.listing.booking._id);
        setTimeout(() => {
            this.props.onFetchBookings();
        }, 500);
    };

    denyBookingHandler = async () => {
        await this.props.onDenyBooking(this.props.listing.booking._id);
        setTimeout(() => {
            this.props.onFetchBookings();
        }, 500);
    };

    render(){
        const editHandler = () => {
            this.props.history.push('/hosting/listings/add/'+this.props.listing._id+'/propertyType');
        }
        const lengthOfStay = Math.ceil(Math.abs(new Date(this.props.checkOut) - new Date(this.props.checkIn)) / (1000 * 60 * 60 * 24));
        let sliderImages;
        let placeholderImage = null;
        if(this.props.listing.images.gallery.length === 0){
            placeholderImage = (
                <div key={'https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/hobbiton.jpg'} className={classes.ImageDiv} style={{backgroundImage: 'url(https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/hobbiton.jpg)'}}></div>
            );
        }

        let status = null;
        if(this.props.manage){
            if(this.props.listing.listingAvailable){
                status = <div className={classes.StatusActive}>Active</div>;
            }else if(this.props.listing.listingFinished && !this.props.listing.listingAvailable){
                status = <div className={classes.StatusInactive}>Inactive</div>;
            }else{
                status = <div className={classes.StatusUnfinished}>Unfinished</div>;
            }
        }

        let summary = null;
        
        if(this.props.listing.accommodates && this.props.listing.bedrooms && this.props.listing.beds && this.props.listing.bathrooms){
            summary = `${this.props.listing.accommodates} guest${this.props.listing.accommodates > 1 ? 's' : ''}`+
            ` · ${this.props.listing.bedrooms} bedroom${this.props.listing.bedrooms > 1 ? 's' : ''} · ${this.props.listing.beds}`+
            ` bed${this.props.listing.beds > 1 ? 's' : ''} · ${this.props.listing.bathrooms} bath${this.props.listing.bathrooms > 1 ? 's' : ''}`;
        }

        let showTotalPrice;
        let showEdit;
        let showBookingInfo;

        if(lengthOfStay > 0 ){
            showTotalPrice = <div className={classes.TotalPrice}>${this.props.listing.price*lengthOfStay} total</div>;
        }
        if(this.props.manage){
            showEdit = (
                <div className={classes.ManageButtons}>
                    {this.props.listing.listingFinished || this.props.listing.listingAvailable ? 
                        <div className={classes.Activate} onClick={this.activateHandler}>
                            <div>{this.props.listing.listingAvailable ? 'Inactivate' : 'Activate'}</div>
                        </div> 
                    : null}
                    <div className={classes.Edit} onClick={editHandler}><div>Edit</div></div>
                    <div className={classes.Delete} onClick={this.deleteHandler}><div>Delete</div></div>
                </div>
            );
        }
        if(this.props.booking && this.props.listing){
            let guest;
            let host;
            let datesAndPrice;
            let hostingControls;
            let guestApproval;
            let hostApproval;
            let guestInfo;
            let hostInfo;
            const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            if(this.props.listing.booking){
                let startDate = `${MONTHS[parseInt(this.props.listing.booking.startDate.slice(5,7))-1]} ${this.props.listing.booking.startDate.slice(8,10)}`;
                let endDate = `${MONTHS[parseInt(this.props.listing.booking.endDate.slice(5,7))-1]} ${this.props.listing.booking.endDate.slice(8,10)}`;

                datesAndPrice = (
                    <div className={classes.DatesAndPrice}>
                        <div className={classes.Dates}>
                            {startDate + ' - '+ endDate}
                        </div>
                        <div className={classes.BookingPrice}>
                            Total price: <span style={{fontSize: '18px'}}>{`$${this.props.listing.booking.totalPrice.toFixed(2)}`}</span>
                        </div>
                    </div>
                );
            }
            
            if(this.props.hosting){
                if(!this.props.listing.booking.approved){
                    hostApproval = <div className={classes.PendingApproval}><div>Awaiting your decision</div></div>;
                }else{
                    hostApproval = <div className={classes.Approved}><div>You approved</div></div>;
                }

                if(!this.props.listing.booking.approved){
                    hostingControls = (
                            <div className={classes.HostingControls}>
                                <div className={classes.Accept} onClick={this.acceptBookingHandler}><div>Accept</div></div>
                                <div className={classes.Deny} onClick={this.denyBookingHandler}><div>Deny</div></div>
                            </div>
                    );
                }   

                if(this.props.listing.guest){
                    guest = (
                        <>
                        <div className={classes.UserLabel}>Visiting</div>
                        <div className={classes.UserInfo}>
                            <div className={classes.UserThumbnail} style={{backgroundImage: 'url('+this.props.listing.guest.userPicture+')'}}></div>
                            <div className={classes.UserName}>{this.props.listing.guest.name}</div>
                        </div>
                        </>
                    );
                }
                guestInfo = <div className={classes.GuestInfo}><div>Reference #: <span>{this.props.listing.booking._id}</span></div></div>;
            }

            if(this.props.guest){
                if(!this.props.listing.booking.approved){
                    guestApproval = <div className={classes.PendingApproval}><div>Pending approval</div></div>;
                }else{
                    guestApproval = <div className={classes.Approved}><div>Approved</div></div>;
                }
                if(this.props.listing.host){
                    host = (
                        <>
                        <div className={classes.UserLabel}>Hosted by</div>
                        <div className={classes.UserInfo}>
                            <div className={classes.UserThumbnail} style={{backgroundImage: 'url('+this.props.listing.host.userPicture+')'}}></div>
                            <div className={classes.UserName}>{this.props.listing.host.name}</div>
                        </div>
                        </>
                    );
                }
                if(this.props.listing.booking){
                    guestInfo = (
                    <>
                        <div className={classes.GuestInfo}><div>Reference #: <span>{this.props.listing.booking._id}</span></div></div>
                        <div className={classes.GuestInfo}><div>Address: <span>{this.props.listing.address.cleansed}</span></div></div>
                    </>);
                }
            }

            showBookingInfo = (
                <div className={classes.Booking}>
                    <div className={classes.AddOnSeparator}></div>
                    {datesAndPrice}
                    <div className={classes.Users}>
                        <div>
                            {host ? host : guest}
                        </div>
                        <div>
                            {this.props.hosting ? hostApproval : guestApproval}
                        </div>
                    </div>
                    {guestInfo}
                    {hostInfo}
                    {hostingControls}
                </div>
            );
        }

        sliderImages = this.props.listing.images.gallery.map((image,i)=>{
            return (
                <div key={image+i} className={classes.ImageDiv} style={{backgroundImage: 'url('+image+')'}}></div>
            );
        });

        let carouselHeight;;
        let carouselWidth;

        let width = this.state.width ? this.state.width : document.body.clientWidth;

        if(width <= 325){
            carouselHeight = '170px';
            carouselWidth = '95vw';
        }else if(width <= 500 ){
            carouselHeight = '220px';
            carouselWidth = '90vw';
        }else if(width <= 600){
            carouselHeight = '150px';
            carouselWidth = '30vw';
        }else if(width <= 900){
            carouselHeight = '190px';
            carouselWidth = '30vw';
        }else if(width <= 1120){
            carouselHeight = '190px';
            carouselWidth = '22vw';
        }else{
            carouselHeight = '190px';
            carouselWidth = '30vw';
        }

        return (
            
            <div 
                style={this.state.show ? {}: {display: 'none'}}
                className={classes.Listing} 
                onMouseEnter={!this.props.manage ? ()=>this.props.mouseEnterLeave(this.props.listing._id, "enter"): null}
                onMouseLeave={!this.props.manage ? ()=>this.props.mouseEnterLeave(this.props.listing._id, "leave"): null}>
                <div id={'listing_'+this.state.instance} className={classes.ListingImages}>
                    <Carousel
                    width={carouselWidth}
                    height={carouselHeight}>
                        {sliderImages}
                    </Carousel>
                </div>
                
                <div className={classes.ListingSummary}>
                    <NavLink 
                    to={'/homes/'+this.props.listing._id}
                    
                    className={classes.NavLink}
                    activeClassName={classes.active}>
                        <div className={classes.ListingTitle}>
                            {this.props.listing.roomType && (this.props.listing.address.neighborhood || this.props.listing.address.city)?
                                <p>{`${this.props.listing.roomType} in ${this.props.listing.address.neighborhood ? this.props.listing.address.neighborhood : this.props.listing.address.city}`}</p>
                            :null}
                            <h3>{this.props.listing.name ? this.props.listing.name : 'Untitled Property'}</h3>
                            <div className={classes.Separator}></div>
                            <div>{summary}</div>
                        </div>   
                    </NavLink>
                    <div className={classes.ListingPriceReview}>
                        <Reviews listing={this.props.listing}/>
                        <div className={classes.Price}>
                            <div className={classes.PricePerNight}><div><span>${this.props.listing.price}</span> / night</div></div>
                            {showTotalPrice}
                        </div>
                    </div>  
                </div>
                {this.props.manage ?
                <div className={classes.Manage}>
                    <div className={classes.Status}>
                            {status}
                    </div>
                    {showEdit}
                </div>  
                :null} 
                {this.props.booking ?
                    showBookingInfo
                :null}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        checkIn: state.searchBar.checkInDate,
        checkOut: state.searchBar.checkOutDate,
        userId: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchListings: (id)=>dispatch(actions.fetchListings(id)),
        onFetchBookings: ()=>dispatch(actions.fetchBookings()),
        onDenyBooking: (bookingId)=>dispatch(actions.denyBooking(bookingId)),
        onAcceptBooking: (bookingId)=>dispatch(actions.acceptBooking(bookingId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));