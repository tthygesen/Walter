import React, { Component } from "react";
import { Context } from "../Provider";
import axios from "axios";
import _ from "lodash";

//Style
import "../../scss/pages/candidates.scss";

//images
import searchIcon from "../../assets/images/search.svg";

//Components
import SearchCard from "../templates/search/SearchCard";

export default class Candidates extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.state = {
      search: "",
      profiles: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getProfiles = this.getProfiles.bind(this);
    this.search = this.search.bind(this);
  }
  getProfiles = async () => {
    const query = this.context.state.search;
    const res = await axios.get(`/api/profiles?q=${query}`).catch(err => {
      console.log(err);
    });
    if (res) {
      this.setState({
        profiles: res.data
      });
    }
  };
  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };
  search = async event => {
    event.preventDefault();
    this.setState({
      profiles: []
    });
    console.log(this.state.search);
    if (_.isEmpty(this.state.search)) {
      this.getProfiles();
      return;
    }
    const res = await axios
      .get(`/api/profiles?q=${this.state.search}`)
      .catch(err => {
        console.log(err);
        return;
      });
    if (res.data)
      this.setState({
        profiles: res.data
      });
  };
  componentDidMount() {
    this.context.setPage("Candidates");
    this.getProfiles();
  }
  render() {
    return (
      <section className="main-search">
        <article className="search-header">
          <h1>Candidates</h1>
          <form onSubmit={this.search}>
            <input
              type="search"
              name="search"
              placeholder="Search for your new candidate"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">
              <img src={searchIcon} alt="" />
            </button>
          </form>
        </article>
        <article className="search-results">
          {this.state.profiles.map((profile, i) => (
            <SearchCard data={profile} key={i} />
          ))}
        </article>
      </section>
    );
  }
}
