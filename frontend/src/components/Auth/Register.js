import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
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
    const { register, registerError } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <div className="card card-body my-3">
              <ul className="list-group">
                {registerError
                  ? registerError.map((error, index) => {
                      return (
                        <li className="list-group-item" key={index}>
                          {error}
                        </li>
                      );
                    })
                  : null}
              </ul>
              <form
                onSubmit={(e) =>
                  register(
                    this.state.name,
                    this.state.email,
                    this.state.password,
                    e
                  )
                }
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Name"
                    value={this.state.name}
                    id="name"
                    onChange={this.handleChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    className="form-control "
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
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-block btn-success mt-3"
                  onClick={() => this.props.history.push("/login")}
                >
                  Switch to login page
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
