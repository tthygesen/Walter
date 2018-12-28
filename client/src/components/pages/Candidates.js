import React, { Component } from "react";
import { Context } from "../Provider";
import axios from "axios";
import _ from "lodash";

//Style
import "../../scss/pages/candidates.scss";

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
    this.getProfiles = this.getProfiles.bind(this);
    this.search = this.search.bind(this);
  }
  getProfiles = async () => {
    const res = await axios.get("/api/profiles?q=").catch(err => {
      console.log(err);
    });
    if (res) {
      console.log(res.data);
      this.setState({
        profiles: res.data
      });
    }
  };
  displayProfiles = () => {
    this.state.profiles.map((profile, i) => {
      return <SearchCard data={profile} key={i} />;
    });
  };
  search = async event => {
    await this.setState({
      search: event.target.value
    });
    if (_.isEmpty(this.state.search)) {
      console.log("EMPTY");
      return;
    }

    const res = await axios
      .get(`/api/profiles?q=${this.state.search}`)
      .catch(err => {
        console.log(err);
        return;
      });
    if (res.data) {
      console.log(res.data);
      this.setState({
        profiles: res.data
      });
    }
  };
  componentWillMount() {
    const page = "Candidates";
    this.getProfiles();
    this.context.setPage(page);
  }
  render() {
    return (
      <section className="main-search">
        <article className="search-header">
          <h1>Candidates</h1>
          <input
            type="search"
            name="search"
            placeholder="Search for your new candidate"
            value={this.state.search}
            onChange={this.search}
          />
        </article>
        <article className="search-results">
          {_.isEmpty(this.state.profiles) ? (
            <p> looking . . . </p>
          ) : (
            this.state.profiles.map((profile, i) => (
              <SearchCard data={profile} key={i} />
            ))
          )}
        </article>
      </section>
    );
  }
}
