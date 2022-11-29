// BitcoinCard.tsx
import React, { useState, useEffect } from "react";
import styles from "./BitcoinCard.module.css";

type Props = {
  currency: string;
};
function BitcoinCard({ currency }: Props) {
  const [prices, setPrices] = useState<Number[]>([]);

  useEffect(() => {
    function getPrice() {
      return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((result) => result.json())
        .then((result) => {
          let newPrice = parseFloat(
            result.bpi[currency].rate.replace(/,/g, "")
          ).toFixed(2);
          console.log("new price: ", newPrice);
          return Promise.resolve(Number(newPrice));
        });
    }
    const initialValue: Number[] = new Array(10).fill(0);
    getPrice().then((price) => {
      initialValue[0] = price;
      setPrices(initialValue);
      console.log("inital prices: ", initialValue);
    });

    function updatePrices() {
      getPrice().then((price) => {
        setPrices((prices) => {
          prices.pop();
          prices.unshift(price);
          console.log("prices: ", prices);
          return [...prices];
        });
      });
    }

    const interval = setInterval(() => {
      updatePrices();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.bitcoinCard}>
      <div className={styles.currency}>{currency}</div>
      <div className={styles.currentPrice}>
        {prices[0] && prices[0].toString()}
      </div>
      <input className={styles.userAmount} />
      <div className={styles.bitcoinAmount}>Bitcoin</div>
    </div>
  );
}

export default BitcoinCard;
