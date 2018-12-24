import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  login = () => {
    const name = this.state.email;
    const password = this.state.password;
    console.log(name, password);
  };
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
          <form className="form" onSubmit={this.login}>
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
