import { useRouter } from "next/router";
import { UNPROTECTED_ROUTES } from "./config";
import { useSession } from "next-auth/react";
import Lottie from "lottie-react";
import LoadingLottie from "../../lottie/loading.json";

interface P {
  children: JSX.Element | JSX.Element[];
  LoginComponent: JSX.Element;
}

export const LoginBarrier = ({ children, LoginComponent }: P) => {
  const router = useRouter();
  const isProtected = !UNPROTECTED_ROUTES.has(router.pathname);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <Lottie style={{ height: 150 }} animationData={LoadingLottie} />
      </div>
    );
  }

  return !session?.user && isProtected ? LoginComponent : children;
};
