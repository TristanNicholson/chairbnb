import React, {Component} from 'react';
import Listings from '../../components/Listings/Listings';
import classes from './ListingsPage.module.css';
import './ListingsPage.css';
import SearchSummary from '../../components/SearchSummary/SearchSummary';
import Paginator from '../../components/UI/Paginator/Paginator';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import Map from '../Map/Map';
import MapIcon from '../../assets/icons/map-marked-alt-solid';

class ListingsPage extends Component {
    state = {
        map: null,
        mapMarkers: [],
        size: { 
            width: document.body.clientWidth,
            height: document.body.clientHeight
        },
        page: 1,
        showMap: false
    };

    resizeHandler = () => {
        console.log(this.state.size.width+' '+this.state.size.height);
        if(this.state.size.width < 900){
            this.setState({showMap : false});
        }else{
            this.setState({showMap : true});
        }
        this.setState({ size: {width: document.body.clientWidth, height: document.body.clientHeight} });
    }

    componentDidMount(){
        if(this.state.size.width < 900){
            this.setState({showMap : false});
        }else{
            this.setState({showMap : true});
        }
        this.parseUrlParams();
    };

    parseUrlParams(){
        const query = new URLSearchParams(this.props.location.search);
        window.addEventListener('resize', this.resizeHandler);

        let params = {};
        for (let param of query.entries()) {
            params[param[0]] = param[1];
        }
        let searchData = {
            location: params.location,
            checkInDate: params.checkInDate,
            checkOutDate: params.checkOutDate,
            guests: {
                adults: parseInt(params.adults),
                children: parseInt(params.children),
                infants: parseInt(params.infants)
            },
            pageOffset: parseInt(params.pageOffset)
        };

        this.props.onLocationChange(searchData.location);
        this.props.onCheckInDateChange(searchData.checkInDate);
        this.props.onCheckOutDateChange(searchData.checkOutDate);
        this.props.onSetGuests(searchData.guests);

        this.props.onSubmitSearch(searchData);

        const page = params.pageOffset ? params.pageOffset : 1;

        this.setState({ page: parseInt(page)});
    }

    listingMouseEnterLeaveHandler = (id, enterLeave) => {
        if(this.state.mapMarkers.length !== 0){
            const marker = document.getElementById(id);
            if(enterLeave === 'enter'){
                marker.style.backgroundColor = 'black';
                marker.style.color = 'white';
                marker.style.zIndex = '600';
                marker.style.border = '1px solid black';
            }else{
                marker.style.backgroundColor = 'white';
                marker.style.color = 'black'
                marker.style.zIndex = '0';
                marker.style.border = '1px solid rgb(221, 221, 221)';
            }
        }  
    };

    clickedPageHandler = async (page) => {
        let newUrlSearch;

        if(this.props.location.search.includes('pageOffset')){
            newUrlSearch = this.props.location.search.replace(/pageOffset=[\d+.-]+/g, page);
        }else{
            newUrlSearch = this.props.location.search + '&pageOffset=' + (page);
        }

        await this.props.history.push({
            search: newUrlSearch
        });

        for(let marker of this.state.mapMarkers){
            marker.remove();
        }    

        this.setState((prevState)=>{
            return {
                page: page,
                mapMarkers: []
            };
        });

        this.parseUrlParams();
        document.getElementById('listings').scrollTop = 0;
    }

    prevPageHandler = async () => {
        if(this.state.page !== 1){
            let newUrlSearch;

            if(this.props.location.search.includes('pageOffset')){
                newUrlSearch = this.props.location.search.replace(/pageOffset=[\d+.-]+/g,this.state.page - 1);
            }else{
                newUrlSearch = this.props.location.search + '&pageOffset=' + (this.state.page - 1);
            }

            await this.props.history.push({
                search: newUrlSearch
            });

            for(let marker of this.state.mapMarkers){
                marker.remove();
            }    

            this.setState((prevState)=>{
                return {
                    page: prevState.page - 1,
                    mapMarkers: []
                };
            });

            this.parseUrlParams();
            document.getElementById('listings').scrollTop = 0;
        }
    }

    nextPageHandler = async () => {
        let newUrlSearch;

        if(this.props.location.search.includes('pageOffset')){
            newUrlSearch = this.props.location.search.replace(/pageOffset=[\d+.-]+/g,this.state.page+1);
        }else{
            newUrlSearch = this.props.location.search + '&pageOffset=' + (this.state.page + 1);
        }

        await this.props.history.push({
            search: newUrlSearch
        });

        for(let marker of this.state.mapMarkers){
            marker.remove();
        }    

        this.setState((prevState)=>{
            return {
                page: prevState.page+1,
                mapMarkers: []
            };
        });

        this.parseUrlParams();
        document.getElementById('listings').scrollTop = 0;
    }

    setMapMarkersHandler = (mapMarkers) => {
        this.setState({mapMarkers: mapMarkers});
    };

    showMapHandler = () => {
        this.setState({showMap: true});
    };

    closeMapHandler = () => {
        this.setState({showMap: false});
    };

    render(){
        let mapButton = null;
        if(this.state.size.width < 900){
            mapButton = <div className={classes.MapButton} onClick={this.showMapHandler}><div><div><MapIcon/></div><div>Map</div></div></div>
        }

        return (
            <div className={classes.ListingsPage}>
                <div className={classes.Listings} id='listings'>
                    <SearchSummary 
                        location={this.props.place} 
                        listingsCount={this.props.count}
                        guests={this.props.guests}
                        checkInDate={this.props.checkInDate}
                        checkOutDate={this.props.checkOutDate}
                        ></SearchSummary>
                    {mapButton}
                    {this.props.listings.length === 0 ? 
                        <div className={classes.NoHomes}>No homes found</div>
                    :null}
                    <Listings 
                        mouseEnterLeave={this.listingMouseEnterLeaveHandler} 
                        listings={this.props.listings}/>
                    {this.props.listings.length > 0 ? 
                    <Paginator
                        nextPage={this.nextPageHandler}
                        prevPage={this.prevPageHandler}
                        clickedPage={this.clickedPageHandler}
                        page={this.state.page}
                        totalPages={Math.ceil(this.props.count/20)}/>:null}
                </div>
                <Map
                    width={this.state.size.width}
                    mapCenter={this.props.mapCenter}
                    listings={this.props.listings}
                    mapMarkers={this.state.mapMarkers}
                    setMapMarkers={this.setMapMarkersHandler}
                    showMap={this.state.showMap}
                    type='homes'>
                        <div 
                            className={classes.CloseMap}
                            onClick={this.closeMapHandler}>
                            <div>
                                <div className={classes.LeftX}></div>
                                <div className={classes.RightX}></div>
                            </div>   
                        </div>
                </Map>
                 
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        place: state.searchBar.refinedLocation,
        listings: state.searchBar.listings,
        count: state.searchBar.totalListings,
        mapCenter: state.map.center,
        guests: state.searchBar.guests,
        checkInDate: state.searchBar.checkInDate,
        checkOutDate: state.searchBar.checkOutDate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLocationChange: (location)=>dispatch(actions.setLocation(location)),
        onCheckInDateChange: (id)=>dispatch(actions.setCheckInDate(id)),
        onCheckOutDateChange: (id)=>dispatch(actions.setCheckOutDate(id)),
        onSubmitSearch: (searchState)=>dispatch(actions.submitSearch(searchState)),
        onSetGuests: (guests)=>dispatch(actions.setGuests(guests))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsPage);