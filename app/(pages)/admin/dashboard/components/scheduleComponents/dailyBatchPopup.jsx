import { message, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Low from "./low";
import Medium from "./medium";
import High from "./high";
import Critical from "./critical";
import Button from "@/components/common/Button";
import ReschedulePopup from "./reschedulePopup";
import {
  getDailyWorkOrders,
  printDailyWorkOrders,
} from "app/services/dashboard";

const DailyBatchPopup = ({ selectedDate, setSelectedDate }) => {
  const [data, setdata] = useState();
  const [selectedTab, setSelectedTab] = useState("Critical"); // State to track the selected tab
  const [batchEdit, setBatchEdit] = useState(false);
  const [reschedulePopup, setReschedulePopup] = useState(false);
  const [print, setPrint] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    const getDailyWO = async () => {
      const { status, data } = await getDailyWorkOrders(selectedDate);
      if (status === 200) {
        setdata(data?.data);
      } else {
        message.error(data?.message || "Failed to get work orders");
      }
    };
    getDailyWO();
  }, []);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(item)) {
        newSelected.delete(item);
      } else {
        newSelected.add(item);
      }
      return newSelected;
    });
  };

  const handlePrint = async () => {
    const { status, data } = await printDailyWorkOrders({
      ids: [...selectedItems],
    });
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Printed successfully");
      setPrint(false);
    } else {
      message.error(data.message || "Failed to print");
    }
  };

  // Function to render the content based on the selected radio button
  const renderContent = () => {
    switch (selectedTab) {
      case "Critical":
        return data.critical.length > 0 ? (
          <Critical
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
            data={data.critical}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <p className="text-center my-10">
            No Critical Work Orders To Display
          </p>
        );
      case "High":
        return data.high.length > 0 ? (
          <High
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
            data={data}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <p className="text-center my-10">No High Work Orders To Display</p>
        );
      case "Medium":
        return data.medium.length > 0 ? (
          <Medium
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
            data={data}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <p className="text-center my-10">No Medium Work Orders To Display</p>
        );
      case "Low":
        return data.low.length > 0 ? (
          <Low
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
            data={data}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
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
      {reschedulePopup && (
        <ReschedulePopup
          visible={reschedulePopup}
          setVisible={setReschedulePopup}
          batchEdit={batchEdit}
          setBatchEdit={setBatchEdit}
          selectedItems={[...selectedItems]}
        />
      )}
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
                      text="Print"
                      style={{ width: "fit-content" }}
                      className="mr-2"
                      onClick={() => {
                        setBatchEdit(false);
                        setPrint(!print);
                      }}
                    />
                    <Button
                      outlined
                      size="small"
                      text="Batch Edit"
                      style={{ width: "fit-content" }}
                      className="mr-2"
                      onClick={() => {
                        setPrint(false);
                        setBatchEdit(!batchEdit);
                      }}
                    />
                  </div>
                </div>
                {/* Render selected items and button */}
                {(batchEdit || print) && (
                  <div className="flex justify-between items-center my-4">
                    <div>{selectedItems.size} selected</div>
                    <Button
                      text={batchEdit ? "Reschedule" : print && "Print"}
                      fullWidth={false}
                      style={{ padding: "4px 10px" }}
                      onClick={() => {
                        if (batchEdit) {
                          setReschedulePopup(true);
                        } else {
                          handlePrint();
                        }
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
