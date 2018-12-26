import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

//Provider
import Provider from "./components/Provider";
//Components  - modules
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
//Components  - modules
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Update from "./components/pages/Update";
import Experience from "./components/pages/Experience";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/update" component={Update} />
            <Route exact path="/profile/experience" component={Experience} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
