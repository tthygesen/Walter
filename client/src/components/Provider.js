//make Provider.js -> component
//create context

import React, { Component } from "react";

export const Context = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super();
    this.state = {
      authenticated: false,
      user: {
        id: "",
        email: ""
      }
    };
  }
  setCurrentUser = decode => {
    console.log(decode);
    //set authenticated to true and populate the user state;
    this.setState({
      authenticated: true,
      user: {
        id: decode.id,
        email: decode.email
      }
    });
  };
  logUserOut = () => {
    console.log("log out");
    localStorage.removeItem("jwt");
    this.setState({
      authenticated: false
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setCurrentUser: this.setCurrentUser,
          logUserOut: this.logUserOut
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
