"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { forgotPassword } from "app/services/auth";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await forgotPassword(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      resetForm();
    } else {
      message.error(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  min-h-dvh w-11/12 mx-auto md:w-full max-w-[520px]">
      <iframe src="https://yodo1net-my.sharepoint.com/personal/arpat_yodo1_com/_layouts/15/embed.aspx?UniqueId=0f9d23bb-aea9-4563-8b95-01819c9fbea6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="1280" height="720" frameBorder="0" scrolling="no" allowFullScreen title="Mas Admin Requirement-20241209_063255-Meeting Recording.mp4"></iframe>
      <h1 className="text-2xl md:text-3xl font-bold">Forgot Password</h1> 
      <p className="mt-3 text-sm md:text-base max-w-[440px] text-center">
        Enter the email address associated with your account, and we’ll send you
        an email to reset your password
      </p>
      <div className="mt-10 w-full">
        <Formik
          initialValues={{ email: "" }}
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
                prefix={<MailOutlined />}
              />

              <Button
                text="Submit"
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

export default ForgotPassword;
