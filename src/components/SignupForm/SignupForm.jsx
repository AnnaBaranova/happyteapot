import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import "./SignupForm.css";

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  };

  handleChange = (e) => {
    this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push("/");
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    return (
      <div className="container-fluid signup-form">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
              />
              <label for="floatingInput">Name</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                name="email"
                onChange={this.handleChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
                name="passwordConf"
                onChange={this.handleChange}
              />
              <label for="floatingPassword"> Confirm Password</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating">
              <button className="btn btn-dark" disabled={this.isFormInvalid()}>
                Sign Up
              </button>
              &nbsp;&nbsp;
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
