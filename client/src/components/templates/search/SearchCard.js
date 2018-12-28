import React, { Component } from "react";

//images
import pp from "../../../assets/images/pp.jpg";

export default class SearchCard extends Component {
  render() {
    return (
      <div className="card">
        <img src={pp} alt="" />
        <div className="card-info">
          <h3 className="name">
            {`${this.props.data.name} ${this.props.data.lastname}`}
          </h3>
          <p className="status">{this.props.data.status}</p>
          <p className="country">{this.props.data.living.country}</p>
          <p className="city">{this.props.data.living.city}</p>
        </div>
      </div>
    );
  }
}
