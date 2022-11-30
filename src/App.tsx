import "./App.css";
import BitcoinCard from "./components/BitcoinCard/BitcoinCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">Bitcoin Calculator</header>
      <div className="Card-container">
        <BitcoinCard currency="USD" />
        <BitcoinCard currency="EUR" />
        <BitcoinCard currency="GBP" />
      </div>
    </div>
  );
}

export default App;
