import { Carousel } from "antd";
import Image from "next/image";
import imageOne from "public/images/authLogo.png";
import imageTwo from "public/images/authLogo2.png";
import imageThree from "public/images/authLogo3.png";

interface P {
  fullSize?: boolean;
}

const sliderImages = [
  {
    id: 1,
    src: imageOne,
  },
  {
    id: 2,
    src: imageTwo,
  },
  {
    id: 3,
    src: imageThree,
  },
];

export const ImageSlider = ({ fullSize }: P) => {
  return (
    <div
      className={`hidden ${
        fullSize ? "w-full" : "w-7/12"
      }  flex-col items-center justify-center md:flex`}
    >
      <div className="mx-auto flex w-full flex-1 flex-col justify-center">
        <Carousel autoplay autoplaySpeed={5000} easing="ease-in-out">
          {sliderImages.map(({ id, src }) => (
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <div key={id} className="h-screen">
              <Image src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
