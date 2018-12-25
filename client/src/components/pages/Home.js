import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../../utils/functions";
import { Context } from "../Provider";
//Style
import "../../scss/pages/Home.scss";

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    const page = "home";
    this.context.setPage(page);
  }
  render() {
    return (
      <section className="home">
        <div className="left">
          <h1>Walter</h1>
          <p>
            Connect in a more <br /> simpler way
          </p>
          <Link className="cta" to="/register">
            Sign up
          </Link>
        </div>
        <div className="right">
          <form className="form" onSubmit={this.onSubmit}>
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    );
  }
}
