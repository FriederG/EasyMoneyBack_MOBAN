import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends Component {
  render() {
    // .map rendert mehrere Elemente. Dann Schleife: Für jedes Todo wird der Titel ausgegeben
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        updateComponentWert={this.props.updateComponentWert}
        delTodo={this.props.delTodo}
      />
    ));
  }
}

//Prop Types
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
