import Head from "next/head";
import { Layout } from "antd";
import heroImage from "public/images/hero.png";
import scroll from "../lottie/scroll.json";
import Image from "next/image";
import Lottie from "lottie-react";

const { Header } = Layout;

const menu = [
  {
    key: "1",
    name: "Deals for you",
    active: true,
  },
  {
    active: false,
    key: "2",
    name: "Upcoming Events",
  },
  {
    key: "3",
    name: "My profile",
    active: false,
    icon: "images/user.svg",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>levizair</title>
        <meta name="description" content="levizair " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header
          style={{ display: "flex", alignItems: "center" }}
          className="h-20 bg-fuchsia-50 px-16"
        >
          <Image src="/images/logo.svg" alt="logo" width={215} height={53} />
          <div className="relative ml-auto flex">
            {menu.map((item) => (
              <span className="ml-10 flex text-base" key={item.key}>
                {item.icon && (
                  <Image
                    src="/images/user.svg"
                    alt="logo"
                    width={20}
                    height={20}
                  />
                )}
                {item.name}
              </span>
            ))}
          </div>
        </Header>
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
            <div className=" mb-6 max-w-[450px] text-6xl font-medium uppercase leading-[70px]  text-white">
              A cristal clear airline experience
            </div>
            <div className="max-w-[320px] text-lg font-normal leading-7 text-white">
              We believe in invisible details that make the difference.
            </div>
            <div className="-ml-[180px] max-h-28 max-w-sm">
              <Lottie animationData={scroll} width={100} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
