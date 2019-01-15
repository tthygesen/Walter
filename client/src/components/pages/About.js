import React, { Component } from "react";
import { Context } from "../Provider";

//style
import "../../scss/pages/about.scss";

//components
import PageHeader from "../modules/PageHeader";

export default class About extends Component {
  static contextType = Context;
  componentWillMount() {
    const page = "About";
    this.context.setPage(page);
  }
  render() {
    return (
      <section className="about-main">
        <PageHeader />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    );
  }
}
