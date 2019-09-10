import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: "",
    urgency: ""
  };

  onSubmit = e => {
    e.preventDefault();
    //Titel und Dringlichkeit werden übergeben
    this.props.addTodo(this.state.title, this.state.amount, this.state.urgency);
    this.setState({ title: "" });
    this.setState({ amount: "" });
    this.setState({ urgency: "" });
  };
  //Bei Änderungen soll State geändert werden
  onChangeTitle = e => this.setState({ title: e.target.value });
  onChangeAmount = e => this.setState({ amount: e.target.value });
  onChangeUrgency = e => this.setState({ urgency: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        {/*Input für die Schuldner */}
        <input
          className="searchbar"
          minLength="0"
          maxLength="40"
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px", border: "1px solid #911600" }}
          placeholder="Schuldner hinzufügen..."
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
        {/*Input für die Betrag */}
        <input
          type="number"
          className="searchbar"
          name="amount"
          min="0"
          style={{ flex: "5", padding: "5px", border: "1px solid #911600" }}
          placeholder="Betrag..."
          value={this.state.amount}
          onChange={this.onChangeAmount}
        />
        {/*Input für die Dringlichkeit */}
        <input
          type="number"
          className="searchbar"
          min="1"
          max="5"
          name="urgency"
          style={{ flex: "5", padding: "5px", border: "1px solid #911600" }}
          placeholder="Gefahr von 1 bis 5"
          value={this.state.urgency}
          onChange={this.onChangeUrgency}
        />

        {/*Bestätigungsknopf*/}
        <input
          type="submit"
          value="OK"
          className="btn_2"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

export default AddTodo;
