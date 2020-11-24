import React, { Component } from 'react';
import classes from './AddListing.module.css';
import PropertyType from '../../components/AddListingsSections/PropertyType/PropertyType';
import Accomodation from '../../components/AddListingsSections/Accommodation/Accommodation';
import ChevronLeft from '../../assets/icons/chevron-left-solid';
import Location from '../../components/AddListingsSections/Location/Location';
import Amenities from '../../components/AddListingsSections/Amenities/Amenities';
import Spaces from '../../components/AddListingsSections/Spaces/Spaces';
import Images from '../../components/AddListingsSections/Images/Images';
import Description from '../../components/AddListingsSections/Description/Description';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Policies from '../../components/AddListingsSections/Policies/Policies';
import Final from '../../components/AddListingsSections/Final/Final';
import ConfirmLocation from '../../components/AddListingsSections/ConfirmLocation/ConfirmLocation';
import Modal from '../../components/UI/Modal/Modal';

const AMENITY_LABELS = {
    'Essentials': 'essentials',
    'Wifi': 'wifi',
    'TV': 'tv',
    'Heat': 'heat',
    'Air conditioning': 'airConditioning',
    'Iron': 'iron',
    'Shampoo': 'shampoo',
    'Hair dryer': 'hairDryer',
    'Breakfast': 'breakfast',
    'Desk': 'desk',
    'Fireplace': 'fireplace',
    'Closet': 'closet',
    'Private entrance': 'privateEntrance'
};

const SAFETY_AMENITY_LABELS = {
    'Smoke detector': 'smokeDetector',
    'Carbon monoxide detector': 'carbonDetector',
    'First aid kit': 'firstAid',
    'Fire extinguisher': 'extinguisher',
    'Lock on bedroom door': 'bedroomLock'
}

const SPACE_LABELS = {
    'Private living room': 'privateLivingRoom',
    'Hot tub': 'hotTub',
    'Kitchen': 'kitchen',
    'Pool': 'pool',
    'Washer': 'washer',
    'Dryer': 'dryer',
    'Gym': 'gym',
    'Parking': 'parking'
}

const SECTION_LABELS = {
    'propertyType': '· Property Type',
    'accomodation': '· Accomodation',
    'location': '· Location',
    'images': '· Images',
    'description': '· Description',
    'policies': '· Policies',
    'final': '· Final section'
}
class AddListing extends Component {
    state = {
        section: 0,
        showModal: false,
        sectionNames: ['propertyType','accommodation', 'location', 'confirmLocation', 'amenities', 'spaces', 'images','description','policies','final'],
        listingInfo: {
            name: '',
            listingAvailable: false,
            propertyTypeCategory: 'Please select one',
            propertyType: 'Please select one',
            roomType: 'Entire place',
            guests: 0,
            bedrooms: 'Please select one',
            beds: 0,
            baths: 0,
            address: {
                cleansed: '',
                confirmed: false,
                country: '',
                street: '',
                apt: '',
                city: '',
                state: '',
                zip: ''
            },
            amenities: {
                essentials: false,
                wifi: false,
                tv: false,
                heat: false,
                airConditioning: false,
                iron: false,
                shampoo: false,
                hairDryer: false,
                breakfast: false,
                desk: false,
                fireplace: false,
                closet: false,
                privateEntrance: false
            },
            safetyAmenities: {
                smokeDetector: false,
                carbonDetector: false,
                firstAid: false,
                extinguisher: false,
                bedroomLock: false
            },
            spaces: {
                privateLivingRoom: false,
                hotTub: false,
                kitchen: false,
                pool: false,
                washer: false,
                dryer: false,
                gym: false,
                parking: false
            },
            images: [],
            description: {
                summary: '',
                space: '',
                access: '',
                notes: '',
                neighborhood: ''
            },
            minimumStay: 1,
            maximumStay: 7,
            availableUntil: '',
            instantBook: false,
            houseRules: {
                children: false,
                smoking: false,
                pets: false,
                parties: false,
                checkIn: '2:00 PM',
                checkOut: '11:00 AM'
            },
            cancellationPolicy: false,
            price: 0,
            serviceFee: 0
        }
    };
    componentDidMount(){
        let sectionUrl = this.props.location.pathname.split('/').splice(-1,1)[0];
        let listingId = this.props.location.pathname.split('/').splice(-2,1)[0];
        let section = this.state.sectionNames.findIndex((el)=>el === sectionUrl);
        if(section !== -1){
            this.setState({section: section});
        }
        if(!this.props.authenticated){
            this.props.history.push('/');
        }
        this.props.onSetListing(listingId);
    };

