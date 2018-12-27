import React, { Component } from "react";
import { setAuthHeader } from "../../utils/functions";
import axios from "axios";
import _ from "lodash";

//style
import "../../scss/pages/Profile.scss";

//Componets
import Card from "./profile/Card";
import Experience from "./profile/Experience";
import Education from "./profile/Education";
import Skill from "./profile/Skill";
import Bio from "./profile/Bio";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      status: "",
      bio: "",
      socials: {},
      contact: {},
      living: {},
      skills: [],
      experience: [],
      education: []
    };
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  getUserProfile = async () => {
    const res = await axios.get("/api/profile").catch(err => {
      console.log(err);
    });
    if (res) {
      const profile = res.data;
      profile.socials = _.isEmpty(profile.socials) ? {} : profile.socials;
      profile.living = _.isEmpty(profile.living) ? {} : profile.living;
      profile.contact = _.isEmpty(profile.contact) ? {} : profile.contact;

      this.setState({
        name: profile.name,
        lastname: profile.lastname,
        status: profile.status,
        bio: profile.bio,
        contact: profile.contact,
        socials: profile.socials,
        living: profile.living,
        skills: profile.skills,
        experience: profile.workexperience,
        education: profile.education
      });
    }
    console.log(this.state);
  };
  async componentDidMount() {
    const token = localStorage.getItem("jwt");
    await setAuthHeader(token);
    this.getUserProfile();
  }
  render() {
    return (
      <React.Fragment>
        <section className="main-profile">
          <Card
            name={this.state.name}
            lastname={this.state.lastname}
            status={this.state.status}
            contact={this.state.contact}
            living={this.state.living}
            socials={this.state.socials}
          />
          <article className="info">
            <Bio text={this.state.bio} />
            <Experience />
            <Education />
            <Skill />
          </article>
        </section>
      </React.Fragment>
    );
  }
}
