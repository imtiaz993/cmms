"use client";

import Button from "@/components/common/Button";
import { PlusOutlined } from "@ant-design/icons";
import CreatePurchaseOrderPopup from "./createPurchaseOrderPopup";
import { useState } from "react";

const PurchaseOrder = () => {
  const [createPOVisible, setCreatePOVisible] = useState(false);
  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <CreatePurchaseOrderPopup
        visible={createPOVisible}
        setVisible={setCreatePOVisible}
      />
      <Button
        text="Create Purchase Order"
        prefix={<PlusOutlined />}
        fullWidth={false}
        onClick={() => setCreatePOVisible(true)}
      />
    </div>
  );
};

export default PurchaseOrder;
