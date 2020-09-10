import React, {Component} from 'react';
import classes from './MobileSearchBar.module.css';
import SearchIcon from '../../../../assets/icons/search-solid';
import DatePicker from '../../DatePicker/DatePicker';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/searchBar';
import MobileSearchModal from '../../MobileSearchModal/MobileSearchModal';
import GuestsPicker from '../../GuestsPicker/GuestsPicker';
import axios from 'axios';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class MobileSearchBar extends Component {
    state = {
        checkInActive: false,
        checkOutActive: false,
        guestsActive: false,
        modalActive: false
    };

    datesClickedHandler = (event) => {
        document.getElementById(event.target.id).style.backgroundColor = 'black';
        document.getElementById(event.target.id).style.color = 'white';
        document.getElementById(event.target.id).style.borderRadius = '100%';
        if(this.state.checkInActive){
            this.props.onCheckInDateChange(event.target.id);
            this.setState({checkInActive: false, checkOutActive: true});
        }else{
            this.props.onCheckOutDateChange(event.target.id);
            this.setState({checkOutActive: false, guestsActive: true});
        }
    };

    searchIconClickedHandler = () => {
        this.setState({modalActive: true, checkInActive: true});
    }

    inputKeyDownHandler = (event) => {
        if(event.key === 'Enter'){
            this.setState({modalActive: true, checkInActive: true});
            console.log('here');
            let search = this.props.location;
            if (navigator.geolocation && this.props.location === '') {
                navigator.geolocation.getCurrentPosition((geo)=>{
                    console.log(geo.coords.longitude + '%2C' + geo.coords.latitude);
                    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+geo.coords.longitude + '%2C' + geo.coords.latitude+".json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1598421268010&autocomplete=true&worldview=us&types=region%2Clocality%2Cdistrict%2Cplace%2Ccountry")
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                });
                console.log(search);
            }
            axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+search+".json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1598421268010&autocomplete=true&worldview=us&types=region%2Clocality%2Cdistrict%2Cplace%2Ccountry")
                .then((res)=>{
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    }

    inputChangedHandler = (event) => {
        this.props.onLocationChange(event.target.value);
    }

    exitModalHandler = () => {
        this.setState({checkInActive: false,
            checkOutActive: false,
            guestsActive: false,
            modalActive: false});
    }

    backButtonHandler = () => {
        const currentActive = Object.keys(this.state).find(key=>this.state[key] === true);
        const currentState = {...this.state};

        switch(currentActive){
            case('checkInActive'):
                currentState.checkInActive = false;
                currentState.modalActive = false;
                this.setState(currentState);
                break;
            case('checkOutActive'):
                currentState.checkOutActive = false;
                currentState.checkInActive = true;
                this.setState(currentState);
                break;
            case('guestsActive'):
                currentState.guestsActive = false;
                currentState.checkOutActive = true;
                this.setState(currentState);
                break;
            default:
                break;
        }
    }

    nextButtonHandler = () => {
        const currentActive = Object.keys(this.state).find(key=>this.state[key] === true);
        const currentState = {...this.state};

        switch(currentActive){
            case('checkInActive'):
                currentState.checkInActive = false;
                currentState.checkOutActive = true;
                this.setState(currentState);
                break;
            case('checkOutActive'):
                currentState.checkOutActive = false;
                currentState.guestsActive = true;
                this.setState(currentState);
                break;
            case('guestsActive'):
                //Input submit search here
                break;
            default:
                break;
        }
    }

    getSearchSummary(){
        let dates = '';

        if(this.props.checkInDate){
            dates += `${MONTHS[(new Date(Date.parse(this.props.checkInDate))).getMonth()]}`+
            ` ${(this.props.checkInDate.slice(8,10))}`;
        }
        if(this.props.checkOutDate){
            dates += ` - ${MONTHS[(new Date(Date.parse(this.props.checkOutDate))).getMonth()]}`+
            ` ${(this.props.checkOutDate.slice(8,10))}`;
        }

        return dates;
    }

    render(){
        const mobileSearchSummary = this.getSearchSummary();
        const datePicker = this.state.checkInActive || this.state.checkOutActive ?
            <div className={classes.DatePicker}>
                <DatePicker 
                    isMobile
                    checkInDate={this.props.checkInDate}
                    checkOutDate={this.props.checkOutDate}
                    dateClicked={this.datesClickedHandler}/>
            </div> : null;
        const guestsPicker = this.state.guestsActive ?
            <div className={classes.GuestsPicker}>
                <GuestsPicker
                    guests={this.props.guests}
                    addGuest={this.props.onGuestAdded}
                    removeGuest={this.props.onGuestRemoved}/>
            </div> : null;
        const modal = this.state.modalActive ? 
            <MobileSearchModal 
                summary={mobileSearchSummary}
                activeCategory={Object.keys(this.state).find(key=>this.state[key] === true)}
                exitModal={this.exitModalHandler}
                goBack={this.backButtonHandler}
                goToNext={this.nextButtonHandler}>
                {datePicker}
                {guestsPicker}
            </MobileSearchModal> : null;

        return (
            <>
                <div 
                    className={classes.SearchBar}
                    style={this.state.modalActive ? {display: 'none'}: {display: 'flex'}}>
                    <div className={classes.SearchIcon} onClick={this.searchIconClickedHandler}>
                        <div>
                            <SearchIcon/>
                        </div>
                    </div>
                    <label>
                        <input 
                            className={[classes.SearchBarInput, classes.InputPlaceholder].join(' ')}
                            onChange={this.inputChangedHandler}
                            onKeyDown={this.inputKeyDownHandler}
                            placeholder="Where are you going?" 
                            value={this.props.location}/>
                    </label>
                </div>
                {modal}               
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.searchBar.location,
        checkInDate: state.searchBar.checkInDate,
        checkOutDate: state.searchBar.checkOutDate,
        guests: state.searchBar.guests
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileSearchBar);