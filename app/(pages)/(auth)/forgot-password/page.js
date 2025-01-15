"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { forgotPassword } from "app/services/auth";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await forgotPassword(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      resetForm();
      router.push("/check-email?email=" + values.email);
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh ">
      <div className="p-10 w-full max-w-[520px] rounded-lg bg-primary">
        {/* <iframe
          src="https://yodo1net-my.sharepoint.com/personal/arpat_yodo1_com/_layouts/15/embed.aspx?UniqueId=0f9d23bb-aea9-4563-8b95-01819c9fbea6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
          width="1280"
          height="720"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title="Mas Admin Requirement-20241209_063255-Meeting Recording.mp4"
        ></iframe> */}
        <h1 className="text-2xl md:text-3xl font-bold mt-8">
          Forgot your Password?
        </h1>
        <p className="mt-7 text-lg md:text-2xl">
          No worries! We'll help you reset it.
        </p>
        <p className="mt-5 text-sm md:text-lg">
          Enter the email address associated with your account, and we'll send
          you a link to reset your password.
        </p>

        <div className="my-8 w-full">
          <Formik
            initialValues={{ email: "" }}
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

                <Button
                  text="Submit"
                  htmlType="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="mt-9 !text-black"
                  style={{ height: "40px", fontSize: "18px" }}
                />
              </Form>
            )}
          </Formik>
          <div className="mt-9">
            <p className="text-lg md:text-2xl">Remember your password?</p>
            <Link href="/login">
              <Button
                text="Login"
                className="mt-6 !bg-[#8FB9FE] !border-[#8FB9FE] !text-black"
                style={{ height: "40px", fontSize: "18px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
