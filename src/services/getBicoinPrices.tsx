// get current price of bitcoin from coindesk api
export default function getBitcoinPrices() {
  return fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(
    (result) => {
      if (result.ok) {
        return result.json();
      }
      throw new Error("Server responds with error!");
    }
  );
}
