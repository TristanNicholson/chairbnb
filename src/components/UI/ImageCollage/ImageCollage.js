import React, {Component} from 'react';
import classes from './ImageCollage.module.css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import Modal from '../../UI/Modal/Modal';
import Slider from 'react-slick';
import Carousel from '../Carousel/Carousel';

class ImageCollage extends Component {
    state = {
        showAllPhotos: false
    };

    componentDidMount(){
        let imageClasses = [classes.Image1,classes.Image2,classes.Image3,classes.Image4,classes.Image5];

        for(let i = 0; i < this.props.photos.length; i++){
            if(i < 5){
                document.getElementsByClassName(imageClasses[i])[0].style.backgroundImage = 'url("'+this.props.photos[i]+'")';
                document.getElementsByClassName(imageClasses[i])[0].style.display = 'inline-block';
            } 
        }
    }

    showAllPhotosHandler = () => {
        this.setState({showAllPhotos: !this.state.showAllPhotos});
    }

    modalCloseHandler = () => {
        this.setState({showAllPhotos: false});
    }

    render(){
        let sliderImages = this.props.photos.map((image,i)=>{
            return (
                <div className={classes.ImageDiv} style={{backgroundImage: 'url('+image+')'}}></div>
            );
        });

        let modal = (
            <div id={'Carousel'} className={classes.Carousel}>
                <Carousel
                    width='90vw'
                    height='70vh'>
                    {sliderImages}
                </Carousel>
            </div>      
        );

        return (
            <div className={classes.ImageCollage}>
                <div className={classes.MainImage}>
                    <div className={classes.Image1}></div>
                </div>
                <div className={classes.ImageGallery}>
                    <div className={classes.ImageGalleryTop}>
                        <div className={classes.Image2}></div>
                        <div className={classes.Image3}></div>
                    </div>
                    <div>
                        <div className={classes.Image4}></div>
                        <div className={classes.Image5}></div>
                    </div>
                </div>
                <div className={classes.ShowAll} onClick={this.showAllPhotosHandler}>
                    <div>See all photos</div>
                </div>
                <Modal
                    login={false}
                    signUp={false}
                    register={false}
                    addProgress={false}
                    photos={this.state.showAllPhotos}
                    modalClosed={this.modalCloseHandler}>
                        {modal}
                    </Modal>  
            </div>
        );
    } 
};

export default ImageCollage;