import React, { Component } from 'react';
import './SignupPage.css'
import SignupForm from '../../components/SignupForm/SignupForm';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ''}
    }
    render(){
        return (
        <div className='signupPage'>
            <h1>Sign Up</h1>
            <SignupForm />
        </div> 
        );
    }
}


export default SignupPage;