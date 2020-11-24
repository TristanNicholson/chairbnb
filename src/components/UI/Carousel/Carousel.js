import React, {Component} from 'react';
import classes from './Carousel.module.css';
import ChevronLeft from '../../../assets/icons/chevron-left-solid';
import ChevronRight from '../../../assets/icons/chevron-right-solid';

class Carousel extends Component {
    state = {
        section: 0
    };

    componentDidMount(){
        
    }

    leftClickHandler = () => {
        if(this.state.section - 1 < 0){
            this.setState({ section: this.props.children.length - 1});
        }else{
            this.setState({ section: this.state.section - 1});
        }
    }

    rightClickHandler = (slides) => {
        if(this.state.section + 1 === this.props.children.length ){
            this.setState({ section: 0});
        }else{
            this.setState({ section: this.state.section + 1});
        }
    }

    render(){     
        let dots = [];

        for(let i=0; i < this.props.children.length; i++){
            if(i === this.state.section){
                dots.push(
                    <div key={i} className={classes.SelectedDot}></div>
                );
            }else{
                dots.push(
                    <div key={i} className={classes.Dot}></div>
                );
            }
        }

        let dotTranslate;

        if(this.state.section < 3){
            dotTranslate = 0;
        }else if(this.state.section >= this.props.children.length - 3){
            dotTranslate = ( this.props.children.length - 5 ) *20;
        }else{
            dotTranslate = ( this.state.section - 2 ) *20;
        }


        let slides = this.props.children.map((child,i)=>{
            return (
            <div key={child+i} className={classes.SlideWrapper} style={{width: this.props.width, height: this.props.height}}>
                {child}
            </div>);
        });

        return (
            <div className={classes.Carousel} style={{width: this.props.width, height: this.props.height}}>
                <div className={classes.Slides} style={{transform: 'translateX(-'+this.state.section*this.props.width.match(/^[0-9]+/gi)[0]+this.props.width.match(/[A-Za-z]+/gi)[0]+')'}}>
                    {slides}
                </div>
                <div className={classes.Dots}>
                    <div className={classes.DotsSlide} style={{transform: 'translateX(-'+dotTranslate+'px)'}}>
                        {dots}
                    </div>    
                </div>
                <div className={classes.Chevron}>
                    <div onClick={this.leftClickHandler}><ChevronLeft/></div>
                    <div onClick={this.rightClickHandler}><ChevronRight/></div>
                </div>
            </div>
        );
    }
}

export default Carousel;