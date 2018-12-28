import React, { Component } from "react";
import axios from "axios";

//images
import remove from "../../../assets/images/delete.svg";

export default class Education extends Component {
  constructor(...props) {
    super(...props);
    this.stat = {};

    this.delete = this.delete.bind(this);
  }
  delete = async event => {
    const id = this.props.data._id;
    const res = await axios
      .delete(`/api/profile/education/${id}`)
      .catch(err => {
        console.log(err);
      });
    if (res) {
      //console.log(res);
      //TODO
      //make the page reload
    }
  };
  render() {
    const school = this.props.data.school;
    const country = this.props.data.country;
    const startmonth = this.props.data.start.month;
    const startyear = this.props.data.start.year;
    const endmonth = this.props.data.end.month;
    const endyear = this.props.data.end.year;
    const current = this.props.data.current;
    return (
      <div className="education">
        <ul>
          <li className="company">{school}</li>
          <li className="position">{country}</li>
          <li className="perioed last">
            <p>
              {`${startmonth} ${startyear} `} -{" "}
              {current ? `Current` : `${endmonth} ${endyear} `}
            </p>
            <img src={remove} onClick={this.delete} alt="" />
          </li>
        </ul>
      </div>
    );
  }
}
