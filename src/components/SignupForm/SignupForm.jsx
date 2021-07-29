import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SignupForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    isFormInvalid() {
        console.log('valid')
    }

    render() {
        return (
            <div>
                <form className="form">
                    <div className="form-group">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Name" name="name"/>
                            <label for="floatingInput">Name</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email"/>
                            <label for="floatingInput">Email address</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password"/>
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" name="passwordConf"/>
                            <label for="floatingPassword"> Confirm Password</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <button className="btn btn-light" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                            <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>

        );
      }


};

export default SignupForm;