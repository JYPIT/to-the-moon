import { useQuery } from "react-query";
import { type } from "@testing-library/user-event/dist/type";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import AepxCharts from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
  isDark: boolean;
}
function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <AepxCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: { width: 500, height: 500, background: "transparent" },

            stroke: {
              curve: "smooth",
              width: 4,
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(1)}`,
              },
            },
            xaxis: {
              type: "datetime",
              labels: { datetimeFormatter: { month: "mmm 'yy" } },
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
