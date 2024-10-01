"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { toast } from "react-toastify";
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

  phone: Yup.string().required("Phone number is required"),
});

const Profile = () => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (values, setSubmitting) => {
    const { status, data } = await updateProfile(values);
    setSubmitting(false);
    if (status === 200) {
      localStorage.setItem("user", data);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="bg-[#313131] p-10 rounded-[10px] text-white w-full">
      <div className="flex justify-between mb-16">
        <div>
          <h1 className="text-2xl font-bold mb-5">Personal Info</h1>
          <p className="text-sm max-w-[500px]">
            Keep your name, email, and phone number up to date for a smooth and
            personalized experience. Your details help us stay connected!
          </p>
        </div>
        {!isEdit && (
          <div>
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
              className="grid lg:grid-cols-3 gap-5 lg:gap-y-0 lg:gap-x-12"
            >
              <label className="text-sm">
                Full Name
                <InputField
                  placeholder="Full Name"
                  name="name"
                  as={Input}
                  className="mt-1"
                  readOnly={!isEdit}
                  prefix={<UserOutlined style={{ fontSize: "125%" }} />}
                />
              </label>
              <label className="text-sm">
                Email
                <InputField
                  placeholder="Email"
                  name="email"
                  as={Input}
                  className="mt-1"
                  readOnly={!isEdit}
                  prefix={<MailOutlined style={{ fontSize: "125%" }} />}
                />
              </label>
              <label className="text-sm">
                Phone No.
                <InputField
                  placeholder="Phone No."
                  name="phone"
                  as={Input}
                  className="mt-1"
                  readOnly={!isEdit}
                  prefix={<PhoneOutlined style={{ fontSize: "125%" }} />}
                />
              </label>
              {isEdit && (
                <div className="flex justify-center col-span-3 mt-10">
                  <Button
                    htmlType="submit"
                    text="Update"
                    className="mr-4"
                    fullWidth={false}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  />
                  <Button
                    text="Cancel"
                    onClick={() => {
                      setIsEdit(false);
                      setValues(getUser());
                    }}
                    outlined
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
