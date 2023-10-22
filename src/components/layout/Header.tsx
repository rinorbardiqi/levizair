import { Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
const { Header } = Layout;

export interface MenuP {
  key: string;
  name: string;
  active: boolean;
  icon?: string;
  path: string;
}

const HeaderLayout = ({
  menu,
  onMenuChange,
}: {
  menu: MenuP[];
  onMenuChange: (key: string) => void;
}) => {
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
        <Image
          className="cursor-pointer"
          src="/images/logo.svg"
          alt="logo"
          width={140}
          height={41}
          onClick={() => void router.push("/")}
        />
        <div className="relative ml-auto flex">
          {menu.map((item) => (
            <span
              className={`ml-10 flex cursor-pointer font-montserrat text-base leading-6 ${
                item.active ? "text-[#3957CC]" : "text-black"
              }`}
              key={item.key}
              onClick={() => {
                onMenuChange(item.key);
                void router.push(item.path);
              }}
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
