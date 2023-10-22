import { Col, Divider, Progress, Row, Select, Tag, notification } from "antd";
import { useSession } from "next-auth/react";
import HeaderLayout, { type MenuP } from "~/components/layout/Header";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCalendar } from "react-icons/ai";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import Image from "next/image";
import { useState } from "react";
import { api } from "@api";
import { formatDateAsCustomFormat, formatHourMinute } from "..";

const LEVELS = [
  { id: 1, label: "Event Deals", level: 1 },
  { id: 2, label: "Personalized Ticket Discounts", level: 2 },
  { id: 3, label: "Gift voucher for every flight", level: 3 },
  { id: 4, label: "One free flight per year", level: 4 },
];

const TAGS = [
  {
    id: 1,
    label: "food",
  },
  {
    id: 2,
    label: "books",
  },
  {
    id: 3,
    label: "gaming",
  },
  {
    id: 4,
    label: "anime",
  },
  {
    id: 5,
    label: "sports",
  },
  {
    id: 6,
    label: "music",
  },
  {
    id: 7,
    label: "literature",
  },
  {
    id: 8,
    label: "technology",
  },
  {
    id: 9,
    label: "cooking",
  },
  { id: 10, label: "travel" },
  { id: 11, label: "art" },
  { id: 12, label: "nature" },
  { id: 13, label: "movies" },
  { id: 14, label: "photography" },
  { id: 15, label: "fashion" },
  { id: 16, label: "history" },
  { id: 17, label: "science" },
  { id: 18, label: "fitness" },
  { id: 19, label: "gardening" },
  { id: 20, label: "pets" },
  { id: 21, label: "spirituality" },
  { id: 22, label: "DIY" },
  { id: 23, label: "crafts" },
  { id: 24, label: "cars" },
  { id: 25, label: "hiking" },
];

const parseDateString = (dateString: string): Date => {
  const parsedDate = new Date(Date.parse(dateString));
  return parsedDate;
};

const getDuration = (startDate: Date, endDate: Date): string => {
  const durationInMilliseconds = endDate.getTime() - startDate.getTime();

  const millisecondsInMinute = 60 * 1000;
  let minutes = Math.floor(durationInMilliseconds / millisecondsInMinute);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else {
    return `${minutes}min`;
  }
};

