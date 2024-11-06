import "./globals.css";
import RootWrapper from "./rootWrapper";

export const metadata = {
  title: "CMMS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-dvh">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
