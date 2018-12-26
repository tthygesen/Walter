import React, { Component } from "react";
import PageHeader from "../modules/PageHeader";
import { Context } from "../Provider";
import axios from "axios";

//Style
import "../../scss/pages/search.scss";

//Components
import Card from "../templates/search/SearchCard";

export default class Search extends Component {
  static contextType = Context;
  constructor(...props) {
    super(...props);
    this.stat = {};
  }
  componentWillMount() {
    const page = "Search";
    this.context.setPage(page);
  }
  render() {
    return (
      <section className="main-search">
        <article className="search-header">
          <h1>Search</h1>
          <input
            type="search"
            name="search"
            placeholder="Search for your new candidate"
          />
        </article>
        <article className="search-results">
          <Card />
        </article>
      </section>
    );
  }
}
