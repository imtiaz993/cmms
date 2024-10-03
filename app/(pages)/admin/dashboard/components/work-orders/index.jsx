import { Tabs } from "antd";
import Planned from "./planned";
import Unplanned from "./unplanned";

const WorkOrders = () => {
  const tabs = [
    {
      label: "Planned",
      children: <Planned />,
    },
    {
      label: "Unplanned",
      children: <Unplanned />,
    },
  ];
  return (
    <div className="pb-4 pt-3">
      <Tabs
        type="card"
        size={"small"}
        items={tabs.map((i, index) => ({ ...i, key: index }))}
        tabBarStyle={{ borderColor: "white" }}
        className="work-orders-tabs"
      />
    </div>
  );
};
export default WorkOrders;
