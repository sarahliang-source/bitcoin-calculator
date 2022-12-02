import "./App.css";
import { useEffect, useState } from "react";
import BitcoinCard from "./components/BitcoinCard/BitcoinCard";
import getBitcoinPrices from "./services/getBicoinPrices";
import { getCurrencyPrice } from "./utils";

function App() {
  const [data, setData] = useState<any>();
  const [usdPrice, setUsdPrice] = useState<number>(0);

  const UPDATE_INTERVAL = 30000;

  useEffect(() => {
    // initialize data
    getBitcoinPrices().then((result: any) => {
      setData(result);
      const usPrice = getCurrencyPrice(result, "USD");
      setUsdPrice(usPrice);
    });

    // update data every 30 seconds
    function updatePrices() {
      getBitcoinPrices().then((result: any) => {
        setData(result);
        const usPrice = getCurrencyPrice(result, "USD");
        setUsdPrice(usPrice);
      });
    }
    const interval = setInterval(() => {
      updatePrices();
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">Bitcoin Calculator</header>
      <div className="Card-container">
        <BitcoinCard currency="USD" data={data} usdPrice={usdPrice} />
        <BitcoinCard currency="EUR" data={data} usdPrice={usdPrice} />
        <BitcoinCard currency="GBP" data={data} usdPrice={usdPrice} />
      </div>
    </div>
  );
}

export default App;
