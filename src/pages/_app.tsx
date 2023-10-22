import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@api";

import "~/styles/globals.css";
import { LoginBarrier } from "~/components/login/LoginBarrier";
import { LoginComponent } from "~/components/login/LoginComponent";
import { useState } from "react";
import { type MenuP } from "~/components/layout/Header";

const DEFAULT_MENU = [
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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [menu, setMenu] = useState<MenuP[]>(DEFAULT_MENU);

  const handleMenuChange = (key: string) => {
    setMenu((prev) => {
      return prev.map((item) => ({
        ...item,
        active: item.key === key,
      }));
    });
  };
  return (
    <SessionProvider session={session}>
      <LoginBarrier LoginComponent={<LoginComponent />}>
        <Component {...pageProps} menu={menu} onMenuChange={handleMenuChange} />
      </LoginBarrier>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
