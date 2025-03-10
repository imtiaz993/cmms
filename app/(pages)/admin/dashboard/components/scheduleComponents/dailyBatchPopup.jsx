import { Modal, Radio } from "antd";
import { useState } from "react";
import { Form, Formik } from "formik";
import CriticalityWorkOrder from "./criticalityWorkOrder";
import Button from "@/components/common/Button";
import MaintenanceReschulePopup from "app/(pages)/admin/work-orders/components/maintenanceReschulePopup";

const DailyBatchPopup = ({
  selectedDate,
  setSelectedDate,
  data,
  getSchedule,
}) => {
  const [selectedTab, setSelectedTab] = useState("Critical"); // State to track the selected tab
  const [batchEdit, setBatchEdit] = useState(false);
  const [reschedulePopup, setReschedulePopup] = useState(false);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState(new Set());

  // Function to render the content based on the selected radio button
  const renderContent = () => {
    switch (selectedTab) {
      case "Critical":
        return data.criticalArray.length > 0 ? (
          <CriticalityWorkOrder
            batchEdit={batchEdit}
            setReschedulePopup={setReschedulePopup}
            data={data.criticalArray}
            selectedWorkOrders={selectedWorkOrders}
            setSelectedWorkOrders={setSelectedWorkOrders}
          />
        ) : (
          <p className="text-center my-10">
            No Critical Work Orders To Display
          </p>
        );
      case "High":
        return data.highArray.length > 0 ? (
          <CriticalityWorkOrder
            batchEdit={batchEdit}
            setReschedulePopup={setReschedulePopup}
            data={data.highArray}
            selectedWorkOrders={selectedWorkOrders}
            setSelectedWorkOrders={setSelectedWorkOrders}
          />
        ) : (
          <p className="text-center my-10">No High Work Orders To Display</p>
        );
      case "Medium":
        return data.mediumArray.length > 0 ? (
          <CriticalityWorkOrder
            batchEdit={batchEdit}
            setReschedulePopup={setReschedulePopup}
            data={data.mediumArray}
            selectedWorkOrders={selectedWorkOrders}
            setSelectedWorkOrders={setSelectedWorkOrders}
          />
        ) : (
          <p className="text-center my-10">No Medium Work Orders To Display</p>
        );
      case "Low":
        return data.lowArray.length > 0 ? (
          <CriticalityWorkOrder
            batchEdit={batchEdit}
            setReschedulePopup={setReschedulePopup}
            data={data.lowArray}
            selectedWorkOrders={selectedWorkOrders}
            setSelectedWorkOrders={setSelectedWorkOrders}
          />
        ) : (
          <p className="text-center my-10">No Low Work Orders To Display</p>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* {reschedulePopup && ( */}
      <MaintenanceReschulePopup
        visible={reschedulePopup}
        setVisible={setReschedulePopup}
        onSuccess={() => {
          setSelectedWorkOrders(new Set());
          setBatchEdit(false);
          setSelectedDate("");
          getSchedule();
        }}
        // batchEdit={batchEdit}
        // setBatchEdit={setBatchEdit}
        selectedWorkOrders={[...selectedWorkOrders]}
      />
      {/* )}{" "} */}
      {console.log("selected Items: ", selectedWorkOrders)}
      <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
        {({ values, setFieldValue }) => (
          <Form>
            <Modal
              maskClosable={false}
              open={selectedDate}
              onCancel={() => setSelectedDate("")}
              footer={null}
              title={"Daily Work Orders: " + selectedDate}
              width={1000}
            >
              <div className="pb-4 pt-3">
                <div className="md:flex justify-between">
                  <Radio.Group
                    onChange={(e) => setSelectedTab(e.target.value)}
                    value={selectedTab}
                    style={{
                      marginBottom: 16,
                      textAlign: "center",
                      display: "flex",
                    }}
                  >
                    <Radio.Button value="Critical" className="w-full md:w-24">
                      Critical
                    </Radio.Button>
                    <Radio.Button value="High" className="w-full md:w-24">
                      High
                    </Radio.Button>
                    <Radio.Button value="Medium" className="w-full md:w-24">
                      Medium
                    </Radio.Button>
                    <Radio.Button value="Low" className="w-full md:w-24">
                      Low
                    </Radio.Button>
                  </Radio.Group>
                  <div className="mb-2 md:mb-0 text-end">
                    <Button
                      outlined
                      size="small"
                      text="Batch Edit"
                      style={{ width: "fit-content" }}
                      className="mr-2"
                      onClick={() => {
                        setSelectedWorkOrders(new Set());
                        setBatchEdit(!batchEdit);
                      }}
                    />
                  </div>
                </div>
                {/* Render selected items and button */}
                {batchEdit && (
                  <div className="flex justify-between items-center my-4">
                    <div>{selectedWorkOrders.size} selected</div>
                    <Button
                      text={"Reschedule"}
                      fullWidth={false}
                      style={{ padding: "4px 10px" }}
                      onClick={() => {
                        setReschedulePopup(true);
                      }}
                    />
                  </div>
                )}
                {/* Render content based on selected radio button */}
                <div>
                  {data ? (
                    renderContent()
                  ) : (
                    <p className="text-center my-10">Loading...</p>
                  )}
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DailyBatchPopup;
``;
