import Image from "next/image";

const HeroTag = () => {
  return (
    <div className="flex w-full justify-center align-middle">
      <div className="bg-mcyan shadow-blueGlow flex w-fit items-center gap-2 rounded-3xl px-5 py-1 text-center align-middle font-montserrat text-base normal-case text-white">
        <Image
          width={20}
          height={20}
          className="inline"
          alt="->"
          src="/images/ai.svg"
        />
        AI Powered
      </div>
    </div>
  );
};
export default HeroTag;
