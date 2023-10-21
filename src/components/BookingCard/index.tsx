import Image from "next/image";
import DateDetails from "../DateDetails";
import AirlineTitle from "../AirlineTitle";

const BookingCard = () => {
  return (
    <div>
      <Image
        width={500}
        height={150}
        alt="booking image"
        src="/images/landing_hero.png"
      ></Image>
      <div className="font-neue font-bold"> Booking</div>
      <div className="m-6">
        <AirlineTitle
          logo="/images/airline_logo_1.svg"
          departure="Prishtina"
          arrival="Tirana"
        />
        {/* Stroke */}
        <div className="my-5 h-[1px] w-full bg-[#E0E0E0]"></div>
        <DateDetails
          departure="12:00"
          arrival="13:40"
          date="12.10.2023"
          airplaneCode="WIZ-1337"
          duration="1h 5m"
        />
      </div>
    </div>
  );
};

export default BookingCard;
