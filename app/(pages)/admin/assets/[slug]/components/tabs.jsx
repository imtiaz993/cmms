"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import Documents from "./documents";
import MaterialTransfer from "./material-transfer";
import Maintainance from "./maintenance";
import Details from "./details";
import History from "./history";
import ManHours from "./man-hours";
import Photos from "./photos";

const Tabs = ({ data, setData, slug, superUsers }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const onChange = (key) => {
    router.push(`/admin/assets/${slug}?tab=${key}`);
  };

  const tabs = [
    {
      key: "details",
      label: "Details",
      children: <Details details={data?.dashboard} />,
    },
    {
      key: "photos",
      label: "Photos",
      children: (
        <Photos photos={data?.dashboard.assetImages} setData={setData} />
      ),
    },
    {
      key: "documents",
      label: "Documents",
      children: (
        <Documents
          documentsData={data?.documents}
          setData={setData}
          superUsers={superUsers}
        />
      ),
    },
    {
      key: "manHours",
      label: "Man Hours",
      children: (
        <ManHours
          manHoursData={data?.dashboard?.manHours}
          superUsers={superUsers}
        />
      ),
    },

    {
      key: "maintenance",
      label: "Maintenance",
      children: (
        <Maintainance maintenanceData={data?.workOrders} setData={setData} />
      ),
    },
    {
      key: "material-transfer",
      label: "Material Transfer",
      children: (
        <MaterialTransfer
          materialTransferData={data?.materialTransfers}
          setData={setData}
          superUsers={superUsers}
        />
      ),
    },
    {
      key: "history",
      label: "History",
      children: <History historyData={data?.history} setData={setData} />,
    },
  ];
  return (
    <div className="mt-5 bg-primary !mx-5 lg:!mx-10 p-3 pb-7 rounded-lg shadow-custom">
      <AntTabs
        activeKey={tabs.find((i) => i.key === activeTab)?.key || "details"}
        animated
        items={tabs}
        onChange={onChange}
        className="select-none asset-tabs"
      />
    </div>
  );
};
export default Tabs;
