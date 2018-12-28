import React, { Component } from "react";
import axios from "axios";

//images
import remove from "../../../assets/images/delete.svg";

export default class Skill extends Component {
  constructor(...props) {
    super(...props);
    this.stat = {};

    this.delete = this.delete.bind(this);
  }
  delete = async event => {
    const id = this.props.data._id;
    const res = await axios.delete(`/api/profile/skill/${id}`).catch(err => {
      console.log(err);
    });
    if (res) {
      //console.log(res);
      //TODO
      //make the page reload
    }
  };
  render() {
    const skill = this.props.data.skill;
    const years = this.props.data.years;
    return (
      <div className="skill">
        <ul>
          <li className="theSkill">{skill}</li>
          <li className="years last">
            <p>{years} years</p>
            <img src={remove} onClick={this.delete} alt="" />
          </li>
        </ul>
      </div>
    );
  }
}
