import React, { Component } from "react";

export default class Bio extends Component {
  render() {
    return (
      <div className="biography">
        <h4>Bio</h4>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
