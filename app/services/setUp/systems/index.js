import { authRequest } from "app/services/requestHandler";

export const getSystems = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/system/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createSystem = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/system/create",
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
export const deleteSystem = async (siteId) => {
  try {
    const { status, data } = await authRequest({
      url: `/system/delete?id=${siteId}`,
      method: "DELETE",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const filterSystems = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/system/filter",
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

export const exportSystems = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/system/export",
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
