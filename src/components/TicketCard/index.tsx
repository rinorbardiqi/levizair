import DateDetails from "../DateDetails";
import AirlineTitle from "../AirlineTitle";
import DiscountDeals from "../DiscountDeals";
import SelectOptionsButton from "../SelectOptionsButton";
import SavePercentage from "../SavePercentage";
import Image from "next/image";
export interface DiscountCardProps {
  originalPrice: number;
  discountedPrice: number;
  departureCountry: string;
  departureTime: string;
  arrivalCountry: string;
  arrivalTime: string;
  date: string;
  countryImage: string;
  airlineLogo: string;
  airplaneCode: string;
  loyalty: number;
  duration: string;
}

const TicketCard = ({
  originalPrice,
  discountedPrice,
  departureCountry,
  departureTime,
  arrivalCountry,
  arrivalTime,
  date,
  countryImage,
  airlineLogo,
  airplaneCode,
  loyalty,
  duration,
}: DiscountCardProps) => {
  const savePercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );
  return (
    <div>
      <div className="relative w-full">
        <Image
          src={countryImage}
          width="0"
          height="0"
          sizes="100vw"
          className="h-80  w-full rounded-t-xl"
          alt="booking image"
        />
        <div className="absolute right-5 top-5">
          <SavePercentage percentage={savePercentage} />
        </div>
      </div>
      <div className="rounded-b-xl border border-mgray bg-mwhite p-6">
        <AirlineTitle
          logo={airlineLogo}
          departure={departureCountry}
          arrival={arrivalCountry}
        />

        {/* Stroke */}
        <div className="my-5 h-[1px] w-full bg-mgray" />

        <DateDetails
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          date={date}
          airplaneCode={airplaneCode}
          duration={duration}
        />

        <div className="h-6"></div>
        <DiscountDeals
          original={originalPrice}
          discounted={discountedPrice}
          loyalty={loyalty}
        />

        <div className="h-6"></div>
        <SelectOptionsButton price={discountedPrice} />
      </div>
    </div>
  );
};
export default TicketCard;
