import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { registerables, Chart, ChartData } from "chart.js";
import styles from "./LineGraphModal.module.css";

Chart.register(...registerables);

type Props = {
  currency: string;
  prices: number[];
  closeModal: () => void;
};
function LineGraphModal({ currency, prices, closeModal }: Props) {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      labels: ["4.5", "4", "3.5", "3", "2.5", "2", "1.5", "1", "0.5", "0"],
      datasets: [
        {
          label: currency.concat(" Bitcoin Prices"),
          data: prices,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    });
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span
          className={styles.closeButton}
          onClick={() => {
            closeModal();
          }}
        >
          &times;
        </span>
        <Line data={chartData} />
        <div className={styles.xLabel}>minutes ago</div>
      </div>
    </div>
  );
}

export default LineGraphModal;
