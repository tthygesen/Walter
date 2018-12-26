import React, { Component } from "react";
import axios from "axios";
import { Context } from "../Provider";

//Style
import "../../scss/pages/update.scss";

//components
import PageHeader from "../modules/PageHeader";

export default class Update extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      status: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      website: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      bio: ""
    };
    this.submit = this.submit.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submit = async event => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      status: this.state.status,
      email: this.state.email,
      phone: this.state.phone,
      country: this.state.country,
      city: this.state.city,
      website: this.state.website,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      bio: this.state.bio
    };
    const newUser = await axios.post("/api/profile", user).catch(err => {
      console.log(err);
    });
    if (newUser) console.log(newUser);
  };
  deleteAccount = () => {
    console.log("delete account");
  };
  componentWillMount() {
    const page = "Profile information";
    this.context.setPage(page);
  }

  render() {
    return (
      <section className="main-update">
        <PageHeader />
        <form onSubmit={this.submit} className="update-form">
          <div className="general-info inputs-wrapper">
            <h4>General information</h4>
            <label htmlFor="propfilepicture">Profile picture</label>
            {/*

             <input
             type="file"
             onChange={this.handleChange}
             value={this.state.name}
             name="profilepicture"
             />
           */}
            <input
              type="text"
              name="name"
              placeholder="First name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              onChange={this.handleChange}
              value={this.state.status}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={this.handleChange}
              value={this.state.phone}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={this.handleChange}
              value={this.state.country}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <input
              type="text"
              name="website"
              placeholder="Webiste or perosnal link"
              onChange={this.handleChange}
              value={this.state.website}
            />
          </div>
          <div className="social-medias inputs-wrapper">
            <h4>Social medias</h4>
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              onChange={this.handleChange}
              value={this.state.facebook}
            />
            <input
              type="text"
              name="twitter"
              placeholder="Twitter"
              onChange={this.handleChange}
              value={this.state.twitter}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="Linkedin"
              onChange={this.handleChange}
              value={this.state.linkedin}
            />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              onChange={this.handleChange}
              value={this.state.instagram}
            />
            <div className="bio">
              <h4>Bio</h4>
              <textarea
                name="bio"
                cols="30"
                rows="10"
                placeholder="Tell people something about you self"
                onChange={this.handleChange}
                value={this.state.bio}
              />
            </div>
          </div>
          <span className="separator" />
          <div className="button-wrapper">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button onClick={this.deleteAccount} className="btn-delete">
              delete account
            </button>
          </div>
        </form>
      </section>
    );
  }
}
