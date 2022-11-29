import React from "react";
import "./App.css";
import BitcoinCard from "./components/BitcoinCard/BitcoinCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">Bitcoin Calculator</header>
      <BitcoinCard currency="USD" />
      <BitcoinCard currency="EUR" />
      <BitcoinCard currency="GBP" />
    </div>
  );
}

export default App;
