import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: "",
    urgency: "1"
  };

  onSubmit = e => {
    e.preventDefault();
    //Titel und Dringlichkeit werden übergeben
    this.props.addTodo(this.state.title, this.state.urgency);
    this.setState({ title: "" });
    this.setState({ urgency: "" });
  };
  //Bei Änderungen soll State geändert werden
  onChangeTitle = e => this.setState({ title: e.target.value });
  onChangeUrgency = e => this.setState({ urgency: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Neues Todo hinzufügen..."
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
        {/*Input für die Dringlichkeit */}
        <input
          type="number"
          max="5"
          name="urgency"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Dringlichkeit"
          value={this.state.urgency}
          onChange={this.onChangeUrgency}
        />

        {/*Bestätigungsknopf*/}
        <input
          type="submit"
          value="bestätigen"
          className="button"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

export default AddTodo;
