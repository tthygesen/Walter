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
      },
      page: undefined,
      account: "",
      search: ""
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
    const auth = localStorage.getItem("jwt");
    if (auth) {
      this.setState({
        authenticated: true
      });
    } else {
      this.logUserOut();
    }
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
          headerSeacrh: this.headerSeacrh
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
