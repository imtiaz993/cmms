import { useState } from "react";
import { Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="md:flex items-center gap-3 mb-3">
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ height: "36px" }}
      />
      <div className="grid grid-cols-2 sm:flex items-center gap-2 mt-4 md:mt-0">
        <Button
          text="Download All"
          outlined
          style={{ padding: "4px 20px" }}
          prefix={<DownloadOutlined />}
        />
      </div>
    </div>
  );
};

export default ActionBar;
