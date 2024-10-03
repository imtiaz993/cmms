"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, message } from "antd";
import { resetPassword } from "app/services/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one alphabet letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = async (values, setSubmitting) => {
    const { status, data } = await resetPassword({
      ...values,
      token: token,
    });
    setSubmitting(false);
    if (status === 200) {
      router.replace("/login");
      message.success(data.message);
      resetForm();
    } else {
      message.error(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  min-h-dvh w-11/12 mx-auto md:w-full max-w-[520px]">
      <h1 className="text-2xl md:text-3xl font-bold">Create a New Password</h1>
      <p className="mt-3 text-sm md:text-base">
        Set a new secured password for your account.
      </p>
      <div className="mt-10 w-full">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                name="password"
                placeholder="Password"
                style={{ height: "40px" }}
                type={showPassword.password ? "text" : "password"}
                prefix={
                  showPassword.password ? (
                    <EyeOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }));
                      }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }));
                      }}
                    />
                  )
                }
                className="mt-7"
              />
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password"
                style={{ height: "40px" }}
                type={showPassword.confirmPassword ? "text" : "password"}
                prefix={
                  showPassword.confirmPassword ? (
                    <EyeOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }));
                      }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }));
                      }}
                    />
                  )
                }
                className="mt-7"
              />

              <Button
                text="Reset Now"
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

export default ResetPassword;
