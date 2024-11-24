import { authRequest } from "../requestHandler";

export const getReadings = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/readings/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const generateReport = async (values, reportName, reportType) => {
  try {
    const { status, data } = await authRequest({
      url: "/readings/generateReport",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const exportReadings = async (hierarchy) => {
  try {
    const { status, data } = await authRequest({
      url: `/readings/export?hierarchy=${hierarchy}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
