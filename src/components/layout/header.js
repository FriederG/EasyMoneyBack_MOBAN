import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1> TodoListe</h1>
    </header>
  );
}

const headerStyle = {
  background: "blue",
  color: "white",
  textAlign: "center",
  padding: "10px"
};

export default Header;
