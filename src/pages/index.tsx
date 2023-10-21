import Head from "next/head";
import heroImage from "public/images/hero.png";
import scroll from "../lottie/scroll.json";
import Image from "next/image";
import Lottie from "lottie-react";
import HeaderLayout from "~/components/layout/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>levizair</title>
        <meta name="description" content="levizair " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
      </main>
    </>
  );
}
