import React, { Component } from "react";
import "./App.css";
import Header from "./components/layout/header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
//package, das IDs generiert
import uuid from "uuid";

//Funktion für Fehlermeldung, wenn nicht alle Werte bei Neueintag ausgefüllt
function fehler() {
  console.log("fehler");
  window.alert("Bitte Schuldner, Betrag und Dringlichkeit eintragen!");
}

var sort = document.cookie;
console.log(sort);
console.log(document.cookie);

class App extends Component {
  //grundlegende States, wenn keine Daten im local Storage vorhanden sind
  state = {
    //Objekt mit Eigenschaften und dazugehörigen Werten.
    //ID wird automatisch durch Universally Unique Identifier (uuid) vergeben
    todos: [
      {
        id: uuid.v4(),
        title: "Toni",
        amount: "1000",
        urgency: "3",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Jack",
        amount: "100",
        urgency: "1",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Bill the Knife",
        amount: "100",
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
  addTodo = (title, amount, urgency) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      amount: amount,
      urgency: urgency,
      completed: false
    };
    //Prüfung, ob alles ausgefüllt
    if (title !== "" && amount !== "" && urgency !== "") {
      this.setState({ todos: [...this.state.todos, newTodo] });
    } else {
      fehler();
    }
  };

  //auslesen aus local storage, wenn es exisitert, wird es als state gesetzt
  componentWillMount() {
    localStorage.getItem("todos") &&
      this.setState({
        todos: JSON.parse(localStorage.getItem("todos"))
      });
  }

  //Liste rückwärts sortieren --------------------------------------------------------------------------------------------
  toggleListReverse(event) {
    console.log("rückwärts");
    const postList = this.state.todos;
    var newPostList = postList.reverse();
    console.log(this.state.todos);
    console.log(newPostList);
  }

  toggleListAmountDown() {
    console.log("Absteigend sortiert");
    const postList = this.state.todos;
    var newPostList = postList.sort((a, b) => a.amount.value < b.amount.value);
    console.log(this.state.todos);
    console.log(newPostList);
  }
  toggleListAmountUp() {
    console.log("Aufsteigend sortiert");
    const postList = this.state.todos;
    var newPostList = postList.sort(
      (a, b) => a.amount.length > b.amount.length
    );
    console.log(this.state.todos);
    console.log(newPostList);
  }

  btnValuetUp() {
    console.log("btnTestUp");
    //console.log(this.state.todos);
    document.cookie = "amountUp";
    console.log(sort);
    window.location.reload();
  }

  btnValueDown() {
    console.log("btnTestDown");
    //console.log(this.state.todos);
    document.cookie = "amountDown";
    console.log(sort);
    window.location.reload();
  }

  //Speichern in local Storage. Immer nachdem neu gerendert wird (componentDidUpdate)
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  //Ausgabe
  render() {
    //this.toggleListReverse();
    //this.toggleListAmountDown();
    if (sort === "amountUp") {
      this.toggleListAmountUp();
    }
    if (sort === "amountDown") {
      this.toggleListAmountDown();
    }
    return (
      <div className="App">
        {/*Komponenten werden untereinander angezeigt*/}
        <Header />
        <button onClick={this.btnValuetUp}>
          {" "}
          Nach Betrag aufsteigend sortieren{" "}
        </button>
        <button onClick={this.btnValueDown}>
          {" "}
          Nach Betrag absteigend sortieren{" "}
        </button>
        <AddTodo addTodo={this.addTodo} />
        <Todos
          //Todos werden als prop zu Todos-Component übergeben
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
          // toggleListReverse={this.toggleListReverse}
        />{" "}
      </div>
    );
  }
}

export default App;
