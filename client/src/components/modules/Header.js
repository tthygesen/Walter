import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Provider";
//style
import "../../scss/modules/Header.scss";

export default class Header extends Component {
  static contextType = Context;
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
        <ul>
          <li>
            <Link to="/">
              <img src="" alt="" />
            </Link>
          </li>
        </ul>
        <ul>
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
