import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
    //Speichern des Grundzustands, damit darauf zurückgesetzt werden kann.
    //abgewandelt von https://medium.com/@justintulk/best-practices-for-resetting-an-es6-react-components-state-81c0c86df98d
    this.searchEmpty = this.state;
  }

  //Bei jeder Eingabe wird die Suchanfrage geupdated
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  //Suchleiste zurücksetzen auf Ausgangsstatus
  resetSearch = () => {
    this.setState(this.searchEmpty);
  };

  /*
  render() {
    // console.log(this.props.todos);
    // .map rendert mehrere Elemente. Schleife durch vorhandene Elemente
    return (
      <input type="text"></input>,
      this.props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          //urgency={todo.urgency}
          markComplete={this.props.markComplete}
          toggleListReverse={this.props.toggleListReverse}
          delTodo={this.props.delTodo}
        />
      ))
    );
  } */

  render() {
    //Suchfunktion abgewandelt von https://www.youtube.com/watch?v=OlVkYnVXPl0
    let filteredTitles = this.props.todos.filter(todo => {
      return (
        todo.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <ul>
        <form className="search">
          <input
            class="searchbar"
            type="text"
            //Value ist am Anfang leer, anschließend durch Update des States mit eingegebene Buchstaben gefüllt

            placeholder=" Durchsuchen..."
            value={this.state.search}
            //Binden der neu eingegebenen Buchstaben an die Suchanfrage
            onChange={this.updateSearch.bind(this)}
          ></input>
          <input type="reset" class="btn_2" onClick={this.resetSearch}></input>
        </form>
        {filteredTitles.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            //urgency={todo.urgency}
            markComplete={this.props.markComplete}
            toggleListReverse={this.props.toggleListReverse}
            delTodo={this.props.delTodo}
            updateComponentWert={this.props.updateComponentWert}
          />
        ))}
      </ul>
    );
  }
}

//Prop Types werden definiert
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
