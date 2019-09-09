import React, { Component } from "react";
import PropTypes from "prop-types";
//Import der Icons zur Darstellung der Dringlichkeit
import icon1 from "../icons/./icon1.png";
import icon2 from "../icons/./icon2.png";
import icon3 from "../icons/./icon3.png";
import icon4 from "../icons/./icon4.png";
import icon5 from "../icons/./icon5.png";

export class TodoItem extends Component {
  state = {
    isInEditMode: false
  };

  getStyle = () => {
    if (this.props.todo.completed) {
      return {
        background: "#898989",

        color: "#aaa",
        padding: "10px",
        borderBottom: "1px #ccc dotted"
      };
    } else {
      return {
        background: "#898989",
        padding: "10px",
        borderBottom: "1px #ccc dotted",
        color: "#911600"
      };
    }
  };

  //Ändern in den Edit Mode, wenn doppelt auf einen Eintrag geklickt wird
  changeEditMode = () => {
    console.log("Edit Modus geändert");
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
  };

  //State, um Daten zu übergeben ----------------------------------------------------------------------------------------------
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  //Funktion zum Ausführen der Änderung im Textfeld ------------------------------------------------------------------------------------
  setTitle(event) {
    //Titel bekommt Wert aus dem Input-Feld
    this.props.todo.title = event.target.value;
  }

  //Funktion zum Ausführen der Änderung des Betrags ------------------------------------------------------------------------------------
  setAmount(eventAmount) {
    console.log("Änderung in Amount");
    //state wird gesetzt, Data wird der Wert aus dem Input-Feld zugewiesen
    this.setState({
      data: eventAmount.target.value
    });
    //Betrag bekommt Wert aus dem Input-Feld
    this.props.todo.amount = eventAmount.target.value;
  }

  //Funktion zum Ausführen der Änderung der Urgency ------------------------------------------------------------------------------------
  setUrgency(eventUrgency) {
    console.log("Änderung in Urgency");
    //state wird gesetzt, Data wird der Wert aus dem Input-Feld zugewiesen
    this.setState({
      data: eventUrgency.target.value
    });
    //Dringlichkeit bekommt Wert aus dem Input-Feld
    this.props.todo.urgency = eventUrgency.target.value;
  }

  render() {
    const { id, title, amount, urgency } = this.props.todo;
    //Abschnitt, der ausgegeben wird, wenn der Edit-Mode aktiviert ist
    return this.state.isInEditMode ? (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            //Wird gecheckt, wenn als completed vorhanden
            defaultChecked={this.props.todo.completed}
            onChange={this.props.markComplete.bind(this, id)}
          />
          <b>
            {/*Änderung für den Titel ----------------------------------------------------------------------------*/}
            <input
              type="text"
              id="titel"
              className="searchbar"
              defaultValue={title}
              //Änderung wird übertragen zu setTitle-Funktion
              onChange={this.setTitle.bind(this)}
              //onChange={this.setTitle}
            />
          </b>

          {/*Button, der Edit Mode abbricht 
          <button onClick={this.changeEditMode}>X</button>*/}
          {/*Änderungsfeld für Amount*/}
          <b>
            <input
              type="number"
              id="amount"
              className="searchbar"
              defaultValue={amount}
              //Änderung wird übertragen---------------------------------------------------
              onChange={this.setAmount.bind(this)}
            />
          </b>
          {/*Änderungsfeld für Dringlichkeit*/}
          <b>
            <input
              type="number"
              max="5"
              id="urgency"
              className="searchbar"
              defaultValue={urgency}
              //Änderung wird übertragen---------------------------------------------------
              onChange={this.setUrgency.bind(this)}
            />
          </b>
          {/*Bestätigungsbutton führt die Funktion updateComponentWert aus. Bindet die ID daran*/}
          <button
            className="btn_2"
            //  onClick={this.updateComponentWert.bind(this, id)}
            onClick={this.props.updateComponentWert.bind(this, id)}
            //Beendet den Edit-Modus
            onClickCapture={this.changeEditMode}
          >
            OKAY
          </button>
          {/*Löschbutton */}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    ) : (
      //Abschnitt, der ausgegeben wird, wenn der Edit Mode nicht aktiviert ist
      <div style={this.getStyle()}>
        <p onDoubleClick={this.changeEditMode}>
          <input
            type="checkbox"
            //Wird gecheckt, wenn als completed vorhanden
            defaultChecked={this.props.todo.completed}
            onChange={this.props.markComplete.bind(this, id)}
          />{" "}
          <span class="spantest">
            <b>{title}</b>
          </span>
          {/* bitee hier noch mit Flex was basteln ---------------------------------------------------------------------------------------------------------*/}
          <span class="spantest">{amount}€ </span>
          <span class="spantest">
            {/*Switch Case zur Auswahl des Dringlichkeitsicons.
          Code abgewandelt von https://react-cn.github.io/react/tips/if-else-in-JSX.html*/}
            {(() => {
              switch (urgency) {
                case "1":
                  return <img src={icon1} alt="1" height="30px"></img>;
                case "2":
                  return <img src={icon2} alt="2" height="30px"></img>;
                case "3":
                  return <img src={icon3} alt="3" height="30px"></img>;
                case "4":
                  return <img src={icon4} alt="4" height="30px"></img>;
                case "5":
                  return <img src={icon5} alt="5" height="30px"></img>;
                default:
                  return "";
              }
            })()}
          </span>
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    );
  }
}

//Prop Types
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

TodoItem.propTypes = {
  urgency: PropTypes.object
};

TodoItem.propTypes = {
  amount: PropTypes.object
};

const btnStyle = {
  background: "#911600",
  color: "white",
  border: "none",
  padding: "5px 9px",
  cursor: "pointer",
  float: "right"
};

export default TodoItem;
