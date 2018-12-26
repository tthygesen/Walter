import React, { Component } from "react";
import { Link } from "react-router-dom";
import plus from "../../../assets/images/plus.svg";

export default class Add extends Component {
  render() {
    return (
      <Link to={"/profile/" + this.props.link}>
        <img src={plus} alt="" />
      </Link>
    );
  }
}
