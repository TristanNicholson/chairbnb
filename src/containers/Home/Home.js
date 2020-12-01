import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.module.css';
import ImageCollage from '../../components/UI/ImageCollage/ImageCollage';
import Reviews from '../../components/UI/Reviews/Reviews';
import DatePicker from '../../components/UI/DatePicker/DatePicker';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import Map from '../Map/Map';
import Carousel from '../../components/UI/Carousel/Carousel';
import MobileSearchBar from '../../components/UI/SearchBar/MobileSearchBar/MobileSearchBar';
import Checkout from '../../components/Checkout/Checkout';
import checkout from '../../components/Checkout/Checkout';
import Amenities from '../../components/Amenities/Amenities';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Home extends Component {
    state = {
        access: false,
        notes: false,
        space: false,
        checkInActive: false,
        checkOutActive: false,
        locationActive: false,
        guestsActive: false,
        searchBarActive: false,
        homeCheckOutActive: false,
        homeCheckInActive: true,
        width: document.body.clientWidth,
        showCheckoutCalendar: false,
        showCheckoutGuests: false
    }

    componentDidMount(){
        let homeId = this.props.location.pathname.split("/").pop();
        this.props.onFetchHome(homeId);
        window.addEventListener('resize',this.resizeHandler);
    }

    resizeHandler = () => {
        this.setState({width: document.body.clientWidth});
    }

    componentDidUpdate(prevProps){
        if( prevProps.home === null || ( prevProps.home.description !== this.props.home.description )){
            
            if(this.props.home && this.props.home.description.summary){
                let summary;
                summary = document.createElement( 'div' );
                summary.innerHTML = this.props.home.description.summary;
                console.log(this.props.home.description.summary);
                document.getElementsByClassName(classes.SummaryDetails)[0].appendChild(summary);
                if(this.props.home.description.summary === ''){
                    this.setState({summary: false});
                }else{
                    this.setState({summary: true});
                }
            }       
            if(this.props.home && this.props.home.description.space){
                let space;
                space = document.createElement( 'div' );
                space.innerHTML = this.props.home.description.space;
                document.getElementsByClassName(classes.SpaceDetails)[0].appendChild(space);
                if(this.props.home.description.space === ''){
                    this.setState({space: false});
                }else{
                    this.setState({space: true});
                }
            } 
            if(this.props.home && this.props.home.description.access){
                let access;
                access = document.createElement( 'div' );
                access.innerHTML = this.props.home.description.access;
                document.getElementsByClassName(classes.AccessDetails)[0].appendChild(access);
                if(this.props.home.description.access === ''){
                    this.setState({access: false});
                }else{
                    this.setState({access: true});
                }
            }  
            if(this.props.home && this.props.home.description.notes){
                let notes;
                notes = document.createElement( 'div' );
                notes.innerHTML = this.props.home.description.notes;
                document.getElementsByClassName(classes.NotesDetails)[0].appendChild(notes);
                if(this.props.home.description.notes === ''){
                    this.setState({notes: false});
                }else{
                    this.setState({notes: true});
                }
            }    
        }
    }

    datesClickedHandler = (event) => {
        if(this.state.checkInActive){
            this.props.onCheckInDateChange(event.target.id);
        }else{
            this.props.onCheckOutDateChange(event.target.id);
        }
        if(!(this.props.checkInDate && ((new Date(this.props.checkInDate)) > (new Date(event.target.id))))){
            this.searchItemClickedHandler('next');
        }
    };

    homeDatesClickedHandler = (event) => {
        if(
            Number(new Date(event.target.id)) >= Number(new Date(this.props.homeCheckOutDate)) &&
            this.state.homeCheckInActive
            ){
            this.props.onHomeCheckInDateChange(event.target.id);
            this.props.onClearHomeCheckOut();
            this.setState({homeCheckInActive: false, homeCheckOutActive: true});
        }else if(
            Number(new Date(event.target.id)) < Number(new Date(this.props.homeCheckOutDate)) &&
            Number(new Date(event.target.id)) > Number(new Date(this.props.homeCheckInDate))
            ){
            this.props.onHomeCheckInDateChange(event.target.id);
            this.setState({homeCheckInActive: false, homeCheckOutActive: true});
        }
        else if(this.state.homeCheckInActive){
            this.props.onHomeCheckInDateChange(event.target.id);
            this.setState({homeCheckInActive: false, homeCheckOutActive: true});
        }else{
            this.props.onHomeCheckOutDateChange(event.target.id);
            this.setState({homeCheckInActive: true, homeCheckOutActive: false});
        }

    }

    searchItemClickedHandler = (event) => {
        if(event === 'next'){
            event = this.state.checkInActive ? 'checkOutSearch' : 'guestsSearch';
        }

        let currentEvent= document.getElementById(event);

        if(currentEvent.id === 'locationSearch'){
            this.setState({locationActive: true, checkInActive: false, checkOutActive: false, guestsActive: false, searchBarActive: true});
        }else if(currentEvent.id === 'checkInSearch'){
            this.setState({locationActive: false, checkInActive: true, checkOutActive: false, guestsActive: false, searchBarActive: true});
        }else if(currentEvent.id === 'checkOutSearch'){
            this.setState({locationActive: false, checkInActive: false, checkOutActive: true, guestsActive: false, searchBarActive: true});
        }else{ 
            this.setState({locationActive: false, checkInActive: false, checkOutActive: false, guestsActive: true, searchBarActive: true});
        }       
    }

    showCheckoutCalendarHandler = () => {
        this.setState({ showCheckoutCalendar: !this.state.showCheckoutCalendar, showCheckoutGuests: false });
    };

    showCheckoutGuestsHandler = () => {
        this.setState({ showCheckoutGuests: !this.state.showCheckoutGuests, showCheckoutCalendar: false });
    };

    render(){
        if(!this.props.home){
            return <></>;
        }
        let summaryStyle = {display: 'none'};
        let accessStyle = {display: 'none'};
        let notesStyle = {display: 'none'};
        let spaceStyle = {display: 'none'};

        if(this.state.summary){
            summaryStyle = {display: 'inline-block'};
        }
        if(this.state.access){
            accessStyle = {display: 'inline-block'};
        }
        if(this.state.notes){
            notesStyle = {display: 'inline-block'};
        }
        if(this.state.space){
            spaceStyle = {display: 'inline-block'};
        }

        const summary = this.props.home ? `${this.props.home.accommodates} guest${this.props.home.accommodates > 1 ? 's' : ''}`+
        ` · ${this.props.home.bedrooms} bedroom${this.props.home.bedrooms > 1 ? 's' : ''} · ${this.props.home.beds}`+
        ` bed${this.props.home.beds > 1 ? 's' : ''} · ${this.props.home.bathrooms} bath${this.props.home.bathrooms > 1 ? 's' : ''}` : null;

        let width = this.state.width ? this.state.width : document.body.clientWidth;

        let images =  (
            <ImageCollage 
                showPhotos={this.showAllPhotosHandler}
                photos={this.props.home.images.gallery}/>
        );

        let sliderImages = this.props.home.images.gallery.map((image,i)=>{
            return (
                <div className={classes.ImageDiv} style={{backgroundImage: 'url('+image+')'}}></div>
            );
        });

        let searchBar = <SearchBar/>;
        let checkoutMobile;
        let checkoutDesktop;
        let checkout = <Checkout
            checkInDate={this.props.homeCheckInDate}
            checkOutDate={this.props.homeCheckOutDate}
            showCalendar={this.state.showCheckoutCalendar}
            showGuests={this.state.showCheckoutGuests}
            addGuest={this.props.onGuestAdded}
            removeGuest={this.props.onGuestRemoved}
            guests={this.props.guests}
            toggleShowCalendar={this.showCheckoutCalendarHandler}
            toggleShowGuests={this.showCheckoutGuestsHandler}
            dateClicked={this.homeDatesClickedHandler}
            home={this.props.home}
            createBooking={this.props.onCreateBooking}/>;

        if(width < 900){
            checkoutMobile = checkout;
        }
        if(width >= 900){
            checkoutDesktop = (
                <div className={classes.HomeCheckout}>       
                    <div className={classes.Checkout}>
                        <div className={classes.HomeBodySpacer}></div>
                        {checkout}
                    </div>
                </div>
            );
        }

        if(width < 800){
            images = (  
                <div id={'Carousel'} className={classes.Carousel}>
                    <Carousel
                        width='95vw'
                        height='40vh'>
                        {sliderImages}
                    </Carousel>
                </div>   
            );
        }
        if(width < 690){
            searchBar = <MobileSearchBar/>;
        }

        console.log(this.props.guests);
        return(
                <div className={classes.Home}>
                    {searchBar}
                    <div className={classes.HomeTitle}>
                        <h1>{this.props.home.name}</h1>
                        <Reviews listing={this.props.home}/>
                    </div>
                    {images}
                    <div className={classes.HomeBody}>
                        <div className={classes.HomeDetails}>
                            {checkoutMobile}
                            <div className={classes.HomeBodySpacer}></div>   
                            <div className={classes.PropertySummary}>
                                <div className={classes.PropertyType}>
                                    <div className={classes.PropertyTypeLabel}>
                                        <div className={classes.HomeType}>
                                            {this.props.home.propertyType} hosted by {this.props.home.host.name}
                                        </div>
                                        <div className={classes.SummaryLabel}>
                                            {summary}
                                        </div>
                                    </div>
                                    <div className={classes.HostThumbnail}><img src={this.props.home.host.userPicture} alt="Host"/></div>
                                </div>
                            </div>
                            <div className={classes.Summary} style={summaryStyle}>
                                <div className={classes.SummaryDetails}>     
                                </div>
                            </div>
                            <div className={classes.Space} style={spaceStyle}>
                                <div className={classes.SpaceTitle}>The Space</div>
                                <div className={classes.SpaceDetails}>     
                                </div>
                            </div>
                            <div className={classes.Notes} style={notesStyle}>
                                <div className={classes.NotesTitle}>Other things to note</div>
                                <div className={classes.NotesDetails}>     
                                </div>
                            </div>
                            <div className={classes.Access} style={accessStyle}>
                                <div className={classes.AccessTitle}>Guest access</div>
                                <div className={classes.AccessDetails}>     
                                </div>
                            </div>
                            <div className={classes.SectionLabel}>Amenities</div>
                            <div className={classes.Amenities}>
                                <Amenities amenities={this.props.home.amenities}/>
                            </div>
                            <div className={classes.DatePicker}>
                                <DatePicker 
                                    style={{border: '2px solid #008489', borderRadius: '5px'}}
                                    checkInDate={this.props.homeCheckInDate}
                                    checkOutDate={this.props.homeCheckOutDate}
                                    dateClicked={this.homeDatesClickedHandler}/>
                            </div>       
                        </div>
                        {checkoutDesktop}
                    </div>
                    <div className={classes.Location}>
                        <div className={classes.SectionLabel}>Location</div>
                        {this.props.mapCenter ? 
                        <Map 
                            mapCenter={this.props.mapCenter}
                            type='home'
                            home={this.props.home}
                            showMap={{'height': '500px'}}/>: null}
                    </div>
                    <div className={classes.Host}>
                        <div className={classes.HostTitle}>
                            <div>
                                <div className={classes.HostSectionThumbnail}><img src={this.props.home.host.userPicture} alt="Host"/></div>
                            </div>
                            <div className={classes.HostLabel}>
                                <div className={classes.HostName}>Hosted by {this.props.home.host.name}</div>
                                <div className={classes.HostJoinDate}>Joined in {MONTHS[(new Date(this.props.home.host.userSince)).getMonth()]} {(new Date(this.props.home.host.userSince)).getFullYear()}</div>
                            </div>
                        </div>
                        <div className={classes.HostInfo}>
                            <div>
                                <div className={classes.HostAbout}>
                                    {this.props.home.host.about}
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        place: state.searchBar.refinedLocation,
        listings: state.searchBar.listings,
        count: state.searchBar.totalListings,
        mapCenter: state.map.center,
        guests: state.searchBar.guests,
        checkInDate: state.searchBar.checkInDate,
        checkOutDate: state.searchBar.checkOutDate,
        home: state.currentHome.home,
        homeCheckOutDate: state.currentHome.checkOutDate,
        homeCheckInDate: state.currentHome.checkInDate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLocationChange: (location)=>dispatch(actions.setLocation(location)),
        onCheckInDateChange: (id)=>dispatch(actions.setCheckInDate(id)),
        onCheckOutDateChange: (id)=>dispatch(actions.setCheckOutDate(id)),
        onHomeCheckOutDateChange: (id)=>dispatch(actions.setHomeCheckOutDate(id)),
        onHomeCheckInDateChange: (id)=>dispatch(actions.setHomeCheckInDate(id)),
        onClearHomeCheckOut: ()=>dispatch(actions.clearHomeCheckOutDate()),
        onClearHomeCheckIn: ()=>dispatch(actions.clearHomeCheckInDate()),
        onSubmitSearch: (searchState)=>dispatch(actions.submitSearch(searchState)),
        onSetGuests: (guests)=>dispatch(actions.setGuests(guests)),
        onFetchHome: (id)=>dispatch(actions.fetchHome(id)),
        onGuestAdded: (guestType)=>dispatch(actions.addGuest(guestType)),
        onGuestRemoved: (guestType)=>dispatch(actions.removeGuest(guestType)),
        onCreateBooking: (listingId, startDate, endDate, guests)=>dispatch(actions.createBooking(listingId, startDate, endDate, guests))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);