    componentDidUpdate(prevProps){
        if(!this.props.authenticated){
            this.props.history.push('/');
        }
        if(this.props.listing !== prevProps.listing){
            this.mapPropsToState();
        }
    }

    mapPropsToState = () =>{
        let listingInfo = {
            ...this.state.listingInfo, 
            address: {...this.state.listingInfo.address},
            amenities: {...this.state.listingInfo.amenities},
            safetyAmenities: {...this.state.listingInfo.safetyAmenities},
            spaces: {...this.state.listingInfo.spaces},
            description: {...this.state.listingInfo.description},
            houseRules: {...this.state.listingInfo.houseRules},
            images: [...this.state.listingInfo.images]
        };
        
        if(this.props.listing.propertyType){
            listingInfo.propertyType = this.props.listing.propertyType;
        }
        if(this.props.listing.roomType){
            listingInfo.roomType = this.props.listing.roomType;
        }
        if(this.props.listing.accommodates){
            listingInfo.guests = this.props.listing.accommodates;
        }
        if(this.props.listing.bedrooms){
            let bedrooms = 'Studio';
            if(this.props.listing.bedrooms === 1 ){
                bedrooms = '1 bedroom';
            }
            if(this.props.listing.bedrooms > 1){
                bedrooms = this.props.listing.bedrooms + ' bedrooms';
            }
            listingInfo.bedrooms = bedrooms;
        }
        if(this.props.listing.beds){
            console.log(this.props.listing.beds);
            listingInfo.beds = this.props.listing.beds;
        }
        if(this.props.listing.bathrooms){
            listingInfo.baths = this.props.listing.bathrooms;
        }

        if(this.props.listing.address && this.props.listing.address.country){
            listingInfo.address.country = this.props.listing.address.country;
        }
        if(this.props.listing.address && this.props.listing.address.street){
            listingInfo.address.street = this.props.listing.address.street;
        }
        if(this.props.listing.address && this.props.listing.address.apt){
            listingInfo.address.apt = this.props.listing.address.apt;
        }
        if(this.props.listing.address && this.props.listing.address.city){
            listingInfo.address.city = this.props.listing.address.city;
        }
        if(this.props.listing.address && this.props.listing.address.state){
            listingInfo.address.state = this.props.listing.address.state;
        }
        if(this.props.listing.address && this.props.listing.address.zip){
            listingInfo.address.zip = this.props.listing.address.zip;
        }

        if(this.props.listing.amenities){   
            for(let amenity of this.props.listing.amenities){
                if(AMENITY_LABELS[amenity]){
                    listingInfo.amenities[AMENITY_LABELS[amenity]] = true;
                }
            }
        }
        if(this.props.listing.safetyAmenities){   
            for(let amenity of this.props.listing.safetyAmenities){
                if(SAFETY_AMENITY_LABELS[amenity]){
                    listingInfo.safetyAmenities[SAFETY_AMENITY_LABELS[amenity]] = true;
                }
            }
        }
        if(this.props.listing.spaces){   
            for(let amenity of this.props.listing.spaces){

                if(SPACE_LABELS[amenity]){
                    listingInfo.spaces[SPACE_LABELS[amenity]] = true;
                }
            }
        }
        if(this.props.listing.description){
            listingInfo.description.neighborhood = this.props.listing.neighborhoodOverview;
            listingInfo.description.summary = this.props.listing.description.summary;
            listingInfo.description.space = this.props.listing.description.space;
            listingInfo.description.notes = this.props.listing.description.notes;
        }
        if(this.props.listing.maximumStay){
            listingInfo.maximumStay = this.props.listing.maximumStay;
        }
        if(this.props.listing.minimumStay){
            listingInfo.minimumStay = this.props.listing.minimumStay;
        }
        if(this.props.listing.availableUntil){
            listingInfo.availableUntil = this.props.listing.availableUntil.split('T')[0];
        }
        if(this.props.listing.instantBook){
            listingInfo.instantBook = this.props.listing.instantBook;
        }
        if(this.props.listing.thingsToKnow && this.props.listing.thingsToKnow.houseRules){
            listingInfo.houseRules.children = this.props.listing.thingsToKnow.houseRules.children;
            listingInfo.houseRules.smoking = this.props.listing.thingsToKnow.houseRules.smoking;
            listingInfo.houseRules.parties = this.props.listing.thingsToKnow.houseRules.parties;
            listingInfo.houseRules.pets = this.props.listing.thingsToKnow.houseRules.pets;
        }
        if(this.props.listing.thingsToKnow){
            listingInfo.houseRules.checkIn = this.props.listing.thingsToKnow.checkIn;
            listingInfo.houseRules.checkOut = this.props.listing.thingsToKnow.checkOut;
        }
        if(this.props.listing.thingsToKnow && this.props.listing.thingsToKnow.cancellationPolicy){
            if(this.props.listing.thingsToKnow.cancellationPolicy === 'Within 3 days'){
                listingInfo.cancellationPolicy = true;
            }else{
                listingInfo.cancellationPolicy = false;
            }
        }

        if(this.props.listing.name){
            listingInfo.name = this.props.listing.name;
        }

        if(this.props.listing.serviceFee){
            listingInfo.serviceFee = this.props.listing.serviceFee;
        }

        if(this.props.listing.price){
            listingInfo.price = this.props.listing.price;
        }

        if(this.props.listing.address){
            if(this.props.listing.address.confirmed !== undefined){
                listingInfo.address.confirmed = this.props.listing.address.confirmed;
            }
            listingInfo.address.cleansed = this.props.listing.address.cleansed;
        }
        this.setState({listingInfo: listingInfo});
    };

