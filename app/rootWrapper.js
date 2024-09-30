import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootWrapper({ children }) {
  return (
    <div>
      <AntdRegistry>{children}</AntdRegistry>
      <ToastContainer />
    </div>
  );
}
