import React, {Component} from 'react';
import classes from './Map.module.css';
import mapboxgl from 'mapbox-gl';
import { renderToString } from 'react-dom/server';
import Reviews from '../../components/UI/Reviews/Reviews';

mapboxgl.accessToken = 'pk.eyJ1IjoidG5pY2hvbHNvbjEiLCJhIjoiY2tpMjdienZkMnk1dDJ6bjN1M29kcDlnYiJ9.dO_tZEI1wNsOqr99a84UUQ';

class Map extends Component{
    state = {
        map: null,
        mapLoaded: false
    }

    componentDidMount(){
        let center = [0,0];
        if(this.props.mapCenter){
            center = [this.props.mapCenter[1],this.props.mapCenter[0]];
        }

        if(center[0] < -180 || center[0] > 180 || center[1] < -90 || center[1] > 90){
            center = [0,0];
        }
        
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center[0], center[1]]
        });

        map.on('load',()=>(((self)=>{
            self.setState({mapLoaded: true});    
        })(this)));
            
        map.addControl(new mapboxgl.NavigationControl());

        if(this.props.type === 'homes'){
            const kilometer =  0.00909090909;
            map.fitBounds([
                [center[0] - 10*kilometer, center[1] - 10*kilometer],
                [center[0] + 10*kilometer, center[1] + 10*kilometer]
            ]);
        }else{
            const kilometer =  0.00909090909;
            map.fitBounds([
                [center[0] - 0.5*kilometer, center[1] - 1*kilometer],
                [center[0] + 0.5*kilometer, center[1] + 1*kilometer]
            ]);               
        }   

        this.setState({map: map});
    };

    componentDidUpdate(prevProps, prevState){
        if(prevProps.mapCenter !== this.props.mapCenter){
            let center = [0,0];
            if(this.props.mapCenter){
                center = [this.props.mapCenter[1], this.props.mapCenter[0]];
            }
            if(center[0] < -180 || center[0] > 180 || center[1] < -90 || center[1] > 90){
                center = [0,0];
            }
            this.state.map.setCenter({lng: center[0], lat: center[1]});
            if(this.props.type === 'homes'){
                const kilometer =  0.00909090909;
                this.state.map.fitBounds([
                    [center[0] - 10*kilometer, center[1] - 10*kilometer],
                    [center[0] + 10*kilometer, center[1] + 10*kilometer]
                ]);
            }else{
                const kilometer =  0.00909090909;
                this.state.map.fitBounds([
                    [center[0] - 0.5*kilometer, center[1] - 0.5*kilometer],
                    [center[0] + 0.5*kilometer, center[1] + 0.5*kilometer]
                ]);               
            }       
        }
        if(this.props.type === 'homes' && prevProps.listings !== this.props.listings){
            let mapMarkers=[];
            for(let marker of this.props.listings){
                let el = document.createElement('div');
                let price = document.createTextNode(`$${marker.price}`);
                el.appendChild(price);
                el.setAttribute('id',marker._id);
                el.className = classes.Marker;

                mapMarkers.push(new mapboxgl.Marker(el)
                .setLngLat(marker.address.location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25, className: classes.Popup}) // add popups
                .setHTML(renderToString(
                    <a
                    href={'/homes/'+marker._id}
                    target="_black">
                    <div>
                        <div className={classes.PopupImage} style={{backgroundImage: 'url("'+marker.images.thumbnailUrl+'")'}}>
                        </div>
                        <div className={classes.PopupSummary}> 
                            <div className={classes.PopupName}>
                                <Reviews listing={marker}/>
                                <div>{marker.name}</div>
                                <div>{marker.roomType} · {marker.address.neighborhood ? marker.address.neighborhood : marker.address.city}</div>
                            </div>
                            <div className={classes.PopupPrice}>
                                <div><span>{'$'+marker.price}</span> /night</div>
                            </div>
                        </div>
                    </div>
                    </a>
                )))
                .addTo(this.state.map));   
                this.props.setMapMarkers(mapMarkers); 
                if(this.state.map){
                    this.state.map.resize();
                }     
            }
        }

        if(this.props.type === 'home'){
            let el = document.createElement('div');
            el.className = classes.HomeMarker;

            new mapboxgl.Marker(el)
                .setLngLat(this.props.home.address.location.coordinates)
                .addTo(this.state.map);
        }

        if(this.state.mapLoaded && this.props.type === 'home' && (this.props.mapCenter !== prevProps.mapCenter || prevState.mapLoaded !== this.state.mapLoaded)){
            if(this.state.map){
                let center = [0,0];
                if(this.props.mapCenter){
                    center = [this.props.mapCenter[1], this.props.mapCenter[0]];
                }

                if(center[0] < -180 || center[0] > 180 || center[1] < -90 || center[1] > 90){
                    center = [0,0];
                }

                this.state.map.addSource("source_circle_500", {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [center[0], center[1]]
                            }
                        }]
                    }
                });
                
                this.state.map.addLayer({
                    "id": "circle500",
                    "type": "circle",
                    "source": "source_circle_500",
                    "paint": {
                        "circle-radius": {
                            stops: [
                                [0, 0],
                                [20, 10000]
                            ],
                            base: 2
                        },
                        "circle-color": "#5b94c6",
                        "circle-opacity": 0.6,
                        "circle-pitch-scale": "map"
                    }
                    
                }); 
            }
        }
    }

    render(){
        let style;
        if(this.props.showMap && this.props.width < 900 ){
           style = {width: this.props.width + 'px' };
        }else if(!this.props.showMap && this.props.width < 900 ){
            style = {width: this.props.width + 'px' , zIndex: '-2'};
        }else{
            style = {};
        }
        return (
            <div className={classes.Map} style={ style }>
                <div className={classes.MapDiv}>
                    <div ref={el => this.mapContainer = el} className={classes.MapContainer} style={ style }/>
                </div>
                {this.props.children}
            </div>  
        );
    }
}

export default Map;