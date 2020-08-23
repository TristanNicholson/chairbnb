import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import SearchIcon from '../../../assets/icons/search-custom';
import TimesCircleIcon from '../../../assets/icons/cancel-custom';
import DatePicker from '../DatePicker/DatePicker';
import GuestsPicker from '../GuestsPicker/GuestsPicker';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/searchBar';
import Backdrop from './Backdrop/Backdrop';

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

    clickOutHandler = (event) => {
        let target = event.target;
        let inSearchBar = false;

        if(target === null){
            return;
        }
        while(target.id !== 'App'){
            if(target.id === 'SearchBar'){
                inSearchBar = true;
            }
            target = target.parentNode;
            if(target === null){
                return;
            }
        }
        if(!inSearchBar){
            this.setState({
                checkInActive: false,
                checkOutActive: false,
                locationActive: false,
                guestsActive: false,
                searchBarActive: false
            });
            this.resetSearchStyles('white');
            document.getElementsByClassName(classes.SearchBar)[0].style.backgroundColor = 'white';
        }
        
    }

    datesClickedHandler = (event) => {
        document.getElementById(event.target.id).style.backgroundColor = 'black';
        document.getElementById(event.target.id).style.color = 'white';
        document.getElementById(event.target.id).style.borderRadius = '100%';
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

    searchItemClickedHandler = (autoEvent) => {
        if(autoEvent === 'next'){
            autoEvent = this.state.checkInActive ? 'checkOutSearch' : 'guestsSearch';
        }

        let currentEvent= document.getElementById(autoEvent);
        document.getElementsByClassName(classes.SearchBar)[0].style.backgroundColor = 'rgb(247, 247, 247)';

        this.resetSearchStyles('rgb(247, 247, 247)');

        if(currentEvent.id === 'locationSearch'){
            document.getElementById('separator1').style.border = 'none';
            currentEvent.style.boxShadow = '3px 0px 20px -10px grey, 0px 5px 5px -5px grey';
            currentEvent.style.height = '67px';
            this.setState({locationActive: true, checkInActive: false, checkOutActive: false, guestsActive: false, searchBarActive: true});
        }else if(currentEvent.id === 'checkInSearch'){
            document.getElementById('separator1').style.border = 'none';
            document.getElementById('separator2').style.border = 'none';
            currentEvent.style.boxShadow = '3px 0px 20px -10px grey, -3px 0px 20px -10px grey, 0px 5px 5px -5px grey';
            currentEvent.style.height = '67px';
            this.setState({locationActive: false, checkInActive: true, checkOutActive: false, guestsActive: false, searchBarActive: true});
        }else if(currentEvent.id === 'checkOutSearch'){
            document.getElementById('separator2').style.border = 'none';
            document.getElementById('separator3').style.border = 'none';
            currentEvent.style.boxShadow = '3px 0px 20px -10px grey, -3px 0px 20px -10px grey, 0px 5px 5px -5px grey';
            currentEvent.style.height = '67px';
            this.setState({locationActive: false, checkInActive: false, checkOutActive: true, guestsActive: false, searchBarActive: true});
        }else{ 
            document.getElementById('separator3').style.border = 'none';
            currentEvent.style.boxShadow = '-3px 0px 20px -10px grey, 0px 5px 5px -5px grey';
            currentEvent.style.height = '67px';
            this.setState({locationActive: false, checkInActive: false, checkOutActive: false, guestsActive: true, searchBarActive: true});
        }
        currentEvent.style.zIndex = '500';
        currentEvent.style.backgroundColor = 'white';
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

    resetSearchStyles(color){
        let searchItems = [
            document.getElementById('locationSearch'),
            document.getElementById('checkInSearch'),
            document.getElementById('checkOutSearch'),
            document.getElementById('guestsSearch')
        ];

        let separators = [
            document.getElementById('separator1'),
            document.getElementById('separator2'),
            document.getElementById('separator3')
        ];
        
        for(let searchItem of searchItems){
            searchItem.style.backgroundColor = color;
            searchItem.style.boxShadow = 'none';
            searchItem.style.zIndex = '0';
            searchItem.style.height = '100%';
        }


        for(let separator of separators){
            separator.style.borderRight = '1px solid rgb(221, 221, 221)';
        }
    }

    render(){
        let guests = 'Add Guests';
        if(this.props.guests.adults > 0){
            let totalGuests = this.props.guests.adults + this.props.guests.children;
            guests = `${(totalGuests)} guest${totalGuests > 1 ? 's' : ''}`+
                `${this.props.guests.infants > 0 ? ', ' + this.props.guests.infants + ' infant' : ''}`+
                `${this.props.guests.infants > 1 ? 's' : ''}`;
            if(this.props.width < 950){
                guests = `${(totalGuests)} guest${totalGuests > 1 ? 's' : ''}`;
            }
        }
        return (
            <>
            <div className={classes.SearchBar} id="SearchBar">
                <div onClick={()=>this.searchItemClickedHandler('locationSearch')} id="locationSearch" className={`${classes.SearchBarItem} ${classes.SearchBarLocation}`} style={this.props.width > 800 && this.state.searchBarActive ? {width: '28%'} : {}}>
                    <label>
                        <div className={classes.LocationLabel}>
                            <div>Location</div>
                        </div>
                        <input 
                            className={`${classes.SearchBarInput} ${classes.InputPlaceholder}`}
                            onChange={this.locationChangedHandler}
                            placeholder="Where are you going?" 
                            value={this.props.location}/>
                    </label>
                    {this.props.location && this.state.locationActive ?
                        <div onClick={()=>this.deleteInputHandler('location')} className={classes.DeleteInput}>
                            <div><TimesCircleIcon/></div>
                        </div>
                    :null}  
                </div>
                <div className={classes.SearchBarItemSeparator} id="separator1">
                </div>
                <div onClick={()=>this.searchItemClickedHandler('checkInSearch')} id="checkInSearch" className={`${classes.SearchBarItem} ${classes.SearchBarDates}`}>
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Check in
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {this.props.checkInDate ?
                                `${MONTHS[(new Date(Date.parse(this.props.checkInDate))).getMonth()]}`+
                                ` ${(this.props.checkInDate.slice(8,10))}`:
                                "Add Dates"
                            }
                        </div>
                    </label>
                    {this.props.checkInDate && this.state.checkInActive ?
                        <div onClick={()=>this.deleteInputHandler('checkIn')} className={classes.DeleteInput}>
                            <div><TimesCircleIcon/></div>
                        </div>
                    :null}   
                </div>
                <div className={classes.SearchBarItemSeparator} id="separator2">
                </div>
                <div onClick={()=>this.searchItemClickedHandler('checkOutSearch')} id="checkOutSearch" className={`${classes.SearchBarItem} ${classes.SearchBarDates}`}>
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Check out
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {this.props.checkOutDate ?
                                `${MONTHS[(new Date(Date.parse(this.props.checkOutDate))).getMonth()]}`+
                                ` ${(this.props.checkOutDate.slice(8,10))}`:
                                "Add Dates"
                            }
                        </div>
                    </label>
                    {this.props.checkOutDate && this.state.checkOutActive ?
                        <div onClick={()=>this.deleteInputHandler('checkOut')} className={classes.DeleteInput}>
                            <div><TimesCircleIcon/></div>
                        </div>
                    :null}  
                </div>
                <div className={classes.SearchBarItemSeparator} id="separator3">
                </div>
                <div className={`${classes.SearchBarGuests}`} style={this.props.width > 800 && this.state.searchBarActive ? {width: '36%'} : {}} onClick={()=>this.searchItemClickedHandler('guestsSearch')} id="guestsSearch" >
                    <label>
                        <div className={classes.SearchBarLabel}>
                            Guests
                        </div>
                        <div className={classes.InputPlaceholder}>
                            {guests}
                        </div>
                        {Object.keys(this.props.guests).map(key=>this.props.guests[key]).reduce((a,b)=>(a+b)) > 0 && this.state.guestsActive ?
                        <div onClick={()=>this.deleteInputHandler('guests')} className={classes.DeleteInput}>
                            <div><TimesCircleIcon/></div>
                        </div>
                    :null} 
                    </label>
                    <div className={this.props.width > 800 && this.state.searchBarActive ? classes.SearchButton : ''}>
                        <div className={classes.SearchIcon}>
                            <div>
                                <SearchIcon/>
                            </div>
                        </div>
                        {this.props.width > 800 && this.state.searchBarActive ?
                            <div onClick={()=>this.deleteDateHandler('out')} className={classes.Search}>
                            Search
                            </div>
                        :null}
                    </div>
                </div>
            </div>
            {this.state.checkInActive || this.state.checkOutActive ?
                <div className={classes.DatePicker}>
                    <DatePicker 
                        checkInDate={this.props.checkInDate}
                        checkOutDate={this.props.checkOutDate}
                        dateClicked={this.datesClickedHandler}/>
                </div>
            :null}
            {this.state.guestsActive ?
                <div className={classes.GuestsPicker}>
                    <GuestsPicker
                        guests={this.props.guests}
                        addGuest={this.props.onGuestAdded}
                        removeGuest={this.props.onGuestRemoved}/>
                </div>
            :null}
            </>
        );
    }
};

const mapStateFromProps = (state) => {
    return {
        location: state.location,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        guests: state.guests
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLocationChange: (location)=>dispatch(actions.setLocation(location)),
        onCheckInDateChange: (id)=>dispatch(actions.setCheckInDate(id)),
        onCheckOutDateChange: (id)=>dispatch(actions.setCheckOutDate(id)),
        onGuestAdded: (guestType)=>dispatch(actions.addGuest(guestType)),
        onGuestRemoved: (guestType)=>dispatch(actions.removeGuest(guestType)),
        onGuestsCleared: ()=>dispatch(actions.clearGuests())
    }
}

export default connect(mapStateFromProps, mapDispatchToProps)(SearchBar);