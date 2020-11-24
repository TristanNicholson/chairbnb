import React, {Component} from 'react';
import classes from './ManageListings.module.css';
import { Redirect, NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Listings from '../../components/Listings/Listings';

class ManageListings extends Component {
    state = {
        createdNewListing: false
    }
    componentDidMount(){
        if(this.props.userId){
            console.log('Mount: '+ this.props.userId);
            this.props.onFetchListings();
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.userId){
            if(prevProps.userId !== this.props.userId){
                this.props.onFetchListings();
            }
        }
    }

    addListingHandler = () => {
        const addListing = async () =>{this.props.onCreateListing(this.props.userId)};
        addListing();
        this.setState({createdNewListing: true});
    };

    render(){
        let redirect;

        if(!this.props.authenticated){
            redirect = <Redirect to='/'/>;
        }         
        let listings = <div className={classes.NoListings}>No Listings</div>

        if(this.props.listingId && this.state.createdNewListing){
            redirect = <Redirect to={'/hosting/listings/add/'+this.props.listingId+'/propertyType'}/>;
        }
        return (
            <div className={classes.ManageListings}>
                {redirect}
                <div className={classes.Header}>
                    <div className={classes.Title}>Your Listings</div>
                    <div className={classes.AddListing}>
                        <div
                            onClick={this.addListingHandler}
                            className={classes.AddListingLink}>
                            <div>Add Listing</div>
                        </div>
                    </div>
                </div>
                <div className={classes.Listings}>
                    {this.props.listings == null || this.props.listings.length == 0? 
                        listings:
                        <Listings 
                            reRender={()=>this.props.onFetchListings(this.props.userId.toString())}
                            listings={this.props.listings} 
                            manage={true}
                            mouseEnterLeave={()=>{}}/> 
                    }
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
        listingId: state.listings.listingId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: ()=>dispatch(actions.signOut()),
        onFetchListings: ()=>dispatch(actions.fetchListings()),
        onCreateListing: ()=>dispatch(actions.createListing())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageListings);