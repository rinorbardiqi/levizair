import { Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
const { Header } = Layout;
const menu = [
  {
    key: "1",
    name: "Deals",
    active: true,
    path: "/",
  },
  {
    active: false,
    key: "2",
    name: "Events",
    path: "/",
  },
  {
    key: "3",
    name: "Profile",
    active: false,
    icon: "images/user.svg",
    path: "/profile",
  },
];

const HeaderLayout = () => {
  const router = useRouter();

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
        className="h-16 bg-white px-16"
      >
        <Image src="/images/logo.svg" alt="logo" width={140} height={41} />
        <div className="relative ml-auto flex">
          {menu.map((item) => (
            <span
              className={`ml-10 flex cursor-pointer font-montserrat text-base leading-6 ${
                item.active ? "text-[#3957CC]" : "text-black"
              }`}
              key={item.key}
              onClick={() => router.push(item.path)}
            >
              {item.icon && (
                <Image
                  src="/images/user.svg"
                  className="mr-1"
                  alt="logo"
                  width={17}
                  height={17}
                />
              )}
              {item.name}
            </span>
          ))}
        </div>
      </Header>
      <div className="h-16" />
    </>
  );
};
export default HeaderLayout;
