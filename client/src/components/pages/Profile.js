import React, { Component } from "react";
import axios from "axios";
import { setAuthHeader } from "../../utils/functions";

//style
import "../../scss/pages/Profile.scss";

//Componets
import Card from "./profile/Card";

export default class Profile extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  getUserProfile = async () => {
    const res = await axios.get("/api/profile").catch(err => {
      console.log(err);
    });
    if (res) {
      console.log(res.data);
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
        <Card />
        <article className="info">
          <div className="biography">
            <h4>Bio</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="experiences">
            <h4>Experience</h4>
            <div className="experience">
              <ul>
                <li className="company">Irma</li>
                <li className="position">Sales assistance</li>
                <li className="perioed">january 2014 - febuar 2015</li>
              </ul>
            </div>
          </div>
          <div className="educations">
            <h4>Educations</h4>
            <div className="education">
              <ul>
                <li className="company">high school</li>
                <li className="position">Denmark </li>
                <li className="perioed">january 2014 - febuar 2015</li>
              </ul>
            </div>
          </div>
          <div className="skills">
            <h4>Skills</h4>
            <div className="skill">
              <ul>
                <li className="theSkill">HTML</li>
                <li className="years">3 years</li>
              </ul>
            </div>
            <div className="skill">
              <ul>
                <li className="theSkill">css</li>
                <li className="years">3 years</li>
              </ul>
            </div>
            <div className="skill">
              <ul>
                <li className="theSkill">javascript</li>
                <li className="years">2 years</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    );
  }
}
