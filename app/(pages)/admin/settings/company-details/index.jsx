import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import {
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Alert, Card, message, Spin } from "antd";
import {
  deleteCompany,
  getCompany,
  updateCompany,
} from "app/services/setUp/company";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import AddRigManagerPopup from "./components/addRigManagerPopup";
import { deleteManager } from "app/services/rigManager";
import { countries } from "@/constants/countries";
import { currencies } from "@/constants/currencies";
import { months } from "@/constants/monthsAndYears";
import { timeZones } from "@/constants/timezones";
import ConfirmationPopup from "@/components/confirmationPopup";

const CompanyDetails = ({ activeTab }) => {
  const [companyData, setCompanyData] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [companyDelete, setCompanyDelete] = useState(false);
  // const initialValues = ;
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const [rigManagerData, setRigManagerData] = useState(null);

  useEffect(() => {
    const handleFetchCategories = async () => {
      setLoading(true);
      const { status, data } = await getCompany();
      if (status === 200) {
        setLoading(false);
        setCompanyData(data?.data[0]);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    handleFetchCategories();
  }, [activeTab]);

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { rigManagers, ...filteredValues } = values; // Exclude rigManagers
    const { status, data } = await updateCompany(filteredValues);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
    } else {
      message.error(data.error);
    }
  };

  const handleDeleteManager = async (managerId) => {
    const { status, data } = await deleteManager(managerId);
    if (status === 200) {
      message.success("Rig Manager Deleted Successfully");
      setCompanyData((prev) => ({
        ...prev,
        rigManager: prev.rigManager.filter(
          (manager) => manager._id !== managerId
        ),
      }));
    } else {
      message.error(data.error);
    }
  };

  const handleDeleteCompany = async () => {
    const { status, data } = await deleteCompany(companyData._id);
    if (status === 200) {
      message.success(data.message);
    } else {
      message.error(data.error);
    }
  };

  return companyData ? (
    <div className="max-h-[calc(100dvh-140px-16px-70px)] overflow-auto p-[12px_12px_28px_0px]">
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Rig Manager"}
        message="Are you sure you want to delete this rig manager?"
        onConfirm={() => handleDeleteManager(deleteConfirmation)}
      />
      <ConfirmationPopup
        visible={companyDelete}
        setVisible={setCompanyDelete}
        title={"Delete Company"}
        message={
          <>
            <p>Are you sure you want to delete the company?</p>
            <Alert
              message="This action cannot be undone"
              type="warning"
              showIcon
            />
          </>
        }
        onConfirm={handleDeleteCompany}
      />
      <Formik
        initialValues={{
          _id: companyData?._id || "",
          companyName: companyData?.companyName || "",
          country: companyData?.country || "",
          address: companyData?.address || "",
          apartment: companyData?.apartment || "",
          city: companyData?.city || "",
          state: companyData?.state || "",
          zip: companyData?.zip || "",
          phone: companyData?.phone || "",
          email: companyData?.email || "",
          timezone: companyData?.timezone || "",
          currency: companyData?.currency || "",
          dateFormat: companyData?.dateFormat || "",
          financialYearMonth: companyData?.financialYearMonth || "",
          financialYearDay: companyData?.financialYearDay || "",
          rigManagers: companyData?.rigManager || [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, handleSubmit, values, setValues }) => (
          <Form onSubmit={handleSubmit}>
            <AddRigManagerPopup
              visible={visible}
              setVisible={setVisible}
              setOuterValues={setValues}
              rigManagerData={rigManagerData}
              setRigManagerData={setRigManagerData}
              outerValues={values}
              setCompanyData={setCompanyData}
            />
            {console.log("values rig managers", values.rigManagers)}
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div className="grid grid-cols-1 gap-4 md:gap-8">
                <div className="flex justify-between items-center">
                  <p className="font-semibold md:text-lg">
                    Company Information
                  </p>
                  <Button
                    text="Save Changes"
                    fullWidth={false}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  />
                </div>
                <InputField
                  name="companyName"
                  placeholder="Company Name"
                  label="Company Name"
                />
                <SelectField
                  name="country"
                  placeholder="Select Country"
                  label="Country"
                  options={countries}
                />
                <InputField
                  name="address"
                  placeholder="Street Name"
                  label="Address"
                />
                <InputField
                  name="apartment"
                  placeholder="Apt./Suite #"
                  label="Apt./Suite #"
                />
                <InputField name="city" placeholder="City" label="City" />
                <InputField name="state" placeholder="State" label="State" />
                <InputField
                  name="zip"
                  placeholder="xxxxx-xxxx"
                  label="Zip Code"
                />
                <p className="font-semibold md:text-lg">Contact Information</p>
                <InputField
                  name="phone"
                  placeholder="(000) 000-0000"
                  label="Phone Number"
                />
                <InputField
                  name="email"
                  placeholder="Email@email.com"
                  label="Email Address"
                />
                <div className="flex items-center justify-between mt-10">
                  <p className="font-semibold md:text-lg">Rig Managers</p>
                  <Button
                    className="!bg-[#4C4C51] !shadow-custom !border-white w-full sm:w-52"
                    onClick={() => setVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More Rig Managers"
                  />
                </div>

                <FieldArray name="rigManagers">
                  {({ push, remove }) => (
                    <>
                      {values.rigManagers.map((manager, i) => (
                        <Card
                          key={i}
                          loading={false}
                          className="!bg-white shadow-md"
                          title={`Rig Manager ${i + 1}`}
                          style={{ marginTop: "", border: "1px solid #d9d9d9" }}
                          extra={
                            <div className="flex gap-2">
                              <Button
                                text="Edit"
                                fullWidth={false}
                                icon={
                                  <EyeOutlined
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                }
                                onClick={() => {
                                  setVisible(true);
                                  setRigManagerData({
                                    ...values.rigManagers[i],
                                    index: i,
                                    company: values._id,
                                  });
                                }}
                                outlined
                              />
                              {/* <Button
                                text=""
                                fullWidth={false}
                                icon={<DeleteOutlined />}
                                onClick={() => remove(i)}
                                outlined
                              /> */}
                              {values.rigManagers.length > 1 && (
                                <Button
                                  onClick={
                                    () => setDeleteConfirmation(manager?._id)
                                    // remove(i);
                                  }
                                  fullWidth={false}
                                  text="Remove"
                                  prefix={<DeleteOutlined />}
                                />
                              )}
                            </div>
                          }
                        >
                          <div className="space-y-2">
                            <p>
                              <strong>Name:</strong>{" "}
                              {values.rigManagers[i].name}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {values.rigManagers[i].email}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {values.rigManagers[i].phone}
                            </p>
                            <p>
                              <strong>Locations:</strong>{" "}
                              {values.rigManagers[i]?.rigs.length > 0 &&
                                values.rigManagers[i].rigs.map((i, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-center border border-gray-300 rounded-md mx-1"
                                  >
                                    {i?.site}
                                  </span>
                                ))}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </>
                  )}
                </FieldArray>

                <p className="font-semibold md:text-lg">
                  Timezone & Currency Information
                </p>
                <SelectField
                  name="timezone"
                  placeholder="Select Timezone"
                  label="Timezone"
                  options={timeZones}
                />
                <SelectField
                  name="currency"
                  placeholder="Select Currency"
                  label="Currency"
                  options={currencies}
                />
                <SelectField
                  name="dateFormat"
                  placeholder="Select Format"
                  label="Date Format"
                  options={[
                    { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
                    { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
                    { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
                  ]}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <SelectField
                    name="financialYearMonth"
                    placeholder="Select Month"
                    label="Financial Year Start"
                    options={months.map((i) => ({ label: i, value: i }))}
                  />
                  <InputField
                    type="number"
                    name="financialYearDay"
                    placeholder="Day"
                  />
                </div>
                <p className="font-semibold md:text-lg">
                  Delete Company & Close Account
                </p>
                <div>
                  <Button
                    text="Delete Company, User Accounts & All Data"
                    className="!bg-red-500 !border-none w-full sm:w-auto"
                    fullWidth={false}
                    onClick={() => setCompanyDelete(true)}
                    prefix={<CloseOutlined />}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Spin size="large" spinning={true} className="text-center w-full !my-80" />
  );
};

export default CompanyDetails;
