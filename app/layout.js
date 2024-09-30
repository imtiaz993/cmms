import "./globals.css";
import RootWrapper from "./rootWrapper";

export const metadata = {
  title: "CMMS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