    toggleAmenitiesHandler = (value) => {
        switch(value){
            case('essentials'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, essentials: !this.state.listingInfo.amenities.essentials}}}); break;
            case('wifi'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, wifi: !this.state.listingInfo.amenities.wifi}}}); break;
            case('tv'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, tv: !this.state.listingInfo.amenities.tv}}}); break;
            case('heat'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, heat: !this.state.listingInfo.amenities.heat}}}); break;
            case('airConditioning'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, airConditioning: !this.state.listingInfo.amenities.airConditioning}}}); break;
            case('iron'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, iron: !this.state.listingInfo.amenities.iron}}}); break;
            case('shampoo'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, shampoo: !this.state.listingInfo.amenities.shampoo}}}); break;
            case('hairDryer'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, hairDryer: !this.state.listingInfo.amenities.hairDryer}}}); break;
            case('breakfast'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, breakfast: !this.state.listingInfo.amenities.breakfast}}}); break;
            case('desk'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, desk: !this.state.listingInfo.amenities.desk}}}); break;
            case('fireplace'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, fireplace: !this.state.listingInfo.amenities.fireplace}}}); break;
            case('closet'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, closet: !this.state.listingInfo.amenities.closet}}}); break;
            case('privateEntrance'):
                this.setState({listingInfo: { ...this.state.listingInfo, amenities: {...this.state.listingInfo.amenities, privateEntrance: !this.state.listingInfo.amenities.privateEntrance}}}); break;
            case('smokeDetector'):
                this.setState({listingInfo: { ...this.state.listingInfo, safetyAmenities: {...this.state.listingInfo.safetyAmenities, smokeDetector: !this.state.listingInfo.safetyAmenities.smokeDetector}}}); break;
            case('carbonDetector'):
                this.setState({listingInfo: { ...this.state.listingInfo, safetyAmenities: {...this.state.listingInfo.safetyAmenities, carbonDetector: !this.state.listingInfo.safetyAmenities.carbonDetector}}}); break;
            case('firstAid'):
                this.setState({listingInfo: { ...this.state.listingInfo, safetyAmenities: {...this.state.listingInfo.safetyAmenities, firstAid: !this.state.listingInfo.safetyAmenities.firstAid}}}); break;
            case('extinguisher'):
                this.setState({listingInfo: { ...this.state.listingInfo, safetyAmenities: {...this.state.listingInfo.safetyAmenities, extinguisher: !this.state.listingInfo.safetyAmenities.extinguisher}}}); break;
            case('bedroomLock'):
                this.setState({listingInfo: { ...this.state.listingInfo, safetyAmenities: {...this.state.listingInfo.safetyAmenities, bedroomLock: !this.state.listingInfo.safetyAmenities.bedroomLock}}}); break;
            default:
                break;
        }
        return;
    };

    toggleSpacesHandler = (value) => {
        switch(value){
            case('privateLivingRoom'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, privateLivingRoom: !this.state.listingInfo.spaces.privateLivingRoom}}}); break;
            case('hotTub'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, hotTub: !this.state.listingInfo.spaces.hotTub}}}); break;
            case('kitchen'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, kitchen: !this.state.listingInfo.spaces.kitchen}}}); break;
            case('pool'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, pool: !this.state.listingInfo.spaces.pool}}}); break;
            case('washer'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, washer: !this.state.listingInfo.spaces.washer}}}); break;
            case('dryer'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, dryer: !this.state.listingInfo.spaces.dryer}}}); break;
            case('gym'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, gym: !this.state.listingInfo.spaces.gym}}}); break;
            case('parking'):
                this.setState({listingInfo: { ...this.state.listingInfo, spaces: {...this.state.listingInfo.spaces, parking: !this.state.listingInfo.spaces.parking}}}); break;
            default:
                break;
        }
        return;
    };

    countryChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, country: e.target.value, confirmed: false}}});
    }

    streetChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, street: e.target.value, confirmed: false}}});
    }

    aptChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, apt: e.target.value, confirmed: false}}});
    }

    cityChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, city: e.target.value, confirmed: false}}});
    }

    stateChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, state: e.target.value, confirmed: false}}});
    }

    zipChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, address: {...this.state.listingInfo.address, zip: e.target.value, confirmed: false}}});
    }

    nextHandler = () => {
        if(this.state.section === 3){
            this.state.listingInfo.address.confirmed = true;
        }
        this.props.onInitSaveListing();
        this.props.onSaveListing(this.props.listingId, this.state.listingInfo);

        let newPathname = this.props.location.pathname.split('/').slice(0,-1);
        newPathname.push(this.state.sectionNames[this.state.section+1]);
        this.setState((prevState)=>{
            return { section: prevState.section + 1 };
        }); 
        this.props.history.replace(newPathname.join('/'));
        if(this.state.section === 3){
            this.setState({listingInfo: {...this.state.listingInfo, address:{...this.state.listingInfo.address, confirmed: true }}});
        }
    }


    backHandler = () => {
        this.props.onInitSaveListing();
        this.props.onSaveListing(this.props.listingId, this.state.listingInfo);

        let newPathname = this.props.location.pathname.split('/').slice(0,-1);
        newPathname.push(this.state.sectionNames[this.state.section-1]);
        this.setState((prevState)=>{
            return { section: prevState.section - 1 };
        });
        this.props.history.replace(newPathname.join('/'));
    }

    finishHandler = async () => { 
        let listing = {...this.state.listingInfo, address: {...this.state.listingInfo.address}, amenities: {...this.state.listingInfo.amenities}, 
            description: {...this.state.listingInfo.description}, houseRules: {...this.state.listingInfo.houseRules}, 
            safetyAmenities: {...this.state.listingInfo.safetyAmenities}, spaces: {...this.state.listingInfo.spaces}};
        if(this.state.listingInfo.name && this.props.listing.sectionProgress.propertyType &&
            this.props.listing.sectionProgress.accomodation && this.props.listing.sectionProgress.address &&
            this.props.listing.sectionProgress.images && this.props.listing.sectionProgress.description &&
            this.props.listing.sectionProgress.policies && this.state.listingInfo.name && this.state.listingInfo.price){
            this.setState({listingInfo: {...this.state.listingInfo, listingAvailable: true}});
            listing.listingAvailable = true;
            //this.props.history.push('/homes/'+this.props.listingId);
            this.props.onInitSaveListing();
            await this.props.onSaveListing(this.props.listingId, listing);
            this.props.history.push('/hosting/listings');
        }else{
            this.setState({showModal: true});
            this.props.onInitSaveListing();
            this.props.onSaveListing(this.props.listingId, listing);
        }
        
    }

    selectCategoryHandler = (value) => {
        this.setState({listingInfo: {...this.state.listingInfo, propertyTypeCategory: value}});
    };
    selectTypeHandler = (value) => {
        this.setState({listingInfo: {...this.state.listingInfo, propertyType: value }});
    };
    selectRoomTypeHandler = (value) => {
        this.setState({listingInfo: {...this.state.listingInfo, roomType: value}});
    };

    selectBedroomsHandler = (value) => {
        this.setState({listingInfo: {...this.state.listingInfo, bedrooms: value}});
    };

    addBedHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, beds: prevState.listingInfo.beds + 1}}
        });
    };

    removeBedHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, beds: prevState.listingInfo.beds - 1}}
        });
    };

    addGuestHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, guests: prevState.listingInfo.guests + 1}}
        });
    };

    removeGuestHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, guests: prevState.listingInfo.guests - 1}}
        });
    };

    addBathHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, baths: prevState.listingInfo.baths + 0.5}}
        });
    };

    removeBathHandler = () => {
        this.setState((prevState)=>{
            return {listingInfo: {...prevState.listingInfo, baths: prevState.listingInfo.baths - 0.5}}
        });
    };

    addImageHandler = (event) => {
        console.log(event.target.files);
        let images = [];
        for(let image of event.target.files){
            if( image.size / 1024 / 1024 < 5 ){
                images.push(image);
            }
        }
        for(let image of images){
            //this.props.onUploadingImage();
            this.props.onUploadImage(this.props.listingId, image);
        }
        
    };

    deleteImageHandler = (listingId, image) => {
        this.props.onDeleteImage(listingId, image);
    };

    descriptionChangeHandler = (e, type) => {
        if(e.target.value.length <= 500){
            this.setState({listingInfo: {...this.state.listingInfo, description: {...this.state.listingInfo.description, [type]: e.target.value}}});
        }
    }

    dateClickedHandler = (event) => {
        this.setState({ listingInfo: { ...this.state.listingInfo, availableUntil: event.target.id }});
    };

    minStayHandler = (e) => {
        if( e.target.value <= this.state.listingInfo.maximumStay && e.target.value > 1 ){
            this.setState({ listingInfo: { ...this.state.listingInfo, minimumStay: Math.round(e.target.value) } });
        }
    }

    maxStayHandler = (e) => {
        if( e.target.value >= this.state.listingInfo.minimumStay ){
            this.setState({ listingInfo: { ...this.state.listingInfo, maximumStay: Math.round(e.target.value) } })
        }
    }

    toggleInstantBookHandler = () => {
        this.setState({listingInfo : {...this.state.listingInfo, instantBook: !this.state.listingInfo.instantBook}});
    }

    toggleHouseRulesHandler = (type) => {
        this.setState({listingInfo: {...this.state.listingInfo, houseRules: {...this.state.listingInfo.houseRules, [type]: !this.state.listingInfo.houseRules[type]}}});
    }

    checkInChangeHandler = (value) => {
        console.log(value);
        this.setState({listingInfo: {...this.state.listingInfo, houseRules: {...this.state.listingInfo.houseRules, checkIn: value }}});
    }

    checkOutChangeHandler = (value) => {
        console.log(value);
        this.setState({listingInfo: {...this.state.listingInfo, houseRules: {...this.state.listingInfo.houseRules, checkOut: value }}});
    }

    toggleCancellationHandler = () => {
        this.setState({listingInfo: {...this.state.listingInfo, cancellationPolicy: !this.state.listingInfo.cancellationPolicy}});
    }

    nameChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, name: e.target.value}});
    }

    priceChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, price: Math.round(e.target.value)}});
    }

    serviceFeeChangeHandler = (e) => {
        this.setState({listingInfo: {...this.state.listingInfo, serviceFee: Math.round(e.target.value)}});
    }

    modalCloseHandler = () => {
        this.setState({showModal: false});
    }
 
    render(){
        const infoSections = [
            <PropertyType 
                category={this.state.listingInfo.propertyTypeCategory}
                type={this.state.listingInfo.propertyType}
                roomType={this.state.listingInfo.roomType}
                categorySelect={this.selectCategoryHandler}
                typeSelect={this.selectTypeHandler}
                roomTypeSelect={this.selectRoomTypeHandler}/>, 
            <Accomodation
                bedrooms={this.state.listingInfo.bedrooms}
                beds={this.state.listingInfo.beds}
                guests={this.state.listingInfo.guests}
                selectBedrooms={this.selectBedroomsHandler}
                addBed={this.addBedHandler}
                removeBed={this.removeBedHandler}
                addGuest={this.addGuestHandler}
                removeGuest={this.removeGuestHandler}
                baths={this.state.listingInfo.baths}
                addBath={this.addBathHandler}
                removeBath={this.removeBathHandler}/>, 
            <Location
                country={this.state.listingInfo.address.country}
                street={this.state.listingInfo.address.street}
                apt={this.state.listingInfo.address.apt}
                city={this.state.listingInfo.address.city}
                state={this.state.listingInfo.address.state}
                zip={this.state.listingInfo.address.zip}
                countryChange={this.countryChangeHandler}
                streetChange={this.streetChangeHandler}
                aptChange={this.aptChangeHandler}
                cityChange={this.cityChangeHandler}
                stateChange={this.stateChangeHandler}
                zipChange={this.zipChangeHandler}/>,
            <ConfirmLocation
                cleansed={this.state.listingInfo.address.cleansed}/>,
            <Amenities
                toggleAmenities={this.toggleAmenitiesHandler}
                amenities={this.state.listingInfo.amenities}
                safetyAmenities={this.state.listingInfo.safetyAmenities}/>,
            <Spaces
                toggleSpaces={this.toggleSpacesHandler}
                spaces={this.state.listingInfo.spaces}/>,
            <Images
                deleteImage={this.deleteImageHandler}
                listingId={this.props.listingId}
                images={this.props.listing.images ? this.props.listing.images.gallery: null}
                addImage={this.addImageHandler}/>,
            <Description
                description={this.state.listingInfo.description}
                changeInput={this.descriptionChangeHandler}/>,
            <Policies
                availableUntil={this.state.listingInfo.availableUntil}
                dateClicked={this.dateClickedHandler}
                minStay={this.state.listingInfo.minimumStay}
                maxStay={this.state.listingInfo.maximumStay}
                minStayHandler={this.minStayHandler}
                maxStayHandler={this.maxStayHandler}
                instantBook={this.state.listingInfo.instantBook}
                toggleInstantBook={this.toggleInstantBookHandler}
                toggleHouseRules={this.toggleHouseRulesHandler}
                houseRules={this.state.listingInfo.houseRules}
                checkOutChange={this.checkOutChangeHandler}
                checkInChange={this.checkInChangeHandler}
                toggleCancellation={this.toggleCancellationHandler}
                cancellationPolicy={this.state.listingInfo.cancellationPolicy}/>,
            <Final
                name={this.state.listingInfo.name}
                nameChange={this.nameChangeHandler}
                price={this.state.listingInfo.price}
                serviceFee={this.state.listingInfo.serviceFee}
                priceChange={this.priceChangeHandler}
                serviceFeeChange={this.serviceFeeChangeHandler}/>
            ];

        let nextButton = <div className={classes.Next} onClick={this.nextHandler}>Next</div>;
        if(this.state.section === 3){
            nextButton = <div className={classes.Next} onClick={this.nextHandler}>Yes</div>
        }
        if(this.state.section === 3 && !this.state.listingInfo.address.cleansed){
            nextButton = null;
        }
        if(this.state.section === infoSections.length - 1){
            nextButton = <div className={classes.Next} onClick={this.finishHandler}>Publish</div>;
        }

        let backButton;

        if(this.state.section > 0){
            backButton = (
                <div className={classes.Back} onClick={this.backHandler}>
                    <div className={classes.Chevron}><ChevronLeft/></div>
                    <div>Back</div>
                </div>
            );
        }
        if(this.state.section === 3 && this.state.listingInfo.address.cleansed){
            backButton = (
                <div className={classes.Back} onClick={this.backHandler}>
                    <div className={classes.Chevron}><ChevronLeft/></div>
                    <div>No</div>
                </div>
            );
        }

        let innerModal;

        if(this.state.showModal){
            innerModal = (
                <div className={classes.Modal}>
                    <div  className={classes.ModalTitle}>You are missing required information in the following sections: </div>
                    {Object.keys(this.props.listing.sectionProgress).map((key)=>{
                        console.log(key+' '+this.props.listing.sectionProgress[key]);
                        if(!this.props.listing.sectionProgress[key] && key !== 'final'){
                            return (
                                <div className={classes.ModalSections}>{SECTION_LABELS[key]}</div>
                            );
                        }else{
                            return null;
                        }
                    })}
                    {!this.state.listingInfo.name ? 
                        <div className={classes.ModalSections}>· Final</div>
                    :null}
                </div>
            );
        }

        let modal;
        if(this.state.showModal){
            modal = (
                <Modal
                login={false}
                signUp={false}
                register={false}
                photos={false}
                addProgress={this.state.showModal}
                modalClosed={this.modalCloseHandler}>
                    {innerModal}
                </Modal>   
            );
        }

        return (
            <div className={classes.AddListing}>
                {modal}
                <div className={classes.AddInfo}>
                    <div className={classes.Info}>
                        <div>
                            <div className={classes.Header}>
                                <div className={classes.Title}>
                                    <h2>Tell us about your home</h2>
                                </div>
                            </div>
                            <div className={classes.InfoSections}>
                                {infoSections[this.state.section]}
                            </div>
                        </div>
                    </div>
                    <div className={classes.BackNext}>
                        {backButton}
                        {nextButton}
                    </div>
                </div>
                <div className={classes.Background}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uploaded: state.listings.uploaded,
        uploading: state.listings.uploading,
        authenticated: state.auth.authenticated,
        listing: state.listings.listing,
        saving: state.listings.saving,
        listingId: state.listings.listingId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadImage: (listingId, image)=>dispatch(actions.uploadImage(listingId,image)),
        onUploadingImage: ()=>dispatch(actions.uploadingImage()),
        onSetListing: (id)=>dispatch(actions.setListing(id)),
        onSaveListing: (id,data)=>dispatch(actions.saveListing(id,data)),
        onInitSaveListing: ()=>dispatch(actions.initSaveListing()),
        onDeleteImage: (listingId, image)=>dispatch(actions.deleteImage(listingId, image))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddListing);