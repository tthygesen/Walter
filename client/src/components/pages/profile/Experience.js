import React, { Component } from "react";
import axios from "axios";
//components

//images
import remove from "../../../assets/images/delete.svg";

export default class Experience extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      account: false
    };

    this.delete = this.delete.bind(this);
  }
  delete = async event => {
    const id = this.props.data._id;
    const res = await axios
      .delete(`/api/profile/experience/${id}`)
      .catch(err => {
        console.log(err);
      });
    if (res) {
      //console.log(res);
      //TODO
      //make the page reload
    }
  };
  componentWillMount() {
    if (this.props.account) {
      this.setState({
        account: this.props.account
      });
    }
  }
  render() {
    const company = this.props.data.company;
    const position = this.props.data.position;
    const startmonth = this.props.data.start.month;
    const startyear = this.props.data.start.year;
    const endmonth = this.props.data.end.month;
    const endyear = this.props.data.end.year;
    const current = this.props.data.current;
    return (
      <div className="experience">
        <ul>
          <li className="company">{company}</li>
          <li className="position">{position}</li>
          <li className="period last">
            <p>
              {`${startmonth} ${startyear} `} -{" "}
              {current ? `Current` : `${endmonth} ${endyear} `}
            </p>
            {!this.state.account && (
              <img src={remove} onClick={this.delete} alt="" />
            )}
          </li>
        </ul>
      </div>
    );
  }
}
