import React, {Component} from 'react';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import MobileSearchBar from '../../components/UI/SearchBar/MobileSearchBar/MobileSearchBar';
import classes from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Tokyo from '../../assets/icons/destinations/tokyo';
import Amsterdam from '../../assets/icons/destinations/amsterdam';
import NewYork from '../../assets/icons/destinations/new-york';
import London from '../../assets/icons/destinations/london';

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
                <div className={classes.PopularDestinationsLabel}>
                    Popular Destinations
                </div>
                <div className={classes.DestinationSeparator}></div>
                <div className={classes.PopularDestinations}>
                <Link 
                    to={{
                        pathname: '/homes',
                        search: `?location=${'Amsterdam, Netherlands'}`+
                            `&checkInDate=${''}`+
                            `&checkOutDate=${''}`+
                            `&adults=${'1'}`+
                            `&children=${'0'}`+
                            `&infants=${'0'}`
                    }}
                    style={{ textDecoration: 'none'}}>
                        <div className={classes.PopularDestination}>
                            <div className={classes.Name}>
                                <div className={classes.DestinationName}>Amsterdam</div>
                                <div className={classes.DestinationIcon}><Amsterdam/></div>
                            </div>
                            <div className={classes.Image} style={{backgroundImage: 'url(https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/amsterdam.jpg)'}}>

                            </div>
                        </div>
                </Link>
                <Link 
                    to={{
                        pathname: '/homes',
                        search: `?location=${'London, United Kingdom'}`+
                            `&checkInDate=${''}`+
                            `&checkOutDate=${''}`+
                            `&adults=${'1'}`+
                            `&children=${'0'}`+
                            `&infants=${'0'}`
                    }}
                    style={{ textDecoration: 'none' }}>
                        <div className={classes.PopularDestination}>
                            <div className={classes.Name}>
                                <div className={classes.DestinationName}>London</div>
                                <div className={classes.DestinationIcon}><London/></div>
                            </div>
                            <div className={classes.Image} style={{backgroundImage: 'url(https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/london.jpg)'}}>

                            </div>
                        </div>
                    </Link>
                    <Link 
                    to={{
                        pathname: '/homes',
                        search: `?location=${'New York City, USA'}`+
                            `&checkInDate=${''}`+
                            `&checkOutDate=${''}`+
                            `&adults=${'1'}`+
                            `&children=${'0'}`+
                            `&infants=${'0'}`
                    }}
                    style={{ textDecoration: 'none' }}>
                        <div className={classes.PopularDestination}>
                            <div className={classes.Name}>
                                <div className={classes.DestinationName}>New York City</div>
                                <div className={classes.DestinationIcon}><NewYork/></div>
                            </div>
                            <div className={classes.Image} style={{backgroundImage: 'url(https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/new-york.jpg)'}}>

                            </div>
                        </div>
                </Link>
                <Link 
                    to={{
                        pathname: '/homes',
                        search: `?location=${'Tokyo'}`+
                            `&checkInDate=${''}`+
                            `&checkOutDate=${''}`+
                            `&adults=${'1'}`+
                            `&children=${'0'}`+
                            `&infants=${'0'}`
                    }}
                    style={{ textDecoration: 'none' }}>
                        <div className={classes.PopularDestination}>
                            <div className={classes.Name}>
                                <div className={classes.DestinationName}>Tokyo</div>
                                <div className={classes.DestinationIcon}><Tokyo/></div>
                            </div>
                            <div className={classes.Image} style={{backgroundImage: 'url(https://chairbnb123.s3.us-east-2.amazonaws.com/images/utility/tokyo.jpg)'}}>

                            </div>
                        </div>
                </Link>
                </div>
            </div>
        );
    }
}

export default Home;