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

//Komponente App wird definiert
class App extends Component {
  //Grundaufbau der App (Einträge Hinzufügen und Löschen) abgewandelt von: https://www.youtube.com/watch?v=sBws8MSXN7A
  //grundlegende States, wenn keine Daten im local Storage vorhanden sind
  state = {
    //Objekt Schuldner mit Eigenschaften und dazugehörigen Werten.
    //ID wird automatisch durch Universally Unique Identifier (uuid) vergeben
    debtors: [
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
      debtors: [...this.state.debtors]
    });
  };

  //Eintrag löschen
  delTodo = id => {
    this.setState({
      debtors: [...this.state.debtors.filter(todo => todo.id !== id)]
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
      this.setState({ debtors: [...this.state.debtors, newTodo] });
    } else {
      fehler();
    }
  };

  // Umändern der Eigenschaft "completed" auf fertig oder noch aktiv
  // über die ID wird der korrekte Datensatz identifiziert
  markComplete = id => {
    this.setState({
      debtors: this.state.debtors.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Sortierungsfunkionen ---------------------------------------------------------------------------------------------------------------------------------------------------
  //Sortierung abgeändert von https://stackoverflow.com/questions/1969145/sorting-javascript-array-with-chrome, damit Chrome-kompatibel
  //Liste nach Betrag aufsteigend sortieren
  toggleListAmountUp = () => {
    const postList = [...this.state.debtors];
    postList.sort(function(a, b) {
      return parseInt(a.amount) > parseInt(b.amount) ? -1 : 1;
    });
    this.setState({
      debtors: postList
    });
  };

  //Liste nach Betrag absteigend sortieren
  toggleListAmountDown = () => {
    const postList = [...this.state.debtors];
    postList.sort(function(a, b) {
      return parseInt(a.amount) < parseInt(b.amount) ? -1 : 1;
    });
    //postList.sort(numSort);
    this.setState({
      debtors: postList
    });
  };

  //Fertige nach unten
  toggleListFinishedDown = () => {
    const postList = [...this.state.debtors];
    postList.sort(function(a, b) {
      return a.completed < b.completed ? -1 : 1;
    });
    //postList.sort(numSort);
    this.setState({
      debtors: postList.reverse()
    });
  };

  //Local Storage Speicherung --------------------------------------------------------------------------------------------------------------------------------------------
  //Speichern der Werte der Todos in local Storage. Immer nachdem eine Komponente geupdated wurde (componentDidUpdate)
  componentDidUpdate() {
    localStorage.setItem("debtors", JSON.stringify(this.state.debtors));
  }

  //auslesen aus Local storage, wenn es exisitert, wird es als state gesetzt
  componentWillMount() {
    localStorage.getItem("debtors") &&
      this.setState({
        debtors: JSON.parse(localStorage.getItem("debtors"))
      });
  }

  //Ausgabe-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <div className="App">
        {/*Komponenten werden untereinander angezeigt*/}
        <Header />
        {/*Sortierungsbuttons anzeigen*/}
        <div className="buttonrow">
          <button className="btn btn2" onClick={this.toggleListAmountUp}>
            {" "}
            Nach Betrag aufsteigend sortieren{" "}
          </button>
          <button className="btn btn1" onClick={this.toggleListAmountDown}>
            {" "}
            Nach Betrag absteigend sortieren{" "}
          </button>
          <div>
            <button className="btn_2" onClick={this.toggleListFinishedDown}>
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
          todos={this.state.debtors}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
          //Hier wird die Funktion bekannt gemacht
          updateComponentWert={this.updateComponentWert}
        />{" "}
      </div>
    );
  }
}

export default App;
