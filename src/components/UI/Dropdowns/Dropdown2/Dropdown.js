import React, {useState, useEffect, Component} from 'react';
import classes from './Dropdown.module.css';

let clickOutHandler = function(e) {
    const select = document.getElementsByClassName(classes.CustomSelect)[0];
    if(select && e){
        if (!select.contains(e.target)) {
            select.classList.remove(classes.Open);
        }
    }
}

class Dropdown extends Component {

    componentDidMount(){
        document.getElementsByClassName(classes.CustomSelectWrapper)[0].addEventListener('click', function() {
            this.getElementsByClassName(classes.CustomSelect)[0].classList.toggle(classes.Open);
        })

        let select = this.props.onSelect;
    
        for (const option of document.getElementsByClassName(classes.CustomOption)) {
            option.addEventListener('click', function() {
                if (!this.classList.contains(classes.Selected)) {
                    if(document.getElementsByClassName(classes.CustomOption+' '+classes.Selected)[0]){
                        this.parentNode.getElementsByClassName(classes.CustomOption+' '+classes.Selected)[0].classList.remove(classes.Selected);
                    }
                    this.classList.add(classes.Selected);
                    //document.getElementsByClassName(classes.CustomSelect__trigger)[0].children[0].textContent = this.textContent;
                    select(this.textContent);
                }
            })
        }
            
        window.addEventListener('click', clickOutHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('click', clickOutHandler);
    }

    componentDidUpdate(){
        let select = this.props.onSelect;
        for (const option of document.getElementsByClassName(classes.CustomOption)) {
            option.addEventListener('click', function() {
                if (!this.classList.contains(classes.Selected)) {
                    if(document.getElementsByClassName(classes.CustomOption+' '+classes.Selected)[0]){
                        this.parentNode.getElementsByClassName(classes.CustomOption+' '+classes.Selected)[0].classList.remove(classes.Selected);
                    }
                    this.classList.add(classes.Selected);
                    //document.getElementsByClassName(classes.CustomSelect__trigger)[0].children[0].textContent = this.textContent;
                    select(this.textContent);
                }
            })
        }
    }
    render(){
        let options = [];
        for(let option of this.props.options){
            options.push(<span key={option} className={classes.CustomOption} data-value={option.toLowerCase()}>{option}</span>);
        }
        return (
            <div className={classes.CustomSelectWrapper}>
                <div className={classes.CustomSelect}>
                    <div className={classes.CustomSelect__trigger}><span>{this.props.value}</span>
                        <div className={classes.Arrow}></div>
                    </div>
                    <div className={classes.CustomOptions}>
                        <span className={classes.CustomOption + ' ' + classes.Selected} data-value="">Select One</span>
                        {options}
                    </div>
                </div>
            </div>
        );
    } 
}

export default Dropdown;