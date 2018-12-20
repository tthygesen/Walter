import React, { Component } from "react";
import axios from "axios";
//style
import "../../scss/modules/Form.scss";

export default class SignupForm extends Component {
  async onSubmit(event) {
    event.preventDefault();
    const newUser = {
      email: "test@gmail.com",
      password: "12345678",
      password2: "12345678"
    };
    const res = await axios.post("api/register", newUser).catch(err => {
      console.log(err.response.data);
    });
    console.log(res.data);
  }
  render() {
    return (
      <form className="login-form" onSubmit={this.onSubmit}>
        <h3>Sign up</h3>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="password2"
          placeholder="Match your password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
