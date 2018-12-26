import React, { Component } from "react";
import remove from "../../../assets/images/delete.svg";

export default class Delete extends Component {
  delete = () => {
    console.log("deleted whatever");
  };
  render() {
    return <img onClick={this.delete} src={remove} alt="" />;
  }
}
