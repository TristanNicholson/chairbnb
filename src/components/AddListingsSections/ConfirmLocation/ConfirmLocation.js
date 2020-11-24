import React, { Component } from 'react';
import classes from './ConfirmLocation.module.css';
import axios from 'axios';


class confirmLocation extends Component {
    state = {
        address: '',
        coordinates: []
    };
    async componentDidUpdate(prevProps){
        // if(this.props.address && prevProps.address && (this.props.address == prevProps.address)){
        //     let addressString = `${this.props.address.street} ${this.props.address.apt}, ${this.props.address.city}, ${this.props.address.state}, ${this.props.address.country}, ${this.props.address.zip}`;
        //     let data = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=pk.eyJ1IjoidG5pY2hvbHNvbjEiLCJhIjoiY2tlYXlpeDZ1MDNqazJ1bGltZXN1OTg2MSJ9.Qag5hswCPVgnAt1sq3oSPw`);
            
        //     for(let feature of data.data.features){
        //         if(feature.place_type[0] === 'address'){
        //             address = feature.place_name;
        //         }
        //     }
        //     this.props.addressChange
        // } 
    }

    render(){
        return (
            <div className={classes.ConfirmLocation}>
                <div className={classes.Title}>
                    <h3>Confirm Location</h3>
                </div>
                <div className={classes.SubTitle}>
                    <h3>{ this.props.cleansed ? 'Is this address correct?' : 'This is not a valid address'}</h3>
                </div>
                <div className={classes.Address}>
                    { this.props.cleansed}
                </div>
            </div>
        );
    }
}

export default confirmLocation;