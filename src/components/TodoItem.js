import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  state = {
    isInEditMode: false
  };

  getStyle = () => {
    return {
      background: "grey",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      //Bedingung, ob completed true oder false ist. Dementsprechend anderer Style
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  //Ändern in den Edit Mode, wenn doppelt auf einen Eintrag geklcikt wird
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
    console.log("Änderung im Textfeld");
    //state wird gesetzt, Data wird der Wert aus dem Input-Feld zugewiesen
    this.setState({
      data: event.target.value
    });
    //Titel bekommt Wert us dem Input-Feld
    this.props.todo.title = event.target.value;
  }

  render() {
    const { id, title } = this.props.todo;
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
          <b onDoubleClick={this.changeEditMode}>
            <input
              type="text"
              id="titel"
              defaultValue={title}
              //Änderung wird übertragen zu setTitle-Funktion---------------------------------------------------
              onChange={this.setTitle.bind(this)}
            />
          </b>

          {/*Button, der Edit Mode abbricht 
          <button onClick={this.changeEditMode}>X</button>*/}

          {/*Bestätigungsbutton führt die Funktin updateComponentWert aus. Bindet die ID daran*/}
          <button
            //  onClick={this.updateComponentWert.bind(this, id)}
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
        <p>
          <input
            type="checkbox"
            //Wird gecheckt, wenn als completed vorhanden
            defaultChecked={this.props.todo.completed}
            onChange={this.props.markComplete.bind(this, id)}
          />{" "}
          <b onDoubleClick={this.changeEditMode}>{title}</b>
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

const btnStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 9px",
  cursor: "pointer",
  float: "right"
};

export default TodoItem;
