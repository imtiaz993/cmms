"use client";

import { useState } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center text-white min-h-screen w-11/12 mx-auto md:w-full max-w-[520px]">
      <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
      <p className="mt-3 text-sm md:text-base">
        Welcome back! Please enter your details
      </p>
      <div className="mt-10 w-full">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            // setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                placeholder="Email"
                name="email"
                as={Input}
                prefix={<MailOutlined style={{ fontSize: "125%" }} />}
              />
              <InputField
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                as={Input}
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
              <Link
                href="/forgot-password"
                className="mt-4 text-sm font-medium text-white flex justify-end"
              >
                Forgot Password?
              </Link>
              <Button
                text="Login Now"
                htmlType="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="mt-7"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
