import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";

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
        <div className="addTodo">
          <form className="search">
            <input
              className="searchbar"
              type="text"
              //Value ist am Anfang leer, anschließend durch Update des States mit eingegebene Buchstaben gefüllt
              placeholder=" Durchsuchen..."
              value={this.state.search}
              //Binden der neu eingegebenen Buchstaben an die Suchanfrage
              onChange={this.updateSearch.bind(this)}
            ></input>
            <input
              type="reset"
              className="btn_2"
              onClick={this.resetSearch}
            ></input>
          </form>
        </div>
        {/*Animiertes Sortieren mit FlipMove: https://github.com/joshwcomeau/react-flip-move*/}
        <FlipMove>
          {filteredTitles.reverse().map(todo => (
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
        </FlipMove>
      </ul>
    );
  }
}

//Prop Types werden definiert
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
