import React, {Component} from 'react';
import classes from './MobileSearchBar.module.css';
import SearchIcon from '../../../../assets/icons/search-solid';
import DatePicker from '../../DatePicker/DatePicker';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/searchBar';

class MobileSearchBar extends Component {
    state = {
        checkInActive: false,
        checkOutActive: false,
        locationActive: false,
        guestsActive: false
    };

    datesClickedHandler = (event) => {
        console.log(event.target.id);
 
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

    render(){
        return (
            <>
                <div className={classes.SearchBar}>
                    <div className={classes.SearchIcon}>
                        <div>
                            <SearchIcon/>
                        </div>
                    </div>
                    <label>
                        <input 
                            className={`${classes.SearchBarInput} ${classes.InputPlaceholder}`}
                            onChange={this.props.onLocationChange}
                            placeholder="Where are you going?" 
                            value={this.props.location}/>
                    </label>
                </div>
                {this.state.checkInActive || this.state.checkOutActive ?
                <div className={classes.DatePicker}>
                    <DatePicker 
                        checkInDate={this.props.checkInDate}
                        checkOutDate={this.props.checkOutDate}
                        dateClicked={this.datesClickedHandler}/>
                </div>
            :null}
            </>
        );
    }
}

export default MobileSearchBar;