import React, { Component } from "react";

export default class TodoInput extends Component {
  render() {
    const {
      item,
      handleChangeStatus,
      handleChangeTitle,
      addItem,
      currentlySelected,
      deleteItem,
      updateItem,
    } = this.props;
    return (
      <div className="card card-body my-3">
        <form onSubmit={addItem}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control text-capitalize"
              placeholder="add a title"
              value={item.title}
              id="title"
              onChange={handleChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control text-capitalize"
              placeholder="add a Status"
              value={item.status}
              id="status"
              onChange={handleChangeStatus}
            />
          </div>

          {!currentlySelected ? (
            <button
              type="button"
              className="btn btn-block btn-success mt-3"
              onClick={addItem}
            >
              Add Item
            </button>
          ) : (
            <React.Fragment>
              <button
                type="button"
                className="btn btn-block btn-success mt-3"
                onClick={updateItem}
              >
                Update Item
              </button>
              <button
                type="button"
                className="btn btn-block btn-success mt-3"
                onClick={deleteItem}
              >
                Delete Item
              </button>
            </React.Fragment>
          )}
        </form>
      </div>
    );
  }
}
