"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { getAssetDetails, updateAsset } from "app/services/assets";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFields } from "app/services/customFields";
import { LeftOutlined } from "@ant-design/icons";

const AssetDetails = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getAssetDetails(slug);
      if (status === 200) {
        console.log(data);
        setDetails(data?.data);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };

    const handleFetchFields = async () => {
      const { status, data } = await getFields("assets");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };

    slug && getAsset();
    slug && handleFetchFields();
  }, [slug]);

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
    ...customFieldValidations,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const customFields = fields.map((field) => ({
      uniqueKey: field.uniqueKey,
      value: values[field.uniqueKey],
    }));

    const standardValues = { ...values };
    fields.forEach((field) => {
      delete standardValues[field.uniqueKey];
    });

    const payload = {
      ...standardValues,
      customFields,
    };

    const { status, data } = await updateAsset({ ...payload, asset: slug });
    if (status === 200) {
      message.success(data?.message || "Asset Updated successfully");
      setDetails((prev) => ({ ...prev, dashboard: data.data }));
    } else {
      message.error(data.error);
    }

    resetForm();
    setSubmitting(false);
  };

  // if (loading || !details) return <div>Loading...</div>;

  return (
    <div className="ml-5 md:ml-10">
      <p className="text-sm text-[#828282]">
        Asset {" > "} {slug ? slug + " > Edit" : "Add New Asset"}
      </p>
      <Button
        text="Back to Assets"
        onClick={() => router.push("/admin/assets")}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">
          {slug ? "Edit " : "Add New "} Asset
        </p>
        <Formik
          initialValues={{
            physicalLocation: details?.dashboard?.physicalLocation || "",
            mainSystem: details?.dashboard?.mainSystem || "",
            rfidBarCode: details?.dashboard?.rfidBarCode || "",
            accountingDept: details?.dashboard?.accountingDept || "",
            parentAsset: details?.dashboard?.parentAsset || "",
            childAsset: details?.dashboard?.childAsset || "",
            assetNumber: details?.dashboard?.assetNumber || "",
            serialNumber: details?.dashboard?.serialNumber || "",
            make: details?.dashboard?.make || "",
            model: details?.dashboard?.model || "",
            part: details?.dashboard?.part || "",
            description: details?.dashboard?.description || "",
            specDetails: details?.dashboard?.specDetails || "",
            installedDate: details?.dashboard?.installedDate || "",
            supplier: details?.dashboard?.supplier || "",
            criticality: details?.dashboard?.criticality || "",
            originalMfrDate: details?.dashboard?.originalMfrDate || "",
            condition: details?.dashboard?.condition || "",
            maintStatus: details?.dashboard?.maintStatus || "",
            maintStartDate: details?.dashboard?.maintStartDate || "",
            ...customFieldInitialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-3 font-semibold">Asset Summary</div>
                <SelectField
                  name="physicalLocation"
                  placeholder="Select Location"
                  label="Physical Location"
                  options={rigs.map((i) => ({ label: i.name, value: i.id }))}
                />
                <SelectField
                  name="mainSystem"
                  placeholder="Select System"
                  label="Main System"
                  options={
                    details?.dashboard?.physicalLocation
                      ? rigs
                          .find(
                            (i) => i.id === details.dashboard.physicalLocation
                          )
                          ?.systems.map((i) => ({ label: i.name, value: i.id }))
                      : []
                  }
                />
                <InputField
                  name="accountingDept"
                  placeholder="Accounting Dept."
                  label="Accounting Dept."
                />
                <SelectField
                  name="parentAsset"
                  placeholder="Select Parent"
                  label="Parent Asset"
                  options={[
                    { value: "1", label: "Parent 1" },
                    { value: "2", label: "Parent 2" },
                    { value: "3", label: "Parent 3" },
                  ]}
                />
                <SelectField
                  name="childAsset"
                  placeholder="Select Child"
                  label="Child Asset"
                  options={[
                    { value: "1", label: "Child 1" },
                    { value: "2", label: "Child 2" },
                    { value: "3", label: "Child 3" },
                  ]}
                />
                <div className="md:col-span-3 font-semibold">Asset Details</div>
                <InputField
                  name="serialNumber"
                  placeholder="Serial #"
                  label="Serial #"
                />
                <InputField
                  name="assetNumber"
                  placeholder="Asset #"
                  label="Asset #"
                />
                <InputField
                  name="specDetails"
                  placeholder="Enter Details..."
                  label="Spec Details"
                />
                <DatePickerField name="installedDate" label="Installed Date" />
                <SelectField
                  name="estimatedLife"
                  placeholder="Select..."
                  label="Estimated Life"
                  options={[
                    { value: "1month", label: "1 Month" },
                    { value: "3month", label: "3 Month" },
                    { value: "6month", label: "6 Month" },
                    { value: "1year", label: "1 Year" },
                    { value: "3year", label: "3 Year" },
                    { value: "5year", label: "5 Year" },
                  ]}
                />
                <div></div>
                <TextAreaField
                  name="rfidBarCode"
                  placeholder="Generate Barcode"
                  label="RFID/Barcode"
                  maxLength={128}
                />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="description"
                    placeholder="Add Description..."
                    label="Description"
                    maxLength={150}
                  />
                </div>
                <div className="md:col-span-3 font-semibold">
                  Asset Maintenance information
                </div>

                {/* <InputField name="make" placeholder="Make" />
                <InputField name="model" placeholder="Model" />
                <InputField name="part" placeholder="Part #" />
                <SelectField
                  name="supplier"
                  placeholder="Suppliers"
                  options={[
                    { value: "supplier1", label: "Supplier 1" },
                    { value: "supplier2", label: "Supplier 2" },
                  ]}
                /> */}
                <SelectField
                  name="criticality"
                  placeholder="Select Criticality"
                  label="Criticality"
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                  ]}
                />
                <DatePickerField
                  name="originalMfrDate"
                  label="Original Mfr. Date"
                />
                <SelectField
                  name="condition"
                  placeholder="Select Condition"
                  label="Condition"
                  options={[
                    { value: "new", label: "New" },
                    { value: "used", label: "Used" },
                  ]}
                />
                <SelectField
                  name="maintStatus"
                  placeholder="Select Status"
                  label="Maintenance Status"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
                <DatePickerField
                  name="maintStartDate"
                  label="Maintenance Start Date"
                />
                <div className="md:col-span-3 font-semibold">
                  Additional Information
                </div>
                <TextAreaField
                  name="documents"
                  placeholder="Select Documents to Upload"
                  label="Documents"
                  maxLength={150}
                />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="notes"
                    placeholder="Add Additional Notes..."
                    label="Notes"
                    maxLength={150}
                  />
                </div>
                {fields.map((field) => {
                  switch (field.type) {
                    case "text":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          label={field.name}
                        />
                      );
                    case "number":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          label={field.name}
                          type="number"
                        />
                      );
                    case "dropdown":
                      return (
                        <SelectField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={"Select " + field.name}
                          label={field.name}
                          options={field.options.map((option) => ({
                            label: option,
                            value: option,
                          }))}
                        />
                      );
                    case "date":
                      return (
                        <DatePickerField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          label={field.name}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </div>
              <div className="text-right mt-5">
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
                  text={slug ? "Update" : "Add New Asset"}
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

export default AssetDetails;
