"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, message } from "antd";
import { login } from "app/services/auth";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await login(values);
    setSubmitting(false);
    if (status === 200) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);
      message.success(data.message);
      if (data?.data?.role === "supervisor") {
        router?.replace("/supervisor/dashboard");
      }
      if (data?.data?.role === "admin") {
        router?.replace("/admin/dashboard");
      }
      resetForm();
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh ">
      <div className="p-10 w-full max-w-[520px] rounded-lg bg-primary">
        <h1 className="text-2xl md:text-3xl font-bold mt-8">
          Log in to your account
        </h1>
        {/* <p className="mt-3 text-sm md:text-base">
          Welcome back! Please enter your details
        </p> */}
        <div className="my-8 w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSubmit(values, setSubmitting, resetForm);
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <p className="text-lg mb-2">Email Address</p>
                <InputField
                  placeholder="email@email.com"
                  name="email"
                  style={{ height: "40px" }}
                />
                <p className="text-lg mt-5 mb-2">Password</p>
                <InputField
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  style={{ height: "40px" }}
                  suffix={
                    showPassword ? (
                      <EyeOutlined
                        style={{ fontSize: "125%" }}
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        style={{ fontSize: "125%" }}
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      />
                    )
                  }
                />
                <div className="flex justify-between items-center mt-5">
                  <Checkbox>
                    <p className="text-lg">Remember me</p>
                  </Checkbox>
                  <Link
                    href="/forgot-password"
                    className="text-[#116AFC] underline text-lg"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  text="Login"
                  htmlType="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="mt-7 !text-black !font-medium"
                  style={{ height: "40px", fontSize: "18px" }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
