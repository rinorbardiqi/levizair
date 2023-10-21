import { Carousel } from "antd";

interface P {
  fullSize?: boolean;
}

const sliderImages = [
  {
    id: 1,
    src: "https://app.iconosquare.com/_next/image?url=https%3A%2F%2Fcdn-prod.app.iconosquare.com%2F_next%2Fstatic%2Fmedia%2Fscheduling-approval%40x2.934ed8d0.jpg&w=1920&q=75",
  },
  {
    id: 2,
    src: "https://app.iconosquare.com/_next/image?url=https%3A%2F%2Fcdn-prod.app.iconosquare.com%2F_next%2Fstatic%2Fmedia%2Ftiktok-analytics%40x2.87fc15b3.jpg&w=1920&q=75",
  },
  {
    id: 3,
    src: "https://app.iconosquare.com/_next/image?url=https%3A%2F%2Fcdn-prod.app.iconosquare.com%2F_next%2Fstatic%2Fmedia%2Flinkedin-analytics%40x2.abadb39a.jpg&w=1920&q=75",
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
            <div key={id} className="h-screen">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
