import { CalendarFilled, WarningFilled } from "@ant-design/icons";
import { Card, Checkbox, Typography } from "antd";
import { useRouter } from "next/navigation";
const Critical = ({ batchEdit, print, setBatchEditPopup }) => {
  const { Text } = Typography;
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          size="small"
          title={"11M1948377"}
          headStyle={{
            backgroundColor: "#ff4d4f",
          }}
          extra={
            batchEdit || print ? (
              <Checkbox onClick={(e) => e.stopPropagation()} />
            ) : (
              <CalendarFilled
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setBatchEditPopup(true);
                }}
              />
            )
          }
          onClick={() =>
            router.push(
              "/admin/work-orders/PWO013942000998"
            )
          }
          className="cursor-pointer"
          key={index}
        >
          <Text
            className="w-full"
            ellipsis={{
              tooltip: "AC Powered 1500 HP Oderco Drawworks installed",
            }}
          >
            AC Powered 1500 HP Oderco Drawworks installed dsalkdja d jalskdj lak
          </Text>
          <Text className="w-full" ellipsis={{ tooltip: "I am ellipsis now!" }}>
            Floorhand
          </Text>
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

export default Critical;