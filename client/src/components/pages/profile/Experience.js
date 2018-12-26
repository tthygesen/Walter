import React, { Component } from "react";

//components
import DeleteBtn from "./Delete";
import AddBtn from "./Add";

export default class Experience extends Component {
  render() {
    return (
      <div className="experiences">
        <div className="categori-header">
          <h4>Experience</h4>
          <AddBtn link="experience" />
        </div>
        <div className="experience">
          <ul>
            <li className="company">Irma</li>
            <li className="position">Sales assistance</li>
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
