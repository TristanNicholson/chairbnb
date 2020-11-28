import React, {Component} from 'react';
import classes from './Images.module.css';
import ImageUpload from '../../UI/ImageUpload/ImageUpload';
import TimesIcon from '../../../assets/icons/times-circle-solid';

class Images extends Component {
    state = {
        pictures: []
    };

    componentDidMount(){
        //this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures: this.state.pictures.concat(pictureFiles)
        });
    }
    
    render() {
        let images = [];
        if(this.props.images){
            for(let i=0 ; i < this.props.images.length ; i++){
                images.push(
                    <div 
                        className={classes.Image} 
                        style={{backgroundImage: "url("+this.props.images[i]+")"}}
                        key={i}
                        id={'images'+i}>
                            <div onClick={()=>this.props.deleteImage(this.props.listingId,this.props.images[i])} className={classes.Delete}><TimesIcon/></div>
                        </div>
                );
            }
        }
        
        return (
            <div className={classes.Images}>
                <div className={classes.Title}>
                    <h3>Liven up your listing with photos</h3>
                </div>
                <p>Take photos using a phone or camera. Upload at least fives photos to publish your listing—you can always add more or edit later.</p>
                <p>The max image size is 4mb. Try refreshing if your images do not appear.</p>
                <ImageUpload
                    change={this.props.addImage}
                    images={this.props.images}/>
                {images}
            </div>
        );
      }
}

export default Images;