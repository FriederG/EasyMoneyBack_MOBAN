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
/*var sort = localStorage.getItem("sort");
console.log("variable sort ist", sort);*/

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

  //Änderungen der Einträge ------------------------------------------------------------------------------------------------------------------------------------------------------
  //Eintrag neuen Wert zuweisen -----------------------
  updateComponentWert = id => {
    console.log("updateComponentWert in App.js wurde ausgeführt");
    //State wird einmal gleich neu gesetzt, damit Komponente neu gerendert und Änderung (durch componentDidUpdate) gespeichert wird
    this.setState({
      todos: [...this.state.todos]
    });
  };

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

  //Liste nach Betrag aufsteigend sortieren
  //Sortierung abgeändert von https://stackoverflow.com/questions/1969145/sorting-javascript-array-with-chrome, damit Chrome-kompatibel
  toggleListAmountUp = () => {
    const postList = [...this.state.todos];
    postList.sort(function(a, b) {
      return parseInt(a.amount) > parseInt(b.amount) ? -1 : 1;
    });
    this.setState({
      todos: postList
    });
  };

  //Liste nach Betrag absteigend sortieren
  toggleListAmountDown = () => {
    const postList = [...this.state.todos];
    postList.sort(function(a, b) {
      return parseInt(a.amount) < parseInt(b.amount) ? -1 : 1;
    });
    //postList.sort(numSort);
    this.setState({
      todos: postList
    });
  };

  //Fertige nach unten
  toggleListFinishedDown = () => {
    const postList = [...this.state.todos];
    postList.sort(function(a, b) {
      return a.completed < b.completed ? -1 : 1;
    });
    //postList.sort(numSort);
    this.setState({
      todos: postList.reverse()
    });
  };

  //Funktion, um gewählte Sortierung von Klein nach Groß in LocalStorage zu speichern, damit Einstellung erhalten bleibt
  /*
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
  } */

  //Local Storage Speicherung --------------------------------------------------------------------------------------------------------------------------------------------
  //Speichern der Werte der Todos in local Storage. Immer nachdem eine Komponente geupdated wurde (componentDidUpdate)
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

  //Style wenn die Sortierung für fertige an oder aus ist
  /*
  getStyleFinished = () => {
    if (sortFinished === "true") {
      return {
        color: "#aaa",
        background: "#911600"
      };
    }
  };

  getStyleUp = () => {
    if (sort === "amountUp") {
      return {
        color: "#aaa",
        background: "#911600"
      };
    }
  };
  getStyleDown = () => {
    if (sort === "amountDown") {
      return {
        color: "#aaa",
        background: "#911600"
      };
    }
  }; */

  //Ausgabe-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  render() {
    //Ausführung von Sortierung je nach Wert im Local Storage
    /* if (sort === "amountUp") {
      this.toggleListAmountUp();
    } 
    if (sort === "amountDown") {
      this.toggleListAmountDown();
    } 
    if (sortFinished === "true") {
      this.toggleListFinishedDown();
    } */
    return (
      <div className="App">
        {/*Komponenten werden untereinander angezeigt*/}
        <Header />
        <div className="buttonrow">
          <button
            //style={this.getStyleUp()}
            className="btn btn2"
            onClick={this.toggleListAmountUp}
          >
            {" "}
            Nach Betrag aufsteigend sortieren{" "}
          </button>
          <button
            //style={this.getStyleDown()}
            className="btn btn1"
            onClick={this.toggleListAmountDown}
          >
            {" "}
            Nach Betrag absteigend sortieren{" "}
          </button>
          <div>
            <button
              //style={this.getStyleFinished()}
              className="btn_2"
              onClick={this.toggleListFinishedDown}
            >
              {" "}
              Fertige nach unten{" "}
            </button>
          </div>
        </div>
        <div className="addTodo">
          <AddTodo addTodo={this.addTodo} />
        </div>
        <Todos
          //Todos werden als prop zu Todos-Component übergeben
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
          //Hier wird die Funktion bekannt gemachts
          updateComponentWert={this.updateComponentWert}
          // toggleListReverse={this.toggleListReverse}
        />{" "}
      </div>
    );
  }
}

export default App;
