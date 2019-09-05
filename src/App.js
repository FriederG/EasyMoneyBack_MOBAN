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

//Variable sort zum Einstellen der Sortierung der Einträge
var sort = localStorage.getItem("sort");
console.log("variable sort ist", sort);

//Variable sortFinished gibt an, ob die fertigen Einträge unten angezeigt werden
var sortFinished = localStorage.getItem("finished");
console.log("variable sortFinished ist", sortFinished);

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

  //Eintrag ändern -----------------------
  /*updateComponentWert = id => {
    console.log("Änderung bestätigt");
    //State wird neu gesetzt mit dem aktuellen Inhalt
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.isInEditMode = !todo.isInEditMode;
          todo.title = id; //------------
        }
        return todo;
      })
    });
  };
 */

  //Änderungen der Einträge ------------------------------------------------------------------------------------------------------------------------------------------------------
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

  //Sortierungsfunkionen ---------------------------------------------------------------------------------------------------------------------------------------------------
  //Liste von Groß nach Klein sortieren
  toggleListAmountDown() {
    console.log("Absteigend sortiert");
    const postList = this.state.todos;
    var newPostList = postList.sort(
      (a, b) => parseInt(a.amount) < parseInt(b.amount)
    );
    console.log(this.state.todos);
    console.log(newPostList);
  }

  //Liste von Klein nach Groß sortieren
  toggleListAmountUp() {
    console.log("Aufsteigend sortiert");
    const postList = this.state.todos;
    var newPostList = postList.sort(
      (a, b) => parseInt(a.amount) > parseInt(b.amount)
    );
    console.log(this.state.todos);
    console.log(newPostList);
  }

  //Fertige nach unten anordnen
  toggleListFinishedDown() {
    console.log("Fertige nach unten");
    const postList = this.state.todos;
    var newPostList = postList.sort((a, b) => a.completed > b.completed);
    console.log(this.state.todos);
    console.log(newPostList);
  }

  //Funktion, um gewählte Sortierung von Klein nach Groß in LocalStorag zu speichern, damit Einstellung erhalten bleibt
  btnValuetUp() {
    console.log("btnTestUp");
    localStorage.setItem("sort", "amountUp");
    console.log(sort);
    window.location.reload();
  }

  //Funktion, um gewählte Sortierung von Groß nach Klein in Local Storage zu speichern
  btnValueDown() {
    console.log("btnTestDown");
    localStorage.setItem("sort", "amountDown");
    console.log(sort);
    window.location.reload();
  }

  //Funktion, um Variable für fertige Einträge unten im Local Storage zu speichern
  btnFinishedDown() {
    localStorage.setItem("finished", "true");
    //Wenn der Wert schon true ist, wird er geleert, die Einträge also wieder gemischt
    if (sortFinished === "true") {
      localStorage.setItem("finished", "");
    }
    console.log(sort);
    window.location.reload();
  }

  //Local Storage Speicherung --------------------------------------------------------------------------------------------------------------------------------------------
  //Speichern der Werte der Todos in local Storage. Immer nachdem neu gerendert wird (componentDidUpdate)
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  //auslesen aus Local storage, wenn es exisitert, wird es als state gesetzt
  componentWillMount() {
    localStorage.getItem("todos") &&
      this.setState({
        todos: JSON.parse(localStorage.getItem("todos"))
      });
  }

  //Ausgabe-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  render() {
    //Ausführung von Sortierung je nach Wert im Local Storage
    if (sort === "amountUp") {
      this.toggleListAmountUp();
    }
    if (sort === "amountDown") {
      this.toggleListAmountDown();
    }
    if (sortFinished === "true") {
      this.toggleListFinishedDown();
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
        <button onClick={this.btnFinishedDown}>
          {" "}
          Fertige nach unten an/aus{" "}
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
