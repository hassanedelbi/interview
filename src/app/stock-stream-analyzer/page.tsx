import StockAnalyzer from "@/app/stock-stream-analyzer/_components";
import { Requirements } from "@/app/stock-stream-analyzer/_components/requirements";

const StockStreamAnalyzer = () => {
  return (
    <div className="flex flex-col gap-8">
      <Requirements />
      <StockAnalyzer />
    </div>
  );
};
export default StockStreamAnalyzer;
