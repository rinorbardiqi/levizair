import { Button } from "antd";

interface P {
  price: number;
}
const SelectOptionsButton = ({ price }: P) => {
  return (
    <div>
      <Button
        style={{ fontFamily: "inherit" }}
        className="bg-mblue h-auto w-full rounded px-6 py-3 text-base font-medium text-white"
      >
        Select Options - ${price}+
      </Button>
    </div>
  );
};
export default SelectOptionsButton;
