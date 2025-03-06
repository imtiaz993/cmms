"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <div
      className={`absolute w-full z-20 bg-primary h-[60px] flex justify-between items-center px-3 md:px-5`}
    >
      <Image src="/images/hive-logo.png" alt="logo" width={50} height={50} />
      {/* <h1 className={`dark:text-white text-3xl font-bold`}>LOGO</h1> */}
      <div className="flex gap-3">
        {/* <Link href="/signup"> */}
        <Button
          text="Signup"
          className={"!bg-[#282828] !border-[#282828] !h-10 !text-base"}
        />
        {/* </Link> */}
        <Link href="/login">
          <Button text="Login" className={"!h-10 !text-base "} />
        </Link>
      </div>
    </div>
  );
};

export default AuthNavbar;
