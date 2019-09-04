import React, { Component } from "react";
import "./App.css";
import Header from "./components/layout/header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
//package, das IDs generiert
import uuid from "uuid";

class App extends Component {
  //grundlegende States, wenn keine Daten im local Storage vorhanden sind
  state = {
    //Objekt mit Eigenschaften und dazugehörigen Werten.
    //ID wird automatisch durch Universally Unique Identifier (uuid) vergeben
    todos: [
      {
        id: uuid.v4(),
        title: "trash",
        urgency: "1",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Dinner",
        urgency: "1",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Meeting",
        urgency: "1",
        completed: false
      }
    ]
  };

  // Umändern der Eigenschaft "completed auf fertig oder noch aktiv"
  // über die ID wird der korrekte Datensatz identifiziert
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Eintrag ändern ----------------------------------------------------------------------------------------------------------------
  /*updateComponentWert = id => {
    console.log("Änderung bestätigt");
    //State wird neu gesetzt mit dem aktuellen Inhalt
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.isInEditMode = !todo.isInEditMode;
          todo.title = id; //------------???????????????????????????????????????????????????????????????????
        }
        return todo;
      })
    });
  };
 */

  //Eintrag löschen
  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  //Eintrag zufügen
  addTodo = (title, urgency) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      urgency: urgency,
      completed: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  //auslesen aus local storage, wenn es exisitert, wird es als state gesetzt
  componentWillMount() {
    localStorage.getItem("todos") &&
      this.setState({
        todos: JSON.parse(localStorage.getItem("todos"))
      });
  }
  //Speichern in local Storage. Immer nachdem neu gerendert wird (componentDidUpdate)
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  //Ausgabe
  render() {
    return (
      <div className="App">
        {/*Komponenten werden untereinander angezeigt*/}
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <Todos
          //Todos werden als prop zu Todos-Component übergeben
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
          updateComponentWert={this.updateComponentWert}
        />{" "}
      </div>
    );
  }
}

export default App;
