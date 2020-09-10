import React from 'react';
import './App.css';
import Home from './containers/Home/Home';
import ListingsPage from './containers/ListingsPage/ListingsPage';
import { Route, Switch } from 'react-router-dom';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

function App() {
  return (
    <div className="App" id="App">
      <Toolbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/listings" component={ListingsPage}/>
      </Switch>
    </div>
  );
}

export default App;
