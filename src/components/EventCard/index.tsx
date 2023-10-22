import DateCode from "~/DateCode";
import Image from "next/image";
import { Button, Col, Row } from "antd";

interface P {
  name: string;
  location: string;
  date: string;
  isOpen?: boolean;
  onClick: () => void;
  firstTicket: JSX.Element;
  secondTicket: JSX.Element;
}

const EventCard = ({
  name,
  location,
  date,
  isOpen,
  onClick,
  firstTicket,
  secondTicket,
}: P) => {
  const wrapper = isOpen ? "p-6 rounded-xl" : "";
  return (
    <div
      className={`w-full ${wrapper}`}
      style={{ backgroundImage: isOpen ? 'url("/images/rect.png"' : "none" }}
    >
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-start ">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-mblue">{name}</span>
            <DateCode date={date} />

            <div className="justify-left flex items-center gap-1 text-base">
              <Image
                width={16}
                height={16}
                className="inline"
                alt="->"
                src="/images/location.svg"
              />
              {location}
            </div>
          </div>
          {!isOpen && (
            <Button
              onClick={onClick}
              className={
                "ml-auto h-auto w-fit rounded bg-mblue px-8 py-2 text-base font-medium text-white"
              }
            >
              % Open Tickets
            </Button>
          )}
        </div>
        <div className="my-2" />
        {isOpen && (
          <Row gutter={24}>
            <Col span={12}>{firstTicket}</Col>
            <Col span={12}>{secondTicket}</Col>
          </Row>
        )}
      </div>
    </div>
  );
};
export default EventCard;
