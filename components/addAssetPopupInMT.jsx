import { Checkbox, message, Modal, Select, Table } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "./common/Button";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";
import { useSelector } from "react-redux";
import { updateMTAssetInventory } from "app/services/materialTransfer";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Asset is required"),
  condition: Yup.string().required("Asset Condition is required"),
  transferReason: Yup.string().required("Transfer Reason is required"),
});

// const columns = [
//   {
//     title: "Asset #",
//     dataIndex: "assetNum",
//     key: "assetNum",
//   },
//   {
//     title: "Asset Description",
//     dataIndex: "assetDescription",
//     key: "assetDescription",
//   },
//   {
//     title: "Serial #",
//     dataIndex: "serialNum",
//     key: "serialNum",
//   },
//   {
//     title: "Alt ID",
//     dataIndex: "altID",
//     key: "altID",
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     key: "category",
//   },
// ];

// const data = [
//   {
//     assetNum: "21-005",
//     assetDescription: "15,000gal Fuel Tank",
//     serialNum: "21-005",
//     altID: "",
//     category: "Fuel Systems",
//   },
//   {
//     assetNum: "1061491692",
//     assetDescription: "#1 Fuel Pump Motor",
//     serialNum: "1061491692",
//     altID: "",
//     category: "Electrical Systems",
//   },
//   {
//     assetNum: "1069397520",
//     assetDescription: "#2 Fuel Pump Motor",
//     serialNum: "1069397520",
//     altID: "",
//     category: "Electrical Systems",
//   },
//   {
//     assetNum: "4470",
//     assetDescription: "#2 Fuel Pump",
//     serialNum: "4470",
//     altID: "",
//     category: "Pump Systems",
//   },
// ];

const AddAssetPopupMT = ({
  visible,
  setVisible,
  setAddedAssets,
  materialTransferId,
  setDetails,
  assetDetailsSlug,
}) => {
  const { assets } = useSelector((state) => state.assets);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (!materialTransferId) {
      console.log(values);
      setAddedAssets(values);
      setVisible(false);
      resetForm();
    } else {
      const { status, data } = await updateMTAssetInventory({
        materialTransferId,
        assets: values,
      });

      if (status === 200) {
        message.success(data.message || "Updated successfully");
        setVisible(false);
        resetForm();
        setDetails((prev) => ({ ...prev, assets: values }));
      } else {
        message.error(data.message || "Failed to update");
      }
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        id: assetDetailsSlug ? assetDetailsSlug : "",
        condition: "",
        transferReason: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, handleSubmit, submitForm }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={<h1 className="text-lg md:text-2xl mb-5">Add Asset</h1>}
            open={visible}
            footer={
              <div className="">
                <Button
                  className="mr-2"
                  onClick={() => setVisible(false)}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />

                <Button
                  className=""
                  onClick={() => submitForm()}
                  size="small"
                  htmlType="submit"
                  text="Add Asset"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            onCancel={() => setVisible(false)}
            width={500}
            bodyStyle={{
              height: "200px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
              <SelectField
                name="id"
                placeholder="Select Asset"
                options={
                  assetDetailsSlug
                    ? [
                        {
                          label: assets?.find(
                            (asset) => asset._id === assetDetailsSlug
                          )?.assetNumber,
                          value: assetDetailsSlug,
                          isDisabled: true, // Disable the selected asset
                        },
                      ]
                    : assets?.map((asset) => ({
                        label: asset.assetNumber,
                        value: asset._id,
                      }))
                }
                value={assetDetailsSlug} // Automatically select the asset if assetDetailsSlug is provided
                readOnly={assetDetailsSlug ? true : false}
              />{" "}
              {console.log(" assetDetailsSlug", assetDetailsSlug)}
              <SelectField
                name="condition"
                placeholder="Asset Condition"
                options={[
                  { label: "Like New", value: "Like New" },
                  {
                    label: "Operational but need repair",
                    value: "Operational but need repair",
                  },
                  { label: "Damaged", value: "Damaged" },
                ]}
              />
              <SelectField
                name="transferReason"
                placeholder="Transfer Reason"
                options={[
                  { label: "Disposal", value: "disposal" },
                  { label: "Repair", value: "repair" },
                  { label: "Credit", value: "credit" },
                  { label: "Sale", value: "sale" },
                  { label: "Inventory", value: "inventory" },
                  { label: "Warranty", value: "warranty" },
                  { label: "Other", value: "other" },
                ]}
              />
              {/* <div className="w-full">
                <Field as={Checkbox} name="childAssetsParents">
                  Include Asset Parents
                </Field>
              </div> */}
            </div>
            {/* <h4 className="mt-4 text-lg font-semibold">Asset Hierarchy</h4>
            <Table
              loading={false}
              size={"large"}
              scroll={{ x: 900 }}
              columns={columns}
              dataSource={data}
              pagination={false}
              style={{
                marginTop: 16,
                overflow: "auto",
              }}
            /> */}
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddAssetPopupMT;
