import Image from "next/image";

interface P {
  departureTime: string;
  arrivalTime: string;
  date: string;
  airplaneCode: string;
  duration: string;
}
const DateDetails = ({
  departureTime: departure,
  arrivalTime: arrival,
  date,
  airplaneCode,
  duration,
}: P) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Time */}
      <div className="justify-left flex items-center gap-2 text-xl font-semibold">
        {departure}
        <Image
          width={24}
          height={24}
          className="inline"
          alt="->"
          src="/images/arrowright.svg"
        />
        {arrival}
      </div>
      {/* Date and code */}
      <div className="justify-left flex items-center gap-1 text-base">
        <Image
          width={16}
          height={16}
          className="inline"
          alt="->"
          src="/images/calendar.svg"
        />
        {date} - {airplaneCode}
      </div>
      {/* Duration */}
      <div className="justify-left flex items-center gap-1 text-base">
        <Image
          width={16}
          height={16}
          className="inline"
          alt="->"
          src="/images/clock.svg"
        />
        Duration {duration}
      </div>
    </div>
  );
};
export default DateDetails;
