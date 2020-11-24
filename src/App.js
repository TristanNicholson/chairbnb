import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';
import ListingsPage from './containers/ListingsPage/ListingsPage';
import ManageListings from './containers/ManageListings/ManageListings';
import { Route, Switch } from 'react-router-dom';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import AddListing from './containers/AddListing/AddListing';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Bookings from './containers/Bookings/Bookings';

class App extends Component {

  render(){
    this.props.checkAuth();
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
    if(this.props.authenticating){
      app = null;
    }
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
    checkAuth: ()=>dispatch(actions.checkAuth())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
