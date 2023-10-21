import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@api";

import "~/styles/globals.css";
import { LoginBarrier } from "~/components/login/LoginBarrier";
import { LoginComponent } from "~/components/login/LoginComponent";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LoginBarrier LoginComponent={<LoginComponent />}>
        <Component {...pageProps} />
      </LoginBarrier>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
