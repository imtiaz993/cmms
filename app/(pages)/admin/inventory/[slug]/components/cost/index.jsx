import React, { useState } from "react";
import { Card } from "antd";
import Button from "@/components/common/Button";
import { PlusOutlined } from "@ant-design/icons";
import AddCostPopup from "./components/addCostPopup";

// Main Card Component
const MainCard = () => (
  <Card>
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      <div>
        <h2 className="md:text-lg font-semibold">Maintenance Costs la...</h2>
        <p className="text-2xl font-bold">0 USD</p>
        <p>Compare to 0 previous 12 months</p>
      </div>
      <div>
        <h2 className="md:text-lg font-semibold">Total Cost of Owners...</h2>
        <p className="text-2xl font-bold">0 USD</p>
        <p>Since September 9, 1999</p>
      </div>
    </div>
  </Card>
);

// Direct Costs Card Component
const DirectCostsCard = ({ setDetails }) => {
  const [costPopup, setCostPopup] = useState(false);
  return (
    <>
      <AddCostPopup
        visible={costPopup}
        setVisible={setCostPopup}
        setDetails={setDetails}
      />
      <Card
        title={<h2 className="text-wrap">Direct Costs</h2>}
        size="medium"
        extra={
          <div>
            <Button
              fullWidth={false}
              outlined
              text="View Details"
              className=" !text-xs sm:!text-sm"
            />
            <Button
              fullWidth={false}
              text="Add Cost"
              prefix={<PlusOutlined />}
              className="ml-2 md:ml-3 !text-xs sm:!text-sm"
              onClick={() => setCostPopup(true)}
            />
          </div>
        }
      >
        <p className="text-xl">0.00 USD</p>
        <p className="text-center">No direct costs found</p>
      </Card>
    </>
  );
};

// Maintenance Costs Card Component
const MaintenanceCostsCard = () => (
  <Card
    title="Maintenance Costs"
    size="medium"
    extra={<Button text="View Details" fullWidth={false} outlined />}
  >
    <p className="text-xl">0.00 USD</p>
    <p className="text-center">No maintenance costs found</p>
  </Card>
);

// Inventory Costs Card Component
const InventoryCostsCard = () => (
  <Card
    title="Inventory Costs"
    size="medium"
    extra={<Button text="View Details" fullWidth={false} outlined />}
  >
    <p className="text-xl">0.00 USD</p>
    <p className="text-center">No inventory costs found</p>
  </Card>
);

// Contract Costs Card Component
const ContractCostsCard = () => (
  <Card
    title="Contract Costs"
    size="medium"
    extra={<Button text="View Details" fullWidth={false} outlined />}
  >
    <p className="text-xl">0.00 USD</p>
    <p className="text-center">No contract costs found</p>
  </Card>
);

// Labor Costs Card Component
const LaborCostsCard = () => (
  <Card
    title="Labor Costs"
    size="medium"
    extra={<Button text="View Details" fullWidth={false} outlined />}
  >
    <p className="text-xl">0.00 USD</p>
    <p className="text-center">No labor costs found</p>
  </Card>
);

// Main layout
const CardLayout = ({ setDetails }) => (
  <div className="flex flex-col md:flex-row md:gap-4 p-7">
    <div className="w-full flex flex-col gap-4">
      <MainCard />
      <div className="block md:hidden">
        <DirectCostsCard setDetails={setDetails} />
      </div>
      <MaintenanceCostsCard />
      <ContractCostsCard />
    </div>
    <div className="w-full flex flex-col gap-4 mt-4 md:mt-0">
      <div className="hidden md:block">
        <DirectCostsCard />
      </div>
      <InventoryCostsCard />
      <LaborCostsCard />
    </div>
  </div>
);

export default CardLayout;
