import React, { Component } from "react";
import axios from "axios";
//style
import "../../scss/modules/Form.scss";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      password2: ""
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
    console.log(newUser);
    const res = await axios.post("api/register", newUser).catch(err => {
      const validationError = err.response.data;
      this.setState({
        error: validationError
      });
      return;
    });
    if (res) console.log(res.data);
  }
  render() {
    const { error } = this.state;
    return (
      <form className="login-form" onSubmit={this.onSubmit}>
        <h3>Sign up</h3>
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
        <input
          type="password"
          name="password2"
          placeholder="Match your password"
          value={this.state.password2}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
