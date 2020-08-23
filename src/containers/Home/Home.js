import React, {Component} from 'react';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import MobileSearchBar from '../../components/UI/SearchBar/MobileSearchBar/MobileSearchBar';
import classes from './Home.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Home extends Component {
    state = {
        location: '',
        width: document.body.clientWidth
    }

    componentDidMount(){
        window.addEventListener('resize', this.resizeHandler);
    }

    searchClickHandler = () => {

    }

    locationChangedHandler = (event) => {
        this.setState({location: event.target.value});
    }

    datePickedHandler = (event) => {
        console.log(event.target.id);
    }

    resizeHandler = () => {
        console.log(document.body.clientWidth);
        this.setState({width: document.body.clientWidth});
    }

    render(){
        let searchBar = <SearchBar width={this.state.width}/>;

        if(this.state.width <= 690){
            searchBar = <MobileSearchBar/>;
        }
        return (
            <div className={classes.Home}>
                <Toolbar/>
                {searchBar}
            </div>
        );
    }
}

export default Home;