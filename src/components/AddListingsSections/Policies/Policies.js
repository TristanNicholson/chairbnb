import React, { Component } from 'react';
import classes from './Policies.module.css';
import DatePicker from '../../UI/DatePicker/DatePicker';
import CheckBox from '../../UI/Checkbox/Checkbox';
import DropDown from '../../UI/Dropdowns/Dropdown/Dropdown';
import DropDown2 from '../../UI/Dropdowns/Dropdown2/Dropdown';

class Policies extends Component {

    render(){
        console.log(this.props.cancellationPolicy);
        console.log(this.props.availableUntil);
        return (
            <div className={classes.Policies}>
                <div className={classes.SubTitle + ' ' + classes.FirstSubTitle}>How long may guests stay? (days)</div>
                <div className={classes.StayLength}>
                    <div>
                        <div className={classes.Label}>Min</div>
                        <input type="number" value={this.props.minStay} className={classes.Input} onChange={this.props.minStayHandler}/>
                    </div>
                    <div>
                        <div className={classes.Label}>Max</div>
                        <input type="number" value={this.props.maxStay} className={classes.Input} onChange={this.props.maxStayHandler}/>
                    </div>
                </div>
                <div className={classes.SubTitle}>What date is your home available until?</div>
                <div className={classes.DatePicker}>
                    <DatePicker
                        style={{border: '2px solid #008489', borderRadius: '5px'}}
                        checkInDate={this.props.availableUntil}
                        dateClicked={this.props.dateClicked}/>
                </div>
                <div className={classes.SubTitle}>Instant Book</div>
                <p>Guests will be able to book instantly without your confirmation</p>
                <CheckBox 
                    value={this.props.instantBook} 
                    toggleValue={this.props.toggleInstantBook}
                    label={'Allow'}/>
                <div className={classes.SubTitle}>House Rules</div>
                <p>Set some basic rules for your guests</p>
                <CheckBox 
                    value={this.props.houseRules.children} 
                    toggleValue={()=>this.props.toggleHouseRules('children')}
                    label={'Children allowed'}/>
                <CheckBox 
                    value={this.props.houseRules.smoking} 
                    toggleValue={()=>this.props.toggleHouseRules('smoking')}
                    label={'Smoking allowed'}/>
                <CheckBox 
                    value={this.props.houseRules.parties} 
                    toggleValue={()=>this.props.toggleHouseRules('parties')}
                    label={'Parties or events allowed'}/>
                <CheckBox 
                    value={this.props.houseRules.pets} 
                    toggleValue={()=>this.props.toggleHouseRules('pets')}
                    label={'Pets allowed'}/>
                <div className={classes.SubTitle}>Check In</div>
                <p>What is the earliest your guest can check in?</p>
                <DropDown
                    onSelect={this.props.checkInChange}
                    value={this.props.houseRules.checkIn}
                    options={['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']}/>
                <div className={classes.SubTitle}>Check Out</div>
                <p>What is the latest your guest can check out?</p>
                <DropDown2
                    onSelect={this.props.checkOutChange}
                    value={this.props.houseRules.checkOut}
                    options={['9:00 AM','10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']}/>
                <div className={classes.SubTitle}>Cancellation Policy</div>
                <p>Guests can cancel up to 3 days before check-in</p>
                <CheckBox 
                    value={this.props.cancellationPolicy} 
                    toggleValue={this.props.toggleCancellation}
                    label={'Allow'}/>
            </div>
        );
    }
};

export default Policies;