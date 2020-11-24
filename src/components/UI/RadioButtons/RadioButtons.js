import React, {Component} from 'react';
import classes from './RadioButtons.module.css';
let INSTANCE_COUNT = 0;

class RadioButtons extends Component {
    state = {
        buttons: [],
        instanceCount: 0
    };

    clickHandler = (e,value) => {
        let parent = e.target.closest('div');
        parent.getElementsByTagName('input')[0].checked = true;
        this.props.onSelect(value);
    }
    componentDidMount(){
        INSTANCE_COUNT++;
        console.log(INSTANCE_COUNT);
        let buttons = [];
        for(let i=0; i < this.props.values.length; i++){
            
                
            if(this.props.values[i] === this.props.value){
                buttons.push((
                    <div key={this.props.values[i]} onClick={(e)=>this.clickHandler(e,this.props.values[i])}>
                    <input onChange={()=>{}} type="radio" id={"radio_value"+i+'_'+INSTANCE_COUNT} name="radio-group" checked/>
                    <label className={classes.Label} htmlFor={"radio_value"+i+'_'+INSTANCE_COUNT}>{this.props.values[i]}</label>
                    <label className={classes.Details} htmlFor={"radio_value"+i+'_'+INSTANCE_COUNT}>{this.props.details[i]}</label>
                    </div>
                    ));
            }else{
                buttons.push((
                    <div key={this.props.values[i]} onClick={(e)=>this.clickHandler(e,this.props.values[i])}>
                    <input onChange={()=>{}} type="radio" id={"radio_value"+i+'_'+INSTANCE_COUNT} name="radio-group"/>
                    <label className={classes.Label} htmlFor={"radio_value"+i+'_'+INSTANCE_COUNT}>{this.props.values[i]}</label>
                    <label className={classes.Details} htmlFor={"radio_value"+i+'_'+INSTANCE_COUNT}>{this.props.details[i]}</label>
                    </div>
                    ));
            }
            
            this.setState({buttons: buttons, instanceCount: INSTANCE_COUNT});
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value){
            let valueIndex = this.props.values.findIndex((el)=>el === this.props.value);
            if(valueIndex !== -1 ){
                document.getElementById('radio_value'+valueIndex+'_'+this.state.instanceCount).checked = true;
            }
        }
    }
    render(){    
        return (
            <div className={classes.RadioButtons}>     
                <form action="#">
                {this.state.buttons}
                </form>
            </div>
        );
    }
    
};

export default RadioButtons;