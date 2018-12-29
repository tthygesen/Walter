import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Provider";

//images
//import pp from "../../../assets/images/pp.jpg";

export default class SearchCard extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.state = {};
  }

  logId = () => {
    const id = this.props.data.user;
    this.context.logAccountId(id);
  };

  render() {
    //console.log(this.props);
    const pp = `http://localhost:5000/photos/pp/${this.props.data.photo}`;
    return (
      <Link to={`/account/${this.props.data.user}`}>
        <div className="card" onClick={this.logId}>
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
      </Link>
    );
  }
}
