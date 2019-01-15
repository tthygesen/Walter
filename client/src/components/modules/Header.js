import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Provider";
import history from "../../history";

//style
import "../../scss/modules/Header.scss";

//images
import logo from "../../assets/images/main-logo.png";
import search_icon from "../../assets/images/search.svg";

export default class Header extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    this.context.headerSeacrh(event.target.value);
  };
  submitSearch = event => {
    event.preventDefault();
    history.push("/candidates");
  };
  render() {
    let userAuth = this.context.state.authenticated;
    //logged in nav
    const authNav = (
      <React.Fragment>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={this.context.logUserOut}>
            log out
          </Link>
        </li>
      </React.Fragment>
    );
    //not logged in nav
    const notAuthNav = (
      <React.Fragment>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </React.Fragment>
    );
    return (
      <header className="main-header">
        <div>
          <Link to="/">
            <img className="header-logo" src={logo} alt="company-logo" />
          </Link>
          <form onSubmit={this.submitSearch}>
            <input
              className="header-search"
              type="search"
              name="search"
              placeholder="Search"
              value={this.context.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">
              <img src={search_icon} alt="" />
            </button>
          </form>
        </div>
        <ul>
          <li>
            <Link to="/candidates">Candidates</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {userAuth ? authNav : notAuthNav}
        </ul>
      </header>
    );
  }
}
