import Head from "next/head";
import heroImage from "public/images/hero.png";
import Image from "next/image";
import suggestImg from "public/images/suggestPlace.png";
import planeImg from "public/images/plane.png";
import referedGif from "public/images/referedGif.gif";
import footerImg from "public/images/Footer.png";
import HeaderLayout, { type MenuP } from "~/components/layout/Header";
import { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import TicketCard from "~/components/TicketCard";
import EventTicket from "~/components/EventTicket";
import EventCard from "~/components/EventCard";
import { api } from "~/utils/api";
import HeroTag from "~/components/HeroTag";

export default function Home({
  menu,
  onMenuChange,
}: {
  menu: MenuP[];
  onMenuChange: (key: string) => void;
}) {
  const [openReferedBy, setOpenReferedBy] = useState(false);
  const [eventsOpened, setEventsOpened] = useState([true, false, false]);
  const flipEvent = (idx: number, arr: boolean[]) => {
    const copy = [...arr];
    copy[idx] = !copy[idx];
    setEventsOpened(copy);
  };
  const { data: deals } = api.googleAi.predict.useQuery();
  function formatHourMinute(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const getRandomPercentage = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const applyRandomDiscount = (price: number): number => {
    const randomPercentage = getRandomPercentage(10, 15);
    const discountAmount = (randomPercentage / 100) * price;
    const discountedPrice = price - discountAmount;
    return Math.round(discountedPrice);
  };
  const formatDateAsCustomFormat = (date: Date): string => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    return `${dayOfWeek}, ${day} ${month}`;
  };

  return (
    <>
      <Head>
        <title>levizair</title>
        <meta name="description" content="levizair " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full bg-mwhite font-montserrat">
        <HeaderLayout menu={menu} onMenuChange={onMenuChange} />
        <div
          className="relative bg-auto bg-center bg-no-repeat"
          style={{ height: "80vh" }}
        >
          <Image
            src={heroImage}
            alt="hero"
            className="h-full w-full bg-cover bg-center object-cover"
          />
          <div className="absolute left-24 top-1/4">
            <div className="mb-6 max-w-[450px] font-neue text-6xl font-medium uppercase leading-[70px] text-white ">
              A cristal clear airline experience
            </div>
            <div className="max-w-[320px] font-montserrat text-lg font-normal leading-7 text-white">
              We believe in invisible details that make the difference.
            </div>
          </div>
        </div>
        <div className="mx-20 mb-28 mt-10 flex flex-col justify-center text-center text-3xl font-medium uppercase">
          <HeroTag />
          <div className="h-2" />
          <h1 className="font-neue">Tailored Deals for You</h1>
          <p className="mb-8 flex max-w-3xl self-center text-center font-montserrat text-base leading-6 text-black">
            Discover limited-time offers, seasonal specials, and personalized
            discounts that make your travel dreams a reality.
          </p>
          <div>
            <Row gutter={16}>
              {deals?.predicted.deals?.map((item, idx) => {
                return (
                  <Col span={8} key={idx}>
                    <TicketCard
                      originalPrice={Number(item.price ?? 0)}
                      discountedPrice={applyRandomDiscount(
                        Number(item.price ?? 0),
                      )}
                      departureCountry={item.departureCity}
                      departureTime={formatHourMinute(item.departureDate!)}
                      arrivalCountry={item.arrivalCity}
                      arrivalTime={formatHourMinute(item.arriveDate!)}
                      date={formatDateAsCustomFormat(item.departureDate!)}
                      countryImage={`/images/image${idx + 1}.png`}
                      airlineLogo="/images/airline_logo_1.svg"
                      airplaneCode="WIZ 1337"
                      loyalty={item.loialtyPoints ?? 15}
                      duration={item?.duration ?? ""}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div className="mx-20">
          <h1 className="font-neue text-3xl font-medium uppercase">
            Upcoming events - Discover What&apos;s Right for You
          </h1>
          <p className="mb-8 font-montserrat text-base leading-6">
            Discover Unmissable Events and Secure Exclusive Plane Tickets Today
          </p>
          <div>
            {Array.from({ length: 3 }, (_, idx) => {
              return (
                <Row key={idx} gutter={16} style={{ marginBottom: "24px" }}>
                  <EventCard
                    name="BeerFest"
                    location="Sttugart, Germany"
                    date="mon, 13 nov"
                    isOpen={eventsOpened[idx]}
                    onClick={() => flipEvent(idx, eventsOpened)}
                    firstTicket={
                      <EventTicket
                        originalPrice={200}
                        discountedPrice={150}
                        departureCountry="Prishtina"
                        departureTime="10:30"
                        arrivalCountry="Tirana"
                        arrivalTime="12:30"
                        date="mon, 13 nov"
                        countryImage={`/images/image${idx + 1}.png`}
                        airlineLogo="/images/airline_logo_1.svg"
                        airplaneCode="WIZ 1337"
                        loyalty={17}
                        duration={"blah"}
                      />
                    }
                    secondTicket={
                      <EventTicket
                        originalPrice={200}
                        discountedPrice={150}
                        departureCountry="Prishtina"
                        departureTime="10:30"
                        arrivalCountry="Tirana"
                        arrivalTime="12:30"
                        date="mon, 13 nov"
                        countryImage={`/images/image${idx + 1}.png`}
                        airlineLogo="/images/airline_logo_1.svg"
                        airplaneCode="WIZ 1337"
                        loyalty={17}
                        duration={"blah"}
                      />
                    }
                  />
                </Row>
              );
            })}
          </div>
          <div className="flex flex-col justify-center self-center text-center font-montserrat text-xl">
            <p>
              View more <span>Events</span> that might interest you!
            </p>
            <Image
              src="/images/arrowdown.svg"
              alt="logo"
              width={24}
              className="self-center"
              height={24}
            />
          </div>
        </div>
        <div className="my-28">
          <Image src={suggestImg} alt="" className="w-full" />
        </div>
        <div className="mx-20 mb-28 flex">
          <div className="mr-5 h-[620px] w-2/5 rounded-2xl bg-white p-8 ">
            <p className="mb-10 font-neue text-4xl font-medium uppercase">
              <span className="text-mblue">Refer Friends</span>, Earn Together,
              Travel Forever
            </p>
            <Image
              src={planeImg}
              alt=""
              className="relative -m-8 mb-4 ml-auto"
            />
            <p className="mb-10 font-montserrat text-lg">
              Refer friends, earn exclusive travel rewards, and make lifelong
              travel memories together!
            </p>
            <Button
              className="h-14 w-full bg-mblue text-white"
              onClick={() => setOpenReferedBy(true)}
            >
              <span className="!flex !flex-row items-center justify-center text-white">
                <Image
                  src="images/referUser.svg"
                  alt=""
                  width={20}
                  className="m-2"
                  height={20}
                />
                Refer Friends
              </span>
            </Button>
          </div>
          <div>
            <Image
              src={referedGif}
              alt=""
              className="h-[620px] w-full rounded-2xl"
            />
          </div>
        </div>
        <div className="relative">
          <Image src={footerImg} alt="" className="h-72 w-full" />
          <Image
            src="images/whiteLogo.svg"
            alt=""
            width={150}
            height={50}
            className="absolute left-[12%] top-[20%]"
          />
          <p className="absolute bottom-[20%] left-[12%] font-montserrat text-base text-mwhite">
            2023 © LevizAir. All rights reserved.
          </p>
          <p className="absolute bottom-[20%] right-[12%] font-montserrat text-base text-mwhite">
            General terms & conditions of carriage / Terms of Use / Privacy
            Policy / Cookies / Contact us / Cookie preferences
          </p>
        </div>
        <Modal
          open={openReferedBy}
          onCancel={() => setOpenReferedBy(false)}
          destroyOnClose
          centered
          width={600}
          footer={null}
          className="flex  flex-col items-center justify-center"
        >
          <div className="!flex w-full !flex-col !items-center !justify-center p-7">
            <Image
              src="images/modalRefered.svg"
              alt=""
              width={190}
              height={130}
            />
            <p className="my-3  max-w-xs text-center font-montserrat">
              Earn Loyalty Points for every new friend that uses our services!
            </p>
            <Button
              className="h-14 w-full bg-mblue text-white"
              onClick={() => setOpenReferedBy(false)}
            >
              <span className="!flex !flex-row items-center justify-center text-white">
                <Image
                  src="images/link.svg"
                  alt=""
                  width={20}
                  className="m-2"
                  height={20}
                />
                Copy link
              </span>
            </Button>
          </div>
        </Modal>
      </main>
    </>
  );
}
