// get current price of bitcoin from coindesk api
export default function getBitcoinPrices() {
  return fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(
    (result) => {
      return result.json();
    }
  );
}
