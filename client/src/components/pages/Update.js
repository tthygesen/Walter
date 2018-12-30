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
      //console.log(newUser.data);
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
      let p = res.data;
      p.socials = _.isEmpty(p.socials) ? {} : p.socials;
      p.living = _.isEmpty(p.living) ? {} : p.living;
      p.contact = _.isEmpty(p.contact) ? {} : p.contact;

      const photo = p.photo === "undefined" || undefined ? "" : p.photo;
      const name = p.name === "undefined" || undefined ? "" : p.name;
      const lastname =
        p.lastname === "undefined" || undefined ? "" : p.lastname;
      const status = p.status === "undefined" || undefined ? "" : p.status;
      const bio = p.bio === "undefined" || undefined ? "" : p.bio;
      //Contact
      const email =
        p.contact.email === "undefined" || undefined ? "" : p.contact.email;
      const phone =
        p.contact.phone === "undefined" || undefined ? "" : p.contact.phone;
      const website =
        p.contact.website === "undefined" || undefined ? "" : p.contact.website;
      //living
      const country =
        p.living.country === "undefined" || undefined ? "" : p.living.country;
      const city =
        p.living.city === "undefined" || undefined ? "" : p.living.city;
      //socials
      const facebook =
        p.socials.facebook === "undefined" || undefined
          ? ""
          : p.socials.facebook;
      const twitter =
        p.socials.twitter === "undefined" || undefined ? "" : p.socials.twitter;
      const instagram =
        p.socials.instagram === "undefined" || undefined
          ? ""
          : p.socials.instagram;
      const linkedin =
        p.socials.linkedin === "undefined" || undefined
          ? ""
          : p.socials.linkedin;

      this.setState({
        photo: photo,
        name: name,
        lastname: lastname,
        status: status,
        email: email,
        phone: phone,
        website: website,
        country: country,
        city: city,
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin,
        instagram: instagram,
        bio: bio
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
