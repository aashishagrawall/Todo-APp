import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";

class Password extends Component {
  state = {
    password: "",
  };

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  updatePassword = async (e) => {
    e.preventDefault();
    const axiosInstance = axios.create({
      headers: {
        authorization: `Bearer ${this.props.token}`,
      },
      baseURL: "http://localhost:4000",
    });

    console.log("token", this.props.token);
    try {
      const res = await this.axios.put("/updatePassword");
      if (res.data.status == true) {
        alert("password updated");
        this.props.history.push("/");
      } else {
        alert("Cannot update password" + res.data.errors.toString());
      }
    } catch (err) {
      alert("Cannot update password \n" + err.message);
    }
  };

  render() {
    const { token } = this.props;
    let redirect;
    if (token === null) {
      redirect = <Redirect to="/login" />;
    } else {
      redirect = (
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
              <div className="card card-body my-3">
                <form onSubmit={this.updatePassword}>
                  <button
                    type="submit"
                    className="btn btn-block btn-success mt-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return redirect;
  }
}
export default withRouter(Password);
