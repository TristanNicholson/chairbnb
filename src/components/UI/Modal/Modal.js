import React, { Component } from 'react';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.login !== this.props.login || nextProps.signUp !== this.props.signUp || nextProps.children !== this.props.children;
    }

    render () {
        let show = this.props.login || this.props.signUp || this.props.register || this.props.addProgress || this.props.photos;
        return (
            <>
                <Backdrop show={show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show || this.props.signUp ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal;