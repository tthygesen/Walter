import React, { Component } from "react";

//images
import pp from "../../../assets/images/pp.jpg";

export default class SearchCard extends Component {
  render() {
    return (
      <div className="card">
        <img src={pp} alt="" />
        <div className="card-info">
          <h3 className="name">Sara Hojgaard</h3>
          <p className="status">Make-up artist</p>
          <p className="country">Denmark</p>
          <p className="city">Copenhagen</p>
        </div>
      </div>
    );
  }
}
