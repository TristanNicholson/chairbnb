import React, {useState, useEffect} from 'react';
import classes from './Dropdown.module.css';

let clickOutHandler = function(e) {
    const select = document.getElementsByClassName(classes.CustomSelect)[0];
    
    if(select && e){
        if (!select.contains(e.target)) {
            select.classList.remove(classes.Open);
        }
    }  
}
const Dropdown = (props) => {

    useEffect(()=>{
        document.getElementsByClassName(classes.CustomSelectWrapper)[0].addEventListener('click', function() {
            this.getElementsByClassName(classes.CustomSelect)[0].classList.toggle(classes.Open);
        })
    
    
        for (const option of document.getElementsByClassName(classes.CustomOption)) {
            option.addEventListener('click', function() {
                if (!this.classList.contains(classes.Selected)) {
                    this.parentNode.getElementsByClassName(classes.CustomOption+' '+classes.Selected)[0].classList.remove(classes.Selected);
                    this.classList.add(classes.Selected);
                    //document.getElementsByClassName(classes.CustomSelect__trigger)[0].children[0].textContent = this.textContent;
                    props.onSelect(this.textContent);
                }
            })
        }

            
        window.addEventListener('click', clickOutHandler);

        return () => {
            window.removeEventListener('click', clickOutHandler);
        }
    },[]);

    let options = [];
    for(let option of props.options){
        options.push(<span key={option} className={classes.CustomOption} data-value={option.toLowerCase()}>{option}</span>);
    }
    return (
        <div className={classes.CustomSelectWrapper}>
            <div className={classes.CustomSelect}>
                <div className={classes.CustomSelect__trigger}><span>{props.value}</span>
                    <div className={classes.Arrow}></div>
                </div>
                <div className={classes.CustomOptions}>
                    <span className={classes.CustomOption + ' ' + classes.Selected} data-value="">Select one</span>
                    {options}
                </div>
            </div>
        </div>
    );
}

export default Dropdown;