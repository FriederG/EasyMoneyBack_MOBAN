import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends Component {
  render() {
    console.log(this.props.todos);
    // .map rendert mehrere Elemente. Schleife durch vorhandene Elemente
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        //urgency={todo.urgency}
        markComplete={this.props.markComplete}
        updateComponentWert={this.props.updateComponentWert}
        delTodo={this.props.delTodo}
      />
    ));
  }
}

//Prop Types werden definiert
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
