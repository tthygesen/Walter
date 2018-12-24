import React, { Component } from "react";
import { Context } from "../Provider";

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
      <section>
        <PageHeader />
      </section>
    );
  }
}
