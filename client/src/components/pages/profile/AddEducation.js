import React, { Component } from "react";
import { setAuthHeader } from "../../../utils/functions";
import axios from "axios";

//Style
import "../../../scss/pages/profile/add.scss";
export default class AddEducation extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      school: "",
      country: "",
      startmonth: "",
      startyear: "",
      endmonth: "",
      endyear: "",
      current: false,
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submit = async event => {
    event.preventDefault();
    const education = {
      school: this.state.school,
      country: this.state.country,
      startmonth: this.state.startmonth,
      startyear: this.state.startyear,
      endmonth: this.state.endmonth,
      endyear: this.state.endyear,
      current: this.state.current
    };
    console.log(education);
    const res = await axios
      .post("/api/profile/education", education)
      .catch(err => {
        console.log(err);
      });
    if (res) {
      //console.log(res.data);
      this.setState({
        school: "",
        country: "",
        startmonth: "",
        startyear: "",
        endmonth: "",
        endyear: "",
        current: false,
        success: true
      });
    }
  };

  handleCheck = event => {
    this.setState({
      current: !this.state.current
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
            <h1>Add education</h1>
          </article>
          <article className="form-wrapper">
            <form onSubmit={this.submit}>
              {success && <p className="rf-success">success education added</p>}
              <input
                type="text"
                name="school"
                onChange={this.handleChange}
                value={this.state.school}
                placeholder="What Education"
              />
              <input
                type="text"
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
                placeholder="Where"
              />
              <div className="current">
                <input
                  type="checkbox"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.handleCheck}
                  id="current"
                />
                <p>I go here</p>
              </div>
              <div className="start">
                <input
                  list="startmonth"
                  name="startmonth"
                  onChange={this.handleChange}
                  value={this.state.startmonth}
                  placeholder="Start month"
                />
                <datalist id="startmonth">
                  <option value="January" />
                  <option value="February" />
                  <option value="March" />
                  <option value="April" />
                  <option value="May" />
                  <option value="June" />
                  <option value="July" />
                  <option value="August" />
                  <option value="September" />
                  <option value="October" />
                  <option value="November" />
                  <option value="December" />
                </datalist>
                <input
                  type="text"
                  name="startyear"
                  onChange={this.handleChange}
                  value={this.state.startyear}
                  placeholder="Start year"
                />
              </div>
              {!this.state.current && (
                <div className="end">
                  <input
                    list="endmonth"
                    name="endmonth"
                    onChange={this.handleChange}
                    value={this.state.endmonth}
                    placeholder="End month"
                  />
                  <datalist id="endmonth">
                    <option value="January" />
                    <option value="February" />
                    <option value="March" />
                    <option value="April" />
                    <option value="May" />
                    <option value="June" />
                    <option value="July" />
                    <option value="August" />
                    <option value="September" />
                    <option value="October" />
                    <option value="November" />
                    <option value="December" />
                  </datalist>
                  <input
                    type="text"
                    name="endyear"
                    onChange={this.handleChange}
                    value={this.state.endyear}
                    placeholder="End year"
                  />
                </div>
              )}
              <button type="submit">Submit</button>
            </form>
          </article>
        </section>
      </React.Fragment>
    );
  }
}
