"use client";
import Button from "@/components/common/Button";
import { message } from "antd";
import { forgotPassword } from "app/services/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CheckEmail = () => {
  const email = useSearchParams().get("email");
  console.log("email", email);

  const handleResend = async () => {
    const { status, data } = await forgotPassword({ email: email });
    if (status === 200) {
      message.success(data.message);
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
          Check your Email?
        </h1>
        <p className="mt-7 text-sm md:text-lg">
          We&apos;ve sent a password reset link to your email address.
        </p>
        <p className="mt-5 text-sm md:text-lg">
          Please check your inbox and follow the instructions to reset your
          password.
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold mt-5">
          Didn&apos;t receive the email?
        </h1>
        <p className="mt-5 text-sm md:text-lg">
          It may take a few minutes for the email to arrive. Be sure to check
          your spam or junk folder. If you still haven't received the email, you
          can:
        </p>
        <Button
          text="Resend Link"
          className="mt-9 !text-black"
          style={{ height: "40px", fontSize: "18px" }}
          onClick={handleResend}
        />
        <p className="mt-9 text-lg md:text-2xl">Need further assistance?</p>
        <p className="mt-5 text-lg md:text-2xl">
          <span className="text-[#116AFC] underline cursor-pointer">
            Contact
          </span>{" "}
          our support team for help.
        </p>
        <Link href="/login">
          <Button
            text="Return to Login"
            className="mt-6 !bg-[#8FB9FE] !border-[#8FB9FE] !text-black !mb-8"
            style={{ height: "40px", fontSize: "18px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default CheckEmail;
