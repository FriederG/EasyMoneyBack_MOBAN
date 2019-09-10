import React from "react";
import logo from "./logo.png";

function Header() {
  return (
    <header style={headerStyle}>
      <img height="80px" src={logo} alt="logo"></img>
    </header>
  );
}

const headerStyle = {
  background: "#911600",
  color: "#FFFFFF",
  textAlign: "center",
  padding: "10px"
  //fontFamily: "bookman"
};

export default Header;
