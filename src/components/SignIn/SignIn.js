import React, { Component } from 'react';
import classes from './SignIn.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../UI/FormInput/FormInput';
import Button from '../UI/Buttons/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

class SignIn extends Component {
    state = {
        signInForm: {
            email: {
                elementType: 'input',
                elementLabel: 'Email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    email: true,
                    noSpaces: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementLabel: 'Password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter a password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 25,
                    noSpaces: true
                },
                valid: false,
                touched: false
            }
        }   
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.noSpaces){
            const re = /^[^\s]+$/;
            isValid = re.test(value.trim()) && isValid;
        }

        if(rules.email){
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value.toLowerCase()) && isValid;
        }

        return isValid;
    }

    signInHandler = ( event ) => {
        event.preventDefault();
        const formData = {
            email: this.state.signInForm.email.value,
            password: this.state.signInForm.password.value
        };

        this.props.onSignIn(formData);

        setTimeout(()=>{
            if(this.props.signUpInSuccess){
                this.props.modalClose();
            }
        },500);     
    }

    inputChangedHandler = (event, elementId) => {
        const updatedForm = {...this.state.signInForm};
        const updatedFormElement = {...this.state.signInForm[elementId]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[elementId] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({signInForm: updatedForm,formIsValid: formIsValid});
    };

    render(){
        const formElementsArray = [];
        
        for(let key in this.state.signInForm){
            formElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
            });
        }

        let errorDetails = {
            email: 'This not a valid email address',
            password: 'Your password must be 8-25 characters long'
        }

        let errors = [];

        for(let error of this.props.errors){
            errors.push(
                <p>{error.msg}</p>
            );
        }

        let form = (
            <form onSubmit={this.signInHandler}>   
                {formElementsArray.map((formElement,i)=>{
                    return (
                        <div key={i}>
                            <div className={classes.Field}>
                            <div className={classes.Label}>{formElement.config.elementLabel}</div>
                            <Input 
                                    touched={formElement.config.touched}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig} 
                                    value={formElement.config.value} 
                                    changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
                            {!formElement.config.valid && formElement.config.touched ? <p>{errorDetails[formElement.id]}</p>: null}
                            </div>
                        </div>);
                })}
                <div>
                    {errors}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Sign In</Button>
                </div>
                
            </form>
        );

        return (
            <div className={classes.SignIn}>
                <div>
                    <div className={classes.Title}>Sign In</div>
                    <div className={classes.Fields}>
                        {this.props.signingUp ? 
                            <Spinner/> :
                            form
                        }    
                    </div>
                </div>  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        onSignIn: state.auth.signingUpIn,
        errors: state.auth.errors,
        signUpInSuccess: state.auth.signUpInSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (form)=>dispatch(actions.signIn(form))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);