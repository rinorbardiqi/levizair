import { ImageSlider } from "./ImageSlider";
import { LoginForm } from "./LoginForm";

export const LoginComponent = () => {
  return (
    <main className="flex h-screen w-screen flex-col ">
      <div className="flex h-full w-full flex-row justify-center">
        <ImageSlider />
        <LoginForm />
      </div>
    </main>
  );
};
