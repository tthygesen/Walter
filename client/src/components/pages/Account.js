import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Context } from "../Provider";
//Account.contextType = Context;

//style
import "../../scss/pages/Profile.scss";

//Componets
import UserAccount from "./profile/UserAccount";
import Experience from "./profile/Experience";
import Education from "./profile/Education";
import Skill from "./profile/Skill";
import Bio from "./profile/Bio";

export default class Account extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.state = {
      photo: "",
      name: "",
      lastname: "",
      status: "",
      bio: "",
      socials: {},
      contact: {},
      living: {},
      skills: [],
      experience: [],
      educations: []
    };
  }
  getProfile = async () => {
    const id = this.props.match.params.acc_id;
    console.log(id);
    const res = await axios.get(`/api/candidate/${id}`).catch(err => {
      console.log(err);
    });
    if (res) {
      const profile = res.data;
      profile.socials = _.isEmpty(profile.socials) ? {} : profile.socials;
      profile.living = _.isEmpty(profile.living) ? {} : profile.living;
      profile.contact = _.isEmpty(profile.contact) ? {} : profile.contact;
      profile.skills = _.isEmpty(profile.skills) ? [] : profile.skills;
      profile.educations = _.isEmpty(profile.educations)
        ? []
        : profile.educations;

      this.setState({
        photo: profile.photo,
        name: profile.name,
        lastname: profile.lastname,
        status: profile.status,
        bio: profile.bio,
        contact: profile.contact,
        socials: profile.socials,
        living: profile.living,
        skills: profile.skills,
        experience: profile.workexperience,
        educations: profile.educations
      });
    }
  };
  componentDidMount() {
    this.getProfile();
  }
  render() {
    return (
      <React.Fragment>
        <section className="main-profile">
          <UserAccount
            photo={this.state.photo}
            name={this.state.name}
            lastname={this.state.lastname}
            status={this.state.status}
            contact={this.state.contact}
            living={this.state.living}
            socials={this.state.socials}
          />
          <article className="info">
            <Bio text={this.state.bio} />
            <ul>
              <div className="categori-header">
                <h4>Experience</h4>
              </div>
              {this.state.experience.map((exp, i) => (
                <Experience data={exp} account={true} key={i} />
              ))}
            </ul>
            <ul>
              <div className="categori-header">
                <h4>Education</h4>
              </div>
              {this.state.educations.map((edu, i) => (
                <Education data={edu} account={true} key={i} />
              ))}
            </ul>
            <ul>
              <div className="categori-header">
                <h4>Skills</h4>
              </div>
              {this.state.skills.map((skill, i) => (
                <Skill data={skill} account={true} key={i} />
              ))}
            </ul>
          </article>
        </section>
      </React.Fragment>
    );
  }
}
