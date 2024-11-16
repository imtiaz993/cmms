"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { getUser } from "@/utils/index";
import { updateProfile } from "app/services/user";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  phone: Yup.string(),
});

const Profile = () => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (values, setSubmitting) => {
    const { status, data } = await updateProfile(values);
    setSubmitting(false);
    if (status === 200) {
      localStorage.setItem("user", JSON.stringify({ ...getUser(), ...values }));
      message.success(data.message);
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-76px)] overflow-auto px-3 lg:px-8 pb-4">
      <div className="bg-primary p-5 md:p-10 rounded-[10px]  w-full">
        <div className="mb-4 lg:mb-16">
          <div className="md:flex justify-between items-baseline">
            <h1 className="text-xl md:text-2xl font-bold mb-5">
              Personal Info
            </h1>
            <p className="text-sm md:hidden md:max-w-[500px] mt-1">
              Keep your name, email, and phone number up to date for a smooth
              and personalized experience. Your details help us stay connected!
            </p>
            {!isEdit && (
              <div className="flex justify-end mt-4 md:mt-0">
                <Button
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  text="Edit"
                  className="mr-4"
                  fullWidth={false}
                  prefix={<EditOutlined />}
                />
                <Button
                  text="Change Password"
                  onClick={() => {
                    router.push("/admin/change-password");
                  }}
                  outlined
                  fullWidth={false}
                />
              </div>
            )}
          </div>
          <p className="text-sm hidden md:block md:max-w-[500px] mt-1">
            Keep your name, email, and phone number up to date for a smooth and
            personalized experience. Your details help us stay connected!
          </p>
        </div>
        <div>
          <Formik
            initialValues={getUser()}
            validationSchema={isEdit ? validationSchema : {}}
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
                  Full Name
                  <InputField
                    placeholder="Full Name"
                    name="name"
                    className="mt-1"
                    style={{ height: "40px" }}
                    readOnly={!isEdit}
                    prefix={<UserOutlined style={{ fontSize: "125%" }} />}
                  />
                </label>
                <label className="text-sm">
                  Email
                  <InputField
                    placeholder="Email"
                    name="email"
                    className="mt-1"
                    style={{ height: "40px" }}
                    readOnly={!isEdit}
                    prefix={<MailOutlined style={{ fontSize: "125%" }} />}
                  />
                </label>
                <label className="text-sm">
                  Phone No.
                  <InputField
                    placeholder="Phone No."
                    name="phone"
                    className="mt-1"
                    style={{ height: "40px" }}
                    readOnly={!isEdit}
                    prefix={<PhoneOutlined style={{ fontSize: "125%" }} />}
                  />
                </label>
                {isEdit && (
                  <div className="flex justify-end lg:col-span-3 mt-4 lg:mt-10">
                    <Button
                      text="Cancel"
                      onClick={() => {
                        setIsEdit(false);
                        setValues(getUser());
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
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
