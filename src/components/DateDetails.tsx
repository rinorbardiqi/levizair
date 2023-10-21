import Image from "next/image";

interface P {
  departure: string;
  arrival: string;
  date: string;
  airplaneCode: string;
  duration: string;
}
const DateDetails = ({
  departure,
  arrival,
  date,
  airplaneCode,
  duration,
}: P) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Time */}
      <div className="align-center justify-left flex gap-2 text-xl font-semibold">
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
      <div className="align-center justify-left flex gap-1 text-base">
        <Image
          width={16}
          height={16}
          className="inline"
          alt="->"
          src="/images/calendar.svg"
        />
        {`${date} - ${airplaneCode}`}
      </div>
      {/* Duration */}
      <div className="align-center justify-left flex gap-1 text-base">
        <Image
          width={16}
          height={16}
          className="inline"
          alt="->"
          src="/images/clock.svg"
        />
        {`Duration ${duration}`}
      </div>
    </div>
  );
};
export default DateDetails;
