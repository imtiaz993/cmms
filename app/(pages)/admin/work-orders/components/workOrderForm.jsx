import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import TimePickerField from "@/components/common/TimePickerField";
import {
  DeleteOutlined,
  LeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Radio, Table } from "antd";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const columns = [
  {
    title: "Part #",
    dataIndex: "part",
    key: "part",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];

const parts = [
  {
    part: "Part 1",
    description: "Description 1",
    location: "Location 1",
  },
  {
    part: "Part 2",
    description: "Description 2",
    location: "Location 2",
  },
  {
    part: "Part 3",
    description: "Description 3",
    location: "Location 3",
  },
];

const WorkOrderForm = () => {
  const router = useRouter();
  const [partsLoading, setPartsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div className="ml-5 md:ml-10">
      <p className="text-sm text-[#828282]">
        Work Order {" > "} Unplanned Work Order
      </p>
      <Button
        text="Back to Assets"
        onClick={() => router.push("/admin/assets")}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">Unplanned Work Order Form</p>

        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Work Order Details
                </p>
                <SelectField
                  name="issueID"
                  placeholder="Issue ID"
                  label="Issue ID"
                  options={[]}
                />
                <></>
                <DatePickerField name="date" label="Date" />
                <TimePickerField name="time" label="Time" />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="description"
                    label="Description"
                    placeholder="Enter Description..."
                  />
                </div>
                <div className="md:col-span-2 sm:flex items-center">
                  <label className="text-sm text-[#30343F] sm:text-right sm:min-w-[115px]">
                    Priority Level
                  </label>
                  <Radio.Group name="priorityLevel" className="">
                    <Radio value="High" className="sm:!ml-7">
                      High
                    </Radio>
                    <Radio value="Medium" className="sm:!ml-7">
                      Medium
                    </Radio>
                    <Radio value="Low" className="sm:!ml-7">
                      Low
                    </Radio>
                  </Radio.Group>
                </div>
                <SelectField
                  name="technician"
                  label="Technician"
                  placeholder="Select Technician..."
                  options={[]}
                />
                <DatePickerField name="completion" label="Completion" />
                <SelectField
                  name="parts"
                  label="Parts"
                  placeholder="Select Parts..."
                />
                <></>
                <div className="md:col-span-2 md:pl-32">
                  <div className="flex gap-4 pl-2">
                    <Checkbox />
                    <Button
                      text="Remove"
                      prefix={<DeleteOutlined />}
                      fullWidth={false}
                      outlined
                    />
                  </div>
                  <Table
                    loading={partsLoading}
                    size={"large"}
                    scroll={{ x: 1400 }}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey="_id"
                    dataSource={
                      parts &&
                      parts.length > 0 &&
                      parts.map((i, index) => ({
                        ...i,
                        key: index,
                      }))
                    }
                    style={{
                      marginTop: 16,
                      overflow: "auto",
                    }}
                    className="md:col-span-2"
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Closure & Documentation
                </p>
                <div className="md:col-span-2">
                  <TextAreaField
                    name="repairActionTaken"
                    label="Repair Action Taken"
                    placeholder="Repair Action Taken..."
                  />
                </div>
                <InputField
                  name="partsReplaced"
                  label="Parts Replaced"
                  placeholder="Enter Parts..."
                />
                <SelectField
                  name="finalStatus"
                  label="Final Status"
                  placeholder="Select Status..."
                  options={[]}
                />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="summary"
                    label="Summary"
                    placeholder="Enter Summary..."
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Upload Image
                </p>
                <div className={`w-full flex items-center gap-3`}>
                  <label className="text-sm text-[#30343F] text-right min-w-[115px]">
                    Upload
                  </label>

                  <Button
                    className="!bg-green-600 !shadow-custom !border-white !h-11"
                    // onClick={() => setAddDocPopupVisible(true)}
                    fullWidth={false}
                    prefix={<UploadOutlined />}
                    text="Choose Image"
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Upload Document
                </p>
                <div className={`w-full flex items-center gap-3`}>
                  <label className="text-sm text-[#30343F] text-right min-w-[115px]">
                    Upload
                  </label>

                  <Button
                    className="!bg-green-600 !shadow-custom !border-white !h-11"
                    // onClick={() => setAddDocPopupVisible(true)}
                    fullWidth={false}
                    prefix={<UploadOutlined />}
                    text="Choose Document"
                  />
                </div>
              </div>
              <div className="text-right mt-5 mb-5">
                <Button
                  className="mr-2 !text-[#24A148] border-[#24A148] !bg-white"
                  onClick={() => router.push("/admin/work-orders")}
                  outlined
                  size="small"
                  text="Mark Completed"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
                <Button
                  className="mr-2 !text-base"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="small"
                  text="Save Updates"
                  fullWidth={false}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WorkOrderForm;
