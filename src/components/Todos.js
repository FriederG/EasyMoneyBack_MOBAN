import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
//Einbinden von FlipMove für animiertes Sortieren: https://github.com/joshwcomeau/react-flip-move
import FlipMove from "react-flip-move";

class Todos extends Component {
  //Speichern des Grundzustands, damit darauf zurückgesetzt werden kann.
  //abgewandelt von https://medium.com/@justintulk/best-practices-for-resetting-an-es6-react-components-state-81c0c86df98d
  //Suchfunktion abgewandelt von https://www.youtube.com/watch?v=OlVkYnVXPl0
  constructor() {
    super();
    this.state = {
      search: ""
    };
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

  render() {
    //Ausgabe nur gefilterte Elemente, die in der Such auch eingegeben wurden
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
        <FlipMove>
          {filteredTitles.reverse().map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
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

//Prop Types für Typechecking
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
