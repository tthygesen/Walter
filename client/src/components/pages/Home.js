import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../../utils/functions";
import { Context } from "../Provider";
import _ from "lodash";

//Style
import "../../scss/pages/Home.scss";

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {}
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

  test = () => {
    console.log("test");
    return <p>test</p>;
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  };
  componentDidMount() {
    const page = "home";
    this.context.setPage(page);
  }
  render() {
    const { error } = this.state;
    return (
      <section className="home">
        <div className="left">
          <h1>Walter</h1>
          <p>
            Connect in a more <br /> simple way
          </p>
          <Link className="cta" to="/register">
            Sign up
          </Link>
        </div>
        <div className="right">
          <form className="form" onSubmit={this.onSubmit}>
            {!_.isEmpty(error) && <p className="error-msg">{error.error}</p>}
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
