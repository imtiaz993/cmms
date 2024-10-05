import { WarningFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
const High = () => {
  const { Text } = Typography;

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          size="small"
          title={"11M1948377"}
          style={{
            width: 300,
          }}
          headStyle={{
            backgroundColor: "#c9b967",
          }} // Adjust padding here
        >
          <Text
            ellipsis={{
              tooltip: "AC Powered 1500 HP Oderco Drawworks installed",
            }}
          >
            AC Powered 1500 HP Oderco Drawworks installed
          </Text>
          <Text ellipsis={{ tooltip: "I am ellipsis now!" }}>Floorhand</Text>
          <p className="flex justify-between">
            <Text
              className="w-full"
              ellipsis={{ tooltip: "I am ellipsis now!" }}
            >
              Daily Checklist (1 Day) - 0
            </Text>
            <WarningFilled />
          </p>
        </Card>
      ))}
    </div>
  );
};

export default High;
