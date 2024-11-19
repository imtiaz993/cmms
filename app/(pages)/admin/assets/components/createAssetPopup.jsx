import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Modal, Select } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import TextArea from "antd/es/input/TextArea";
import { addAsset } from "app/services/assets";
import dayjs from "dayjs";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";

const validationSchema = Yup.object().shape({
  physicalLocation: Yup.string().required("Physical Location is required"),
  mainSystem: Yup.string().required("Main System is required"),
  rfidBarcode: Yup.string().required("RFID/Barcode is required"),
  accountingDept: Yup.string().required("Accounting Dept. is required"),
  parentAsset: Yup.string().required("Parent Asset is required"),
  childAsset: Yup.string().required("Child Asset is required"),
  assetNumber: Yup.string().required("Asset # is required"),
  serialNumber: Yup.string().required("Serial # is required"),
  makeModelPart: Yup.string().required("Make, Model, Part # is required"),
  description: Yup.string()
    .max(150, "Max 150 characters allowed")
    .required("Description is required"),
  specDetails: Yup.string()
    .max(500, "Max 500 characters allowed")
    .required("Spec Details are required"),
  installedDate: Yup.date()
    .typeError("Installed Date must be a valid date")
    .required("Installed Date is required"),
  supplier: Yup.string().required("Suppliers are required"),
  criticality: Yup.string().required("Criticality is required"),
  originalMfrDate: Yup.date()
    .typeError("Original Mfr. Date must be a valid date")
    .required("Original Mfr. Date is required"),
  condition: Yup.string().required("Condition is required"),
  maintStatus: Yup.string().required("Maint. Status is required"),
  maintStartDate: Yup.date()
    .typeError("Maint. Start Date must be a valid date")
    .required("Maint. Start Date is required"),
});

const CreateAssetPopup = ({ addAssetVisible, setAddAssetVisible }) => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await addAsset(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      resetForm();
      setAddAssetVisible(false);
    } else {
      message.error(data.error);
    }
  };

  return (
    <Formik
      initialValues={{
        physicalLocation: "",
        mainSystem: "",
        rfidBarcode: "",
        accountingDept: "",
        parentAsset: "",
        childAsset: "",
        assetNumber: "",
        serialNumber: "",
        makeModelPart: "",
        description: "",
        specDetails: "",
        installedDate: "",
        supplier: "",
        criticality: "",
        originalMfrDate: "",
        condition: "",
        maintStatus: "",
        maintStartDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={<h1 className="text-lg md:text-2xl mb-5">Add New Asset</h1>}
            open={addAssetVisible}
            onCancel={() => setAddAssetVisible(false)}
            footer={
              <div>
                <Button
                  className="mr-2"
                  onClick={() => setAddAssetVisible(false)}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
                <Button
                  className="mr-2"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="small"
                  text="Add Asset"
                  fullWidth={false}
                />
              </div>
            }
            width={1000}
            bodyStyle={{
              height: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div>
              <div className="grid md:grid-cols-3 gap-4">
                <SelectField
                  name="physicalLocation"
                  placeholder="Physical Location (Rig)"
                  options={[
                    { value: "Rig 21", label: "Rig 21" },
                    { value: "Rig 22", label: "Rig 22" },
                    { value: "Rig 23", label: "Rig 23" },
                  ]}
                />

                <SelectField
                  name="mainSystem"
                  placeholder="Main System"
                  options={[
                    { value: "airSystems", label: "Air Systems" },
                    { value: "BOPSystems", label: "BOP Systems" },
                    { value: "drillingSystems", label: "Drilling Systems" },
                  ]}
                />
                <InputField
                  name="accountingDept"
                  placeholder="Accounting Dept."
                />
                <InputField
                  name="rfidBarcode"
                  placeholder="RFID/Barcode"
                  maxLength={128}
                />
                <InputField name="parentAsset" placeholder="Parent Asset" />
                <InputField name="childAsset" placeholder="Child Asset" />
                <InputField name="assetNumber" placeholder="Asset #" />
                <InputField name="serialNumber" placeholder="Serial #" />
                <InputField
                  name="makeModelPart"
                  placeholder="Make, Model, Part #"
                />
                <div className="md:col-span-3">
                  <Field
                    as={TextArea}
                    name="description"
                    placeholder="Description"
                    maxLength={150}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/150</div>

                  <Field
                    as={TextArea}
                    name="specDetails"
                    placeholder="Spec Details"
                    maxLength={500}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/500</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <DatePickerField
                      name="installedDate"
                      placeholder="Installed Date"
                    />
                    <SelectField
                      name="supplier"
                      placeholder="Suppliers"
                      options={[
                        { value: "supplier1", label: "Supplier 1" },
                        { value: "supplier2", label: "Supplier 2" },
                        { value: "supplier3", label: "Supplier 3" },
                        { value: "supplier4", label: "Supplier 4" },
                        { value: "supplier5", label: "Supplier 5" },
                      ]}
                    />
                    <SelectField
                      name="criticality"
                      placeholder="Criticality"
                      options={[
                        { value: "high", label: "High" },
                        { value: "medium", label: "Medium" },
                        { value: "low", label: "Low" },
                      ]}
                    />
                    <DatePickerField
                      name="originalMfrDate"
                      placeholder="Original Mfr. Date (MM/DD/YYYY)"
                    />
                    <SelectField
                      name="condition"
                      placeholder="Condition"
                      options={[
                        { value: "new", label: "New" },
                        { value: "good", label: "Good" },
                        { value: "damaged", label: "Damaged" },
                      ]}
                    />
                    <SelectField
                      name="maintStatus"
                      placeholder="Maint. Status"
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                      ]}
                    />
                    <DatePickerField
                      name="maintStartDate"
                      placeholder="Maint. Start Date (MM/DD/YYYY)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAssetPopup;
