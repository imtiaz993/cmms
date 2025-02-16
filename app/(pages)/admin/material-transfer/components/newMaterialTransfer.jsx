import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Part #",
    dataIndex: "part",
    key: "part",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Selected Quantity",
    dataIndex: "selectedQuantity",
    key: "selectedQuantity",
  },
  {
    title: "Remove",
    dataIndex: "_id",
    key: "remove",
    render: (id) => <DeleteOutlined />,
  },
];
const NewMaterialTransfer = () => {
  const router = useRouter();
  const data = [
    {
      id: 1,
      part: "Part #1",
      location: "Location 1",
      description: "Description 1",
      quantity: 10,
      selectedQuantity: 5,
    },
    {
      id: 2,
      part: "Part #2",
      location: "Location 2",
      description: "Description 2",
      quantity: 20,
      selectedQuantity: 10,
    },
  ];

  return (
    <div className="ml-5 md:ml-10">
      <p className="text-sm text-[#828282]">
        Material Transfer {" > "} Add Material Transfer
      </p>
      <Button
        text="Back to Material Transfer"
        onClick={() => router.push("/admin/material-transfer")}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">New Material Transfer</p>
        <p className="mt-5 text-lg font-semibold">Asset Selection</p>
        <Button text="Asset Seacrh" fullWidth={false} className="mt-8" />
        <Table
          loading={false}
          scroll={{ x: 700 }}
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{
            marginTop: 32,
            overflow: "auto",
          }}
        />

        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mt-8 grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Move to
                </p>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="site"
                    placeholder="Site"
                    className="!w-full"
                    label="Site"
                    options={rigs.map((i) => ({ label: i.name, value: i.id }))}
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    // onClick={() => setAddSitePopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="location"
                    placeholder="Location"
                    label="Location"
                    options={[]}
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    // onClick={() => setAddSitePopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="md:col-span-2">
                  <TextAreaField
                    name="notes"
                    placeholder="Add notes..."
                    label="Notes"
                  />
                </div>
              </div>
              <div className="text-right mt-5 mb-5">
                <Button
                  className="mr-2"
                  onClick={() => router.push("/admin/assets")}
                  outlined
                  size="small"
                  text="Cancel"
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
                  text="Add New Asset"
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

export default NewMaterialTransfer;
