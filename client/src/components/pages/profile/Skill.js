import React, { Component } from "react";

//components
import DeleteBtn from "./Delete";
import AddBtn from "./Add";

export default class Skill extends Component {
  render() {
    return (
      <div className="skills">
        <div className="categori-header">
          <h4>Education</h4>
          <AddBtn link="skill" />
        </div>
        <div className="skill">
          <ul>
            <li className="theSkill">HTML</li>
            <li className="years last">
              <p>3 years</p>
              <DeleteBtn />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
