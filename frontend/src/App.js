import React, { Component } from "react";
import Todo from "./components/Todo/Todo";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    token: null,
    registerError: null,
    loginError: null,
  };
  register = async (name, email, password, e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/register", {
        name: name,
        email: email,
        password: password,
      });

      if (res.data.status == false) {
        this.setState({ registerError: res.data.errors });
      } else {
        localStorage.setItem("token", res.data.token);
        this.setState({ token: res.data.token });
      }
    } catch (err) {
      console.log(err);
    }
  };

  login = async (email, password, e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });

      if (res.data.status == false) {
        this.setState({ loginError: res.data.errors });
      } else {
        localStorage.setItem("token", res.data.token);
        this.setState({ token: res.data.token });
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    console.log("Compient App.js");
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ token: token });
    }
  }
  updateToken = () => {
    localStorage.removeItem("token");
    this.setState({
      token: null,
      registerError: null,
      loginError: null,
    });
  };
  render() {
    return (
      <Router>
        <Route
          path="/"
          exact
          render={() => {
            return this.state.token ? (
              <Todo token={this.state.token} updateToken={this.updateToken} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          path="/register"
          exact
          render={() => {
            return this.state.token ? (
              <Redirect to="/" />
            ) : (
              <Register
                register={this.register}
                registerError={this.state.registerError}
              />
            );
          }}
        />
        <Route
          path="/login"
          exact
          render={() => {
            return this.state.token ? (
              <Redirect to="/" />
            ) : (
              <Login login={this.login} loginError={this.state.loginError} />
            );
          }}
        />
      </Router>
    );
  }
}

export default App;
