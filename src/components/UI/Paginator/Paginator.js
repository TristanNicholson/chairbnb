import React from 'react';
import classes from './Paginator.module.css';
import ChevronLeft from '../../../assets/icons/chevron-left-solid';
import ChevronRight from '../../../assets/icons/chevron-right-solid';

const paginator = props => {
    const leftArrow = props.page === 0 || props.totalPages < 2 ? null : <div 
        className={classes.Arrow}
        onClick={props.prevPage}>
            <div><ChevronLeft/>
            </div>
        </div>;
    const rightArrow = props.page !== props.totalPages && props.totalPages > 1 ?  <div 
        className={classes.Arrow}
        onClick={props.nextPage}>
            <div>
                <ChevronRight/>
            </div>
        </div>:null;
    const leftEllipsis = props.page > 4  && props.totalPages > 7 ? <div className={classes.Ellipsis} key="left"><div>···</div></div> : null;
    const rightEllipsis = props.page < props.totalPages - 3  && props.totalPages > 7 ? <div className={classes.Ellipsis} key="right"><div>···</div></div> : null;
    const firstPages = [];
    const middlePages = [];
    const lastPages = [];
    
    firstPages.push(<div 
        className={classes.Paginators} 
        id={'paginator0'}
        onClick={()=>props.clickedPage(0)}
        key={1}><div>1</div></div>);
    
    if(props.totalPages > 1){
        lastPages.push(<div 
            className={classes.Paginators} 
            onClick={()=>props.clickedPage(props.totalPages)}
            key={props.totalPages} 
            id={'paginator'+props.totalPages}><div>{props.totalPages}</div></div>);
    }
    
    if(props.page === 1 && props.totalPages > 7){
        for(let i=2; i <= 3; i++){
            firstPages.push(<div 
                className={classes.Paginators} 
                id={'paginator'+i}
                onClick={()=>props.clickedPage(i)}
                key={i}><div>{i}</div></div>);
        }
    }
    if(props.page <= 4 && props.page >= 2 && props.totalPages > 7){
        for(let i=2; i <= props.page+1; i++){
            firstPages.push(<div 
                className={classes.Paginators} 
                onClick={()=>props.clickedPage(i)}
                id={'paginator'+i}
                key={i}><div>{i}</div></div>);
        }
    }
    if(props.page >= 5 && (props.totalPages - props.page > 3) && props.totalPages > 7){
        
        for(let i=props.page-1; i <= props.page + 1; i++){
            middlePages.push(<div 
                className={classes.Paginators} 
                id={'paginator'+i}
                onClick={()=>props.clickedPage(i)}
                key={i}><div>{i}</div></div>)
        }
    }

    if(props.totalPages - props.page <= 3  && props.totalPages > 7){

        for(let i=props.totalPages-1; i >= props.page - 1; i--){
            lastPages.unshift(<div 
                className={classes.Paginators} 
                id={'paginator'+i}
                onClick={()=>props.clickedPage(i)}
                key={i}><div>{i}</div></div>)
        }
    }

    if(props.totalPages <= 7){
        for(let i=2; i <= props.totalPages-1; i++){
            firstPages.push(<div 
                className={classes.Paginators} 
                id={'paginator'+i}
                onClick={()=>props.clickedPage(i)}
                key={i}><div>{i}</div></div>);
        }
    }

    for(let i=1; i <= props.totalPages; i++){
        if(document.getElementById('paginator'+i)){
            document.getElementById('paginator'+i).style.backgroundColor = 'white';
            document.getElementById('paginator'+i).style.color = 'black';
        }
    }

    if(document.getElementById('paginator'+props.page)){
        document.getElementById('paginator'+props.page).style.backgroundColor = 'black';
        document.getElementById('paginator'+props.page).style.color = 'white';
    }


    return (
        <div className={classes.Paginator}>
            <div className={classes.Buttons}>
                {leftArrow}
                {firstPages}
                {leftEllipsis}
                {middlePages}
                {rightEllipsis}
                {lastPages}
                {rightArrow}
            </div>
        </div>
    );
};

export default paginator;