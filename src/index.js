import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import  {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import searchBarReducer from './store/reducers/searchBar';
import mapReducer from './store/reducers/map';
import currentHomeReducer from './store/reducers/home';
import authReducer from './store/reducers/auth';
import profileReducer from './store/reducers/profile';
import listingsReducer from './store/reducers/listings';
import bookingsReducer from './store/reducers/bookings';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  searchBar: searchBarReducer,
  map: mapReducer,
  currentHome: currentHomeReducer,
  auth: authReducer,
  profile: profileReducer,
  listings: listingsReducer,
  bookings: bookingsReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
