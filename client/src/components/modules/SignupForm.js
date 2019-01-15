import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
//style
import "../../scss/modules/Form.scss";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      password2: "",
      userCreated: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      password: this.state.password,
      password2: this.state.password2
    };
    const res = await axios.post("api/register", newUser).catch(err => {
      const validationError = err.response.data;
      this.setState({
        error: validationError
      });
      return;
    });
    if (res) {
      this.setState({
        userCreated: true
      });
    }
  }
  render() {
    const { error, userCreated } = this.state;
    if (userCreated) {
      return <Redirect to={"/login"} />;
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
          <input
            type="password"
            name="password2"
            placeholder="Match your password"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
