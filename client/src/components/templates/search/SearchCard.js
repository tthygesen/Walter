import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Provider";
import _ from "lodash";

//images
//import pp from "../../../assets/images/pp.jpg";

export default class SearchCard extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.state = {
      photo: "",
      name: "",
      lastname: "",
      status: "",
      country: "",
      city: ""
    };
  }

  logId = () => {
    const id = this.props.data.user;
    this.context.logAccountId(id);
  };

  componentDidMount() {
    const p = this.props.data;
    console.log(this.props.data);
    p.socials = _.isEmpty(p.socials) ? {} : p.socials;
    p.living = _.isEmpty(p.living) ? {} : p.living;
    p.contact = _.isEmpty(p.contact) ? {} : p.contact;
    const photo = p.photo === "undefined" || undefined ? "" : p.photo;
    const name = p.name === "undefined" || undefined ? "" : p.name;
    const lastname = p.lastname === "undefined" || undefined ? "" : p.lastname;
    const status = p.status === "undefined" || undefined ? "" : p.status;
    const country =
      p.living.country === "undefined" || undefined ? "" : p.living.country;
    const city =
      p.living.city === "undefined" || undefined ? "" : p.living.city;
    this.setState({
      photo: photo,
      name: name,
      lastname: lastname,
      status: status,
      country: country,
      city: city
    });
  }

  render() {
    const pp = `http://localhost:5000/photos/pp/${this.props.data.photo}`;
    return (
      <Link to={`/account/${this.props.data.user}`}>
        <div className="card" onClick={this.logId}>
          <img src={pp} alt="" />
          <div className="card-info">
            <h3 className="name">
              {`${this.state.name} ${this.state.lastname}`}
            </h3>
            <p className="status">{this.state.status}</p>
            <p className="country">{this.state.country}</p>
            <p className="city">{this.state.city}</p>
          </div>
        </div>
      </Link>
    );
  }
}
