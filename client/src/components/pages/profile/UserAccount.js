import React, { Component } from "react";

//Social media icons
import facebook from "../../../assets/images/sm-icons/facebook.svg";
import instagram from "../../../assets/images/sm-icons/instagram.svg";
import twitter from "../../../assets/images/sm-icons/twitter.svg";
import linkedin from "../../../assets/images/sm-icons/linkedin.svg";

export default class UserAccount extends Component {
  render() {
    const photo = `http://localhost:5000/photos/pp/${this.props.photo}`;
    return (
      <article className="business-card">
        <div className="card-info">
          <img src={photo} className="profile-picture" alt="" />
          <ul className="basic-info">
            <li>
              {this.props.name && (
                <h1>
                  {this.props.name} {this.props.lastname}
                </h1>
              )}
            </li>
            <li>{this.props.status && <h4>{this.props.status}</h4>}</li>
            {this.props.contact.email && <li>{this.props.contact.email}</li>}
            {this.props.contact.phone && <li>{this.props.contact.phone}</li>}
            {this.props.living.country && <li>{this.props.living.country}</li>}
            {this.props.living.city && <li>{this.props.living.city}</li>}
            {this.props.contact.website && (
              <li>
                <a href={this.props.contact.website}>Website</a>
              </li>
            )}
          </ul>
          <ul className="social-media">
            {this.props.socials.facebook && (
              <li className="facebook sm-icon">
                <a href={this.props.socials.facebook}>
                  <img src={facebook} alt="" />
                </a>
              </li>
            )}
            {this.props.socials.twitter && (
              <li className="twitter sm-icon">
                <a href={this.props.socials.twitter}>
                  <img src={twitter} alt="" />
                </a>
              </li>
            )}
            {this.props.socials.linkedin && (
              <li className="linkedin sm-icon">
                <a href={this.props.socials.linkedin}>
                  <img src={linkedin} alt="" />
                </a>
              </li>
            )}
            {this.props.socials.instagram && (
              <li className="instagram sm-icon">
                <a href={this.props.socials.instagram}>
                  <img src={instagram} alt="" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </article>
    );
  }
}
