import { Checkbox, Modal, Select, Table } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "./common/Button";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string().required("Asset is required"),
  assetCondition: Yup.string().required("Asset Condition is required"),
  transferReason: Yup.string(),
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

const AddAssetPopupMT = ({ visible, setVisible, assets, setAddedAssets }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    // Find the full asset object from the assets array using the assetNumber (or any unique identifier)
    const selectedAsset = assets.find(
      (asset) => asset.assetNumber === values.assetNumber
    );
    setAddedAssets((assets) => [
      ...assets,
      { _id: selectedAsset._id, ...values },
    ]);
    resetForm();
    setVisible(false);
  };
  return (
    <Formik
      initialValues={{
        assetNumber: "",
        assetCondition: "",
        transferReason: "",
        childAssetsParents: false,
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
                name="assetNumber"
                placeholder="Select Asset"
                options={assets.map((asset) => ({
                  label: asset.assetNumber + " - " + asset.mainSystem,
                  value: asset.assetNumber,
                }))}
              />
              <SelectField
                name="assetCondition"
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
              <div className="w-full">
                <Field as={Checkbox} name="childAssetsParents">
                  Include Asset Parents
                </Field>
              </div>
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
