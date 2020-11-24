import React, {Component} from 'react';
import classes from './Bookings.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Listings from '../../components/Listings/Listings';

class Bookings extends Component {
    state = {

    }

    componentDidMount(){
        this.props.onFetchBookings();
    }

    render(){
        let redirect;

        if(!this.props.authenticated){
            redirect = <Redirect to='/'/>;
        }         
        let hostedBookings = <div className={classes.NoBookings}>You are not hosting anyone</div>;
        let guestBookings = <div className={classes.NoBookings}>You have no bookings</div>;

        if(this.props.hostBookings !== [] && this.props.hostBookings){
            let listings = this.props.hostBookings.map((el)=>{
                return {
                    ...el.listing,
                    guest: el.guest,
                    host: el.host,
                    booking: el.booking
                };
            })
            hostedBookings = <Listings 
                reRender={()=>this.props.onFetchListings(this.props.userId.toString())}
                listings={listings} 
                booking={true}
                mouseEnterLeave={()=>{}}
                hosting={true}/> ;
        }

        if(this.props.guestBookings !== [] && this.props.guestBookings){
            let listings = this.props.guestBookings.map((el)=>{
                return {
                    ...el.listing,
                    guest: el.guest,
                    host: el.host,
                    booking: el.booking
                };
            })
            guestBookings = <Listings 
                reRender={()=>this.props.onFetchListings(this.props.userId.toString())}
                listings={listings} 
                booking={true}
                mouseEnterLeave={()=>{}}
                guest={true}/> ;
        }

        if(this.props.listingId && this.state.createdNewListing){
            redirect = <Redirect to={'/hosting/listings/add/'+this.props.listingId+'/propertyType'}/>;
        }

        return (
            <div className={classes.Bookings}>
                {redirect}
                <div className={classes.Header}>
                    <div className={classes.Title}>Visiting</div>
                </div>
                <div className={classes.BookingsList}>
                    {guestBookings}
                </div>
                <div className={classes.Header}>
                    <div className={classes.Title}>Hosting</div>
                </div>
                <div className={classes.BookingsList}>
                    {hostedBookings}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        listings: state.profile.listings,
        userId: state.auth.user,
        listingId: state.listings.listingId,
        hostBookings: state.bookings.hostBookings,
        guestBookings: state.bookings.guestBookings
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: ()=>dispatch(actions.signOut()),
        onFetchListings: (userId)=>dispatch(actions.fetchListings(userId)),
        onCreateListing: (userId)=>dispatch(actions.createListing(userId)),
        onFetchBookings: ()=>dispatch(actions.fetchBookings())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Bookings);