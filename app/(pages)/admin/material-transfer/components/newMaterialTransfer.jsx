import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSitePopup from "../../settings/sites/components/addSitePopup";
import AddLocationPopup from "../../settings/locations/components/addLocationPopup";
import * as Yup from "yup";
import {
  setMaterialTransfer,
  updateMaterialTransfer,
} from "app/redux/slices/saveMaterialTransferData";
import { addMaterialTransfer } from "app/services/materialTransfer";

const NewMaterialTransfer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const materialType = useSearchParams().get("materialType");
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const [addSitePopup, setAddSitePopup] = useState(false);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const assetsMaterialTransfer = useSelector(
    (state) => state.materialTransfer?.materialTransfer
  );

  const columns = [
    {
      title: materialType === "inventory" ? "Part #" : "Asset #",
      dataIndex: materialType === "inventory" ? "partNumber" : "assetID",
      key: materialType === "inventory" ? "partNumber" : "assetID",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => <span>{record?.site.address}</span>,
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
      render: (_, record) => <span>{"10"}</span>,
    },
    {
      title: "Selected Quantity",
      dataIndex: "selectedQuantity",
      key: "selectedQuantity",
      render: (_, record) => <span>{"1"}</span>,
    },
    {
      title: "Remove",
      dataIndex: "_id",
      key: "remove",
      render: (_, record) => (
        <DeleteOutlined
          onClick={() => {
            const updatedData = assetsMaterialTransfer.filter(
              (item) => item._id !== record._id
            );
            dispatch(setMaterialTransfer(updatedData));
          }}
        />
      ),
    },
  ];

  console.log(assetsMaterialTransfer, materialType);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { status, data } = await addMaterialTransfer(values);
    if (status === 200) {
      message.success(data?.message || "Material Trasnfer Added Successfully");
      setSubmitting(false);
    } else {
      message.error(data?.message || "Failed to save material transfer");
      setSubmitting(false);
    }
  };

  return (
    <div className="ml-5 md:ml-10">
      <AddSitePopup visible={addSitePopup} setVisible={setAddSitePopup} />
      <AddLocationPopup
        visible={addSystemPopup}
        setVisible={setAddSystemPopup}
      />
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
          dataSource={assetsMaterialTransfer}
          pagination={false}
          style={{
            marginTop: 32,
            overflow: "auto",
          }}
        />

        <Formik
          initialValues={{
            destinationSite: "",
            destinationSystem: "",
            comments: "",
            inventories:
              materialType === "inventory"
                ? assetsMaterialTransfer.map((i) => i._id)
                : [],
            assets:
              materialType === "asset"
                ? assetsMaterialTransfer.map((i) => i._id)
                : [],
          }}
          validationSchema={Yup.object().shape({
            destinationSite: Yup.string().required(
              "Destination Site is required"
            ),
            destinationSystem: Yup.string().required(
              "Destination System is required"
            ),
            comments: Yup.string()
              .max(150, "Notes can't exceed 150 characters")
              .required("Notes is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mt-8 grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Move to
                </p>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="destinationSite"
                    placeholder="Site"
                    className="!w-full"
                    label="Site"
                    options={locations.map((i) => ({
                      label: i.site,
                      value: i._id,
                    }))}
                    required={true}
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSitePopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="destinationSystem"
                    placeholder="System"
                    label="System"
                    options={
                      values.destinationSite &&
                      systems
                        .filter((i) => i?.site?._id === values.destinationSite)
                        ?.map((i) => ({
                          label: i.system,
                          value: i._id,
                        }))
                    }
                    required={true}
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSystemPopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="md:col-span-2">
                  <TextAreaField
                    name="comments"
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
                  text="Create Material Transfer"
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
