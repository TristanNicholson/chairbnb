import React, {Component} from 'react';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import MobileSearchBar from '../../components/UI/SearchBar/MobileSearchBar/MobileSearchBar';
import classes from './HomePage.module.css';

class Home extends Component {
    state = {
        location: '',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }

    componentDidMount(){
        window.addEventListener('resize', this.resizeHandler);
    }

    locationChangedHandler = (event) => {
        this.setState({location: event.target.value});
    }

    datePickedHandler = (event) => {
        console.log(event.target.id);
    }

    resizeHandler = () => {
        this.setState({width: document.body.clientWidth});
    }

    render(){
        let searchBar = <SearchBar width={this.state.width}/>;

        if(this.state.width <= 690){
            searchBar = <MobileSearchBar/>;
        }
        return (
            <div className={classes.Home}>
                {searchBar}
            </div>
        );
    }
}

export default Home;