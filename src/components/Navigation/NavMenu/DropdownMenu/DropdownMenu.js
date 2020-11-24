import React, { Component } from 'react';
import classes from './DropdownMenu.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { NavLink } from 'react-router-dom';

class dropdownMenu extends Component{
    
    render(){
        let dropdownMenu = (
            <>
            <div className={classes.NavLinkDiv}>
                <div onClick={this.props.loginClicked}>Login</div>
            </div>
            <div className={classes.NavLinkDiv}>
                <div onClick={this.props.signUpClicked}>Sign up</div>
            </div>
            </>
        );
        if(this.props.authenticated){
            dropdownMenu = (
                <>
                <NavLink 
                    exact
                    to={'/bookings'}
                    activeClassName={classes.active}
                    className={classes.NavLink}>
                    <div onClick={this.signUpClickedHandler}>Bookings</div>
                </NavLink>
                <NavLink 
                    exact
                    to={'/hosting/listings'}
                    activeClassName={classes.active}
                    className={classes.NavLink}>
                    <div>Listings</div>
                </NavLink>
                <NavLink 
                    exact
                    to={'/'}
                    activeClassName={classes.active}
                    className={classes.NavLink}>
                    <div onClick={this.signUpClickedHandler}>Messages</div>
                </NavLink>
                <NavLink 
                    exact
                    to={'/'}
                    activeClassName={classes.active}
                    className={classes.NavLink}>
                    <div onClick={this.signUpClickedHandler}>Settings</div>
                </NavLink>
                <div className={classes.NavLinkDiv} onClick={this.props.onSignOut}>Logout</div>
                </>
            );
        }

        return (
            <>
            <div className={classes.DropdownMenu}>
                {dropdownMenu}
            </div> 
            </>
        );
    };  
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: ()=>dispatch(actions.signOut())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(dropdownMenu);