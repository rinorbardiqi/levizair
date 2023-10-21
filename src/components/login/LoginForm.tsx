import { Button, Form, Input, notification } from "antd";
import { Rule } from "antd/es/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface FieldType {
  email?: string;
  password?: string;
}

interface FormItems {
  id: number;
  label: string;
  name: "email" | "password";
  rules: Rule[];
  component: JSX.Element;
}

const formItems: FormItems[] = [
  {
    id: 1,
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
    id: 2,
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please input your password!" }],
    component: <Input.Password className="h-12" placeholder="Password" />,
  },
];

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (!values.email || !values.password)
      return notification.error({
        message: "Error:",
        description: "Please enter a valid email and password",
        placement: "top",
      });

    const loggedIn = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!loggedIn?.error) {
      return router.push("/");
    }

    notification.error({
      message: "Error:",
      description: loggedIn?.error,
      placement: "top",
    });
  };
  return (
    <div className="flex w-full flex-col  items-center justify-center bg-white py-3 drop-shadow-2xl md:w-5/12 ">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-5 px-10">
        <h1 className="w-full min-w-full text-2xl">
          Welcome back to{" "}
          <span className="underline decoration-sky-600">levizair!</span>
        </h1>
        <div className="w-full min-w-min ">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
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

            <div className="mb-3 flex justify-center">
              <Link
                href="/forgot-password"
                className=" font-sans text-xs  text-gray-400"
              >
                Forgot your password?
              </Link>
            </div>

            <Form.Item>
              <Button
                className="my-2 h-11 w-full bg-indigo-600  font-sans font-bold "
                type="primary"
                htmlType="submit"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center  text-xs   text-gray-400">
            <p>No account yet?</p>
            &nbsp;&nbsp;
            <Link className="text-sky-600" href="/register">
              Sign up
            </Link>
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
