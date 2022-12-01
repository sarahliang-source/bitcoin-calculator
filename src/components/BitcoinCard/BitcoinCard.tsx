import { useState, useEffect } from "react";
import LineGraphModal from "../LineGraphModal/LineGraphModal";
import { toFixed2, getCurrencyPrice } from "../../utils/index";
import clsx from "clsx";
import styles from "./BitcoinCard.module.css";

type BitcoinCardProps = {
  currency: string;
  data: any;
  usdPrice: number;
};
function BitcoinCard({ currency, data, usdPrice }: BitcoinCardProps) {
  const [prices, setPrices] = useState<number[]>([]);
  const [userAmount, setUserAmount] = useState<number>(0);
  const [bitcoinAmount, setBitcoinAmount] = useState<number>(0);
  const [animate, setAnimate] = useState(false);
  const [displayChart, setDisplayChart] = useState(false);

  useEffect(() => {
    const initialValue: number[] = new Array(10).fill(0);
    setPrices(initialValue);
  }, []);

  useEffect(() => {
    if (data) {
      const currencyPrice = getCurrencyPrice(data, currency);
      setPrices((prices) => {
        if (currencyPrice !== prices[0] && prices[0] !== 0) {
          setAnimate(true);
          setTimeout(() => {
            setAnimate(false);
          }, 3000);
        }
        prices.pop();
        prices.unshift(currencyPrice);
        return [...prices];
      });
    }
  }, [data]);

  useEffect(() => {
    if (userAmount && usdPrice) {
      const amt = toFixed2(userAmount / usdPrice);
      setBitcoinAmount(parseFloat(amt));
    }
  }, [userAmount, usdPrice]);

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
          {prices[0]?.toFixed(2)}
        </div>
        <input
          className={styles.userAmount}
          type="number"
          value={Number(userAmount).toString()}
          onChange={(e) => {
            setUserAmount(parseFloat(e.target.value));
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
