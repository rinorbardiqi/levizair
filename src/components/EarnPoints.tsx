import Image from "next/image";

interface P {
  points: number;
  isLong?: boolean;
}
const EarnPoints = ({ points, isLong }: P) => {
  const str = isLong ? `Earn ${points} Loyalty Points` : `+${points} LP`;
  return (
    <div className="bg-myellow align-center flex w-fit gap-1 rounded-lg px-4 py-1 text-sm">
      <Image width={16} height={16} alt="i" src="/images/info.svg" />
      {str}
    </div>
  );
};
export default EarnPoints;
