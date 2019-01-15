import React, { Component } from "react";
import { setAuthHeader } from "../../../utils/functions";
import axios from "axios";

//Style
import "../../../scss/pages/profile/add.scss";
export default class AddExperience extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      what: "",
      where: "",
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
    const experience = {
      what: this.state.what,
      where: this.state.where,
      startmonth: this.state.startmonth,
      startyear: this.state.startyear,
      endmonth: this.state.endmonth,
      endyear: this.state.endyear,
      current: this.state.current
    };
    console.log(experience);
    const res = await axios
      .post("/api/profile/experience", experience)
      .catch(err => {
        console.log(err);
      });
    if (res) {
      //console.log(res.data);
      this.setState({
        what: "",
        where: "",
        startmonth: "",
        startyear: "",
        endmonth: "",
        endyear: "",
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
            <h1>Add experience</h1>
          </article>
          <article className="form-wrapper">
            <form onSubmit={this.submit}>
              {success && (
                <p className="rf-success">success experience added</p>
              )}
              <input
                type="text"
                name="what"
                onChange={this.handleChange}
                value={this.state.what}
                placeholder="What position did you have?"
              />
              <input
                type="text"
                name="where"
                onChange={this.handleChange}
                value={this.state.where}
                placeholder="what company was it?"
              />
              <div className="current">
                <input
                  type="checkbox"
                  name="current"
                  //defaultChecked={this.state.current}
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.handleCheck}
                  id="current"
                />
                <p>I work here</p>
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
