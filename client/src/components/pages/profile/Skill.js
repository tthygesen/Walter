import React, { Component } from "react";
import axios from "axios";

//images
import remove from "../../../assets/images/delete.svg";

export default class Skill extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      account: false
    };

    this.delete = this.delete.bind(this);
  }
  delete = async event => {
    const id = this.props.data._id;
    const res = await axios.delete(`/api/profile/skill/${id}`).catch(err => {
      console.log(err);
    });
    if (res) {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        window.location.reload();
      }
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
    const skill = this.props.data.skill;
    const years = this.props.data.years;
    return (
      <div className="skill">
        <ul>
          <li className="theSkill">{skill}</li>
          <li className="years last">
            <p>{years} years</p>
            {!this.state.account && (
              <img src={remove} onClick={this.delete} alt="" />
            )}
          </li>
        </ul>
      </div>
    );
  }
}
