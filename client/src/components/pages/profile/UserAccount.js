import React, { Component } from "react";

//Social media icons
import facebook_icon from "../../../assets/images/sm-icons/facebook.svg";
import instagram_icon from "../../../assets/images/sm-icons/instagram.svg";
import twitter_icon from "../../../assets/images/sm-icons/twitter.svg";
import linkedin_icon from "../../../assets/images/sm-icons/linkedin.svg";

export default class UserAccount extends Component {
  componentWillMount() {}
  render() {
    const p = this.props;

    const photo = p.photo === "undefined" || undefined ? "" : p.photo;
    const name = p.name === "undefined" || undefined ? "" : p.name;
    const lastname = p.lastname === "undefined" || undefined ? "" : p.lastname;
    const status = p.status === "undefined" || undefined ? "" : p.status;
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
      p.socials.facebook === "undefined" || undefined ? "" : p.socials.facebook;
    const twitter =
      p.socials.twitter === "undefined" || undefined ? "" : p.socials.twitter;
    const instagram =
      p.socials.instagram === "undefined" || undefined
        ? ""
        : p.socials.instagram;
    const linkedin =
      p.socials.linkedin === "undefined" || undefined ? "" : p.socials.linkedin;
    const pp = `http://localhost:5000/photos/pp/${photo}`;
    return (
      <article className="business-card">
        <div className="card-info">
          <img src={pp} className="profile-picture" alt="" />
          <ul className="basic-info">
            <li>
              {name && (
                <h1>
                  {name} {lastname}
                </h1>
              )}
            </li>
            <li>{status && <h4>{status}</h4>}</li>
            {email && <li>{email}</li>}
            {phone && <li>{phone}</li>}
            {country && <li>{country}</li>}
            {city && <li>{city}</li>}
            {website && (
              <li>
                <a href={website}>Website</a>
              </li>
            )}
          </ul>
          <ul className="social-media">
            {facebook && (
              <li className="facebook sm-icon">
                <a href={facebook}>
                  <img src={facebook_icon} alt="" />
                </a>
              </li>
            )}
            {twitter && (
              <li className="twitter sm-icon">
                <a href={twitter}>
                  <img src={twitter_icon} alt="" />
                </a>
              </li>
            )}
            {linkedin && (
              <li className="linkedin sm-icon">
                <a href={linkedin}>
                  <img src={linkedin_icon} alt="" />
                </a>
              </li>
            )}
            {instagram && (
              <li className="instagram sm-icon">
                <a href={instagram}>
                  <img src={instagram_icon} alt="" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </article>
    );
  }
}
