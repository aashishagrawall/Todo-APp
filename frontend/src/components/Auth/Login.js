import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  render() {
    const { login, loginError } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <div className="card card-body my-3">
              {loginError
                ? loginError.map((error, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        {error}
                      </li>
                    );
                  })
                : null}
              <form
                onSubmit={(e) =>
                  login(this.state.email, this.state.password, e)
                }
              >
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={this.state.email}
                    id="email"
                    onChange={this.handleChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    id="password"
                    onChange={this.handleChangePassword}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-success mt-3"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-block btn-success mt-3"
                  onClick={() => this.props.history.push("/register")}
                >
                  Switch to Register page
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
