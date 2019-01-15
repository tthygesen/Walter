import React, { Component } from "react";
import axios from "axios";
import { Context } from "../Provider";
import { setAuthHeader } from "../../utils/functions";
import _ from "lodash";
import { Redirect } from "react-router";

//Style
import "../../scss/pages/update.scss";

//components
import PageHeader from "../modules/PageHeader";

export default class Update extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.state = {
      photo: "",
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
      bio: "",
      redirect: false,
      updatedProfile: false
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSelectedFile = event => {
    this.setState({
      photo: event.target.files[0]
    });
  };
  submit = async event => {
    event.preventDefault();
    //console.log(this.state);
    //append data to a From data
    let formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("name", this.state.name);
    formData.append("lastname", this.state.lastname);
    formData.append("status", this.state.status);
    formData.append("email", this.state.email);
    formData.append("phone", this.state.phone);
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("website", this.state.website);
    formData.append("facebook", this.state.facebook);
    formData.append("instagram", this.state.instagram);
    formData.append("twitter", this.state.twitter);
    formData.append("linkedin", this.state.linkedin);
    formData.append("bio", this.state.bio);
    //Send the data to the backend
    const newUser = await axios.post("/api/profile", formData).catch(err => {
      //console.log(err);
    });
    if (newUser) {
      console.log(newUser.data);
      this.setState({
        updatedProfile: true
      });
    }
  };
  deleteAccount = async event => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you wish to delete your account"
    );
    if (confirmDelete) {
      const res = await axios.delete("/api/profile").catch(err => {
        console.log(err);
      });
      if (res) {
        await this.context.logUserOut();
        this.setState({ redirect: true });
        return;
      }
    }
  };

  getUserData = async () => {
    const res = await axios.get("/api/profile").catch(err => {
      console.log("No informaton... please fillout the form");
    });

    if (res) {
      const profile = res.data;

      //Contact
      profile.contact = _.isEmpty(profile.contact) ? {} : profile.contact;
      profile.contact.email = _.isUndefined(profile.contact.email)
        ? ""
        : profile.contact.email;
      profile.contact.phone = _.isUndefined(profile.contact.phone)
        ? ""
        : profile.contact.phone;
      profile.contact.website = _.isUndefined(profile.contact.website)
        ? ""
        : profile.contact.website;

      //Living
      profile.living = _.isEmpty(profile.living) ? {} : profile.living;
      profile.living.country = _.isUndefined(profile.living.country)
        ? ""
        : profile.living.country;
      profile.living.city = _.isUndefined(profile.living.city)
        ? ""
        : profile.living.city;

      //socials
      profile.socials = _.isEmpty(profile.socials) ? {} : profile.socials;
      profile.socials.facebook = _.isUndefined(profile.socials.facebook)
        ? ""
        : profile.socials.facebook;
      profile.socials.instagram = _.isUndefined(profile.socials.instagram)
        ? ""
        : profile.socials.instagram;
      profile.socials.twitter = _.isUndefined(profile.socials.twitter)
        ? ""
        : profile.socials.twitter;
      profile.socials.linkedin = _.isUndefined(profile.socials.linkedin)
        ? ""
        : profile.socials.linkedin;

      this.setState({
        name: res.data.name,
        photo: res.data.photo,
        lastname: res.data.lastname,
        status: res.data.status,
        email: res.data.contact.email,
        phone: res.data.contact.phone,
        website: res.data.contact.website,
        country: res.data.living.country,
        city: res.data.living.city,
        facebook: res.data.socials.facebook,
        twitter: res.data.socials.twitter,
        linkedin: res.data.socials.linkedin,
        instagram: res.data.socials.instagram,
        bio: res.data.bio
      });
    }
  };
  async componentWillMount() {
    const token = localStorage.getItem("jwt");
    await setAuthHeader(token);
    this.getUserData();
    const page = "Profile information";
    this.context.setPage(page);
  }

  render() {
    const { redirect, updatedProfile } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (updatedProfile) {
      return <Redirect to="/profile" />;
    }
    return (
      <section className="main-update">
        <PageHeader />
        <form onSubmit={this.submit} className="update-form">
          <div className="general-info inputs-wrapper">
            <h4>General information</h4>
            <label htmlFor="propfilepicture">Profile picture</label>

            <input
              onChange={this.handleSelectedFile}
              type="file"
              accept="image/gif, image/png, image/jpeg, image/jpg"
            />

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
