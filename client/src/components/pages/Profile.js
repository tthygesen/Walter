import React, { Component } from "react";
import axios from "axios";
import { setAuthHeader } from "../../utils/functions";

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
    super();
    this.state = {
      name: "",
      lastname: "",
      status: "",
      bio: "",
      socials: {},
      contact: [],
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
      //console.log(res.data);
      const user = res.data;
      this.setState({
        name: user.name,
        lastname: user.lastname,
        status: user.status,
        bio: user.bio,
        contact: user.contact,
        socials: user.socials,
        living: user.living,
        skills: user.skills,
        experience: user.workexperience,
        education: user.education
      });
    }
  };
  async componentDidMount() {
    const token = localStorage.getItem("jwt");
    await setAuthHeader(token);
    this.getUserProfile();
  }
  render() {
    return (
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
    );
  }
}
