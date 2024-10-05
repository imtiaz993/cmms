import { Modal, Radio } from "antd";
import { useState } from "react";
import Low from "./low";
import Medium from "./medium";
import High from "./high";
import Critical from "./critical";

const DailyBatchPopup = ({ selectedDate, setSelectedDate }) => {
  const [selectedTab, setSelectedTab] = useState("Critical"); // State to track the selected tab

  // Function to render the content based on the selected radio button
  const renderContent = () => {
    switch (selectedTab) {
      case "Critical":
        return <Critical />;
      case "High":
        return <High />;
      case "Medium":
        return <Medium />;
      case "Low":
        return <Low />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        maskClosable={false}
        open={selectedDate}
        onCancel={() => setSelectedDate("")}
        footer={null}
        title={"Daily Work Orders: " + selectedDate}
        width={1000}
      >
        <div className="pb-4 pt-3">
          <Radio.Group
            onChange={(e) => setSelectedTab(e.target.value)}
            value={selectedTab}
            style={{
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            <Radio.Button value="Critical" style={{ width: "100px" }}>
              Critical
            </Radio.Button>
            <Radio.Button value="High" style={{ width: "100px" }}>
              High
            </Radio.Button>
            <Radio.Button value="Medium" style={{ width: "100px" }}>
              Medium
            </Radio.Button>
            <Radio.Button value="Low" style={{ width: "100px" }}>
              Low
            </Radio.Button>
          </Radio.Group>

          {/* Render content based on selected radio button */}
          <div>{renderContent()}</div>
        </div>
      </Modal>
    </div>
  );
};

export default DailyBatchPopup;
``;
