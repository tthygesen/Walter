import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../../utils/functions";
import { Context } from "../Provider";
import { Redirect } from "react-router";
//style
import "../../scss/modules/Form.scss";

export default class LoginForm extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      gotIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  async onSubmit(event) {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    const res = await axios.post("api/login", newUser).catch(err => {
      const loginError = err.response.data;
      this.setState({
        error: loginError
      });
    });
    if (res) {
      //get token from results
      const { token } = res.data;

      //save to local storage
      localStorage.setItem("jwt", token);

      //Set header with token
      setAuthHeader(token);

      //decode token
      if (token) {
        const decode = jwt_decode(token);
        //set user
        this.context.setCurrentUser(decode);

        //go to profile
        this.setState({
          gotIn: true
        });
      }
    }
  }

  render() {
    const { error, gotIn } = this.state;
    if (gotIn) {
      return <Redirect to={"/profile/update"} />;
    }
    return (
      <div className="form-wrapper">
        <form className="form" onSubmit={this.onSubmit}>
          {error && <p className="form-error">{error.error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
