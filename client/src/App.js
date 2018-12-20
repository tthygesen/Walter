import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

//Componetns  - modules
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
//Componetns  - modules
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
