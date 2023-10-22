import { Col, Divider, Progress, Row, Select, Tag } from "antd";
import { useSession } from "next-auth/react";
import HeaderLayout from "~/components/layout/Header";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

const LEVELS = [
  "Event Deals",
  "Personalized Ticket Discounts",
  "Gift voucher for every flight",
  "One free flight per year",
];

export default function Profile() {
  const { data } = useSession();
  return (
    <>
      <HeaderLayout />
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
                placeholder="Food, Hiking, Romance..."
                size="large"
                showSearch
                className="my-4 mt-4 w-full "
                style={{
                  fontSize: "12px",
                }}
                filterOption={false}
                onSearch={(data) => {
                  console.log("data", data);
                }}
              />
              <h2 className="mt-4 text-lg">Your Tags</h2>
              <div className="flex flex-row flex-wrap justify-between">
                <div className="mt-3">
                  <Tag
                    bordered={false}
                    className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                  >
                    <RxCross1 className="cursor-pointer" />
                    <span className="pl-3">Food</span>
                  </Tag>
                </div>
                <div className="mt-3">
                  <Tag
                    bordered={false}
                    className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                  >
                    <RxCross1 className="cursor-pointer" />
                    <span className="pl-3">Food</span>
                  </Tag>
                </div>{" "}
                <div className="mt-3">
                  <Tag
                    bordered={false}
                    className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                  >
                    <RxCross1 className="cursor-pointer" />
                    <span className="pl-3">Food</span>
                  </Tag>
                </div>{" "}
                <div className="mt-3">
                  <Tag
                    bordered={false}
                    className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                  >
                    <RxCross1 className="cursor-pointer" />
                    <span className="pl-3">Food</span>
                  </Tag>
                </div>{" "}
                <div className="mt-3">
                  <Tag
                    bordered={false}
                    className="flex min-w-fit max-w-fit items-center justify-evenly bg-myellow p-1 px-5"
                  >
                    <RxCross1 className="cursor-pointer" />
                    <span className="pl-3">Food</span>
                  </Tag>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-xl border border-mgray bg-white px-12 py-8 pb-8">
              <h1 className="mb-6 font-neue text-3xl font-medium  ">
                Loyalty Points
              </h1>
              <p>
                Fly, accumulate points, and unlock exclusive rewards! Enjoy
                special perks and benefits by staying loyal to our flight
                agencies. The more you fly, the more you gain LevizAir&apos;s
                Loyalty Points program.
              </p>
              <div className="my-4 rounded-md bg-mwhite p-5">
                <div className="flex justify-between">
                  <Image
                    width={120}
                    height={80}
                    alt="logo image"
                    src="/images/lufthansa-logo.png"
                  />
                  <span>
                    73/100 to reach{" "}
                    <span className="font-semibold">Tier 2</span>
                  </span>
                </div>
                <Progress className="mt-3" percent={73} />
                <div>
                  {LEVELS.map((level) => (
                    <div key={level} className="mt-3 flex gap-2">
                      <Image
                        width={15}
                        height={20}
                        alt="logo image"
                        src="/images/loyalty-uncheck.svg"
                      />
                      <span>{level}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 cursor-pointer text-mblue">
                  Hide Rewards
                </div>
              </div>
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
