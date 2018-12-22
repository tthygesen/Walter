import React, { Component } from "react";
import axios from "axios";
//import { Redirect } from "react-router-dom";
export default class Profile extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  getUserProfile = async () => {
    const res = await axios.get("/api/profile").catch(err => {
      console.log(err);
    });
    if (res) {
      console.log(res);
    }
  };
  componentDidMount() {
    this.getUserProfile();
  }
  render() {
    return <p>profile works</p>;
  }
}
