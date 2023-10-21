import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Button } from "antd";

import { api } from "@api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>levizair</title>
        <meta name="description" content="levizair " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h4 className="text-5xl font-extrabold   ">
            you are currently {status}
            {session ? session.user.name : ""}
          </h4>

          {session?.user ? (
            <Button onClick={() => void signOut()} className="">
              Log out
            </Button>
          ) : (
            <>
              <Button
                href="/login"
                className=" h-30 flex w-80 justify-center self-center  p-2 pb-3 text-yellow-50"
              >
                Log in
              </Button>

              <Button
                href="/register"
                className=" h-30 flex w-80 justify-center self-center  p-2 pb-3 text-yellow-50"
              >
                Register
              </Button>
            </>
          )}

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl ">
              {hello.data != null
                ? hello.data.greeting
                : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
