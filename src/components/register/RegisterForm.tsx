import { Button, Form, Input, notification } from "antd";
import { Rule } from "antd/es/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "@api";

interface FieldType {
  name: string;
  email: string;
  password: string;
  dob: string;
}

interface FormItems {
  id: number;
  label: string;
  name: "email" | "password" | "name";
  rules: Rule[];
  component: JSX.Element;
}

const formItems: FormItems[] = [
  {
    id: 1,
    label: "Full name",
    name: "name",
    rules: [
      {
        required: true,
        message: "Please input your full name",
      },
    ],
    component: <Input className="h-12 font-sans" placeholder="Full name" />,
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    rules: [
      {
        type: "email",
        message: "Input is not a valid email",
      },
      {
        required: true,
        message: "Please input an email",
      },
    ],
    component: <Input className="h-12 font-sans" placeholder="Email" />,
  },
  {
    id: 3,
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please input your password!" }],
    component: (
      <Input.Password className="h-12 font-sans" placeholder="Password" />
    ),
  },
];

export const RegisterForm = () => {
  const router = useRouter();

  const registerUser = api.user.register.useMutation({
    async onSuccess(data) {
      const signInData = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!signInData?.error) {
        return router.push("/");
      }

      notification.error({
        message: "Error:",
        description: signInData?.error,
        placement: "top",
      });
    },
    onError(error) {
      notification.error({
        message: "Error:",
        description: error.message,
        placement: "top",
      });
    },
  });

  const handleRegister = (data: FieldType) =>
    registerUser.mutate({ ...data, dob: new Date() });

  return (
    <div className="flex w-full flex-col  items-center justify-center bg-white py-3 drop-shadow-2xl md:w-5/12 ">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-10">
        <h1 className="w-full min-w-full text-2xl font-medium">
          Get started for free!
        </h1>
        <div className="w-full min-w-min ">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleRegister}
            className="flex flex-col gap-1"
          >
            {formItems.map((item) => (
              <Form.Item<FieldType>
                key={item.id}
                label={
                  <label
                    style={{ fontSize: "12px" }}
                    className=" font-sans font-medium text-gray-400"
                  >
                    {item.label}
                  </label>
                }
                name={item.name}
                rules={item.rules}
                validateTrigger="onBlur"
              >
                {item.component}
              </Form.Item>
            ))}

            <Form.Item>
              <Button
                className="mt-2 h-11 w-full bg-indigo-600  font-sans font-bold"
                type="primary"
                htmlType="submit"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <div className="font flex justify-center text-xs text-gray-400">
            <p>Already have an account?</p>
            &nbsp;&nbsp;
            <Link className="text-sky-600" href="/login">
              Log in
            </Link>
          </div>
          <div className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-40"></div>
          <div className="flex justify-center text-center text-xs text-gray-400">
            <p>
              By signing up, you agree to our Terms of Service and acknowledge
              our Privacy Policy
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-self-end ">
        <p className=" text-xs font-medium text-gray-400">
          © 2023 levizair All rights reserved
        </p>
      </div>
    </div>
  );
};
