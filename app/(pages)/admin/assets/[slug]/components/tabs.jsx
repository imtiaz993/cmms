"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import WorkOrders from "./work-orders";
import Documents from "./documents";
import MaterialTransfer from "./material-transfer";
import Dashboard from "./dashboard";
import MaintainanceSchedule from "./maintainance-schedule";
import HistoryAssetDetail from "./history";
import Readings from "./readings/page";
import Cost from "./cost";
import Details from "./details";

const Tabs = ({ details, setDetails, slug }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const onChange = (key) => {
    router.push(`/admin/assets/${slug}?tab=${key}`);
  };

  const tabs = [
    { key: "details", label: "Details", children: <Details /> },
    { key: "events", label: "Events", children: <></> },
    { key: "photos", label: "Photos", children: <></> },
    {
      key: "dashboard",
      label: "Dashboard",
      children: <Dashboard dashboardDetails={details?.dashboard} />,
    },
    // {
    //   key: "work-orders",
    //   label: "Work Orders",
    //   children: <WorkOrders />,
    // },
    // {
    //   key: "history",
    //   label: "History",
    //   children: <HistoryAssetDetail />,
    // },
    // {
    //   key: "cost",
    //   label: "Cost",
    //   children: <Cost setDetails={setDetails} />,
    // },
    {
      key: "documents",
      label: "Documents",
      children: (
        <Documents documentsData={details?.documents} setDetails={setDetails} />
      ),
    },
    { key: "mainHours", label: "Main Hours", children: <></> },

    {
      key: "maintenance-schedule",
      label: "Maintenance Schedule",
      children: <MaintainanceSchedule />,
    },
    {
      key: "history",
      label: "History",
      children: <Readings />,
    },
    {
      key: "material-transfer",
      label: "Material Transfer",
      children: (
        <MaterialTransfer
          materialTransferData={details?.materialTransfers}
          setDetails={setDetails}
        />
      ),
    },
  ];
  return (
    <div className="mt-5 bg-primary !mx-5 lg:!mx-10 p-3 pb-7 rounded-lg shadow-custom">
      <AntTabs
        activeKey={tabs.find((i) => i.key === activeTab)?.key || "dashboard"}
        animated
        items={tabs}
        onChange={onChange}
        className="select-none"
      />
    </div>
  );
};
export default Tabs;
