import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import ManageListings from './containers/ManageListings/ManageListings';
import { connect } from 'react-redux';
import HomePage from './containers/HomePage/HomePage';
import Home from './containers/Home/Home';
import ListingsPage from './containers/ListingsPage/ListingsPage';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import AddListing from './containers/AddListing/AddListing';
import Bookings from './containers/Bookings/Bookings';
import * as actions from './store/actions/index';


class App extends Component {

  render(){
    this.props.onCheckAuth();
    let app = (
      <div className="App" id="App">
        <Toolbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/homes/:id" component={Home}/>
          <Route path="/homes" component={ListingsPage}/> 
          <Route exact path="/hosting/listings" component={ManageListings}/>
          <Route exact path="/hosting/listings/add/:id/:propertyType" component={AddListing}/>
          <Route exact path="/bookings" component={Bookings}/>
        </Switch>
      </div>
    );

    return app;
  }
}

const mapStateToProps = (state) => {
  return {
    authenticating: state.auth.authenticating
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: ()=>dispatch(actions.checkAuth())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
