import { Button, Result } from "antd";
import Link from "next/link";

const NotFound = () => (
  <div className="min-h-dvh flex flex-col justify-center items-center">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href="/">
          <Button
            type="primary"
            style={{ height: "36px", fontWeight: "500", minWidth: "80px" }}
          >
            Back Home
          </Button>
        </Link>
      }
    />
  </div>
);
export default NotFound;
