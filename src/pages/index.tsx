import Head from "next/head";
import heroImage from "public/images/hero.png";
import scroll from "../lottie/scroll.json";
import Image from "next/image";
import Lottie from "lottie-react";
import HeaderLayout from "~/components/layout/Header";
import { Row, Col, Card } from "antd";

export default function Home() {
  return (
    <>
      <Head>
        <title>levizair</title>
        <meta name="description" content="levizair " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full bg-[#F9F9F9]">
        <HeaderLayout />
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
            <div className="-ml-[180px] max-h-28 max-w-sm">
              <Lottie animationData={scroll} width={100} />
            </div>
          </div>
        </div>
        <div className="mx-20 mb-28 mt-10 flex flex-col justify-center text-center text-3xl font-medium uppercase">
          <h1 className="text- font-neue">Tailored Deals for You</h1>
          <p className="aling- mb-8 flex max-w-3xl self-center text-center font-montserrat text-base leading-6 text-black">
            Discover limited-time offers, seasonal specials, and personalized
            discounts that make your travel dreams a reality.
          </p>
          <div style={{ height: "500px" }}>
            <Row gutter={16} style={{ height: "400px" }}>
              <Col span={8}>
                <Card title="Column 1" style={{ height: 400 }}>
                  Content for Column 1
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Column 2" style={{ height: 400 }}>
                  Content for Column 2
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Column 3" style={{ height: 400 }}>
                  Content for Column 3
                </Card>
              </Col>
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
            <Row gutter={16} style={{ marginBottom: "24px" }}>
              <Col span={24}>
                <Card title="Row 1">Content for Row 1</Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "24px" }}>
              <Col span={24}>
                <Card title="Row 2">Content for Row 2</Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "24px" }}>
              <Col span={24}>
                <Card title="Row 3">Content for Row 3</Card>
              </Col>
            </Row>
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
      </main>
    </>
  );
}
