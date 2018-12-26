import React, { Component } from "react";

//components
import DeleteBtn from "./Delete";
import AddBtn from "./Add";

export default class Education extends Component {
  render() {
    return (
      <div className="educations">
        <div className="categori-header">
          <h4>Education</h4>
          <AddBtn link="education" />
        </div>
        <div className="education">
          <ul>
            <li className="company">high school</li>
            <li className="position">Denmark </li>
            <li className="perioed last">
              <p>january 2014 - febuar 2015</p>
              <DeleteBtn />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
