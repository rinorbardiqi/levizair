import Image from "next/image";

interface P {
  logo: string;
  departure: string;
  arrival: string;
}

/* Airline Logo, Name and Points */
const AirlineTitle = ({ logo, departure, arrival }: P) => {
  return (
    <div className="justify-left flex flex-col gap-1">
      <Image
        width={94}
        height={16}
        className="inline"
        alt="airline"
        src={logo}
      />
      <div className="text-2xl font-semibold">{`${departure} to ${arrival}`}</div>
    </div>
  );
};
export default AirlineTitle;
