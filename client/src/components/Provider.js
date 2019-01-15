import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../utils/functions";
export const Context = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {
        id: "",
        email: ""
      },
      page: undefined,
      account: "",
      search: "",
      profile: {}
    };
  }
  setCurrentUser = decode => {
    //set authenticated to true and populate the user state;
    this.setState({
      authenticated: true,
      user: {
        id: decode.id,
        email: decode.email
      }
    });
  };
  headerSeacrh = input => {
    this.setState({
      search: input
    });
  };
  logUserOut = () => {
    localStorage.removeItem("jwt");
    this.setState({
      authenticated: false
    });
    window.location.href = "/";
  };
  setPage = currentpage => {
    this.setState({
      page: currentpage
    });
  };
  logAccountId = id => {
    this.setState({
      account: id
    });
  };
  checkAuth = () => {
    if (localStorage.jwt) {
      const token = localStorage.jwt;
      setAuthHeader(token);
      const decode = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      this.setCurrentUser(decode);
      if (currentTime > decode.exp) {
        this.logUserOut();
      }
    }
  };
  setProfile = input => {
    this.setState({
      profile: input
    });
  };
  componentWillMount() {
    this.checkAuth();
  }
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setCurrentUser: this.setCurrentUser,
          logUserOut: this.logUserOut,
          setPage: this.setPage,
          logAccountId: this.logAccountId,
          headerSeacrh: this.headerSeacrh,
          setProfile: this.setProfile
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
