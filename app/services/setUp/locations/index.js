import { authRequest } from "app/services/requestHandler";

export const getLocations = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/location/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createLocation = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/location/create",
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

export const filterLocations = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/location/filter",
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

export const exportLocations = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/location/export",
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