export default function Profile({
  menu,
  onMenuChange,
}: {
  menu: MenuP[];
  onMenuChange: (key: string) => void;
}) {
  const { data } = useSession();

  const [activeLoyalty, setActiveLoyalty] = useState("");
  const [activeHistory, setActiveHistory] = useState("");

  const { data: loyaltyPoints } = api.loyaltyPoints.loyaltyPoints.useQuery({
    take: 3,
    userId: data?.user.id ?? "",
  });

  const { data: tags, refetch: refetchTags } = api.user.fetchTags.useQuery({
    userId: data?.user.id ?? "",
  });

  const { data: bookings } = api.booking.bookings.useQuery();

  const updateTags = api.user.updateTags.useMutation({
    onSuccess() {
      void refetchTags();
    },
  });

  const handleOpenLoyalty = (id: string) => {
    if (activeLoyalty === id) {
      setActiveLoyalty("none");
    } else {
      setActiveLoyalty(id);
    }
  };

  const handleUpdateTag = (value: string) => {
    updateTags.mutate({
      userId: data?.user.id ?? "",
      tags: `${tags?.join(",")},${value}`,
    });

    notification.success({
      message: "Success:",
      description: "You have successfully added a new TAG!",
      placement: "top",
    });
  };

  const handleDeleteTag = (value: string) => {
    updateTags.mutate({
      userId: data?.user.id ?? "",
      tags: tags?.filter((item) => item !== value).join(",") ?? "",
    });
    notification.success({
      message: "Success:",
      description: "You have successfully deleted a TAG!",
      placement: "top",
    });
  };

  return (
    <>
      <HeaderLayout menu={menu} onMenuChange={onMenuChange} />
      <div className="h-full bg-mwhite">
        <Row className="bg-mwhite pt-8">
          <Col span={1}></Col>
          <Col span={11} className="mr-4 flex flex-col gap-8">
            <div className="flex flex-col justify-center rounded-xl  border border-mgray bg-white px-12 py-8 pb-8">
              <h1 className="mb-6 font-neue text-3xl font-medium  ">
                Account Information
              </h1>
              <Row>
                <Col span={8}>
                  <h2 className="text-lg font-medium">Full Name</h2>
                  <p className="text-lgray">{data?.user.name}</p>
                </Col>
                <Col span={8}>
                  <h2 className="text-lg font-medium">Email</h2>
                  <p className="text-lgray">{data?.user.email}</p>
                </Col>
                <Col span={8}>
                  <h2 className="text-lg font-medium">Date of birth</h2>
                  <p className="text-lgray">20.10.2000</p>
                </Col>
                <Col span={8} className="mt-4">
                  <h2 className="text-lg font-medium">Address</h2>
                  <p className="text-lgray">Prishtine, Rr. Diqka</p>
                </Col>
                <Col span={8} className="mt-4">
                  <h2 className="text-lg font-medium">Phone</h2>
                  <p className="text-lgray">+383 49 123 132</p>
                </Col>
              </Row>
              <Divider />
              <h1 className="my-2 mb-3 font-neue text-3xl font-medium  ">
                Personalized Tags
              </h1>
              <p>
                Add your interests as tags to improve your experiences with our
                offers to you!
              </p>

              <Select
                labelInValue
                options={TAGS.map((item) => {
                  return {
                    ...item,
                    label: item.label.toLocaleUpperCase(),
                    value: item.label,
                  };
                }).filter((item) => !tags?.includes(item.value))}
                placeholder="Food, Hiking, Romance..."
                size="large"
                showSearch
                className="my-4 mt-4 w-full"
                style={{
                  fontSize: "12px",
                }}
                filterOption={false}
                onSelect={({ value }: { value: string }) => {
                  void handleUpdateTag(value);
                }}
              />
              <h2 className="mt-4 text-lg">Your Tags</h2>
              <div className="flex flex-row flex-wrap">
                {tags?.map((item) => (
                  <div className="mt-3" key={item}>
                    <Tag
                      bordered={false}
                      className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                    >
                      <RxCross1
                        className="cursor-pointer"
                        onClick={() => handleDeleteTag(item)}
                      />
                      <span className="pl-3">{item.toLocaleUpperCase()}</span>
                    </Tag>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 flex flex-col justify-center rounded-xl border border-mgray bg-white px-12 py-8 pb-8">
              <h1 className="mb-6 font-neue text-3xl font-medium  ">
                Loyalty Points
              </h1>
              <p>
                Fly, accumulate points, and unlock exclusive rewards! Enjoy
                special perks and benefits by staying loyal to our flight
                agencies. The more you fly, the more you gain LevizAir&apos;s
                Loyalty Points program.
              </p>
              {loyaltyPoints?.map((item) => {
                const activeItem =
                  activeLoyalty === String(item.id) ||
                  (!activeLoyalty && item.id === loyaltyPoints?.[0]?.id);
                return (
                  <div key={item.id} className="my-4 rounded-md bg-mwhite p-5">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Image
                          width={24}
                          height={60}
                          alt="logo image"
                          src="/images/logo-luft.png"
                        />
                        <h3 className="text-lg">{item.airline.name}</h3>
                      </div>
                      <span>
                        {100 - item.value} points to reach{" "}
                        <span className="font-semibold">
                          Tier {item.level + 1}
                        </span>
                      </span>
                    </div>
                    <Progress className="mt-3" percent={item.value} />
                    {activeItem && (
                      <div>
                        {LEVELS.map((level) => (
                          <div key={level.id} className="mt-3 flex gap-2">
                            <Image
                              width={15}
                              height={20}
                              alt="logo image"
                              src={`/images/loyalty-${
                                item.level < level.level ? "un" : ""
                              }check.svg`}
                            />
                            <span
                              className={`${
                                item.level < level.level ? "text-lgray" : ""
                              }`}
                            >
                              {level.label}
                              {item.level < level.level
                                ? ` (Tier ${level.level} to unlock)`
                                : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div
                      className="mt-5 cursor-pointer text-mblue"
                      onClick={() => handleOpenLoyalty(String(item.id))}
                    >
                      {activeItem ? "Hide" : "Show"} Rewards
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col span={11} className="ml-4">
            <div className="flex flex-col justify-center rounded-xl  border border-mgray bg-white px-12 py-8 pb-8">
              <h1 className="mb-6 font-neue text-3xl font-medium  ">
                Ticket History
              </h1>
              <p>
                Your travel story unfolds here, ensuring that every flight
                you&apos;ve taken becomes a part of your personal aviation
                history
              </p>

              {bookings?.bookings.map((item) => {
                const ticket = item.tickets[0];

                const from =
                  ticket?.bookedSegments[0]?.flight?.startDestination?.City;
                const to = ticket?.bookedSegments[0]?.flight?.destination?.City;

                return (
                  <div
                    key={item.id}
                    className="mt-6 flex flex-row items-center justify-between  rounded-xl border border-mgray bg-white px-4 py-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          width={20}
                          height={80}
                          alt="logo image"
                          src="/images/logo-luft.png"
                        />
                        <h3 className="">{ticket?.ticketingAirline.name}</h3>
                      </div>
                      <h3 className="text-lg">
                        {from} to {to}
                      </h3>
                      <div className="flex items-center gap-2 text-lgray">
                        <AiOutlineCalendar />{" "}
                        <span>
                          {formatDateAsCustomFormat(
                            ticket?.bookedSegments?.[0]?.departureDate ??
                              new Date(),
                          )}{" "}
                          - WIZ 1337
                        </span>
                      </div>
                      {activeHistory === String(item.id) && (
                        <div className="flex flex-col gap-3">
                          <div className="mt-3">
                            <div className="justify-left text-md flex items-center gap-2 font-semibold">
                              {formatHourMinute(
                                ticket?.bookedSegments?.[0]?.departureDate ??
                                  new Date(),
                              )}
                              <Image
                                width={24}
                                height={24}
                                className="inline"
                                alt="->"
                                src="/images/arrowright.svg"
                              />
                              {formatHourMinute(
                                ticket?.bookedSegments?.[0]?.arrivalDate ??
                                  new Date(),
                              )}
                            </div>
                          </div>
                          <div className="justify-left flex items-center gap-1 text-base">
                            <Image
                              width={16}
                              height={16}
                              className="inline"
                              alt="->"
                              src="/images/clock.svg"
                            />
                            Duration{" "}
                            {getDuration(
                              parseDateString(
                                String(
                                  ticket?.bookedSegments?.[0]?.departureDate,
                                ),
                              ),
                              parseDateString(
                                String(
                                  ticket?.bookedSegments?.[0]?.arrivalDate,
                                ),
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {activeHistory === String(item.id) ? (
                      <PiCaretUpBold
                        onClick={() => {
                          if (activeHistory === String(item.id)) {
                            setActiveHistory("none");
                          } else {
                            setActiveHistory(String(item.id));
                          }
                        }}
                        fontSize={21}
                        className="cursor-pointer"
                      />
                    ) : (
                      <PiCaretDownBold
                        onClick={() => {
                          if (activeHistory === String(item.id)) {
                            setActiveHistory("none");
                          } else {
                            setActiveHistory(String(item.id));
                          }
                        }}
                        fontSize={21}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </>
  );
}
