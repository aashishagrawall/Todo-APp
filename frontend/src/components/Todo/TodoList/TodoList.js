import React, { Component } from "react";
import TodoItem from "./TodoItem";
export default class TodoList extends Component {
  render() {
    const { items, clearList, handleModify } = this.props;
    return (
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">todo list</h3>
        {items.map((item) => {
          return (
            <TodoItem
              handleModify={() => handleModify(item.id)}
              key={item.id}
              title={item.title}
              status={item.status}
            />
          );
        })}
      </ul>
    );
  }
}
