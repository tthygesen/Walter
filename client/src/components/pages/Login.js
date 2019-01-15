import React, { Component } from "react";
import { Context } from "../Provider";

//Components - modules
import LoginForm from "../modules/LoginForm";
import PageHeader from "../modules/PageHeader";

export default class Login extends Component {
  static contextType = Context;
  componentWillMount() {
    const page = "Log in";
    this.context.setPage(page);
  }
  render() {
    return (
      <section>
        <PageHeader />
        <LoginForm history={this.props.history} />
      </section>
    );
  }
}
