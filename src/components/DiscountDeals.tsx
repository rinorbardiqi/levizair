import EarnPoints from "./EarnPoints";
import SavePercentage from "./SavePercentage";

interface P {
  original: number;
  discounted: number;
  loyalty?: number;
  save?: number;
}
const DiscountDeals = ({ original, discounted, loyalty, save }: P) => {
  return (
    <div>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-semibold">${discounted}+</div>
        <span className="text-mred line-through">
          <div className="text-sm font-medium text-mdarkgray">${original}</div>
        </span>
        {loyalty !== undefined && (
          <div className="ml-auto">
            <EarnPoints points={loyalty} />
          </div>
        )}
        {save !== undefined && (
          <div className="ml-auto">
            <SavePercentage percentage={save} />
          </div>
        )}
      </div>
    </div>
  );
};
export default DiscountDeals;
