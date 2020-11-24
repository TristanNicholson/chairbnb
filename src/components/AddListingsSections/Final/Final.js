import React, { Component } from 'react';
import classes from './Final.module.css';
import TextInput from '../../UI/TextInput/TextInput';

class Final extends Component {
    render(){
        return (
            <div className={classes.Final}>
                <div className={classes.Title}>
                    <h3>Let's add the finishing details</h3>
                </div>
                <p>Give your listing a title and an appropriate price</p>

                <div className={classes.InputLabel}>Listing title</div>
                <div className={classes.InputWhole}>
                    <TextInput value={this.props.name} change={this.props.nameChange}/>
                </div>
                

                <div className={classes.InputLabel}>Price per night</div>
                <input type="number" step="1" value={this.props.price} className={classes.Input} onChange={this.props.priceChange}/>
                
                <div className={classes.InputLabel}>Service fee (optional)</div>
                <p>Charge an addtional one-time fee for cleaning</p>
                <input type="number" step="1" value={this.props.serviceFee} className={classes.Input} onChange={this.props.serviceFeeChange}/>
            </div>
        );
    }
};

export default Final;