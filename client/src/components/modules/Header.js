import React, { Component } from "react";
import { Link } from "react-router-dom";

//style
import "../../scss/modules/Header.scss";

export default class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </header>
    );
  }
}
