import Image from "next/image";

interface P {
  logo: string;
  departure: string;
  arrival: string;
  points?: number;
}

/* Airline Logo, Name and Points */
const AirlineTitle = ({ logo, departure, arrival, points }: P) => {
  return (
    <div className="justify-left flex flex-col gap-1">
      <div className="align-center flex">
        <Image
          width={94}
          height={16}
          className="inline"
          alt="airline"
          src={logo}
        />
        {points !== undefined && (
          <div className="ml-auto text-sm font-semibold text-mblue">
            {points} LP
          </div>
        )}
      </div>
      <div className="w-fit text-2xl font-semibold">
        {departure} to {arrival}
      </div>
    </div>
  );
};
export default AirlineTitle;
