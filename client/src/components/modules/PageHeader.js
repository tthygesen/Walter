import React, { Component } from "react";
import { Context } from "../Provider";

//style
import "../../scss/modules/PageHeader.scss";

export default class PageHeader extends Component {
  static contextType = Context;
  render() {
    const page = this.context.state.page;
    return (
      <div className="page-header">
        <h1>{page}</h1>
      </div>
    );
  }
}
