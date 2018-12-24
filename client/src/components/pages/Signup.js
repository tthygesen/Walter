import React, { Component } from "react";
import { Context } from "../Provider";
//components
import SignupForm from "../modules/SignupForm";
import PageHeader from "../modules/PageHeader";

export default class Signup extends Component {
  static contextType = Context;
  componentWillMount() {
    const page = "Sign up";
    this.context.setPage(page);
  }
  render() {
    return (
      <section>
        <PageHeader />
        <SignupForm />
      </section>
    );
  }
}
