import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSitePopup from "../../settings/sites/components/addSitePopup";
import AddSystemPopup from "../../settings/locations/components/addSystemPopup";
import * as Yup from "yup";
import { setShippingCart as setAssetsShippingCart } from "app/redux/slices/assetsShippingCartSlice";
import { setShippingCart as setInventoryShippingCart } from "app/redux/slices/inventoryShippingCartSlice";
import { addMaterialTransfer } from "app/services/materialTransfer";

const NewMaterialTransfer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const materialType = useSearchParams().get("materialType");
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const [addSitePopup, setAddSitePopup] = useState(false);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const assetsMaterialTransfer = useSelector((state) =>
    materialType === "asset"
      ? state.assetsShippingCart?.assetsShippingCart
      : state.inventoryShippingCart?.inventoryShippingCart
  );
  console.log(" assetsMaterialTransfer", assetsMaterialTransfer);

  const columns = [
    {
      title: materialType === "inventory" ? "Part #" : "Asset #",
      dataIndex: materialType === "inventory" ? "partNumber" : "assetID",
      key: materialType === "inventory" ? "partNumber" : "assetID",
    },
    {
      title: "Location",
      dataIndex: "site",
      key: "site",
      render: (_, record) => <span>{record?.site.site}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    ...(materialType === "inventory"
      ? [
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
          {
            title: "Selected Quantity",
            dataIndex: "selectedQuantity",
            key: "selectedQuantity",
            render: (_, record) => (
              <span className="flex items-center">
                <Button
                  text="-"
                  onClick={() => {
                    if (record.selectedQuantity > 1) {
                      const updatedData = assetsMaterialTransfer.map((item) =>
                        item._id == record._id
                          ? {
                              ...item,
                              selectedQuantity: item.selectedQuantity - 1,
                            }
                          : item
                      );
                      dispatch(setInventoryShippingCart(updatedData));
                    }
                  }}
                  className="!text-black"
                  style={{
                    height: "26px",
                    fontSize: "18px",
                    minWidth: "10px",
                    width: "10px",
                  }}
                />
                <p className="font-bold mx-3">{record.selectedQuantity}</p>

                <Button
                  text="+"
                  onClick={() => {
                    if (record.quantity > record.selectedQuantity) {
                      const updatedData = assetsMaterialTransfer.map((item) =>
                        item._id == record._id
                          ? {
                              ...item,
                              selectedQuantity: item.selectedQuantity + 1,
                            }
                          : item
                      );
                      dispatch(setInventoryShippingCart(updatedData));
                    }
                  }}
                  className="!text-black"
                  style={{
                    height: "26px",
                    fontSize: "18px",
                    minWidth: "10px",
                    width: "10px",
                  }}
                />
              </span>
            ),
          },
        ]
      : []),
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
            if (materialType === "inventory") {
              dispatch(setInventoryShippingCart(updatedData));
            } else {
              dispatch(setAssetsShippingCart(updatedData));
            }
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
    const { status, data } = await addMaterialTransfer({
      ...values,
      inventories:
        materialType === "inventory"
          ? assetsMaterialTransfer.map((i) => ({
              id: i._id,
              quantity: i.selectedQuantity,
            }))
          : [],
      assets:
        materialType === "asset"
          ? assetsMaterialTransfer.map((i) => ({
              id: i._id,
              quantity: i.selectedQuantity,
            }))
          : [],
    });
    if (status === 200) {
      message.success(data?.message || "Material Trasnfer Added Successfully");
      router.push("/admin/material-transfer");
      setSubmitting(false);
    } else {
      message.error(data?.error || "Failed to save material transfer");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-5 md:mx-10">
      <AddSitePopup visible={addSitePopup} setVisible={setAddSitePopup} />
      <AddSystemPopup visible={addSystemPopup} setVisible={setAddSystemPopup} />
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
          }}
          validationSchema={Yup.object().shape({
            destinationSite: Yup.string().required(
              "Destination Site is required"
            ),
            destinationSystem: Yup.string().required(
              "Destination System is required"
            ),
            comments: Yup.string(),
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
