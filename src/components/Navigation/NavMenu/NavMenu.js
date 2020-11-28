import React, {Component} from 'react';
import UserIcon from '../../../assets/icons/userSolid';
import BarsIcon from '../../../assets/icons/barsSolid';
import classes from './NavMenu.module.css';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Modal from '../../UI/Modal/Modal';
import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';

class NavMenu extends Component {
    state = {
        menuActive : false,
        loginActive: false,
        signUpActive: false
    };

    componentDidMount() {
        window.addEventListener('click', (e)=>{
            if(this.state.menuActive && e.target.closest('.'+classes.NavMenu) === null ){
                this.setState({menuActive: false});
            }
        });
    }

    loginClickedHandler = () => {
        console.log('sign in');
        this.setState({loginActive: !this.state.loginActive});
    }
    signUpClickedHandler = () => {
        this.setState({signUpActive: !this.state.signUpActive});
    }
    modalCloseHandler = () => {
        this.setState({signUpActive: false, loginActive: false});
    }

    menuClickedHandler = () => {
        this.setState({menuActive: !this.state.menuActive});
    }

    render(){
        let modal;
        if(this.state.loginActive){
            modal = <SignIn
                modalClose={this.modalCloseHandler}/>;
        }
        if(this.state.signUpActive){
            modal = <SignUp
                modalClose={this.modalCloseHandler}/>;
        }
        return (
        <>
            <div className={classes.NavMenu} onClick={this.menuClickedHandler}>
                <div className={classes.Bars}>
                    <BarsIcon/>
                </div>
                <div>
                    <UserIcon/>
                </div>               
            </div>
            {this.state.menuActive ? 
                <DropdownMenu
                    loginClicked={this.loginClickedHandler}
                    signUpClicked={this.signUpClickedHandler}/> 
            : null}
            <Modal
                login={this.state.loginActive}
                signUp={this.state.signUpActive}
                register={false}
                addProgress={false}
                photos={false}
                modalClosed={this.modalCloseHandler}>
                    {modal}
            </Modal>   
        </>
        );
    };
};

export default NavMenu;