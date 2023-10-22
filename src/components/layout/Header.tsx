import { Layout } from "antd";
import Image from "next/image";
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

const HeaderLayout = () => {
  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
        className="h-20 bg-white px-16"
      >
        <Image src="/images/logo.svg" alt="logo" width={215} height={53} />
        <div className="relative ml-auto flex">
          {menu.map((item) => (
            <span
              className={`ml-10 flex font-montserrat text-base leading-6 ${
                item.active ? "text-[#3957CC]" : "text-black"
              }`}
              key={item.key}
            >
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
      <div className="h-20" />
    </>
  );
};
export default HeaderLayout;
