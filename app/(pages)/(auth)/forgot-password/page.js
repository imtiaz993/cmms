"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white min-h-screen w-11/12 mx-auto md:w-full max-w-[520px]">
      <h1 className="text-2xl md:text-3xl font-bold">Forgot Password</h1>
      <p className="mt-3 text-sm md:text-base max-w-[440px] text-center">
        Enter the email address associated with your account, and we’ll send you
        an email to reset your password
      </p>
      <div className="mt-10 w-full">
        <Formik
          initialValues={{ email: "" }}
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
                prefix={<MailOutlined />}
              />

              <Button
                text="Submit"
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

export default ForgotPassword;
