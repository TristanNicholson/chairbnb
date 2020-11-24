import React, {Component} from 'react';
import classes from './Description.module.css';
import TextArea from '../../UI/TextArea/TextArea';

class Description extends Component {
    state = {
        show: false
    }

    showHandler = () => {
        this.setState({show: !this.state.show});
    }
    render(){
        let moreDetails;
        let showButton = <div className={classes.Show} onClick={this.showHandler}>Add more details (optional)</div>;
        if(this.state.show){
            showButton = <div className={classes.Show} onClick={this.showHandler}>Show less</div>;
            moreDetails = (
                <>
                <div className={classes.SubTitle}>
                    <h3>Your space (optional)</h3>
                </div>
                <p className={classes.SubDetails}>Describe the look and feel of your space. Point out any special design elements or areas, like a cozy reading corner or outdoor seating.</p>
                <TextArea
                    text={this.props.description.space}
                    tag={'space'}
                    changeInput={this.props.changeInput}
                    maxLength={500}/>
                <div className={classes.SubTitle}>
                    <h3>Your neighborhood (optional)</h3>
                </div>
                <p className={classes.SubDetails}>Share what makes your neighborhood special, such as the vibe, nearby cafes, a unique landmark, or a walkable destination.</p>
                <TextArea
                    text={this.props.description.neighborhood}
                    tag={'neighborhood'}
                    changeInput={this.props.changeInput}
                    maxLength={500}/>
                <div className={classes.SubTitle}>
                    <h3>Other things to note (optional)</h3>
                </div>
                <TextArea
                    text={this.props.description.notes}
                    tag={'notes'}
                    changeInput={this.props.changeInput}
                    maxLength={500}/>
                </>
            );
        }
        return (
            <div className={classes.Description}>
                <div className={classes.Title}>
                    <h3>Describe your place to guests</h3>
                </div>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <TextArea
                    text={this.props.description.summary}
                    tag={'summary'}
                    changeInput={this.props.changeInput}
                    maxLength={500}/>
                {moreDetails}
                {showButton}
            </div>
        );
    }
}

export default Description;