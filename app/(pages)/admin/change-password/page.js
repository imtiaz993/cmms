"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { changePassword } from "app/services/user";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { getUser } from "@/utils/index";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters long")
    .matches(
      /[a-zA-Z]/,
      "New Password must contain at least one alphabet letter"
    )
    .matches(/[0-9]/, "New Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "New Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

const Profile = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (values, setSubmitting) => {
    const { status, data } = await changePassword({ ...values, email: getUser().email });
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-76px)] overflow-auto px-3 lg:px-8 pb-4">
      <div className="bg-primary p-5 md:p-10 rounded-[10px]  w-full">
        <div className="flex justify-between mb-10 lg:mb-16">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-5">
              Would you like to change your password
            </h1>
            <p className="text-sm max-w-[500px]">
              Update your password here for enhanced security. Keep your account
              safe by changing it whenever you feel it&apos;s necessary!
            </p>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ isSubmitting, handleSubmit, setValues }) => (
              <Form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-y-0 xl:gap-x-12"
              >
                <label className="text-sm">
                  Old Password
                  <InputField
                    placeholder="Enter Old Password"
                    name="oldPassword"
                    type={showPassword.oldPassword ? "text" : "password"}
                    className="mt-1"
                    style={{ height: "40px" }}
                    prefix={
                      showPassword.oldPassword ? (
                        <EyeOutlined
                          style={{ fontSize: "125%" }}
                          onClick={() => {
                            setShowPassword((prev) => ({
                              ...prev,
                              oldPassword: !prev.oldPassword,
                            }));
                          }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          style={{ fontSize: "125%" }}
                          onClick={() => {
                            setShowPassword((prev) => ({
                              ...prev,
                              oldPassword: !prev.oldPassword,
                            }));
                          }}
                        />
                      )
                    }
                  />
                </label>
                <label className="text-sm">
                  New Password
                  <InputField
                    placeholder="Enter New Password"
                    name="newPassword"
                    type={showPassword.newPassword ? "text" : "password"}
                    className="mt-1"
                    style={{ height: "40px" }}
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
                  />
                </label>
                <label className="text-sm">
                  Confirm Password
                  <InputField
                    placeholder="Enter Confirm Password"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    className="mt-1"
                    style={{ height: "40px" }}
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
                  />
                </label>
                <div className="flex justify-end lg:col-span-3 mt-4 lg:mt-10">
                  <Button
                    text="Cancel"
                    onClick={() => {
                      router.push("/admin/profile");
                    }}
                    className="mr-4"
                    outlined
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                  <Button
                    htmlType="submit"
                    text="Update"
                    fullWidth={false}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
