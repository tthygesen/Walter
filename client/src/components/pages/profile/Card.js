import React, { Component } from "react";

//Social media icons
import facebook from "../../../assets/images/sm-icons/facebook.svg";
import instagram from "../../../assets/images/sm-icons/instagram.svg";
import twitter from "../../../assets/images/sm-icons/twitter.svg";
import linkedin from "../../../assets/images/sm-icons/linkedin.svg";

//dummy profile picture
import pp from "../../../assets/images/pp.jpg";

export default class Card extends Component {
  render() {
    return (
      <article className="business-card">
        <img src={pp} className="profile-picture" alt="" />
        <ul className="basic-info">
          <li>
            <h1>name</h1>
          </li>
          <li>
            <h4>status</h4>
          </li>
          <li>email</li>
          <li>phone</li>
          <li>city</li>
          <li>website</li>
        </ul>
        <ul className="social-media">
          <li className="facebook sm-icon">
            <a href="https://www.google.com/">
              <img src={facebook} alt="" />
            </a>
          </li>
          <li className="twitter sm-icon">
            <a href="https://www.google.com/">
              <img src={twitter} alt="" />
            </a>
          </li>
          <li className="linkedin sm-icon">
            <a href="https://www.google.com/">
              <img src={linkedin} alt="" />
            </a>
          </li>
          <li className="instagram sm-icon">
            <a href="https://www.google.com/">
              <img src={instagram} alt="" />
            </a>
          </li>
        </ul>
      </article>
    );
  }
}
