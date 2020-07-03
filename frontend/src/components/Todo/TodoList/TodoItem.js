import React, { Component } from "react";

export default class TodoItem extends Component {
  render() {
    const { title, status, handleModify } = this.props;
    return (
      <li
        className="list-group-item text-capitalize d-flex justify-content-between my-2"
        style={{ cursor: "pointer" }}
        onClick={handleModify}
      >
        <div>
          <h6>Title : {title}</h6>
        </div>
        <div>
          <h6>Status :{status}</h6>
        </div>
      </li>
    );
  }
}
