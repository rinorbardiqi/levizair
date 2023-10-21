import { Banner } from "./Banner";
import { RegisterForm } from "./RegisterForm";

export const RegisterComponent = () => {
  return (
    <main className="flex h-screen w-screen flex-col ">
      <div className="flex h-full w-full flex-row justify-center">
        <Banner />
        <RegisterForm />
      </div>
    </main>
  );
};
