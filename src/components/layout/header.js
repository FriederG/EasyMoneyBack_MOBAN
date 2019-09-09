import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1> EasyMoneyBack</h1>
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
