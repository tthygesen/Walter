import React, { Component } from "react";
import { Context } from "../Provider";

//components
import PageHeader from "../modules/PageHeader";

export default class Contact extends Component {
  static contextType = Context;
  componentWillMount() {
    const page = "Contact";
    this.context.setPage(page);
  }
  render() {
    return (
      <section>
        <PageHeader />
        <p>Contact works</p>
      </section>
    );
  }
}
