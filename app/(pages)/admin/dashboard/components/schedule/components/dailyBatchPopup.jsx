import { message, Modal, Radio } from "antd";
import { useState } from "react";
import Low from "./low";
import Medium from "./medium";
import High from "./high";
import Critical from "./critical";
import Button from "@/components/common/Button";
import { Form, Formik } from "formik";
import ReschedulePopup from "./reschedulePopup";

const DailyBatchPopup = ({ selectedDate, setSelectedDate }) => {
  const [selectedTab, setSelectedTab] = useState("Critical"); // State to track the selected tab
  const [batchEdit, setBatchEdit] = useState(false);
  const [reschedulePopup, setReschedulePopup] = useState(false);
  const [print, setPrint] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

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

  // Function to render the content based on the selected radio button
  const renderContent = () => {
    switch (selectedTab) {
      case "Critical":
        return (
          <Critical
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
          />
        );
      case "High":
        return (
          <High
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
          />
        );
      case "Medium":
        return (
          <Medium
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
          />
        );
      case "Low":
        return (
          <Low
            batchEdit={batchEdit}
            print={print}
            setBatchEditPopup={setReschedulePopup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ReschedulePopup
        visible={reschedulePopup}
        setVisible={setReschedulePopup}
        batchEdit={batchEdit}
        setBatchEdit={setBatchEdit}
      />
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
                          setPrint(!print);
                          message.success("Printed successfully");
                        }
                      }}
                    />
                  </div>
                )}
                {/* Render content based on selected radio button */}
                <div>{renderContent()}</div>
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
