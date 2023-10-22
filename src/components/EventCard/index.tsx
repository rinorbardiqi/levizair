import AirlineTitle from "../AirlineTitle";
import DateDetails from "../DateDetails";
import DiscountDeals from "../DiscountDeals";
import EarnPoints from "../EarnPoints";
import SelectOptionsButton from "../SelectOptionsButton";
import { type DiscountCardProps } from "../BookingCard";

const EventCard = ({
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
}: DiscountCardProps) => {
  const savePercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );
  const duration = "1h 50m";
  return (
    <div className="flex w-full flex-row">
      <div className="border-mgray rounded-l-xl border-y border-l bg-white p-6">
        <AirlineTitle
          logo={airlineLogo}
          departure={departureCountry}
          arrival={arrivalCountry}
          points={loyalty}
        />

        <div className="h-6"></div>

        <DateDetails
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          date={date.toUpperCase()}
          airplaneCode={airplaneCode}
          duration={duration}
        />
      </div>
      <div className="bg-mwhite border-mgray flex flex-col rounded-r-xl border-y border-r p-6">
        <EarnPoints points={loyalty} isLong />

        <div className="mt-auto">
          <DiscountDeals
            original={originalPrice}
            discounted={discountedPrice}
            save={savePercentage}
          />
        </div>

        <div className="h-3"></div>
        <SelectOptionsButton price={originalPrice} />
      </div>
    </div>
  );
};
export default EventCard;
