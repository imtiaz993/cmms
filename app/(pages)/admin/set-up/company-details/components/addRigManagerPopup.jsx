import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, message, Modal } from "antd";
import { createManager, updateManager } from "app/services/rigManager";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const AddRigManagerPopup = ({
  visible,
  setOuterValues,
  setVisible,
  rigManagerData,
  setRigManagerData,
  outerValues,
}) => {
  const locations = useSelector((state) => state.location.location);
  console.log(locations);
  
  const initialValues = {
    email: rigManagerData?.email || "",
    name: rigManagerData?.name || "",
    phone: rigManagerData?.phone || "",
    rigs: [],
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().required("Required"),
    phone: Yup.string(),
    rigs: Yup.array()
      .min(1, "At least one location is required")
      .required("Required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    if (rigManagerData) {
      const { status, data } = await updateManager({
        ...values,
        _id: rigManagerData._id,
        company: outerValues._id,
      });
      setSubmitting(false);
      if (status === 200) {
        setOuterValues((prev) => ({
          ...prev,
          rigManagers: prev.rigManagers.map((rigManager, i) =>
            rigManager.index === i ? data.data : rigManager
          ),
        }));
        setRigManagerData(null);
        resetForm();
        setVisible(false);
        message.success("Rig Manager Updated successfully");
        setSubmitting(false);
        return;
      } else {
        message.error(data.error);
      }

      return;
    }

    const { status, data } = await createManager({
      ...values,
      company: outerValues._id,
    });
    setSubmitting(false);
    if (status === 200) {
      setOuterValues((prev) => ({
        ...prev,
        rigManagers: [...prev.rigManagers, data.data],
      }));
      setRigManagerData(null);
      resetForm();
      setVisible(false);
      message.success("Rig Manager added successfully");
      setSubmitting(false);
      return;
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title={
                <h1 className="text-lg md:text-2xl mb-5">
                  {rigManagerData ? "Update" : "Add"} a Rig Manager
                </h1>
              }
              open={visible}
              onCancel={() => {
                setVisible(false);
                resetForm();
                setRigManagerData(null);
              }}
              footer={
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => {
                      setVisible(false);
                      resetForm();
                      setRigManagerData(null);
                    }}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={false}
                  />

                  <Button
                    className=""
                    onClick={handleSubmit}
                    size="small"
                    text={rigManagerData ? "Update" : "Add"}
                    fullWidth={false}
                    disabled={false}
                  />
                </div>
              }
              width={600}
            >
              <div className="flex flex-col gap-4 w-full">
                <InputField
                  name="email"
                  placeholder="Enter email"
                  label="Email"
                  className="w-full"
                  required
                  disabled={rigManagerData}
                />
                <InputField
                  name="name"
                  placeholder="Enter rig manager name"
                  label="Name"
                  className="w-full"
                  required
                />
                <SelectField
                  name="rigs"
                  placeholder="Select locations"
                  options={locations.map((i) => ({
                    value: i._id,
                    label: i.site,
                  }))}
                  mode="multiple"
                  required
                  label="Locations"
                />
                <InputField
                  name="phone"
                  placeholder="Enter phone number"
                  label="Phone"
                  className="w-full"
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRigManagerPopup;
