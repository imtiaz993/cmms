import "./globals.css";
import RootWrapper from "./rootWrapper";

export const metadata = {
  title: "CMMS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#212020] min-h-dvh">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
