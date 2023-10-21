import Lottie from "lottie-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoginComponent } from "../../components/login/LoginComponent";
import LoadingLottie from "../../lottie/loading.json";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <Lottie style={{ height: 150 }} animationData={LoadingLottie} />
      </div>
    );
  }

  if (session?.user) {
    void router.push("/");
    return null;
  }

  return <LoginComponent />;
}
