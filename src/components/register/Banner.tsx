import { AiOutlineCheck } from "react-icons/ai";

const registerFeatures = [
  "lorem",
  "lorem",
  "lorem",
  "lorem",
  "... and much more !",
];

export const Banner = () => {
  return (
    <div className="hidden w-7/12 flex-col items-center md:flex">
      <div className="flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-12   px-5">
        <h1 className="font-mono text-3xl font-medium">
          Lorem ipsum dolor sit amet. <br />
          Lorem, ipsum.{" "}
          <span className="underline decoration-sky-600">levizair!</span>
        </h1>
        <div className="flex flex-col gap-5 font-mono font-medium">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
            vitae!
          </p>
          <div className="flex flex-col gap-5">
            {registerFeatures.map((item) => (
              <div key={item} className="flex place-items-center gap-2">
                <AiOutlineCheck className="text-xs text-green-700" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs">
          Join now to revolutionize your air flight rewarding system!
        </p>
      </div>
    </div>
  );
};
