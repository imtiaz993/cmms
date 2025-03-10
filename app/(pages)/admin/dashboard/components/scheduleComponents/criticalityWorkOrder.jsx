import { CalendarFilled, WarningFilled } from "@ant-design/icons";
import { Card, Checkbox, Typography } from "antd";
import { useRouter } from "next/navigation";
const CriticalityWorkOrder = ({
  batchEdit,
  setReschedulePopup,
  data,
  selectedWorkOrders,
  setSelectedWorkOrders,
}) => {
  const { Text } = Typography;

  const handleCheckboxChange = (id) => {
    setSelectedWorkOrders((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <Card
            size="small"
            title={
              <Text
                className="w-full"
                ellipsis={{
                  tooltip: item.assetID,
                }}
              >
                {"AssetID: " + item.assetID}
              </Text>
            }
            headStyle={{
              backgroundColor: "#ff4d4f",
            }}
            extra={
              batchEdit ? (
                <Checkbox
                  // onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleCheckboxChange(item._id)}
                  checked={selectedWorkOrders.has(item._id)}
                />
              ) : (
                <CalendarFilled
                  className="cursor-pointer"
                  onClick={(e) => {
                    // e.stopPropagation();
                    setReschedulePopup(true);
                    setSelectedWorkOrders(new Set([item._id]));
                  }}
                />
              )
            }
            // onClick={() => router.push("/admin/work-orders/PWO013942000998")}
            className="cursor-pointer"
            key={item._id}
          >
            <Text
              className="w-full"
              ellipsis={{
                tooltip: item.description,
              }}
            >
              {item.description}
            </Text>
            <Text
              className="w-full"
              // ellipsis={{ tooltip: "I am ellipsis now!" }}
            >
              Due Date: {item.dueDate}
            </Text>
            <p className="flex justify-between">
              <Text
                className="w-full"
                // ellipsis={{ tooltip: "I am ellipsis now!" }}
              >
                {item.maintCategory}
              </Text>
              <WarningFilled />
            </p>
          </Card>
        ))}
    </div>
  );
};

export default CriticalityWorkOrder;
