"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
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
    <div className="flex flex-col justify-center items-center min-h-dvh w-11/12 mx-auto md:w-full max-w-[520px]">
      <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
      <p className="mt-3 text-sm md:text-base">
        Welcome back! Please enter your details
      </p>
      <div className="mt-10 w-full">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                placeholder="Email"
                name="email"
                style={{ height: "40px" }}
                prefix={<MailOutlined style={{ fontSize: "125%" }} />}
              />
              <InputField
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                style={{ height: "40px" }}
                prefix={
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
                className="mt-7"
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="mt-4 text-sm font-medium "
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                text="Login Now"
                htmlType="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="mt-7"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;