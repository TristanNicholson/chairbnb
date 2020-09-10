import React, {Component} from 'react';
import Listings from '../../components/Listings/Listings';
import classes from './ListingsPage.module.css';
import './ListingsPage.css';
import SearchSummary from '../../components/SearchSummary/SearchSummary';
import Paginator from '../../components/UI/Paginator/Paginator';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import mapboxgl from 'mapbox-gl';
import { renderToString } from 'react-dom/server';
import {Splide, SplideSlide} from '@splidejs/react-splide';

mapboxgl.accessToken = 'pk.eyJ1IjoidG5pY2hvbHNvbjEiLCJhIjoiY2tlYXlpeDZ1MDNqazJ1bGltZXN1OTg2MSJ9.Qag5hswCPVgnAt1sq3oSPw';

class ListingsPage extends Component {
    state = {
        map: null,
        size: { 
            width: document.body.clientWidth,
            height: document.body.clientHeight
        },
        page: 1
    };

    mapMarkers = [];

    resizeHandler = () => {
        this.setState({ size: {width: document.body.clientWidth, height: document.body.clientHeight} });
    }

    componentDidMount(){
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.mapCenter[0], this.props.mapCenter[1]]
        });
        map.addControl(new mapboxgl.NavigationControl());
        this.parseUrlParams();
        this.setState({map: map});
    };

    parseUrlParams(){
        const query = new URLSearchParams(this.props.location.search);

        // window.addEventListener('resize', this.resizeHandler);

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

    componentDidUpdate(prevProps, prevState){
        if(prevProps.mapCenter !== this.props.mapCenter){
            this.state.map.setCenter({lat: this.props.mapCenter[0], lng: this.props.mapCenter[1]});
            const kilometer =  0.00909090909;
            this.state.map.fitBounds([
                [this.props.mapCenter[1] - 10*kilometer, this.props.mapCenter[0] - 10*kilometer],
                [this.props.mapCenter[1] + 10*kilometer, this.props.mapCenter[0] + 10*kilometer]
            ]);
        }
        if(prevProps.listings !== this.props.listings){
            for(let marker of this.props.listings){
                let el = document.createElement('div');
                let price = document.createTextNode(`$${marker.price}`);
                el.appendChild(price);
                el.setAttribute('id',marker._id);
                el.className = classes.Marker;

                this.mapMarkers.push(new mapboxgl.Marker(el)
                .setLngLat(marker.address.location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25, className: classes.Popup}) // add popups
                .setHTML(renderToString(
                    <div>
                        <div className={classes.PopupImage} style={{backgroundImage: 'url("'+marker.images.thumbnailUrl+'")'}}>
                        </div>
                        <div className={classes.PopupSummary}>
                            <div className={classes.PopupReviews}>
                                <div className={classes.ReviewsIcon}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                                </div>
                                <div>{marker.ratings.overall/20.0} (50)</div>
                            </div>
                            <div className={classes.PopupName}>
                                <div>{marker.name}</div>
                                <div>{marker.roomType} · {marker.address.neighborhood ? marker.address.neighborhood : marker.address.city}</div>
                            </div>
                            <div className={classes.PopupPrice}>
                                <div><span>{'$'+marker.price}</span> /night</div>
                            </div>
                        </div>
                    </div>)))
                .addTo(this.state.map));        
            }  
        }
    }

    listingMouseEnterLeaveHandler = (id, enterLeave) => {
        if(this.mapMarkers.length !== 0){
            if(enterLeave === 'enter'){
                document.getElementById(id).style.backgroundColor = 'black';
                document.getElementById(id).style.color = 'white';
                document.getElementById(id).style.zIndex = '600';
                document.getElementById(id).style.border = '1px solid black';
            }else{
                document.getElementById(id).style.backgroundColor = 'white';
                document.getElementById(id).style.color = 'black'
                document.getElementById(id).style.zIndex = '0';
                document.getElementById(id).style.border = '1px solid rgb(221, 221, 221)';
            }
        }  
    };

    clickedPageHandler = async (page) => {
        let newUrlSearch;

        if(this.props.location.search.includes('pageOffset')){
            newUrlSearch = this.props.location.search.replace(/(?<=pageOffset=)[\d+.-]+/g, page);
        }else{
            newUrlSearch = this.props.location.search + '&pageOffset=' + (page);
        }

        await this.props.history.push({
            search: newUrlSearch
        });

        for(let marker of this.mapMarkers){
            marker.remove();
        }    
        this.mapMarkers = [];

        this.setState((prevState)=>{
            return {page: page};
        });

        this.parseUrlParams();
    }

    prevPageHandler = async () => {
        if(this.state.page !== 1){
            let newUrlSearch;

            if(this.props.location.search.includes('pageOffset')){
                newUrlSearch = this.props.location.search.replace(/(?<=pageOffset=)[\d+.-]+/g,this.state.page - 1);
            }else{
                newUrlSearch = this.props.location.search + '&pageOffset=' + (this.state.page - 1);
            }

            await this.props.history.push({
                search: newUrlSearch
            });

            for(let marker of this.mapMarkers){
                marker.remove();
            }    
            this.mapMarkers = [];

            this.setState((prevState)=>{
                return {page: prevState.page - 1};
            });

            this.parseUrlParams();
        }
    }

    nextPageHandler = async () => {
        let newUrlSearch;

        if(this.props.location.search.includes('pageOffset')){
            newUrlSearch = this.props.location.search.replace(/(?<=pageOffset=)[\d+.-]+/g,this.state.page+1);
        }else{
            newUrlSearch = this.props.location.search + '&pageOffset=' + (this.state.page + 1);
        }

        await this.props.history.push({
            search: newUrlSearch
        });

        for(let marker of this.mapMarkers){
            marker.remove();
        }    
        this.mapMarkers = [];

        this.setState((prevState)=>{
            return {page: prevState.page+1};
        });

        this.parseUrlParams();
    }

    render(){
        return (
            <div className={classes.ListingsPage}>
                <div className={classes.Listings}>
                    <SearchSummary 
                        location={this.props.place} 
                        listingsCount={this.props.count}
                        guests={this.props.guests}
                        checkInDate={this.props.checkInDate}
                        checkOutDate={this.props.checkOutDate}
                        ></SearchSummary>
                    <Listings mouseEnterLeave={this.listingMouseEnterLeaveHandler} listings={this.props.listings}/>
                    <Paginator
                        nextPage={this.nextPageHandler}
                        prevPage={this.prevPageHandler}
                        clickedPage={this.clickedPageHandler}
                        page={this.state.page}
                        totalPages={Math.ceil(this.props.count/20)}/>
                </div>
                <div className={classes.Map}>
                    <div>
                        <div ref={el => this.mapContainer = el} className={classes.MapContainer} />
                    </div>
                </div>  
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