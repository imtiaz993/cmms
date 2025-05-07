"use client";
import Button from "@/components/common/Button";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { Input, message, Table } from "antd";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { assignToAsset } from "app/services/inventory";
import { setAssignToAsset } from "app/redux/slices/assignToAssetSlice";
import SelectField from "@/components/common/SelectField";

const AssignToAsset = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";

  const assignToAssetList = useSelector(
    (state) => state.assignToAsset.inventories
  );
  const assets = useSelector((state) => state.assets.assets);
  console.log("assignToAssetList", assignToAssetList);

  const columns = [
    {
      title: "Part #",
      dataIndex: "partNumber",
      key: "partNumber",
    },
    {
      title: "Location",
      dataIndex: "site",
      key: "site",
      render: (_, record) => <span>{record?.site?.site}</span>,
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
      render: (_, record) => (
        <span className="flex items-center">
          <Button
            text="-"
            onClick={() => {
              if (record.selectedQuantity > 1) {
                const updatedData = assignToAssetList.map((item) =>
                  item._id == record._id
                    ? {
                        ...item,
                        selectedQuantity: item.selectedQuantity - 1,
                      }
                    : item
                );
                dispatch(setAssignToAsset(updatedData));
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
                const updatedData = assignToAssetList.map((item) =>
                  item._id == record._id
                    ? {
                        ...item,
                        selectedQuantity: item.selectedQuantity + 1,
                      }
                    : item
                );
                dispatch(setAssignToAsset(updatedData));
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
    {
      title: "Remove",
      dataIndex: "_id",
      key: "remove",
      render: (_, record) => (
        <DeleteOutlined
          onClick={() => {
            const updatedData = assignToAssetList.filter(
              (item) => item._id !== record._id
            );
            dispatch(setAssignToAsset(updatedData));
          }}
        />
      ),
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log("inside submit", assignToAssetList);
    const { status, data } = await assignToAsset({
      ...values,
      inventories: assignToAssetList.map((i) => ({
        id: i._id,
        quantity: i.selectedQuantity,
      })),
    });
    if (status === 200) {
      message.success(data?.message || "Assets Assigned Successfully");
      dispatch(setAssignToAsset([]));
      router.push("/admin/assets");
      setSubmitting(false);
    } else {
      message.error(data?.error || "Failed to assign assets");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-5 md:mx-10">
      <p className="text-sm text-[#828282]">
        Inventory {" > "} Assign to Asset
      </p>
      <Button
        text="Back to Inventory"
        onClick={() =>
          router.push(
            `/admin/inventory${
              activeLocation && activeLocation !== null
                ? "?location=" + activeLocation
                : ""
            }`
          )
        }
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">Assign to Asset</p>

        <Formik
          initialValues={{
            asset: "",
          }}
          validationSchema={Yup.object().shape({
            asset: Yup.string().required("Asset is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Table
                loading={false}
                scroll={{ x: 700 }}
                columns={columns}
                dataSource={assignToAssetList}
                pagination={false}
                style={{
                  marginTop: 32,
                  overflow: "auto",
                }}
              />
              <div className="mt-8 grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="font-semibold md:col-span-2">
                  Select Asset you want to assign these inventories
                </p>
                <SelectField
                  name="asset"
                  placeholder="Select Asset"
                  label="Asset"
                  options={assets.map((i) => ({
                    label: i.assetID,
                    value: i._id,
                  }))}
                  showSearch
                  required
                />
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
                  text="Assign"
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

export default AssignToAsset;
