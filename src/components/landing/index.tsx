import Image from "next/image";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

const Landing = () => {
  return (
    <div className="">
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "right",
          background: "#fff",
        }}
      >
        <Image height={50} width={200} src="images/logo.svg" alt="logo"></Image>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
    </div>
  );
};
export default Landing;
