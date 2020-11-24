import React, { Component } from 'react';
import classes from './ImageUpload.module.css';
import ImagesIcon from '../../../assets/icons/images-solid';

class ImageUpload extends Component {

    render(){
        return (
            <div className={classes.ImageUpload}>
                <div className={classes.Icon}><ImagesIcon/></div>
                <input
                    style={{display: 'none'}}
                    type='file'
                    onChange={this.props.change}
                    ref={fileInput => this.fileInput = fileInput}
                    multiple={true}
                    accept="image/x-png,image/gif,image/jpeg"/>
                <div className={classes.Button} onClick={()=>this.fileInput.click()}><div>Pick images</div></div>
            </div>
        );
    }    
}

export default ImageUpload;