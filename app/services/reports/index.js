import { authRequest } from "../requestHandler";

export const getReadings = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/readings/all",
      method: "GET",
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

export const exportReadings = async () => {
  try {
    const { status, data } = await authRequest({
      url: `/readings/export`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getFilteredReadings = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/readings/filtered",
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
