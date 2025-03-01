"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import Documents from "./documents";
import MaterialTransfer from "./material-transfer";
import Dashboard from "./dashboard";
import Maintainance from "./maintenance";
import Details from "./details";
import Events from "./events";
import History from "./history";
import ManHours from "./man-hours";
import Photos from "./photos";

const Tabs = ({ data, setData, slug, superUsers }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const onChange = (key) => {
    router.push(`/admin/inventory/${slug}?tab=${key}`);
  };

  const tabs = [
    {
      key: "details",
      label: "Details",
      children: <Details details={data?.dashboard} />,
    },
    {
      key: "events",
      label: "Events",
      children: <Events data={data?.events} setData={setData} />,
    },
    {
      key: "photos",
      label: "Photos",
      children: <Photos photos={data?.dashboard?.image} setData={setData} />,
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
