"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { resetPassword } from "app/services/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one alphabet letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const router = useRouter();

  const { token } = useParams();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await resetPassword({
      ...values,
      token: token,
    });
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      router.replace("/login");
      resetForm();
    } else {
      message.error(data.error);
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
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                name="newPassword"
                placeholder="Password"
                style={{ height: "40px" }}
                type={showPassword.newPassword ? "text" : "password"}
                prefix={
                  showPassword.newPassword ? (
                    <EyeOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }));
                      }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "125%" }}
                      onClick={() => {
                        setShowPassword((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
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
