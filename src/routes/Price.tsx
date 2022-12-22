import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";

interface ICoinProps {
  coinId: string;
  coinPrice: number;
  coinChange24h: number;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId, coinPrice, coinChange24h }: ICoinProps) {
  // TODO: Price에 들어갈 내용 추가
  const { isLoading: infoLoading, data: infoData } = useQuery<PriceData>(
    ["info", coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <div>
      <h1>$ {coinPrice}</h1>
      <h1>{coinChange24h}%</h1>
    </div>
  );
}

export default Price;
