import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import SearchIcon from '../../../assets/icons/search-custom';
import TimesCircleIcon from '../../../assets/icons/cancel-custom';
import DatePicker from '../DatePicker/DatePicker';
import GuestsPicker from '../GuestsPicker/GuestsPicker';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/searchBar';
import {Link} from 'react-router-dom';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class SearchBar extends Component {
    state = {
        checkInActive: false,
        checkOutActive: false,
        locationActive: false,
        guestsActive: false,
        searchBarActive: false
    };

    componentDidMount(){
        window.addEventListener('click',this.clickOutHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('click',this.clickOutHandler);
    }

    clickOutHandler = (event) => {
        let target = event.target;
        let inSearchBar = false;

        if(target === null){return;}

        while(target.id !== 'App'){
            if(target.id === 'SearchBar'){
                inSearchBar = true;
            }
            target = target.parentNode;
            if(target === null){return;}
        }
        if(!inSearchBar){
            this.setState({
                checkInActive: false,
                checkOutActive: false,
                locationActive: false,
                guestsActive: false,
                searchBarActive: false
            });
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

    locationChangedHandler = (event) => {
        this.props.onLocationChange(event.target.value);
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

    deleteInputHandler = (inputType) => {
        if(inputType === 'checkIn'){
            this.props.onCheckInDateChange('');
            this.props.onCheckOutDateChange('');
        }else if(inputType === 'checkOut'){
            this.props.onCheckOutDateChange('');
        }else if(inputType === 'location'){
            this.props.onLocationChange('');
        }else{
            this.props.onGuestsCleared();
        }
    }

    getGuestsSummary(){
        let totalGuests = this.props.guests.adults + this.props.guests.children;
        let guestsSummary = `${(totalGuests)} guest${totalGuests > 1 ? 's' : ''}`+
            `${this.props.guests.infants > 0 ? ', ' + this.props.guests.infants + ' infant' : ''}`+
            `${this.props.guests.infants > 1 ? 's' : ''}`;
        if(this.props.width < 950){
            guestsSummary = `${(totalGuests)} guest${totalGuests > 1 ? 's' : ''}`;
        }
        return guestsSummary;
    }

    getDateSummary(inOrOut){
        if(inOrOut === 'in'){
            return `${MONTHS[(new Date(Date.parse(this.props.checkInDate))).getMonth()]}`+
            ` ${(this.props.checkInDate.slice(8,10))}`;
        }else{
            return `${MONTHS[(new Date(Date.parse(this.props.checkOutDate))).getMonth()]}`+
            ` ${(this.props.checkOutDate.slice(8,10))}`;
        }     
    }

    render(){
        const guestsSummary = this.props.guests.adults > 0 ? this.getGuestsSummary() : 'Add Guests';
        const searchBarClasses = [classes.SearchBar];
        const locationClasses = [classes.SearchBarItem, classes.SearchBarLocation];
        const checkInClasses = [classes.SearchBarItem, classes.SearchBarDates];
        const checkOutClasses = [classes.SearchBarItem, classes.SearchBarDates];
        const guestsClasses = [classes.SearchBarGuests];
        let searchButtonLabel = null;
        let searchButtonLabelClasses = classes.SearchInactive;

        if(this.state.searchBarActive){
            searchBarClasses.push(classes.SearchBarActive);
            locationClasses.push(classes.SearchBarItemInactive);
            checkInClasses.push(classes.SearchBarItemInactive);
            checkOutClasses.push(classes.SearchBarItemInactive);
            guestsClasses.push(classes.SearchBarItemInactive);
            if(this.props.width > 800){
                locationClasses.push(classes.LocationActive);
                guestsClasses.push(classes.GuestsActive);
                searchButtonLabel = 'Search';
                searchButtonLabelClasses = classes.Search;
            }
            if(this.state.locationActive){
                locationClasses.push(classes.SearchBarItemActive);
            }else if(this.state.checkInActive){
                checkInClasses.push(classes.SearchBarItemActive);
            }else if(this.state.checkOutActive){
                checkOutClasses.push(classes.SearchBarItemActive);
            }else{
                guestsClasses.push(classes.SearchBarItemActive);
            }
        };

        const deleteIcons = {
            'location': '',
            'checkIn': '',
            'checkOut': '',
            'guests': ''
        };

        Object.keys(deleteIcons).map(key=>{
            let data;
            if(key === 'location'){
                data = this.props['location'];
            }else if(key === 'checkIn'){
                data = this.props['checkInDate'];
            }else if(key === 'checkOut'){
                data = this.props['checkOutDate'];
            }else{
                data = Object.keys(this.props.guests).map(key=>this.props.guests[key]).reduce((a,b)=>(a+b)) > 0;
            }
            return deleteIcons[key] = data && this.state[key+'Active'] ?
                    (<div onClick={()=>this.deleteInputHandler(key)} className={classes.DeleteInput}>
                        <div><TimesCircleIcon/></div>
                    </div>):null;
        });

        const checkInDateSummary = this.props.checkInDate ? this.getDateSummary('in') : 'Add Dates';
        const checkOutDateSummary = this.props.checkOutDate ? this.getDateSummary('out') : 'Add Dates';

        const separator1 = this.state.locationActive || this.state.checkInActive ? null : 
            (<div className={classes.SearchBarItemSeparator} id="separator1"></div>);
        const separator2 = this.state.checkInActive || this.state.checkOutActive ? null :
            (<div className={classes.SearchBarItemSeparator} id="separator2"></div>);
        const separator3 = this.state.checkOutActive || this.state.guestsActive ? null :
            (<div className={classes.SearchBarItemSeparator} id="separator3"></div>);

        const guestsPicker = this.state.guestsActive ?
            (<div className={classes.GuestsPicker}>
                <GuestsPicker
                    guests={this.props.guests}
                    addGuest={this.props.onGuestAdded}
                    removeGuest={this.props.onGuestRemoved}/>
            </div>):null;

        const datePicker = this.state.checkInActive || this.state.checkOutActive ?
            (<div className={classes.DatePicker}>
                <DatePicker 
                    checkInDate={this.props.checkInDate}
                    checkOutDate={this.props.checkOutDate}
                    dateClicked={this.datesClickedHandler}/>
            </div>):null;

        return (
            <>
            <div className={searchBarClasses.join(' ')} id="SearchBar">

                <div 
                    className={locationClasses.join(' ')} 
                    id="locationSearch"
                    onClick={()=>this.searchItemClickedHandler('locationSearch')}>
                    <label>
                        <div className={classes.LocationLabel}>
                            <div>Location</div>
                        </div>
                        <input 
                            className={[classes.SearchBarInput, classes.InputPlaceholder].join(' ')}
                            onChange={this.locationChangedHandler}
                            placeholder="Where are you going?" 
                            value={this.props.location}/>
                    </label>
                    {deleteIcons['location']} 
                </div>

                {separator1}

                <div 
                    className={checkInClasses.join(' ')}
                    id="checkInSearch"
                    onClick={()=>this.searchItemClickedHandler('checkInSearch')}>
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Check in
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {checkInDateSummary}
                        </div>
                    </label>
                    {deleteIcons['checkIn']}
                </div>

                {separator2}

                <div 
                    className={checkOutClasses.join(' ')} 
                    id="checkOutSearch"
                    onClick={()=>this.searchItemClickedHandler('checkOutSearch')}>
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Check out
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {checkOutDateSummary}
                        </div>
                    </label>
                    {deleteIcons['checkOut']}
                </div>

                {separator3}

                <div 
                    className={guestsClasses.join(' ')} 
                    onClick={()=>this.searchItemClickedHandler('guestsSearch')} 
                    id="guestsSearch">
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Guests
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {guestsSummary}
                        </div>
                        {deleteIcons['guests']}
                    </label>
                    <Link to={{
                        pathname: '/listings',
                        search: `?location=${this.props.location}`+
                            `&checkInDate=${this.props.checkInDate}`+
                            `&checkOutDate=${this.props.checkOutDate}`+
                            `&adults=${this.props.guests.adults}`+
                            `&children=${this.props.guests.children}`+
                            `&infants=${this.props.guests.infants}`
                    }}
                    style={{ textDecoration: 'none' }}>
                        <div className={classes.SearchButton}>
                            <div className={classes.SearchIcon}>
                                <div>
                                    <div>
                                        <SearchIcon/>
                                    </div>
                                </div>
                            </div>  
                            <div 
                                className={searchButtonLabelClasses} 
                                onClick={()=>this.props.onSubmitSearch(this.props.searchState)}>
                                {searchButtonLabel}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            {datePicker}
            {guestsPicker}
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        location: state.searchBar.location,
        checkInDate: state.searchBar.checkInDate,
        checkOutDate: state.searchBar.checkOutDate,
        guests: state.searchBar.guests,
        searchState: state.searchBar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLocationChange: (location)=>dispatch(actions.setLocation(location)),
        onCheckInDateChange: (id)=>dispatch(actions.setCheckInDate(id)),
        onCheckOutDateChange: (id)=>dispatch(actions.setCheckOutDate(id)),
        onGuestAdded: (guestType)=>dispatch(actions.addGuest(guestType)),
        onGuestRemoved: (guestType)=>dispatch(actions.removeGuest(guestType)),
        onGuestsCleared: ()=>dispatch(actions.clearGuests()),
        onSubmitSearch: (searchState)=>dispatch(actions.submitSearch(searchState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);