interface P {
  percentage: number;
}
const SavePercentage = ({ percentage }: P) => {
  return (
    <div className="bg-mpink w-fit rounded-3xl px-4 py-1 text-sm">
      Save {percentage}%
    </div>
  );
};
export default SavePercentage;
