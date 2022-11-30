import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./BitcoinCard.module.css";
import LineGraphModal from "../LineGraphModal/LineGraphModal";

// get current price of bitcoin from coindesk api
function getPrice(currency: string) {
  return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((result) => result.json())
    .then((result) => {
      let newPrice = parseFloat(
        result.bpi[currency].rate.replace(/,/g, "")
      ).toFixed(2);
      console.log("new price: ", newPrice);
      return Number(newPrice);
    });
}

function toFixed2(n: number) {
  return (`${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,2})?`)) as string[])[0];
}

type Props = {
  currency: string;
};
function BitcoinCard({ currency }: Props) {
  const [prices, setPrices] = useState<number[]>([]);
  const [usdPrice, setUsdPrice] = useState<number>();
  const [userAmount, setUserAmount] = useState<number>();
  const [bitcoinAmount, setBitcoinAmount] = useState<number>();
  const [animate, setAnimate] = useState(false);
  const [displayChart, setDisplayChart] = useState(false);

  useEffect(() => {
    if (userAmount && usdPrice) {
      console.log("use effect 1");
      const amt = toFixed2(userAmount / usdPrice);
      setBitcoinAmount(Number(amt));
    }
  }, [userAmount, usdPrice]);

  useEffect(() => {
    // initialize prices
    const initialValue: number[] = new Array(10).fill(0);
    getPrice(currency).then((price) => {
      initialValue[0] = price;
      setPrices(initialValue);
      console.log("inital prices: ", initialValue);
    });
    getPrice("USD").then((price) => {
      setUsdPrice(price);
    });

    // update prices every 30 seconds
    function updatePrices() {
      getPrice(currency).then((price) => {
        setPrices((prices) => {
          if (price !== prices[0]) {
            setAnimate(true);
            setTimeout(() => {
              setAnimate(false);
            }, 3000);
          }
          prices.pop();
          prices.unshift(price);
          console.log("prices: ", prices);
          return [...prices];
        });
      });
      getPrice("USD").then((price) => {
        setUsdPrice(price);
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
    <>
      {displayChart && (
        <LineGraphModal
          currency={currency}
          prices={prices}
          closeModal={() => {
            setDisplayChart(false);
          }}
        />
      )}
      <div
        className={styles.bitcoinCard}
        onClick={() => {
          setDisplayChart(true);
        }}
      >
        <div className={styles.currency}>{currency}</div>
        <div className={clsx(styles.currentPrice, animate && styles.blink)}>
          {prices[0].toFixed(2)}
        </div>
        <input
          className={styles.userAmount}
          type="number"
          value={Number(userAmount).toString()}
          onChange={(e) => {
            setUserAmount(Number(e.target.value));
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <div className={styles.bitcoinAmount}>{bitcoinAmount} Bitcoin</div>
      </div>
    </>
  );
}

export default BitcoinCard;
