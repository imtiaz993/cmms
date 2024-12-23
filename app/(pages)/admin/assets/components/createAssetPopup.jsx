import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addAsset, updateAsset } from "app/services/assets";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { useDispatch } from "react-redux";
import { editAsset, updateAssets } from "app/redux/slices/assetsSlice";
import AddFieldPopup from "@/components/addFieldPopup";
import { useEffect, useMemo, useState } from "react";
import { getFields } from "app/services/customFields";

const CreateAssetPopup = ({
  visible,
  setVisible,
  assetId,
  details,
  setDetails,
}) => {
  const { dashboard } = details ?? {};
  const dispatch = useDispatch();
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchFields = async () => {
      const { status, data } = await getFields("assets");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };
    handleFetchFields();
  }, []);

  // Generate initial values for custom fields
  const customFieldInitialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.uniqueKey] = "";
      return acc;
    }, {});
  }, [fields]);

  const customFieldValidations = useMemo(() => {
    return fields.reduce((acc, field) => {
      switch (field.type) {
        case "text":
        case "dropdown":
          acc[field.uniqueKey] = Yup.string().required(
            `${field.name} is required`
          );
          break;
        case "number":
          acc[field.uniqueKey] = Yup.number()
            .typeError(`${field.name} must be a number`)
            .required(`${field.name} is required`);
          break;
        case "date":
          acc[field.uniqueKey] = Yup.date()
            .typeError(`${field.name} must be a valid date`)
            .required(`${field.name} is required`);
          break;
        default:
          acc[field.uniqueKey] = Yup.string().required(
            `${field.name} is required`
          );
      }
      return acc;
    }, {});
  }, [fields]);

  // Combine standard and custom field validations
  const validationSchema = Yup.object().shape({
    physicalLocation: Yup.string().required("Physical Location is required"),
    mainSystem: Yup.string().required("Main System is required"),
    rfidBarCode: Yup.string().required("RFID/Barcode is required"),
    accountingDept: Yup.string().required("Accounting Dept. is required"),
    parentAsset: Yup.string().required("Parent Asset is required"),
    childAsset: Yup.string().required("Child Asset is required"),
    assetNumber: Yup.string().required("Asset # is required"),
    serialNumber: Yup.string().required("Serial # is required"),
    make: Yup.string().required("Make is required"),
    model: Yup.string().required("Model is required"),
    part: Yup.string().required("Part # is required"),
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
    ...customFieldValidations, // Include custom field validations
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Extract custom field values
    const customFields = fields.map((field) => ({
      uniqueKey: field.uniqueKey,
      value: values[field.uniqueKey],
    }));

    // Remove custom fields from values to get standard fields
    const standardValues = { ...values };
    fields.forEach((field) => {
      delete standardValues[field.uniqueKey];
    });

    // Prepare payload
    const payload = {
      ...standardValues,
      customFields,
    };
    if (assetId) {
      const { status, data } = await addAsset(payload);
      if (status === 200) {
        message.success(data?.message || "Asset Added successfully");
        dispatch(updateAssets(data.data)); // Store asset in Redux
      } else {
        message.error(data.error);
      }
    } else {
      const { status, data } = await updateAsset({
        ...payload,
        asset: assetId,
      });
      if (status === 200) {
        message.success(data?.message || "Asset Updated successfully");
        dispatch(editAsset(data.data)); // update asset in Redux
        setDetails((prev) => ({ ...prev, dashboard: data.data }));
      } else {
        message.error(data.error);
      }
    }
    resetForm();
    setVisible(false);
    setSubmitting(false);
  };

  return (
    <>
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="assets"
        fields={fields}
        setFields={setFields}
      />
      {!loading && (
        <Formik
          initialValues={{
            physicalLocation: dashboard?.physicalLocation || "",
            mainSystem: dashboard?.mainSystem || "",
            rfidBarCode: dashboard?.rfidBarCode || "",
            accountingDept: dashboard?.accountingDept || "",
            parentAsset: dashboard?.parentAsset || "",
            childAsset: dashboard?.childAsset || "",
            assetNumber: dashboard?.assetNumber || "",
            serialNumber: dashboard?.serialNumber || "",
            make: dashboard?.make || "",
            model: dashboard?.model || "",
            part: dashboard?.part || "",
            description: dashboard?.description || "",
            specDetails: dashboard?.specDetails || "",
            installedDate: dashboard?.installedDate || "",
            supplier: dashboard?.supplier || "",
            criticality: dashboard?.criticality || "",
            originalMfrDate: dashboard?.originalMfrDate || "",
            condition: dashboard?.condition || "",
            maintStatus: dashboard?.maintStatus || "",
            maintStartDate: dashboard?.maintStartDate || "",
            ...customFieldInitialValues, // Include custom fields values
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Modal
                maskClosable={false}
                title={
                  <h1 className="text-lg md:text-2xl mb-5">
                    {assetId ? "Update Asset" : "Add New Asset"}
                  </h1>
                }
                open={visible}
                onCancel={() => setVisible(false)}
                footer={
                  <div>
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
                      className="mr-2"
                      htmlType="submit"
                      isLoading={isSubmitting}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      size="small"
                      text={assetId ? "Update" : "Add Asset"}
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
                  <div className="flex justify-end mb-5">
                    <Button
                      onClick={() => setAddFieldPopupVisible(true)}
                      text="Manage Fields"
                      outlined
                      htmlType="button"
                      fullWidth={false}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Standard Fields */}
                    <SelectField
                      name="physicalLocation"
                      placeholder="Physical Location (Rig)"
                      options={rigs
                        .slice(0, rigs.length - 2)
                        .map((i) => ({ label: i.name, value: i.id }))}
                    />
                    <SelectField
                      name="mainSystem"
                      placeholder="Main System"
                      readOnly={!values.physicalLocation}
                      options={
                        values.physicalLocation
                          ? rigs
                              .find((i) => i.id === values.physicalLocation)
                              .systems.map((i) => ({
                                label: i.name,
                                value: i.id,
                              }))
                          : []
                      }
                    />
                    <InputField
                      name="accountingDept"
                      placeholder="Accounting Dept."
                    />
                    <InputField
                      name="rfidBarCode"
                      placeholder="RFID/Barcode"
                      maxLength={128}
                    />
                    <InputField name="parentAsset" placeholder="Parent Asset" />
                    <InputField name="childAsset" placeholder="Child Asset" />
                    <InputField name="assetNumber" placeholder="Asset #" />
                    <InputField name="serialNumber" placeholder="Serial #" />
                    <InputField name="make" placeholder="Make" />
                    <InputField name="model" placeholder="Model" />
                    <InputField name="part" placeholder="Part #" />
                    <div className="md:col-span-3 -mb-4">
                      <TextAreaField
                        name="description"
                        placeholder="Description"
                        maxLength={150}
                      />
                      <TextAreaField
                        name="specDetails"
                        placeholder="Spec Details"
                        maxLength={500}
                      />
                    </div>
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
                    <div className="md:col-span-3 mt-5">
                      <h1 className="text-base font-medium">Custom Fields:</h1>
                    </div>
                    {fields.map((field) => {
                      switch (field.type) {
                        case "text":
                          return (
                            <InputField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                            />
                          );
                        case "number":
                          return (
                            <InputField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                              type="number"
                            />
                          );
                        case "dropdown":
                          return (
                            <SelectField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                              options={field.preFilValue.map((value) => ({
                                label: value,
                                value: value,
                              }))}
                            />
                          );
                        case "date":
                          return (
                            <DatePickerField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              </Modal>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateAssetPopup;
