import React, { Component } from "react";
import { setAuthHeader } from "../../../utils/functions";
import axios from "axios";
//Style
import "../../../scss/pages/profile/add.scss";
export default class AddSkill extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      skill: "",
      years: "",
      success: false
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  submit = async event => {
    event.preventDefault();
    const skill = {
      skill: this.state.skill,
      years: this.state.years
    };
    console.log(skill);
    const res = await axios.post("/api/profile/skill", skill).catch(err => {
      console.log(err);
    });
    if (res) {
      //console.log(res.data);
      this.setState({
        skill: "",
        years: "",
        success: true
      });
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      success: false
    });
  };
  componentWillMount() {
    const token = localStorage.getItem("jwt");
    setAuthHeader(token);
  }
  render() {
    const { success } = this.state;
    return (
      <React.Fragment>
        <section className="main-add">
          <article className="add-header">
            <h1>Add skill</h1>
          </article>
          <article className="form-wrapper">
            <form onSubmit={this.submit}>
              {success && <p className="rf-success">success skill added</p>}
              <input
                type="text"
                name="skill"
                placeholder="Skill... baking, javascrip or self taught something "
                value={this.state.skill}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="years"
                placeholder="Years. Just the number"
                value={this.state.years}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </article>
        </section>
      </React.Fragment>
    );
  }
}
