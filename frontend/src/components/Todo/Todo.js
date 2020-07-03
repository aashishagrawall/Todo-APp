import React, { Component } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList/TodoList";
import { Redirect, withRouter } from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";
class Todo extends Component {
  state = {
    items: [],
    id: uuid(),
    item: {
      title: "",
      status: "",
    },
    currentlySelected: false,
    passwordupdate: "",
  };

  handleChangeTitle = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        title: e.target.value,
      },
    });
  };
  handleChangeStatus = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        status: e.target.value,
      },
    });
  };
  handleChangePassword = (e) => {
    this.setState({
      passwordupdate: e.target.value,
    });
  };
  addItem = async (e) => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item.title,
      status: this.state.item.status,
    };

    const updatedItems = this.state.items.concat(newItem);
    try {
      const res = await this.axios.post("/todos", newItem);
      if (res.data.status == true) {
        alert("Successfully added");
        this.setState({
          items: updatedItems,
          item: {
            ...this.state.item,
            title: "",
            status: "",
          },
          id: uuid(),
          currentlySelected: false,
        });
      } else {
        alert("Cannot add items \n" + res.data.errors.toString());
        this.props.updateToken();
      }
    } catch (err) {
      alert("Cannot add items \n" + err.message);
    }
  };

  handleModify = (id) => {
    //const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);
    const item = { ...selectedItem };

    //console.log(selectedItem);

    this.setState({
      item: item,
      currentlySelected: true,
      id: id,
    });
    console.log("herre");
  };
  deleteItem = async () => {
    const filteredItems = this.state.items.filter(
      (item) => item.id !== this.state.id
    );
    try {
      const res = await this.axios.delete(`/todos/${this.state.id}`);
      if (res.data.status == true) {
        alert("Successfully deleted");
        this.setState({
          items: filteredItems,
          currentlySelected: false,
          item: {
            ...this.state.item,
            title: "",
            status: "",
          },
          id: uuid(),
        });
      } else {
        alert("Cannot delete item \n" + res.data.errors.toString());
        this.props.updateToken();
      }
    } catch (err) {
      alert("Cannot delete item \n" + err.message);
    }
  };
  updateItem = async () => {
    const updatedArray = this.state.items.map((item) => {
      if (item.id === this.state.id) {
        return {
          ...item,
          title: this.state.item.title,
          status: this.state.item.status,
        };
      }
      return item;
    });
    try {
      const res = await this.axios.put(`/todos/${this.state.id}`, {
        title: this.state.item.title,
        status: this.state.item.status,
      });
      if (res.data.status == true) {
        alert("Successfully updated");
        this.setState({
          items: updatedArray,
          item: {
            ...this.state.item,
            title: "",
            status: "",
          },
          id: uuid(),
          currentlySelected: false,
        });
      } else {
        alert("Cannot update item \n" + res.data.errors.toString());
        this.props.updateToken();
      }
    } catch (err) {
      alert("Cannot update item \n" + err.message);
    }
  };

  updatePassword = async () => {
    console.log("password update");

    try {
      const res = await this.axios.put("/updatePassword", {
        password: this.state.passwordupdate,
      });
      if (res.data.status == true) {
        alert("password updated");
      } else {
        alert("Cannot update password" + res.data.errors.toString());
      }
    } catch (err) {
      alert("Cannot update password \n" + err.message);
    }
  };
  async componentDidMount() {
    console.log("here");
    this.axios = axios.create({
      headers: {
        authorization: `Bearer ${this.props.token}`,
      },
      baseURL: "http://localhost:4000",
    });

    console.log("token", this.props.token);
    try {
      const res = await this.axios.get("/todos");
      console.log(res);
      if (res.data.status == true) {
        this.setState({ items: res.data.items });
      } else {
        alert("Cannot fetch items \n" + res.data.errors.toString());
        this.props.updateToken();
      }
    } catch (err) {
      alert("Cannot fetch items \n" + err.message);
    }
  }
  render() {
    let redirect;
    console.log(this.props.token);
    if (this.props.token === null) {
      redirect = <Redirect to="/login" />;
    } else {
      redirect = (
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
              <h3 className="text-capitalize text-center">Todo Input</h3>
              <TodoInput
                item={this.state.item}
                handleChangeTitle={this.handleChangeTitle}
                handleChangeStatus={this.handleChangeStatus}
                addItem={this.addItem}
                updateItem={this.updateItem}
                deleteItem={this.deleteItem}
                currentlySelected={this.state.currentlySelected}
              />
              <TodoList
                items={this.state.items}
                clearList={this.clearList}
                handleModify={this.handleModify}
              />
              <div className="col-10 mx-auto col-md-8 mt-4">
                <div className="card card-body my-3">
                  <form>
                    <div className="form-group">
                      <label htmlFor="passwordupdate">passwordupdate</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="passwordupdate"
                        value={this.state.passwordupdate}
                        id="passwordupdate"
                        onChange={this.handleChangePassword}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-block btn-success mt-3"
                      onClick={this.updatePassword}
                    >
                      Update password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return redirect;
  }
}

export default withRouter(Todo);
