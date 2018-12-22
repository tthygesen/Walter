import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../../utils/functions";
import { Context } from "../Provider";

//style
import "../../scss/modules/Form.scss";

export default class LoginForm extends Component {
  static contextType = Context;
  constructor(props) {
    super();
    this.state = {
      error: "",
      email: "",
      password: ""
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
      const decode = jwt_decode(token);
      //set user
      this.context.setCurrentUser(decode);
    }
  }
  render() {
    const { error } = this.state;
    return (
      <form className="login-form" onSubmit={this.onSubmit}>
        <h3>Login form</h3>
        {error && <p>{error.error}</p>}
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
    );
  }
}
