import { Col, Divider, Progress, Row, Select, Tag, notification } from "antd";
import { useSession } from "next-auth/react";
import HeaderLayout, { type MenuP } from "~/components/layout/Header";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useState } from "react";
import { api } from "@api";

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

export default function Profile({
  menu,
  onMenuChange,
}: {
  menu: MenuP[];
  onMenuChange: (key: string) => void;
}) {
  const { data } = useSession();

  const [activeLoyalty, setActiveLoyalty] = useState("");

  const { data: loyaltyPoints } = api.loyaltyPoints.loyaltyPoints.useQuery({
    take: 3,
    userId: data?.user.id ?? "",
  });

  const { data: tags, refetch: refetchTags } = api.user.fetchTags.useQuery({
    userId: data?.user.id ?? "",
  });

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
                Your Top 3 Loyalty Points
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
                      <Image
                        width={120}
                        height={80}
                        alt="logo image"
                        src="/images/lufthansa-logo.png"
                      />
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
          <Col span={11} className="ml-4 bg-white">
            <div className="border   border-mgray px-10 py-5 pl-5">
              ticket history
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </>
  );
}
